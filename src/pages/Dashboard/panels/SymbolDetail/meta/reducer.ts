import { createSagaFetchReducer } from "redux/utils/sagaFetchReducer";
import { SYMBOL_DETAIL } from "./actionTypes";

export const symbolDetailReducer = createSagaFetchReducer(SYMBOL_DETAIL);