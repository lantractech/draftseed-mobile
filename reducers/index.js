import { combineReducers } from 'redux'
import {sectorCommunicationServices} from 'reducers/sectors/communicationServicesReducer'
import {sectorConsumerDiscretionary} from 'reducers/sectors/consumerDiscretionaryReducer'
import {sectorConsumerStaples} from 'reducers/sectors/consumerStaplesReducer'
import {sectorEnergy} from 'reducers/sectors/energyReducer'
import {sectorFinancials} from 'reducers/sectors/financialsReducer'
import {sectorHealthCare} from 'reducers/sectors/healthCareReducer'
import {sectorIndustrials} from 'reducers/sectors/industrialsReducer'
import {sectorMaterials} from 'reducers/sectors/materialsReducer'
import {sectorRealEstate} from 'reducers/sectors/realEstateReducer'
import {sectorTechnology} from 'reducers/sectors/technologyReducer'
import {sectorUtilities} from 'reducers/sectors/utilitiesReducer'
import {sectors} from 'reducers/sectors/sectorsReducer'
import {detailedGainers} from 'reducers/api/detailedGainersReducer'
import {detailedLosers} from 'reducers/api/detailedLosersReducer'
import {detailedMostActive} from 'reducers/api/detailedMostActiveReducer'
import {iexGainers} from 'reducers/iex/gainersReducer'
import {iexLosers} from 'reducers/iex/losersReducer'
import {iexMostActive} from 'reducers/iex/mostActiveReducer'

const rootReducer = combineReducers({
    sectorCommunicationServices,
    sectorConsumerDiscretionary,
    sectorConsumerStaples,
    sectorEnergy,
    sectorFinancials,
    sectorHealthCare,
    sectorIndustrials,
    sectorMaterials,
    sectorRealEstate,
    sectorTechnology,
    sectorUtilities,
    sectors,
    detailedGainers,
    detailedLosers,
    detailedMostActive,
    iexGainers,
    iexLosers,
    iexMostActive
})

export default rootReducer