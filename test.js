/* =============================================================================
                               Variables
============================================================================= */
//Note: json is actually a standard object literal (or Array).
//request() will serialize it. Do not JSON.stringify() it beforehand!


const url        = 'process.php';
const json       = { id: 123, first_name: 'Joe', last_name: 'Bazooka', is_cool: true };
const stringData = "id=123&first_name=Joe&last_name=Bazooka&is_cool=true";
const formData   = new FormData();


formData.append('id',         123);
formData.append('first_name', 'Joe');
formData.append('last_name',  'Bazooka');
formData.append('is_cool',     true);


/* =============================================================================
                             request() Usage
============================================================================= */


function handleSuccess(xhr){
  if (xhr.status >= 200 && xhr.status < 300){ //Or < 400
    var data = JSON.parse(xhr.responseText);
    return console.log(data);
  }

  if (xhr.status === 404){
    return console.log("404 (Not Found). The URL provide may be incorrect.");
  }

  //status 500 might occur because of a syntax error in the PHP script.
  //For example using ; instead of ,
  //or maybe a character got left out all together.
  if (xhr.status >= 500){
    return console.log("Server Error.");
  }

  //Handle other status codes...
}


function handleError(xhr){
  console.log("Their was an error with the request.");
}


function handleTimeout(xhr){
  console.log("The request timed out.");
}


/* =============================================================================
                         General Error/Warning Cases
============================================================================= */


//Indicates that a config object must be passed.
//request();


//Sends a console.error message that the type property must be included.
// request({
//   //type:            'GET',
//   url:             'process.php?' + stringData,
//   async:           true,
//   timeout:         1000 * 10,
//   successCallback: handleSuccess,
//   errorCallback:   handleError,
//   timeoutCallback: handleTimeout
// });


//Sends a console.error message that the url property must be included.
// request({
//   type:            'GET',
//   //url:             'process.php?' + stringData,
//   async:           true,
//   timeout:         1000 * 10,
//   successCallback: handleSuccess,
//   errorCallback:   handleError,
//   timeoutCallback: handleTimeout
// });


//Logs that the request timed out.
// request({
//   type:            'GET',
//   url:             'process.php?' + stringData,
//   async:           true,
//   timeout:         2,
//   successCallback: handleSuccess,
//   errorCallback:   handleError,
//   timeoutCallback: handleTimeout
// });


//ontimeout was triggered, but no timeoutCallback was defined in the config object.
// request({
//   type:            'GET',
//   url:             'process.php?' + stringData,
//   async:           true,
//   timeout:         2,
//   successCallback: handleSuccess,
//   errorCallback:   handleError,
//   //timeoutCallback: handleTimeout
// });


// "A 'data' property and value (!null, !undefined, nor '') must be included with POST, PUT, and PATCH requests."
// request({
//   type:            'POST',
//   url:             'process.php',
//   async:           true,
//   //data:          null,
//   timeout:         1000 * 10,
//   successCallback: handleSuccess,
//   errorCallback:   handleError,
//   timeoutCallback: handleTimeout
// });


//Making a bad request (e.g., typo in URL) to the same origin will NOT trigger
//xhr.onerror. Instead, the browser seems intelligent enough to send it's
//own response with a 404. A 404 status will not trigger xhr.onerror() because,
//technically it's not an error; the 404 itself is a valid response.
// request({
//   type:            'POST',
//   url:             'not_found.php',
//   async:           true,
//   data:            json,
//   timeout:         1000 * 10,
//   successCallback: handleSuccess,
//   errorCallback:   handleError,
//   timeoutCallback: handleTimeout
// });


//Making a bad request (e.g., typo in URL) to an external origin WILL trigger
//xhr.onerror.
// request({
//   type:            'POST',
//   url:             'https://jsonplaceholder.typicode.co',
//   async:           true,
//   data:            json,
//   timeout:         1000 * 10,
//   successCallback: handleSuccess,
//   errorCallback:   handleError,
//   timeoutCallback: handleTimeout
// });


