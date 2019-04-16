<?php

$request = $_SERVER['REQUEST_URI'];

switch ($request) {
    case '/' :
        require __DIR__ . '/index.html';
        break;
    case '/youtubelib.php?delete':
        $postdata = file_get_contents("php://input");
        if($postdata) {
            $decode = json_decode($postdata);
            $lib = $decode->data->name . ".lib";
            file_put_contents(__DIR__ . '/app/' . $lib, json_encode($decode->data));
        }
        break;
    case 'youtubelib.php?add':
        $postdata2 = file_get_contents("php://input");
        if($postdata2) {
            $decode2 = json_encode($postdata2);
            $lib2 = $decode2->data->name . ".lib";
            file_put_contents(__DIR__ . '/app/' . $lib2, json_encode($decode2->data));
        }
        break;
    default:
        require __DIR__ . '/index.html';
        break;
}