<?php
if (isset($_REQUEST['cmd']) && $_REQUEST['cmd'] == 'query') {
    $index = $_REQUEST['index'];
    $size = $_REQUEST['size'];
    $start = ($index - 1) * $size;

    $fileName = "./data.json";
    $jsonString = file_get_contents($fileName);
    $jsonString = json_decode($jsonString, true);

    $return = array(
        'total' => $jsonString['total'],
        'items' => array()
    );

    for ($i = $start; $i < ($start + $size); $i++) {
        if (isset($jsonString['items'][$i])) {
            array_push($return['items'], $jsonString['items'][$i]);
        }
    }

    echo json_encode($return);
}