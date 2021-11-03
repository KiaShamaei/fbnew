import { defineMessages, IntlShape } from "react-intl";

const messages = defineMessages({
    banki: {
        "id": "banki",
        "defaultMessage": "banki"
    },
    metals: {
        "id": "metals",
        "defaultMessage": "metals"
    },
    cari: {
        "id": "cari",
        "defaultMessage": "cari"
    },
    chemical: {
        "id": "chemical",
        "defaultMessage": "chemical"
    },
    oilProducts: {
        "id": "oil-products",
        "defaultMessage": "oil-products"
    },
    cement: {
        "id": "cement",
        "defaultMessage": "cement"
    },
    investment: {
        "id": "investment",
        "defaultMessage": "investment"
    },
    building: {
        "id": "building",
        "defaultMessage": "building"
    },
    insurance: {
        "id": "insurance",
        "defaultMessage": "insurance"
    },
    metalsExtraction: {
        "id": "metals-extraction",
        "defaultMessage": "metals-extraction"
    },
    nonMetallicMineral: {
        "id": "non-metallic-mineral",
        "defaultMessage": "non-metallic-mineral"
    },
    dietary: {
        "id": "dietary",
        "defaultMessage": "dietary"
    },
    agriculture: {
        "id": "agriculture",
        "defaultMessage": "agriculture"
    },
    financialIntermediation: {
        "id": "financial-intermediation",
        "defaultMessage": "financial-intermediation"
    },
    transportation: {
        "id": "transportation",
        "defaultMessage": "transportation"
    },
    contracting: {
        "id": "contracting",
        "defaultMessage": "contracting"
    },
    makingElectricity: {
        "id": "making-electricity",
        "defaultMessage": "making-electricity"
    },
    electricalDevices: {
        "id": "electrical-devices",
        "defaultMessage": "electrical-devices"
    },
    medicinal: {
        "id": "medicinal",
        "defaultMessage": "medicinal"
    },
    metalConstruction: {
        "id": "metal-construction",
        "defaultMessage": "metal-construction"
    },
    computer: {
        "id": "computer",
        "defaultMessage": "computer"
    },
    housingFacilities: {
        "id": "housing-facilities",
        "defaultMessage": "housing-facilities"
    },
    etfFund: {
        "id": "etf-fund",
        "defaultMessage": "etf-fund"
    },
    tile: {
        "id": "tile",
        "defaultMessage": "tile"
    },
    rubber: {
        "id": "rubber",
        "defaultMessage": "rubber"
    },
    sugarLoaf: {
        "id": "sugar-loaf",
        "defaultMessage": "sugar-loaf"
    }
})

export const data = (intl: IntlShape) => [
    {
        "label": intl.formatMessage(messages.banki),
        image: 'bank.svg',
        "id": "banki"
    },
    {
        "label": intl.formatMessage(messages.metals),
        image: 'metal.svg',
        "id": "metals"
    },
    {
        "label": intl.formatMessage(messages.cari),
        image: 'car.svg',
        "id": "cari"
    },
    {
        "label": intl.formatMessage(messages.chemical),
        image: 'laboratory.svg',
        "id": "chemical"
    },
    {
        "label": intl.formatMessage(messages.oilProducts),
        "id": "oil-products"
    },
    {
        "label": intl.formatMessage(messages.cement),
        "id": "cement"
    },
    {
        "label": intl.formatMessage(messages.investment),
        "id": "investment"
    },
    {
        "label": intl.formatMessage(messages.building),
        "id": "building"
    },
    {
        "label": intl.formatMessage(messages.insurance),
        "id": "insurance"
    },
    {
        "label": intl.formatMessage(messages.metalsExtraction),
        "id": "metals-extraction"
    },
    {
        "label": intl.formatMessage(messages.nonMetallicMineral),
        image: 'minerals.svg',
        "id": "non-metallic-mineral"
    },
    {
        "label": intl.formatMessage(messages.dietary),
        "id": "dietary"
    },
    {
        "label": intl.formatMessage(messages.agriculture),
        "id": "agriculture"
    },
    {
        "label": intl.formatMessage(messages.financialIntermediation),
        "id": "financial-intermediation"
    },
    {
        "label": intl.formatMessage(messages.transportation),
        "id": "transportation"
    },
    {
        "label": intl.formatMessage(messages.contracting),
        "id": "contracting"
    },
    {
        "label": intl.formatMessage(messages.makingElectricity),
        "id": "making-electricity"
    },
    {
        "label": intl.formatMessage(messages.electricalDevices),
        "id": "electrical-devices"
    },
    {
        "label": intl.formatMessage(messages.medicinal),
        "id": "medicinal"
    },
    {
        "label": intl.formatMessage(messages.metalConstruction),
        "id": "metal-construction"
    },
    {
        "label": intl.formatMessage(messages.computer),
        "id": "computer"
    },
    {
        "label": intl.formatMessage(messages.housingFacilities),
        "id": "housing-facilities"
    },
    {
        "label": intl.formatMessage(messages.etfFund),
        "id": "etf-fund"
    },
    {
        "label": intl.formatMessage(messages.tile),
        "id": "tile"
    },
    {
        "label": intl.formatMessage(messages.rubber),
        "id": "rubber"
    },
    {
        "label": intl.formatMessage(messages.sugarLoaf),
        "id": "sugar-loaf"
    }
]