exports.parseNumbers = function parseNumbers(str, defaultStr){
    let nums = defaultStr;

    if (str.split(',').every(x => !isNaN(parseFloat(x)))){
      nums = str;
    }

    return nums.split(',').map(x => parseFloat(x));
};