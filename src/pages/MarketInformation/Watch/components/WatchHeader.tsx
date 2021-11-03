import { useState } from "react";
import Button from "components/Button/Button";
import "./../assets/header.scss";
import classNames from "classnames";
import { FormattedMessage, useIntl } from "react-intl";
import DropdownMenu from "components/DropdownMenu/DropdownMenu";
import CheckboxCore from "components/form/CheckboxCore/CheckboxCore";
import { useCallback } from "react";
import { useContext } from "react";
import { displayContext } from "../Watch";

interface Props {
  setChart: () => void;
  setTable: () => void;
  columns: any[];
}


const WatchHeader = ({ setChart, columns, setTable }: Props) => {

  const getDisplay = useContext<any>(displayContext);
  const selectCheckbox = getDisplay.selectCheckbox;
  const checkItem = getDisplay.checkItem



  const [active, setActive] = useState("SHOW_LIST");



  const ShowListDropDown = useCallback(
    ({ toggle }: any) => {
      return (
        <Button
          onClick={() => {

            toggle();

          }}
          className={classNames('d-flex align-items-center', {
            "navy-blue": active === "SHOW_COLUMN",
            white: active !== "SHOW_COLUMN",
          })}
        >

          <div className='mt-1 d-inline'>
            <i className={'online-icon-columns blue-icon icon-style ml-2'}></i>
          </div>
          <FormattedMessage id='show-columns' defaultMessage='show-columns' />
        </Button>
      );
    },
    [active]
  );


  const dropdown = (
    <ul>
      {columns.map(({ item, id }) => (
        <li className="d-flex item" key={id} onChange={() => { console.log('Changed') }} onClick={() => checkItem(id)}>
          <CheckboxCore value={selectCheckbox.some((i: any) => i === id)} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );


  return (
    <div className="watch-header">
      <div>
        <h4 className='text-light'><FormattedMessage id='watch' defaultMessage='watch' /></h4>
      </div>
      <div className='d-flex'>
        <DropdownMenu
          position="center"
          dropdown={dropdown}
          renderAnchor={ShowListDropDown}
          dropdownClassName='shadow'
        />
        <Button
          onClick={() => {
            setActive("SHOW_LIST");
            setTable()
          }}
          className={classNames('d-flex align-items-center', {
            "navy-blue": active === "SHOW_LIST",
            white: active !== "SHOW_LIST",
          })}
        >
          <div className='mt-1 d-inline'>
            <i className={classNames({ 'white': active === 'SHOW_LIST' }, 'online-icon-list blue-icon icon-style ml-2')}></i>
          </div>
          <FormattedMessage id='show-list' defaultMessage='show-list' />
        </Button>
        <Button
          onClick={() => {
            setActive("SHOW_CHART");
            setChart()
          }}
          className={classNames('d-flex align-items-center', {
            "navy-blue": active === "SHOW_CHART",
            white: active !== "SHOW_CHART",
          })}
        >
          <div className='mt-1 d-inline'>
            <i className={classNames({ 'white': active === 'SHOW_CHART' }, 'online-icon-chart blue-icon icon-style ml-2')}></i>
          </div>
          <FormattedMessage id='show-chart' defaultMessage='show-chart' />
        </Button>
      </div>

    </div>
  );
};
export default WatchHeader;
