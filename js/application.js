/*
* Copyright (C) 2009 Simo Niemelä
*/

/* Crmple application url. Example: domain.com/people.xml */
var url = "http://localhost:3000/roles.xml";

var handlerUrl = "lib/crmple_remote_client.php?url="+url+"&type=xml";
var statusWrapper = '#status';

$(function(){
  $('#crmple').submit(function(){
    var parameters = buildParams('#crmple input, #crmple textarea', 'role');
    
    $.post(handlerUrl, {data: parameters}, function(data){
      handleResponse(data);
    });
  });
  
  function handleResponse(data) {
    if (errors(data)) {
      getErrors(data);
    } else {
      $(statusWrapper).html('<p id="success">Success</p>');
    }
  }
  
  function errors(data) {
    errs = $(data).find('error').length;
    return (errs > 0);
  }
  
  function getErrors(data) {
    $(statusWrapper).html('<ul>');
    $(data).find('error').each(function(){
      $(statusWrapper + ' ul').append('<li>' + $(this).html() + '</li>');
    });
    $(statusWrapper).append('</ul>');
  }
  
  function buildParams(inputs, model) {
    var $inputs = $(inputs);
    var parts = [];
    $inputs.each(function(i, el) {
      if ($(el).attr('type') != 'submit') {
        var param = model + '[' + el.name + ']=' + $(el).val();
        parts.push(param);
      }
    });
    return parts.join('&');
  }
});