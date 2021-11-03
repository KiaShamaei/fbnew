import React, { Fragment, ReactElement, ReactNode } from "react";
import { useCallback } from "react";
import { useState } from "react";
import { ISnack } from "./meta/types";
import SnackbarContext from "./context/SnackbarContext";
import { useRef } from "react";
import SnackItem from "./components/SnackItem";
import { useContext } from "react";

interface Props {
  children: ReactNode;
}

function Snackbar({ children }: Props): ReactElement {
  const [snacks, setSnacks] = useState<ISnack[]>([]);
  const timeout = useRef<{ [prop: string]: NodeJS.Timeout }>({});
  const display = useCallback((snack: ISnack) => {
    const id = new Date().getTime() + "" + Math.random();
    snack.id = id;

    setSnacks(prevSnacks => [...prevSnacks, snack]);

    const timeoutId = setTimeout(
      () =>
        setSnacks(current => {
          clearTimeout(timeout.current[id]);
          delete timeout.current[id];
          return current.filter(snackItem => snackItem.id !== id);
        }),
      4000
    );
    timeout.current[id] = timeoutId;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Fragment>
      <SnackbarContext.Provider
        value={{
          display,
        }}>
        {children}
      </SnackbarContext.Provider>
      {snacks.map((snack, index) => (
        <SnackItem
          width={snack.width}
          key={snack.id}
          message={snack.message}
          type={snack.type}
          position={index}
        />
      ))}
    </Fragment>
  );
}

export const useSnackbar = () => {
  const { display } = useContext(SnackbarContext);
  return {
    display,
  };
};

export default Snackbar;
