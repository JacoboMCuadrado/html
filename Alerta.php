<?php
header('content-type: application-json');
$numero = array();
for ($i=1; $i < 82; $i++) { 
    $numero[$i] = $_POST[$i];
    $message = $numero[$i];
    echo json_encode(array('message'=>$message));
}
