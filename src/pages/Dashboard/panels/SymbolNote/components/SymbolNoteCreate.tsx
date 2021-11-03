import Button from "components/Button/Button";
import Dialog from "components/Dialog/Dialog";
import LazyComboboxField from "components/form/LazyComboboxField/LazyComboboxField";
import TextField from "components/form/TextField/TextField";
import Loading from "components/Loading/Loading";
import { SYMBOL_NOTE_REFRESH } from "container/ObserverProivder/meta/constants";
import { useObserver } from "container/ObserverProivder/ObserverProivder";
import { useSnackbar } from "container/Snackbar/Snackbar";
import useDataGetter from "hooks/useDataGetter";
import React, { ReactElement, useContext } from "react";
import { useEffect } from "react";
import { useMemo } from "react";
import { useRef } from "react";
import { Field, Form } from "react-final-form";
import { defineMessages, useIntl, FormattedMessage } from "react-intl";
import "../assets/SymbolNoteCreate.scss";
import { Mycontext } from "../SymbolNote";

const messages = defineMessages({
  title: {
    id: "title",
    defaultMessage: "title",
  },
  relatedToTheShare: {
    id: "related-to-the-share",
    defaultMessage: "related to the share",
  },
  noteText: {
    id: "note-text",
    defaultMessage: "note text",
  },
  addsuccess: {
    id: "addsuccess",
    defaultMessage: "addsuccess",
  },
  error: {
    id: "error-occured",
    defaultMessage: "error-occured",
  },
});

interface Props {
  close: () => void;
  isOpen?: boolean;
  symbol?: any;
}

function SymbolNoteCreate({
  close,
  isOpen,
  symbol
}: Props): ReactElement | null {
  const { display } = useSnackbar();
  const intl = useIntl();
  const observer = useObserver()
  const formReset = useRef<any>();
  const {
    statusCode,
    loading,
    fetch: postData,
  } = useDataGetter<any>({
    url: `/instrument/note`,
    method: "POST",
    parseData: true,
    isTest: false,

    onFailur: () => {
      display({ type: "error", message: intl.formatMessage(messages.error) });
    },
    fetchFirst: false,
  });

  const {
    loading: gettingLoading,
    data,
    fetch
  } = useDataGetter({
    fetchFirst: false,
    parseData: true
  })

  useEffect(() => {
    if (symbol) {

      fetch(null, null, `/instrument/note/${symbol.id}`)
    }
  }, [fetch, symbol])

  const initialValues = useMemo(() => {
    if (data) {
      return {
        title: data[2],
        relatedToTheShare: { label: data[1], id: data[0] },
        noteText: data[3],
      }
    }
    if (symbol)
      return {
        relatedToTheShare: symbol,
      }
    return {}
  }, [data, symbol])


  return (
    <Dialog
      className="symbol-note-create"
      resizeAble={true}
      isOpen={true}
      defaultX={150}
      defaultY={window.innerHeight / 2 - 150}
      close={close}
      title={<FormattedMessage id="new-note" defaultMessage="new note" />}>
      <Form
        initialValues={initialValues}
        onSubmit={(values) => {
          postData(null, {
            isin: values.relatedToTheShare.id,
            instrumentName: values.relatedToTheShare.label,
            title: values.title,
            note: values.noteText,
          }).then(() => {
            setTimeout(() => {
              formReset.current && formReset.current.reset();
              close();
              display({
                type: "success",
                message: intl.formatMessage(messages.addsuccess),
              });
              observer.emit(SYMBOL_NOTE_REFRESH, {})
            }, 100)
          });

        }}
        render={({ handleSubmit, form }) => {
          formReset.current = form;
          return (
            <form onSubmit={handleSubmit}>
              {(loading || gettingLoading) && <Loading />}
              <Field
                component={TextField}
                className="mt-2"
                name="title"
                validate={(v) => {
                  if (!v) {
                    return 'عنوان اجباری است'
                  }
                }}
                label={intl.formatMessage(messages.title)}
              />
              <Field
                component={LazyComboboxField}
                hasClear
                validate={value => {
                  if (!value) {
                    return (
                      <FormattedMessage
                        id="isin-label-is-undefined"
                        defaultMessage="سهم اشتباه"
                      />
                    );
                  }
                }}
                url={(searchKey: string) => `/instrument/search/${searchKey}`}
                icon={<i className="online-icon-search" />}
                parser={(info: any) => {
                  const data = info.data || [];
                  if (data && data.length > 0)
                    return data.map((item: any[]) => ({
                      label: item ? item[1] : null,
                      id: item ? item[0] : null,
                    }));
                  return [];
                }}
                className="mt-4"
                name="relatedToTheShare"
                label={intl.formatMessage(messages.relatedToTheShare)}
              />
              <Field
                component={TextField}
                className="mt-4"
                tag="textarea"
                validate={(v) => {
                  if (!v) {
                    return 'توضیحات اجباری است'
                  }
                }}
                name="noteText"
                label={intl.formatMessage(messages.noteText)}
              />
              <div className="d-flex mt-4 w-100">
                <Button className="m-auto px-8" >
                  <FormattedMessage id="save" defaultMessage="save" />
                </Button>
              </div>
            </form>
          );
        }}
      />
    </Dialog>
  );
}

export default SymbolNoteCreate;
