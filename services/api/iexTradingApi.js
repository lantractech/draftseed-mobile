import axios from 'axios'

var instance = axios.create({
    baseURL: "https://api.iextrading.com/1.0",
    timeout: 5000  // 5sec
})
//instance.defaults.headers.common['Authorization'] = AUTH_TOKEN

const getRequest = (path) => {
    return instance.get(path)
        .then(response => {
            return { data: response.data, error: false };
        })
        .catch(error => {
            if (error.response) {
                let errorDetails = "Server responded with status code that falls outside of range 2xx"
                return { error: true, errorDetails: errorDetails }
            }
            else if (error.request) {
                let errorDetails = "Request was made but no response received"
                return { error: true, errorDetails: errorDetails }
            }
            else {
                let errorDetails = error.message
                return { error: true, errorDetails: errorDetails }
            }
        });
}



// Batch Requests ---------------------------------------------//
// /stock/aapl/batch?types=quote,news,chart&range=1m&last=1
// /stock/market/batch?symbols=aapl,fb,tsla&types=quote,news,chart&range=1m&last=5


// Book ---------------------------------------------//
// /stock/aapl/book
export function getBook(symbol) {
    let path = `/stock/${symbol}/book`
    const response = getRequest(path);
    return response;
}



// Chart ---------------------------------------------//
// /stock/aapl/chart
// /stock/aapl/chart/5y
// /stock/aapl/chart/2y
// /stock/aapl/chart/1y
// /stock/aapl/chart/ytd
// /stock/aapl/chart/6m
// /stock/aapl/chart/3m
// /stock/aapl/chart/1m
// /stock/aapl/chart/1d
// /stock/aapl/chart/date/20180129
// /stock/aapl/chart/dynamic

export function getChart(symbol, range, date) {
    let path = `/stock/${symbol}`
    if (date) { path = `/stock/${symbol}/chart/date/${date}` }
    else if (range) { path = `/stock/${symbol}/chart/${range}` }
    const response = getRequest(path);
    return response;
}



// Collections ---------------------------------------------//
// /stock/market/collection/sector?collectionName=Health%20Care
// /stock/market/collection/tag?collectionName=Computer%20Hardware
// /stock/market/collection/list?collectionName=iexvolume
export function getCollections(collectionName){
    let path = `/stock/market/collection/sector?collectionName=${collectionName}`
    const response = getRequest(path);
    return response;
}




// Company ---------------------------------------------//
// /stock/aapl/company
export function getCompany(symbol) {
    let path = `/stock/${symbol}/company`
    const response = getRequest(path);
    return response;
}



// Crypto ---------------------------------------------//
// /stock/market/crypto


// Delayed Quote ---------------------------------------------//
// /stock/aapl/delayed-quote
export function getDailyQuote(symbol) {
    let path = `/stock/${symbol}/delayed-quote`
    const response = getRequest(path);
    return response;
}


// Dividends ---------------------------------------------//
// /stock/aapl/dividends/5y
// /stock/aapl/dividends/2y
// /stock/aapl/dividends/1y
// /stock/aapl/dividends/ytd
// /stock/aapl/dividends/6m
// /stock/aapl/dividends/3m
// /stock/aapl/dividends/1m
export function getDividends(symbol, range) {
    let path = `/stock/${symbol}/dividends/${range}`
    const response = getRequest(path);
    return response;
}




// Earnings ---------------------------------------------//
// /stock/aapl/earnings
export function getEarnings(symbol) {
    let path = `/stock/${symbol}/earnings`
    const response = getRequest(path);
    return response;
}




// Earnings Today ---------------------------------------------//
// /stock/market/today-earnings
export function getEarningsToday(symbol) {
    let path = `/stock/${symbol}/today-earnings`
    const response = getRequest(path);
    return response;
}


// Effective Spread ---------------------------------------------//
// /stock/aapl/effective-spread
export function getEffectiveSpread(symbol) {
    let path = `/stock/${symbol}/effective-spread`
    const response = getRequest(path);
    return response;
}


// Financials ---------------------------------------------//
// /stock/aapl/financials
// /stock/aapl/financials?period=annual
// /stock/aapl/financials?period=quarter
export function getFinancials(symbol, period) {
    let path = `/stock/${symbol}/financials`
    if (period) { path = `/stock/${symbol}/financials?${period}` }
    const response = getRequest(path);
    return response;
}



// IPO Calendar ---------------------------------------------//
// /stock/market/upcoming-ipos
// /stock/market/today-ipos
export function getUpComingIPOs() {
    let path = `/stock/market/upcoming-ipos`
    const response = getRequest(path);
    return response;
}
export function getTodayIPOs() {
    let path = `/stock/market/today-ipos`
    const response = getRequest(path);
    return response;
}



