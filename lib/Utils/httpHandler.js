const config=require('./configure')
const port = config.default_options.port
const https = require("https");
const { Console } = require('console');
const GameballException=require('../../exceptions/GameballExceptions').GameballException


/**
 * 
 * _createRequest makes a request to Gameball API. Executes Https requests.
 *
 * @param {Object} requestParams
 * @param {string} apikey
 * @param {string} optionalHeaders //adds optional header(s)
 * @param {NodeCallback} callback
 */
function _createRequest(requestParams, apikey, optionalHeaders, callback) {

    const postData = JSON.stringify(requestParams.data)
    var headers = {
      'Content-Type': 'application/json',
      APIKey: apikey
    }

    if(optionalHeaders!=null){
      if(optionalHeaders.lang!=null){
        headers['lang']=optionalHeaders.lang
      }
      
    }
    var options = {
      host: config.default_options.host,
      port: port,
      path: config.default_options.path+requestParams.path,
      method: requestParams.method,
      headers:headers
    };
    //Initializing the https request
    const req = https.request(options, function (res) {
      var body = [];               
      res.setEncoding("utf-8");
      res.on("data", (data) => {
        body.push(data);
      });

      res.on("end", function () {
        var payload;
        var responseText = body.join(" ");
        var parsedResponseBody = ''
        if(body.length!==0){
        parsedResponseBody=JSON.parse(body[0])
        }
        if(res.statusCode!=200){
          throw new GameballException(parsedResponseBody.message, parsedResponseBody.code)
        }
        //Parsing the returned response from requests with return values.
        if(responseText.length>0){
        try {
          payload = JSON.parse(responseText);
        } catch (err) { 
          throw new GameballException(err.message)
        }
        console.log(payload)
      }
      });
    }).on("error", function (err) { 
      throw new GameballException(err.message)
    });
    
    //Setting a timeout period
    /* req.setTimeout(5000, function () {
      console.log("Request Aborted");
      req.abort();
    }); */
    
    //Writing the data, specific for requests with data to be written (POST or PUT requests)
    if (postData) {
    var data = postData;
    if (typeof data == "object") {
        data = JSON.stringify(data);
      }
      if(data!=null){
      req.write(data);
      }
    }
      req.end();
  
  }

  module.exports={
      _createRequest:_createRequest
  }