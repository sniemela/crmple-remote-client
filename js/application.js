/*
* Copyright (C) 2009 Simo Niemelä
*/

/* Crmple application url */
var url = "";

/* Example. role[name]=manager&role[comments]=commentcomment */
var parameters = "";

var handlerUrl = "lib/crmple_remote_client.php?url="+url+"&type="+string;

$(function(){
  $.post(handlerUrl, { data: parameters }, function(data){
    alert(data);
  });
});