//Indicates that there was an error with the request, but no errorCallback was provided
// request({
//   type:            'GET',
//   url:             'https://jsonplaceholder.typicode.co',
//   async:           true,
//   timeout:         1000 * 10,
//   successCallback: handleSuccess,
//   //errorCallback:   handleError,
//   timeoutCallback: handleTimeout
// });


/* =============================================================================
                              GET Tests
============================================================================= */


//Gets data successfully :
// request({
//   type:            'GET',
//   url:             'process.php?' + stringData,
//   async:           true,
//   timeout:         1000 * 10,
//   successCallback: handleSuccess,
//   errorCallback:   handleError,
//   timeoutCallback: handleTimeout
// });


//Gets data successfully, but indicates that no successCallback was provided
// request({
//   type:            'GET',
//   url:             'process.php?' + stringData,
//   async:           true,
//   timeout:         1000 * 10,
//   //successCallback: handleSuccess,
//   errorCallback:   handleError,
//   timeoutCallback: handleTimeout
// });


/* =============================================================================
                              POST Tests
============================================================================= */


//"The POST request was received with JSON data."
// request({
//   type:            'POST',
//   url:             'process.php',
//   async:           true,
//   data:            json,
//   timeout:         1000 * 10,
//   successCallback: handleSuccess,
//   errorCallback:   handleError,
//   timeoutCallback: handleTimeout
// });


//"The POST request was received with FormData, or query string data)."
// request({
//   type:            'POST',
//   url:             'process.php',
//   async:           true,
//   data:            formData,
//   timeout:         1000 * 10,
//   successCallback: handleSuccess,
//   errorCallback:   handleError,
//   timeoutCallback: handleTimeout
// });


//"The POST request was received with FormData, or query string data)."
// request({
//   type:            'POST',
//   url:             'process.php',
//   async:           true,
//   data:            stringData,
//   timeout:         1000 * 10,
//   successCallback: handleSuccess,
//   errorCallback:   handleError,
//   timeoutCallback: handleTimeout
// });


//"onload was triggered, but no successCallback was defined in the config object."
// request({
//   type:            'POST',
//   url:             'process.php',
//   async:           true,
//   data:            json,
//   timeout:         1000 * 10,
//   //successCallback: handleSuccess,
//   errorCallback:   handleError,
//   timeoutCallback: handleTimeout
// });


/* =============================================================================
                              PUT Tests
============================================================================= */


//"The PUT request was received with JSON data."
// request({
//   type:            'PUT',
//   url:             'process.php',
//   async:           true,
//   data:            json,
//   timeout:         1000 * 10,
//   successCallback: handleSuccess,
//   errorCallback:   handleError,
//   timeoutCallback: handleTimeout
// });


//"The PUT request was received with FormData."
// request({
//   type:            'PUT',
//   url:             'process.php',
//   async:           true,
//   data:            formData,
//   timeout:         1000 * 10,
//   successCallback: handleSuccess,
//   errorCallback:   handleError,
//   timeoutCallback: handleTimeout
// });


//"The PUT request was received with query string data)."
// request({
//   type:            'PUT',
//   url:             'process.php',
//   async:           true,
//   data:            stringData,
//   timeout:         1000 * 10,
//   successCallback: handleSuccess,
//   errorCallback:   handleError,
//   timeoutCallback: handleTimeout
// });


// "A 'data' property and value (!null, !undefined, nor '') must be included with POST, PUT, and PATCH requests."
// request({
//   type:            'PUT',
//   url:             'process.php',
//   async:           true,
//   data:            undefined,
//   timeout:         1000 * 10,
//   successCallback: handleSuccess,
//   errorCallback:   handleError,
//   timeoutCallback: handleTimeout
// });


