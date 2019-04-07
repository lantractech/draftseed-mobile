import * as actionTypes from 'actions/actionTypes'

export const requestSectorCommunicationServices = (param) => ({ type: actionTypes.SECTOR_COMMUNICATION_SERVICES_REQUEST, param });
export const requestSectorConsumerDiscretionary = (param) => ({ type: actionTypes.SECTOR_CONSUMER_DISCRETIONARY_REQUEST, param });
export const requestSectorConsumerStaples = (param) => ({ type: actionTypes.SECTOR_CONSUMER_STAPLES_REQUEST, param });
export const requestSectorEnergy = (param) => ({ type: actionTypes.SECTOR_ENERGY_REQUEST, param });
export const requestSectorFinancials = (param) => ({ type: actionTypes.SECTOR_FINANCIALS_REQUEST, param });
export const requestSectorHealthCare = (param) => ({ type: actionTypes.SECTOR_HEALTH_CARE_REQUEST, param });
export const requestSectorIndustrials = (param) => ({ type: actionTypes.SECTOR_INDUSTRIALS_REQUEST, param });
export const requestSectorMaterials = (param) => ({ type: actionTypes.SECTOR_MATERIALS_REQUEST, param });
export const requestSectorRealEstate = (param) => ({ type: actionTypes.SECTOR_REAL_ESTATE_REQUEST, param });
export const requestSectorTechnology = (param) => ({ type: actionTypes.SECTOR_TECHNOLOGY_REQUEST, param });
export const requestSectorUtilities = (param) => ({ type: actionTypes.SECTOR_UTILITIES_REQUEST, param });
export const requestSectors = (param,sectors) => ({ type: actionTypes.SECTORS_REQUEST, param, sectors });

export const requestIEXMostActive = () => ({ type: actionTypes.IEX_MOST_ACTIVE_REQUEST });
export const requestIEXGainers = () => ({ type: actionTypes.IEX_GAINERS_REQUEST });
export const requestIEXLosers = () => ({ type: actionTypes.IEX_LOSERS_REQUEST });