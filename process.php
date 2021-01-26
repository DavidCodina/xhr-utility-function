<?php
$request_headers = getallheaders();


/* =============================================================================

============================================================================= */


function get_content_type(){
  $content_type = $_SERVER["CONTENT_TYPE"] ?? '';
  if ($content_type){ $content_type = explode(';', $content_type)[0]; }
  return $content_type;
}

$content_type = get_content_type();


/* =============================================================================

============================================================================= */


function get_value_from_multipart_form_data($key){
  $fileSource = 'php://input';
  $lines      = file($fileSource);
  foreach ($lines as $i => $line){
    //You don't technically need to use the entire line. For example,
    //this would also work: $search = 'name="'. $key .'"';
    $search = 'Content-Disposition: form-data; name="'. $key .'"';
    if (strpos($line, $search) !== false){ return trim($lines[$i + 2]); }
  }
  return '';
}


/* =============================================================================

============================================================================= */


function parse_multipart_form_data(){
  $fileSource = 'php://input';
  $lines      = file($fileSource);
  $search     = 'name=';
  $results    = [];

  foreach ($lines as $i => $line){
    $position = strpos($line, $search);
    if ($position !== false){
      $key   = substr($line, $position + 6);
      $key   = explode('"', $key)[0];
      $value = trim($lines[$i + 2]);
      $results[$key] = $value;
    }
  }
  return $results;
}


/* =============================================================================
                                   GET
============================================================================= */


if ($_SERVER['REQUEST_METHOD'] === 'GET'){
  http_response_code(200);

  $response = array(
    'result'          => 'success',
    'message'         => 'The GET request was received.',
    'data'            => $_GET,
    'request_headers' => $request_headers
  );

  $response = json_encode($response);
  echo $response;
}


/* =============================================================================
                                   POST
============================================================================= */


if ($_SERVER['REQUEST_METHOD'] === 'POST'){
  http_response_code(201);


  /* ==========================
              JSON
  ========================== */


  if ($content_type === "application/json"){
    $json = json_decode(file_get_contents("php://input"));

    $response = array(
      'result'          => 'success',
      'message'         => 'The POST request was received with JSON data.',
      'data'            => $json,
      'request_headers' => $request_headers
    );

    $response = json_encode($response);
    echo $response;
  }


  /* ==========================
    FormData or Query String
  ========================== */


  else if ($content_type === "multipart/form-data" || $content_type === "application/x-www-form-urlencoded"){
    $response = array(
      'result'          => 'success',
      'message'         => 'The POST request was received with FormData, or query string data).',
      'data'            => $_POST,
      'request_headers' => $request_headers
    );

    $response = json_encode($response);
    echo $response;
  }
} //if ($_SERVER['REQUEST_METHOD'] === 'POST'){ ... }


/* =============================================================================
                                  PUT
============================================================================= */


if ($_SERVER['REQUEST_METHOD'] === 'PUT'){
  http_response_code(200);


  /* ==========================
              JSON
  ========================== */


  if ($content_type === "application/json"){
    $json = json_decode(file_get_contents("php://input"));

    $response = array(
      'result'          => 'success',
      'message'         => 'The PUT request was received with JSON data.',
      'data'            => $json,
      'request_headers' => $request_headers
    );

    $response = json_encode($response);
    echo $response;
  }


  /* ==========================
           FormData
  ========================== */


  else if ($content_type === "multipart/form-data"){
    $response = array(
      'result'          => 'success',
      'message'         => 'The PUT request was received with FormData.',
      'data'            => parse_multipart_form_data(),
      'request_headers' => $request_headers
    );

    $response = json_encode($response);
    echo $response;
  }


  /* ==========================
        Query String
  ========================== */


  else if ($content_type === "application/x-www-form-urlencoded"){
    parse_str(file_get_contents('php://input'), $_PUT);

    $response = array(
      'result'          => 'success',
      'message'         => 'The PUT request was received with query string data).',
      'data'            => $_PUT,
      'request_headers' => $request_headers
    );

    $response = json_encode($response);
    echo $response;
  }
} //if ($_SERVER['REQUEST_METHOD'] === 'PUT'){ ... }


/* =============================================================================
                                  PATCH
============================================================================= */


if ($_SERVER['REQUEST_METHOD'] === 'PATCH'){
  http_response_code(200);


  /* ==========================
              JSON
  ========================== */


  if ($content_type === "application/json"){
    $json = json_decode(file_get_contents("php://input"));

    $response = array(
      'result'          => 'success',
      'message'         => 'The PATCH request was received with JSON data.',
      'data'            => $json,
      'request_headers' => $request_headers
    );

    $response = json_encode($response);
    echo $response;
  }


  /* ==========================
           FormData
  ========================== */


  else if ($content_type === "multipart/form-data"){
    $response = array(
      'result'          => 'success',
      'message'         => 'The PATCH request was received with FormData.',
      'data'            => parse_multipart_form_data(),
      'request_headers' => $request_headers
    );

    $response = json_encode($response);
    echo $response;
  }


  /* ==========================
        Query String
  ========================== */


  else if ($content_type === "application/x-www-form-urlencoded"){
    parse_str(file_get_contents('php://input'), $_PATCH);

    $response = array(
      'result'          => 'success',
      'message'         => 'The PATCH request was received with query string data.',
      'data'            => $_PATCH,
      'request_headers' => $request_headers
    );

    $response = json_encode($response);
    echo $response;
  }
} //if ($_SERVER['REQUEST_METHOD'] === 'PATCH'){ ... }


/* =============================================================================
                               DELETE
============================================================================= */


if ($_SERVER['REQUEST_METHOD'] === 'DELETE'){
  http_response_code(200); //Note: if you set 204 it WILL NOT SEND data in response.


  /* ==========================
            No Data
  ========================== */


  if ($content_type === ''){
    $response = array(
       'result'          => 'success',
       'message'         => 'The DELETE request was received without data.',
       'data'            => (object) array(),
       'request_headers' => $request_headers,
       'content_type'    => $content_type
    );

    $response = json_encode($response);
    echo $response;
  }


  /* ==========================
              JSON
  ========================== */


  if ($content_type === "application/json"){
    $json = json_decode(file_get_contents("php://input"));


    $response = array(
      'result'       => 'success',
      'message'      => 'The DELETE request was received with JSON data.',
      'data'         => $json
    );

    $response = json_encode($response);
    echo $response;
  }


  /* ==========================
           FormData
  ========================== */


  else if ($content_type === "multipart/form-data"){
    $response = array(
      'result'       => 'success',
      'message'      => 'The DELETE request was received with FormData.',
      'data'         => parse_multipart_form_data()
    );

    $response = json_encode($response);
    echo $response;
  }


  /* ==========================
        Query String
  ========================== */


  else if ($content_type === "application/x-www-form-urlencoded"){
    parse_str(file_get_contents('php://input'), $_DELETE);

    $response = array(
      'result'       => 'success',
      'message'      => 'The DELETE request was received with query string data.',
      'data'         => $_DELETE
    );

    $response = json_encode($response);
    echo $response;
  }
} //if ($_SERVER['REQUEST_METHOD'] === 'DELETE'){ ... }
?>
