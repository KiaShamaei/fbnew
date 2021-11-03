import { FETCH_CURRNET_ORDERS } from "./actionType";
import produce from "immer";
import { IFetchState, IRegularAction } from "redux/types";
const initiaalState: any = {};
export const currentOrders = (
  state = initiaalState,
  { type, payload }: IRegularAction
) => {
  return produce<IFetchState>(state, (draft) => {
    switch (type) {
      case `SET_${FETCH_CURRNET_ORDERS}_LOADING`:
        draft.error = undefined;
        draft.isLoading = payload;
        break;
      case `SET_${FETCH_CURRNET_ORDERS}_DATA`:
        draft.data = payload.data;
        draft.isLoading = payload.isLoading;
        break;
      case `SET_${FETCH_CURRNET_ORDERS}_ERROR`:
        draft.error = payload;
        break;
      case `CLEAR_${FETCH_CURRNET_ORDERS}`:
        draft.data = [];
        break;
      default:
        return;
    }
  });
};
