import _ from 'lodash'

export const abbrFormatter = (num,dec) => {
    let decimal = dec || 1;
    if(!_.isNumber(num)){
        return num
    }
    else if (num > 999999999){
        return (num/1000000000).toFixed(decimal) + 'b'
    }
    else if (num > 999999){
        return (num/1000000).toFixed(decimal) + 'm'
    }
    else if (num > 999){
        return (num/1000).toFixed(decimal) + 'k'
    }
    return num
}

export const setDecimal = (num,dec) => {
    let decimal = dec || 2;
    return !_.isNumber(num) ? num : Number(num).toFixed(decimal)
}

export const setPercentFromDecimal = (num,dec) => {
    let decimal = dec || 2
    return (Number(num) * 100).toFixed(decimal) || num
}