// IEX Regulation SHO Threshold Securities List ---------------------------------------------//
// /stock/market/threshold-securities
// /stock/market/threshold-securities/20171210
// /stock/market/threshold-securities/sample




// IEX Short Interest List ---------------------------------------------//
// /stock/ziext/short-interest
// /stock/market/short-interest/20171210
// /stock/market/short-interest/sample
// export function getShortInterest(symbol) {
//     let path = `/stock/${symbol}/short-interest`
//     const response = getRequest(path);
//     return response;
// }


// Key Stats ---------------------------------------------//
// /stock/aapl/stats
export function getStats(symbol) {
    let path = `/stock/${symbol}/stats`
    const response = getRequest(path);
    return response;
}



// Largest Trades ---------------------------------------------//
// /stock/aapl/largest-trades
export function getLargestTrades(symbol) {
    let path = `/stock/${symbol}/largest-trades`
    const response = getRequest(path);
    return response;
}



// List ---------------------------------------------//
// Returns an array of quotes for the top 10 symbols in a specified list.
// /stock/market/list/mostactive
// /stock/market/list/gainers
// /stock/market/list/losers
// /stock/market/list/iexvolume
// /stock/market/list/iexpercent
// /stock/market/list/infocus
export function getList(type) {
    let path = `/stock/market/list/${type}`
    const response = getRequest(path);
    return response;
}


// Logo ---------------------------------------------//
// /stock/aapl/logo
export function getLogo(symbol) {
    let path = `/stock/${symbol}/logo`
    const response = getRequest(path);
    return response;
}




// News ---------------------------------------------//
// Number between 1 and 50. Default is 10
// /stock/aapl/news
// /stock/aapl/news/last/1
// /stock/market/news/last/5
export function getStockNews(symbol, count) {
    let path = `/stock/${symbol}/news`
    if (count) { path = `/stock/${symbol}/news/last/${count}` }
    const response = getRequest(path);
    return response;
}
export function getMarketNews(count) {
    let path = `/stock/market/news`
    if (count) { path = `/stock/market/news/last/${count}` }
    const response = getRequest(path);
    return response;
}



// OHLC ---------------------------------------------//
// Returns the official open and close for a give symbol.
// /stock/aapl/ohlc
// /stock/market/ohlc
export function getOpenClose(symbol) {
    let path = `/stock/market/ohlc`
    if (symbol) { path = `/stock/${symbol}/ohlc` }
    const response = getRequest(path);
    return response;
}





// Peers ---------------------------------------------//
// List of similar stock symbols
// /stock/aapl/peers
export function getPeers(symbol) {
    let path = `/stock/${symbol}/peers`
    const response = getRequest(path);
    return response;
}


// Previous ---------------------------------------------//
// /stock/aapl/previous
// /stock/market/previous
export function getPrevious(symbol) {
    let path = `/stock/market/previous`
    if (symbol) { path = `/stock/${symbol}/previous` }
    const response = getRequest(path);
    return response;
}


// Price ---------------------------------------------//
// /stock/aapl/price
export function getPrice(symbol) {
    let path = `/stock/${symbol}/price`
    const response = getRequest(path);
    return response;
}



// Quote ---------------------------------------------//
// /stock/aapl/quote
export function getQuote(symbol) {
    let path = `/stock/${symbol}/quote`
    const response = getRequest(path);
    return response;
}


// Relevant ---------------------------------------------//



// Sector Performance ---------------------------------------------//
// This returns an array of each sector and performance for the current trading day.
// /stock/market/sector-performance
export function getSectorPerformance() {
    let path = `/stock/market/sector-performance`
    const response = getRequest(path);
    return response;
}


// Splits ---------------------------------------------//
// /stock/aapl/splits/5y
// /stock/aapl/splits/2y
// /stock/aapl/splits/1y
// /stock/aapl/splits/ytd
// /stock/aapl/splits/6m
// /stock/aapl/splits/3m
// /stock/aapl/splits/1m
export function getSplits(symbol, range) {
    let path = `/stock/${symbol}/splits/${range}`
    const response = getRequest(path);
    return response;
}



// Volume by Venue ---------------------------------------------//
// This returns 15 minute delayed and 30 day average consolidated volume percentage of a stock, by market.
// /stock/aapl/volume-by-venue
export function getVolumeByVenue(symbol) {
    let path = `/stock/${symbol}/volume-by-venue`
    const response = getRequest(path);
    return response;
}



// TOPS ---------------------------------------------//
//TODO: TOPS provides IEX’s aggregated best quoted bid and offer position in near real time for all securities on 
//      IEX’s displayed limit order book. TOPS is ideal for developers needing both quote and trade data.
