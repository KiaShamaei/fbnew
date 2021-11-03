import React, { useEffect } from 'react'
import RadioButton from 'components/form/RadioButton/RadioButton';
import { defineMessages, useIntl } from 'react-intl';
import useDataGetter from 'hooks/useDataGetter';
import RadioGroupCore from 'components/form/RadioGroupCore/RadioGroupCore';
import SwitchCore from 'components/form/SwitchCore/SwitchCore';
import { useState } from 'react';
import { useSnackbar } from 'container/Snackbar/Snackbar';
import { useMemo } from 'react';
import { settingParser } from '../meta/parser';
const PreValues = () => {

  const messages = defineMessages({
    getLocationMessage: {
      id: "location-of-receiving-notification-messages",
      defaultMessage: "location-of-receiving-notification-messages",
    },
    basedOnProfitLoss: {
      id: "based-on-profit-loss",
      defaultMessage: "based-on-profit-loss",
    },
    systemColorTemplate: {
      id: "system-color-template",
      defaultMessage: "system-color-template",
    },
    confirmBeforesending: {
      id: "confirm-before-sending",
      defaultMessage: "confirm-before-sending",
    },
    receiveNotifications: {
      id: "receive-notifications",
      defaultMessage: "receive-notifications",
    },
    record: {
      id: "record",
      defaultMessage: "record",
    },
    settings: {
      id: "settings",
      defaultMessage: "settings",
    },
    checkInAndCheckOutReaports: {
      id: "check-in-and-check-out-reaports",
      defaultMessage: "check-in-and-check-out-reaports",
    },
    preValues: {
      id: "pre-values",
      defaultMessage: "pre-values",
    },
    towstep: {
      id: "tow-step",
      defaultMessage: "tow-step",
    },
    getobservermessage: {
      id: "get-observer-message",
      defaultMessage: "get-observer-message",
    },
    error: {
      id: "error-occured",
      defaultMessage: "error",
    },
    sucess: {
      id: "sucess",
      defaultMessage: "sucess",
    }
  });


  const {
    data,
    fetch: fetchGetData
  } = useDataGetter({
    url: '/user-setting/global',
    method: 'GET',
    fetchFirst: true
  })


  const parsedData = useMemo(() => settingParser(data), [data])
  

  const {
    fetch,
  } = useDataGetter({
    url: `/user-setting/global/`,
    method: 'POST',
    fetchFirst: false,
    onSuccess: () => {
      display({ type: 'success', message: intl.formatMessage(messages.sucess) })

    },
    onFailur: () => {
      display({ type: 'error', message: intl.formatMessage(messages.error) })
    }

  })

  const { display } = useSnackbar();
  const [formState, setFormState] = useState<any>({})

  useEffect(() => {
    if (parsedData)
      setFormState({
        towstep: parsedData["two-step"] === "false" ? false : true,
        overseer: parsedData["overseer-receive"] === "false" ? false : true,
        notifreceive: parsedData["notif-receive"] === "false" ? false : true,
        confirm: parsedData.confirm === "false" ? false : true,
        lastClosing: parsedData["last-closing"],
        theme: parsedData.theme,
        align: parsedData["notif-corner"],
      })
  }, [parsedData])

  const intl = useIntl();
  return (

    <div>
      <div className="item">
        <span>{intl.formatMessage(messages.getLocationMessage)} :</span>
        <div className="btns d-flex">

          <RadioGroupCore value={formState.align} onChange={(e) => {
            setFormState((prev: any) => ({ ...prev, align: e }))
            fetch(null, {}, `/user-setting/global/notif-corner/${e}`).then()
          }}>
            <RadioButton
              label={"راست"}
              value={"right"}
              className="mx-5"
            />
            <RadioButton
              label={"چپ"}
              value={"left"}
              className="mx-5"
            />
          </RadioGroupCore>

        </div>
      </div>
      <div className="item">
        <span>{intl.formatMessage(messages.basedOnProfitLoss)} : </span>
        <div className="btns d-flex">

          <RadioGroupCore value={formState.lastClosing} onChange={(e) => {
            setFormState((prev: any) => ({ ...prev, lastClosing: e }))
            fetch(null, {}, `/user-setting/global/last-closing/${e}`).then()
          }}>
            <RadioButton
              label={"پایانی"}
              value={"last"}
              className="mx-5"
            />
            <RadioButton
              label={"اخرین"}
              value={"closing"}
              className="mx-5"
            />
          </RadioGroupCore>

        </div>
      </div>
      <div className="item">
        <span>{intl.formatMessage(messages.systemColorTemplate)}:</span>
        <div className="btns d-flex">


          <RadioGroupCore value={formState.theme} onChange={(e) => {
            setFormState((prev: any) => ({ ...prev, theme: e }))
            fetch(null, {}, `/user-setting/global/theme/${e}`).then()
          }}>
            <RadioButton
              label={"روشن"}
              value={"light"}
              className="mx-5"
            />
            <RadioButton
              label={"تیره"}
              value={"dark"}
              className="mx-5"
            />
          </RadioGroupCore>


        </div>
      </div>
      <div className="item">
        <span>{intl.formatMessage(messages.confirmBeforesending)} :</span>
        <div className="btns">
          <SwitchCore value={formState.confirm} onChange={(e) => {
            setFormState((prev: any) => ({ ...prev, confirm: e }))
            fetch(null, {}, `/user-setting/global/confirm/${e} `).then()
          }}></SwitchCore>
        </div>
      </div>
      <div className="item">
        <span>{intl.formatMessage(messages.receiveNotifications)} :</span>
        <div className="btns">
          <SwitchCore value={formState.notifreceive} onChange={(e) => {
            setFormState((prev: any) => ({ ...prev, notifreceive: e }))
            fetch(null, {}, `/user-setting/global/notif-receive/${e}`).then()
          }}></SwitchCore>
        </div>
      </div>
      <div className="item">
        <span>{intl.formatMessage(messages.getobservermessage)} :</span>
        <div className="btns">
          <SwitchCore value={formState.overseer} onChange={(e) => {
            setFormState((prev: any) => ({ ...prev, overseer: e }))
            fetch(null, {}, `/user-setting/global/overseer-receive/${e} `).then()
          }}></SwitchCore>
        </div>
      </div>
      <div className="item">
        <span>{intl.formatMessage(messages.towstep)} :</span>
        <div className="btns">
          <SwitchCore value={formState.towstep} onChange={(e) => {
            setFormState((prev: any) => ({ ...prev, towstep: e }))
            fetch(null, {}, `/user-setting/global/two-step/${e}`).then()
          }}></SwitchCore>
        </div>
      </div>



    </div>
  )
}
export default PreValues