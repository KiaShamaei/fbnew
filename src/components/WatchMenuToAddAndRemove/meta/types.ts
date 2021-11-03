import { IWatchMenuItem } from "pages/Dashboard/panels/Watch/meta/types";

export interface IWatchMenuItemWithStatus extends IWatchMenuItem {
    existIn: boolean;
}