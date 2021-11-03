import { CurrentItemMode } from "./types";

export function getModeHeight(mode: CurrentItemMode, isCompressed: boolean): number {
    switch(mode) {
        case 'cancel':
            return 210;
        case 'edit':
            return 323;
        case 'expanded':
            return (isCompressed ? 285 : 207);
        case 'calculator':
            return 323 + 40;
        default:
            return  isCompressed ? 180 : 100;
    }
}