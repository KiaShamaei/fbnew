import { endpoints } from "appConstants";
import Button from "components/Button/Button";
import LazyComboboxField from "components/form/LazyComboboxField/LazyComboboxField";
import TextField from "components/form/TextField/TextField";
import Loading from "components/Loading/Loading";
import { useSnackbar } from "container/Snackbar/Snackbar";
import useDataGetter from "hooks/useDataGetter";
import React, { useContext, useEffect, useMemo, useRef } from "react";
import { Field, Form } from "react-final-form";
import { defineMessages, FormattedMessage, useIntl } from "react-intl";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { IReduxState } from "redux/types";
import { isConstructorDeclaration } from "typescript";
import { Mycontext } from "../../SymbolNote/SymbolNote";

interface Props {
  isin?: string;
}

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
// eslint-disable-next-line react-hooks/rules-of-hooks

export default function AddAndEditNoteForm({ isin }: Props) {
  const { display } = useSnackbar();
  const intl = useIntl();
  const formReset = useRef<any>();

  const { fetch } = useDataGetter({
    method: "GET",
    fetchFirst: false,
  });
  let data: any;
  const isLoggedIn = useSelector<IReduxState>(state => state.user.isLoggedIn);

  useEffect(() => {
    if (isLoggedIn)
          fetch(null, null, `instrument/note/${isin}`).then(d => {
            data = d.data
          }).catch(err => console.log(err, "EditAndAddNOteForm"))
  }, [isLoggedIn])

  
  const {
    statusCode,
    loading,
    fetch: postData,
  } = useDataGetter<any>({
    url: `/instrument/note`,
    method: "POST",
    parseData: true,
    isTest: false,
    onSuccess: () => {
      formReset.current && formReset.current.reset();

      display({
        type: "success",
        message: intl.formatMessage(messages.addsuccess),
      });
    },
    onFailur: () => {
      display({ type: "error", message: intl.formatMessage(messages.error) });
    },
    fetchFirst: false,
  });
  if (data === undefined) return <Loading />;

  return (
    <Form
      onSubmit={values => {
        postData(null, {
          isin: values.symbol.id,
          instrumentName: values.symbol.label,
          title: values.title,
          note: values.noteText,
        });
      }}
      initialValues={
        data
          ? {
              title: data[2],
              symbol: {
                id: data[0],
                label: data[1],
              },
              noteText: data[3],
            }
          : {}
      }
      render={({ handleSubmit, form }) => {
        formReset.current = form;
        return (
          <form onSubmit={handleSubmit}>
            <Field
              component={TextField}
              className="mt-2"
              name="title"
              label={intl.formatMessage(messages.title)}
            />

            <Field
              component={LazyComboboxField}
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
              name="symbol"
              label={intl.formatMessage(messages.relatedToTheShare)}
            />
            <Field
              component={TextField}
              className="mt-4"
              tag="textarea"
              name="noteText"
              label={intl.formatMessage(messages.noteText)}
            />
            <div className="d-flex mt-4 w-100">
              <Button className="m-auto px-8">
                <FormattedMessage id="save" defaultMessage="save" />
              </Button>
            </div>
          </form>
        );
      }}
    />
  );
}