// "The request timed out."
// request({
//   type:            'PUT',
//   url:             'process.php',
//   async:           true,
//   data:            json,
//   timeout:         2,
//   successCallback: handleSuccess,
//   errorCallback:   handleError,
//   timeoutCallback: handleTimeout
// });


/* =============================================================================
                              PATCH Tests
============================================================================= */


// "The PATCH request was received with JSON data."
// request({
//   type:            'PATCH',
//   url:             'process.php',
//   async:           true,
//   data:            json,
//   timeout:         1000 * 10,
//   successCallback: handleSuccess,
//   errorCallback:   handleError,
//   timeoutCallback: handleTimeout
// });


// "The PATCH request was received with FormData."
// request({
//   type:            'PATCH',
//   url:             'process.php',
//   async:           true,
//   data:            formData,
//   timeout:         1000 * 10,
//   successCallback: handleSuccess,
//   errorCallback:   handleError,
//   timeoutCallback: handleTimeout
// });


// "The PATCH request was received with query string data."
// request({
//   type:            'PATCH',
//   url:             'process.php',
//   async:           true,
//   data:            stringData,
//   timeout:         1000 * 10,
//   successCallback: handleSuccess,
//   errorCallback:   handleError,
//   timeoutCallback: handleTimeout
// });


// "A 'data' property and value (!null, !undefined, nor '') must be included with POST, PUT, and PATCH requests."
// request({
//   type:            'PUT',
//   url:             'process.php',
//   async:           true,
//   data:            '',
//   timeout:         1000 * 10,
//   successCallback: handleSuccess,
//   errorCallback:   handleError,
//   timeoutCallback: handleTimeout
// });


// ontimeout was triggered, but no timeoutCallback was defined in the config object.
// request({
//   type:            'PATCH',
//   url:             'process.php',
//   async:           true,
//   data:            json,
//   timeout:         2,
//   successCallback: handleSuccess,
//   errorCallback:   handleError,
//   //timeoutCallback: handleTimeout
// });


/* =============================================================================
                              DELETE Tests
============================================================================= */

// "The DELETE request was received without data."
// request({
//   type:            'DELETE',
//   url:             'process.php',
//   async:           true,
//   timeout:         1000 * 10,
//   successCallback: handleSuccess,
//   errorCallback:   handleError,
//   timeoutCallback: handleTimeout
// });


// "The DELETE request was received with JSON data."
// request({
//   type:            'DELETE',
//   url:             'process.php',
//   async:           true,
//   data:            json,
//   timeout:         1000 * 10,
//   successCallback: handleSuccess,
//   errorCallback:   handleError,
//   timeoutCallback: handleTimeout
// });


// "The DELETE request was received with FormData."
// request({
//   type:            'DELETE',
//   url:             'process.php',
//   async:           true,
//   data:            formData,
//   timeout:         1000 * 10,
//   successCallback: handleSuccess,
//   errorCallback:   handleError,
//   timeoutCallback: handleTimeout
// });


// "The DELETE request was received with query string data."
// request({
//   type:            'DELETE',
//   url:             'process.php',
//   async:           true,
//   data:            stringData,
//   timeout:         1000 * 10,
//   successCallback: handleSuccess,
//   errorCallback:   handleError,
//   timeoutCallback: handleTimeout
// });


// "When including a 'data' property with a DELETE request, the value must not be null, undefined, or ''."
// request({
//   type:            'DELETE',
//   url:             'process.php',
//   async:           true,
//   data:            undefined,
//   timeout:         1000 * 10,
//   successCallback: handleSuccess,
//   errorCallback:   handleError,
//   timeoutCallback: handleTimeout
// });


// "ontimeout was triggered, but no timeoutCallback was defined in the config object.""
// request({
//   type:            'DELETE',
//   url:             'process.php',
//   async:           true,
//   data:            json,
//   timeout:         2,
//   successCallback: handleSuccess,
//   errorCallback:   handleError,
//   //timeoutCallback: handleTimeout
// });
