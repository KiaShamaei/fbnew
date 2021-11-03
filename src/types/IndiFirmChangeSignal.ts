export interface IndiFirmChangeSignal {
    isin: string;
    buyIndividualVolume: number;
    buyIndividualVolumePercentage: number;
    buyIndividualCount: number;
    buyFirmVolume: number;
    buyFirmVolumePercentage: number;
    buyFirmCount: number;
    selIndividualVolume: number;
    selIndividualVolumePercentage: number;
    selIndividualCount: number;
    selFirmVolume: number;
    selFirmVolumePercentage: number;
    selFirmCount: number;
}