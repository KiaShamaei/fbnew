export interface IDialogProps {
    isin?: string;
    marketValue?: number;
    instrumentName?: string;
    instrumentTitle?: string;
    closingPrice?: number;
    lastPrice?: number;
    buyFirmVolumePercentage?: number;
    selFirmVolumePercentage?: number;
    buyIndividualVolumePercentage?: number;
    buyIndividualVolume?: number;
    buyIndividualCount?: number;
    selIndividualVolumePercentage?: number;
    selIndividualVolume?: number;
    selIndividualCount?: number;
    selFirmVolume?: number;
    selFirmCount?: number;
    buyFirmCount?: number;
    buyFirmVolume?: number;
    closingPricePercent?: number;
    groupName?: string;

}

export interface IMapDialogState extends IDialogProps {
    isOpen: boolean;
}
