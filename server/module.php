<?php
if (isset($_REQUEST['cmd']) && $_REQUEST['cmd'] == 'query') {
    $start = $_REQUEST['start'];
    $limit = $_REQUEST['limit'];

    $filename = "./data.json";
    $json_string = file_get_contents($filename);
    $json_string = json_decode($json_string, true);

    $return = array(
        'num' => $json_string['num'],
        'items' => array()
    );

    for ($i = $start; $i < ($start + $limit); $i++) {
        if (isset($json_string['items'][$i])) {
            array_push($return['items'], $json_string['items'][$i]);
        }
    }

    echo json_encode($return);
}