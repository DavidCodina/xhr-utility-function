/* =============================================================================
                             request()
============================================================================= */
//Works with the following data formats: JSON JSON, FormData and querystrings.
//Works with GET, POST, PUT, PATCH, and DELETE requests.


function request(config){
  /* ========================
     Return early if...
  ======================== */


  if (config === null || typeof config === 'undefined'){
    return console.error("A config object must be passed to request().");
  }

  else if (!config.hasOwnProperty('type')){
    return console.error("A config object must be given a 'type' property.");
  }

  else if (!config.hasOwnProperty('url')){
    return console.error("A config object must be given a 'url' property.");
  }

  else if (
    (config.type.toUpperCase() === 'POST' || config.type.toUpperCase() === 'PUT' || config.type.toUpperCase() === 'PATCH') &&
    (!config.hasOwnProperty('data')       || config.data === null                || config.data === undefined || config.data === '')   ){
    return console.error("A 'data' property and value (!null, !undefined, nor '') must be included with POST, PUT, and PATCH requests.");
  }

  else if (
    (config.type.toUpperCase() === 'DELETE' && config.hasOwnProperty('data')) &&
    (config.data === null || config.data === undefined || config.data === '')){
    return console.error("When including a 'data' property with a DELETE request, the value must not be null, undefined, or ''.");
  }


  /* ========================
      Set async and type
  ======================== */


  if (!config.hasOwnProperty('async')){ config.async = true; }
  config.type = config.type.toUpperCase();


  /* ========================
  xhr, xhr.open, & xhr.setRequestHeader
  ======================== */


  var xhr = new XMLHttpRequest();
  xhr.open(config.type, config.url, config.async);


  if (config.hasOwnProperty('data')){
    if (typeof config.data === 'object' && !(config.data instanceof FormData)){
      xhr.setRequestHeader("Content-type", "application/json");
      config.data = JSON.stringify(config.data);
    } else if (typeof config.data === 'string'){
      xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    }
  }


  /* ========================
          timeout
  ======================== */


  if (config.hasOwnProperty('timeout')){
    if (config.async === true){ xhr.timeout = config.timeout; }
  }


  /* ========================
           onload
  ======================== */


  xhr.onload = function(){
    if (this.status !== 0){
      if (config.hasOwnProperty('successCallback')){ config.successCallback(xhr); }
      else { console.log("onload was triggered, but no successCallback was defined in the config object.")}
    }
  };


  /* ========================
          onerror
  ======================== */


  xhr.onerror = function(){
    if (config.hasOwnProperty('errorCallback')){ config.errorCallback(xhr); }
    else { console.log("onerror was triggered, but no errorCallback method was defined in the config object.")}
  };


  /* ========================
          ontimeout
  ======================== */


  xhr.ontimeout = function(){
    if (config.hasOwnProperty('timeoutCallback')){ config.timeoutCallback(xhr); }
    else { console.log("ontimeout was triggered, but no timeoutCallback was defined in the config object.")}
  };


  /* ========================
            send
  ======================== */


  if (config.type === 'GET'){
    xhr.send();
  } else if (config.type === 'POST' || config.type === 'PUT' || config.type === 'PATCH'){
    xhr.send(config.data);
  } else if (config.type ==="DELETE"){
    if (config.hasOwnProperty('data')){
      xhr.send(config.data);
    } else {
      xhr.send();
    }
  }
}
