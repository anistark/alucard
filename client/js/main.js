// add scripts

$(document).ready(function(){
  //$("#response-display").hide();
  console.log('Thank You for visiting Alucard!');
  //if(getParameterByName('github_handle')) {
  //  $("#response-display").show();
  //}
});

$("#login-button").click(function(event){
  event.preventDefault();
  $('form').fadeOut(500);
  $('.wrapper').addClass('form-success');
});


//function getUrlVars() {
//  var vars = [],
//      hash;
//  var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
//  for (var i = 0; i < hashes.length; i++) {
//    hash = hashes[i].split('=');
//    //vars.push(hash[0]);
//    vars[hash[0]] = hash[1];
//  }
//  return vars;
//}
//
//function getParameterByName(name) {
//  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
//  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
//      results = regex.exec(location.search);
//  return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
//}