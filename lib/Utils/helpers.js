var sha1 = require('sha1');
const configuration=require('./configure')
const GameballException=require('../../exceptions/GameballExceptions').GameballException
var isArray = Array.isArray; //to check whether a parameter is of type array

/**
 * 
 * Sha1 Hashing Function
 *
 * @param {string} playerUniqueId //Player's unique id
 * @param {string} transactionTime //UTC transaction datetime
 * @param {string} transactionKey //Transaction key required for generated the hash
 *
 */

function hash(playerUniqueId,transactionTime,amount, transactionKey){
  var yyMMddHHmmss=""

  //adding zero before single digit numbers
  function pad2(n) {

    return n < 10 ? '0' + n : n;
  }
  if(amount==undefined){
    amount="";
  }
  if(transactionTime!==""){
  const transTime=""+transactionTime
  var date = new Date(transactionTime);
      yyMMddHHmmss =
      date
      .getFullYear()
      .toString()
      .match(/\d{2}$/) +
    pad2(date.getMonth() + 1) +
    day(transTime) +
    hours(transTime) +
    pad2(date.getMinutes()) +
    pad2(date.getSeconds());
    }
    return sha1(`${playerUniqueId}:${yyMMddHHmmss}:${amount}:${transactionKey}`)
  }


//Returns the hour from the datetime.
const hours = function(date){
  return date.substring(11, 13);
}

//Returns the day from the datetime.
const day = function(date){
  return date.substring(8,10);
}

//Used to bind all api functions to a single class 'gameball.js'
const classBinder = function(functionsObject, thisClass) {
  for (let [ functionKey, functionValue ] of Object.entries(functionsObject)) {
      thisClass[functionKey] = functionValue.bind(thisClass);
  }
}

/**
 * Recursively copies given object into a new object. Helper method for merge
 * @param  {Object} value
 * @return {Object}
 */
function replicate(value) {
  if (value === null || typeof value !== "object") {
      return value;
  }

  if (isArray(value)) {
      var arr = value.slice();
      for (var i = 0; i < value.length; i++) {
          arr[i] = replicate(arr[i]);
      }
      return arr;
  }
  else {
      var obj = {};
      for (var k in value) {
          obj[k] = replicate(value[k]);
      }
      return obj;
  }
}

/**
 * Joins two Objects recursively, setting property of obj1 to those of obj2
 * and creating property as necessary. 
 *
 * Helper method for configure
 * 
 * @param  {Object} obj1 
 * @param  {Object} obj2 
 * @return {Object}     
 */
const join = function join(obj1, obj2, appendOnly) {

  //Handle invalid arguments
  if (obj1 === null || typeof obj1 !== "object") {
      throw new GameballException("join() - first parameter has to be an object, not " + typeof obj1 + ".");
  }

  if (obj2 === null || typeof obj2 !== "object") {
      throw new GameballException("join() - first parameter has to be an object, not " + typeof obj2 + ".");
  }

  if (isArray(obj1) || isArray(obj2)) {
      throw new GameballException("join() - Parameters must be of type object, not arrays.");
  }


  for (var k in obj2) {
      //Obtains transactionKey and apiKey from object stored in the given input obj2
      var obj2Val = obj2[k];
      obj1[k] = replicate(obj2Val);
  }
  return obj1;
};


/**configuration
 * Sets up configurations globally such as apiKey and transactionKey,
 * by merging configurations provided by user otherwise uses default settings
 * @param  {Object} config_params Configuration parameters passed as object
 * @return {undefined}
 */
const setUp = function setUp(config_params) {
  if (config_params !== undefined && typeof config_params === 'object') {
      configuration.default_options = join(configuration.default_options, config_params);
  }
};


module.exports={
      hash: hash,
      classBinder: classBinder,
      setUp: setUp
    }
