import API from 'API';
import { useSnackbar } from 'container/Snackbar/Snackbar';
import useDataGetter from 'hooks/useDataGetter';
import moment from 'moment';

import React, { useCallback } from 'react';
import { useIntl } from 'react-intl';

interface Props {
  url: string;
  icon: string;
  type: string;
}
const messages = {
  error: {
    id: 'error-occured',
    defaultMessage: 'error-occured'
  }
}
export enum Formatt {
  pdf,
  excel,
  csv,
  html,
  excel_pro
}
export function getTypeFormatt(type: Formatt): string {
  if (type === Formatt.excel || type === Formatt.excel_pro) {
    return 'xlsx';
  }
  return Formatt[type];
}

export const exportFile =
  (type: any, response: any, name = 'errors') => {
    const downloadLink = document.createElement('a');
    downloadLink.href = window.URL.createObjectURL(new Blob([response], { type: "application/vnd.ms-excel" }));
    const filename = name + moment().format('YYYY-MM-DD-hmmss') + '.' + getTypeFormatt(type);
    if (filename) {
      downloadLink.setAttribute('download', filename);
    }
    document.body.appendChild(downloadLink);
    downloadLink.click();
  };



export default function ExportIcon({ icon, url, type }: Props) {
  const intl = useIntl()
  const { display } = useSnackbar()
  const { fetch } = useDataGetter({
    url: url,
    method: 'GET',
    fetchFirst: false,
    responseType: 'blob'
  })

  const handleExcellClick = useCallback(() => {

    fetch().then((res) => {
      exportFile(Formatt.excel, res, 'Reports')
    }).catch((err) => {
      console.log(err)
      display({
        message: intl.formatMessage(messages.error),
        type: 'error'
      })
    })
  }, [display, fetch, intl])

  const handleCsvClick = useCallback(() => {

    fetch().then((res) => {
      exportFile(Formatt.csv, res, 'Reports')
    }).catch((err) => {
      console.log(err)
      display({
        message: intl.formatMessage(messages.error),
        type: 'error'
      })
    })
  }, [display, fetch, intl])

  return (
    <i className={icon} onClick={type === 'excel' ? handleExcellClick : handleCsvClick}></i >
  )

}
