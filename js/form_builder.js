/*
 * Copyright (c) 2009 Simo Niemelä
 */
 
/*
 * Builds a form from xml
 *
 * Example:
 *  // To append the result in to an element
 *  $('#form_wrapper').buildForm('http://www.domain.com/my/action.xml');
 */
jQuery.fn.buildForm = function(url, options) {
 settings = jQuery.extend({
   handler: "lib/crmple_remote_client.php"
 }, options);
 return this.each(function(){
   var $form = $(this);
   var requestHandler = settings['handler'] + "?url=" + url;
   $.get(requestHandler, function(data){
     $form.html(data);
     $form.children('form').each(function(i, el){
       $(el).replaceWith($(el).html());
     });
     $form.attr('onSubmit', 'return false').attr('action', '').attr('method', 'post');
     // Remove hidden fields without an id
     $form.find("input[type=hidden]:not('[id]')").each(function(i, el){
       $(el).remove();
     });
   });
 });
}