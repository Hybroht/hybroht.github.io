document.addEventListener("DOMContentLoaded", function() {
  var userLang = navigator.language || navigator.userLanguage;
  if(userLang.toLowerCase().startsWith('pt')) { // Redirect to the Portuguese language folder
    window.location.href = "/lang/br/"; 
  }
});