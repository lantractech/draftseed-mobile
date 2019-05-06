import { fork, all } from 'redux-saga/effects'

import {watcherCommunicationServices} from 'sagas/sectors/communicationServicesSaga'
import {watcherConsumerDiscretionary} from 'sagas/sectors/consumerDiscretionarySaga'
import {watcherConsumerStaples} from 'sagas/sectors/consumerStaplesSaga'
import {watcherEnergy} from 'sagas/sectors/energySaga'
import {watcherFinancials} from 'sagas/sectors/financialsSaga'
import {watcherHealthCare} from 'sagas/sectors/healthCareSaga'
import {watcherIndustrials} from 'sagas/sectors/industrialsSaga'
import {watcherMaterials} from 'sagas/sectors/materialsSaga'
import {watcherRealEstate} from 'sagas/sectors/realEstateSaga'
import {watcherTechnology} from 'sagas/sectors/technologySaga'
import {watcherUtilities} from 'sagas/sectors/utilitiesSaga'
import {watcherSectors} from 'sagas/sectors/sectorsSaga'
import {watcherDetailedGainers} from 'sagas/api/detailedGainersSaga'
import {watcherDetailedLosers} from 'sagas/api/detailedLosersSaga'
import {watcherDetailedMostActive} from 'sagas/api/detailedMostActiveSaga'
import {watcherSectorOverview} from 'sagas/iex/sectorOverviewSaga'
import {watcherGainers} from 'sagas/iex/gainersSaga'
import {watcherLosers} from 'sagas/iex/losersSaga'
import {watcherMostActive} from 'sagas/iex/mostActiveSaga'

export default function* rootSaga() {
    yield all([
      fork(watcherCommunicationServices),
      fork(watcherConsumerDiscretionary),
      fork(watcherConsumerStaples),
      fork(watcherEnergy),
      fork(watcherFinancials),
      fork(watcherHealthCare),
      fork(watcherIndustrials),
      fork(watcherMaterials),
      fork(watcherRealEstate),
      fork(watcherTechnology),
      fork(watcherUtilities),
      fork(watcherSectors),
      fork(watcherDetailedGainers),
      fork(watcherDetailedLosers),
      fork(watcherDetailedMostActive),
      fork(watcherSectorOverview),
      fork(watcherGainers),
      fork(watcherLosers),
      fork(watcherMostActive)
    ])
  }