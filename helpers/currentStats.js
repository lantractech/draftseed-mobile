var _ = require('lodash')
var iex = require('./src/services/iexTradingApi')
var iexConstants = require('./src/constants/iexConstants')

exports.handler = async (event, context) => {
    //https://i55aqtajjc.execute-api.us-east-1.amazonaws.com/default/currentStats?param=topLosers&sector=Communication%20Services&sector=Technology
    let param = _.get(event,'queryStringParameters.param')
    let sectors = _.get(event,'multiValueQueryStringParameters.sector')
    let response = {
        statusCode: 200,
        body: JSON.stringify('Param: '+ param + ', sectors: '+sectors),
    };
    if (param === 'sectorPerformance'){
        let sectorPerformance = await getIEXSectorPerformance(sectors)
        response.body = JSON.stringify(sectorPerformance)
        return response
    }
    else if (param === 'topGainers'){
        let topGainers = await getIEXTopGainers(sectors)
        response.body = JSON.stringify(topGainers)
        return response
    }
    else if (param === 'topLosers'){
        let topLosers = await getIEXTopLosers(sectors)
        response.body = JSON.stringify(topLosers)
        return response
    }
    else if (param === 'mostActive'){
        let mostActive = await getIEXMostActive(sectors)
        response.body = JSON.stringify(mostActive)
        return response
    }
    return response;
};


const getIEXSectorPerformance = async (sectors) => {
    let sectorStats = await iex.getSectorPerformance(sectors)
    return sectorStats.data
}

const getIEXTopGainers = async (sectors) => {
    let data = await getIEXData(true,'changePercent',sectors)
    return sortByReverse(data,'changePercent')
}

const getIEXTopLosers = async (sectors) => {
    let data = await getIEXData(false,'changePercent',sectors)
    return sortBy(data,'changePercent')
}

const getIEXMostActive = async (sectors) => {
    let data = await getIEXData(true,'latestVolume',sectors)
    return sortByReverse(data,'latestVolume')
}

const sortBy = (data,field) => {
    return _.slice(_.sortBy(data,[field]), 0, 49)
}

const sortByReverse = (data,field) => {
    return _.slice(_.reverse(_.sortBy(data,[field])), 0, 49)
}

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array)
    }
}

const getIEXData = async (reverseSort,filter,sectors) => {
    let totalData = {}
    await asyncForEach(sectors || iexConstants.sectors, async (sector) => {
        let sectorList = await iex.getCollections(sector)
        let newData = reverseSort ? sortByReverse(sectorList.data,filter) : sortBy(sectorList.data,filter)
        let newList = _.map(newData,(data) => {
            return {
                symbol: data.symbol,
                companyName: data.companyName,
                primaryExchange: data.primaryExchange,
                sector: data.sector,
                open: data.open,
                close: data.close,
                high: data.high,
                low: data.low,
                latestPrice: data.latestPrice,
                latestVolume: data.latestVolume,
                previousClose: data.previousClose,
                change: data.change,
                changePercent: data.changePercent,
                avgTotalVolume: data.avgTotalVolume,
                marketCap: data.marketCap,
                peRatio: data.peRatio,
                week52High: data.week52High,
                week52Low: data.week52Low,
                ytdChange: data.ytdChange
            }
        })
        totalData = { ...totalData, ...newList }
    })
    return totalData
}
