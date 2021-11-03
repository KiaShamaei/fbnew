import React, { ChangeEvent, ReactElement, useCallback } from 'react'
import { useContext } from 'react'
import { defineMessages, useIntl } from 'react-intl'
import './assets/SymbolSearch.scss'
import { SymbolDetailContext } from '../SymbolDetail/contexts/SymbolDetailContext'
import { useDispatch } from 'react-redux'
import { FETCH_SYMBOL_LIST } from '../SymbolList/meta/actionTypes'
import debounceFn from 'debounce-fn';
import { useMemo } from 'react'
import { SYMBOL_SEARCH_TIMEOUT } from 'appConstants'
import keyboardConverter from 'utils/keyboardConverter'

const messages = defineMessages({
  enterTheSymbolYouWantToSearch: {
    id: 'enter-the-symbol-you-want-to-search',
    defaultMessage: 'enter the symbol you want to search'
  }
})

// TODO: replace it with icomoon
const TempSearchIcon = () => {
  return <svg id="loupe" xmlns="http://www.w3.org/2000/svg" width="20" height="19" viewBox="0 0 20 20">
    <g id="Group_2046" data-name="Group 2046">
      <g id="Group_2045" data-name="Group 2045">
        <path id="Path_4111" data-name="Path 4111" d="M8.808,0a8.808,8.808,0,1,0,8.808,8.808A8.818,8.818,0,0,0,8.808,0Zm0,15.989a7.182,7.182,0,1,1,7.182-7.182A7.19,7.19,0,0,1,8.808,15.989Z" fill="#0c91e9" />
      </g>
    </g>
    <g id="Group_2048" data-name="Group 2048" transform="translate(13.713 13.713)">
      <g id="Group_2047" data-name="Group 2047">
        <path id="Path_4112" data-name="Path 4112" d="M357.095,355.945l-4.661-4.661a.813.813,0,1,0-1.15,1.15l4.661,4.661a.813.813,0,0,0,1.15-1.15Z" transform="translate(-351.046 -351.046)" fill="#0c91e9" />
      </g>
    </g>
  </svg>

}
/*
interface Props {
  setDisplaySearch: (isDisplay: boolean, searchKey: string) => void; 
}*/

function SymbolSearch(/*{
  setDisplaySearch
}: Props*/): ReactElement {
  const { setSearchValue, searchValue, openSymbolList, backToIndustry } = useContext(SymbolDetailContext)
  const intl = useIntl()
  const dispatch = useDispatch()

  const handleSubmit = useCallback((e: React.SyntheticEvent) => {
    e.preventDefault();
    if (searchValue) {
    const convertedSearchValue = keyboardConverter(searchValue)
      openSymbolList()
      dispatch({
        type: FETCH_SYMBOL_LIST,
        urlParams: {
          searchKey: convertedSearchValue,
        }
      })
    } else if (!searchValue || searchValue.length === 0) {
      backToIndustry()
    }
  }, [dispatch, openSymbolList, searchValue, backToIndustry])

  const callApi = useMemo(() => debounceFn((
    dispatch: (...args: any) => void,
    openSymbolList: () => void,
    searchValue: string) => {
    if (searchValue.length < 2) {
      return;
    }
    const convertedSearchValue = keyboardConverter(searchValue)

    dispatch({
      type: FETCH_SYMBOL_LIST,
      urlParams: {
        searchKey: convertedSearchValue,
      }
    })
    openSymbolList()
  }, {
    wait: SYMBOL_SEARCH_TIMEOUT
  }), [])
  const changeLanguage = useCallback((str) => {
    const persianCharacter = ["و", "ئ", "د", "ذ", "ر", "ز", "ط", "ظ", "پ", "گ", "ک", "م", "ن", "ت", "ا", "ل", "ب", "ی", "س", "ش", "چ", "ج", "ح", "خ", "ه", "ع", "غ", "ف", "ق", "ث", "ص", "ض","آ","ژ"]
    const englishCharacter = [",","m", "n", "b", "v", "c", "x", "z", "\\", "'", ";", "l", "k", "j", "h", "g", "f", "d", "s", "a", "]", "[", "p", "o", "i", "u", "y", "t", "r", "e", "w", "q","H","C"]

    return str.split("").map((c: any) => persianCharacter[englishCharacter.indexOf(c)] || persianCharacter[persianCharacter.indexOf(c)]).join("")
  }, [])


  const handleInputValueChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value)
    if (!value || value.length < 1) {
      return backToIndustry()
    } else if (value.length ?? '') {
      return callApi(dispatch, openSymbolList, value)
    }
    
  }, [setSearchValue, backToIndustry, callApi, dispatch, openSymbolList]);

  return (
    <div className="symbol-search panel">
      <form className="d-flex h-100" onSubmit={handleSubmit}>
        <input type="text" onChange={handleInputValueChange} onFocus={handleInputValueChange} value={searchValue} className="flex-grow-1 my-auto " placeholder={intl.formatMessage(messages.enterTheSymbolYouWantToSearch)} />
        <button className="search-icon my-auto ">
          <TempSearchIcon />
        </button>
      </form>
    </div>
  )
}

export default SymbolSearch
