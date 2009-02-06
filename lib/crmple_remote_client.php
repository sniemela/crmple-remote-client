<?php
/**
 * Copyright (c) 2009 Simo Niemelä.
 * 
 * Handles remote ajax requests and responses.
 */
 
 function getUrl($url) {
   $ch = curl_init();
   $timeout = 5;
   curl_setopt($ch, CURLOPT_URL, $url);
   curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
   curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, $timeout);
   
   // Curl exec, no spaces
   $results = curl_exec($ch);
   curl_close($ch);
   return $results;
 }
 
 function sendPostRequest($url, $post = array()) {
   $ch = curl_init();
   $timeout = 7;
   $params = $post['data'];
   if ($_GET['type'] == 'json') {
     $params = json_encode($params);
   }
   
   curl_setopt($ch, CURLOPT_URL, $url);
   curl_setopt($ch, CURLOPT_POST, 1);
   curl_setopt($ch, CURLOPT_POSTFIELDS, $params);
   
   $results = curl_exec($ch);
   curl_close($ch);
   return $results;
 }
 
 function run() {
   switch ($_SERVER['REQUEST_METHOD']) {
     case 'GET': 
     print getUrl($_GET['url']); break;
     
     case 'POST':
     print sendPostRequest($_GET['url'], $_POST); break;
     
     default:
   }
 }
 
 /* Run it */
 run();
?>