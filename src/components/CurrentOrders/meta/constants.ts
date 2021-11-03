import { IViewMode, ViewModeEnum } from "./types";


export const viewModes: IViewMode[] = [
    {
        type: ViewModeEnum.SEARCH,
        icon: 'online-icon-search',
        tooltip:'جستجو'
    },
    // {
    //     type: ViewModeEnum.CLOCK,
    //     icon: 'online-icon-clock'
    // },
    {
        type: ViewModeEnum.COMPRESSED,
        icon: 'online-icon-layers-filled',
        activeClassName: 'online-icon-layers',
        tooltip:'حالت فشرده'
    },

];