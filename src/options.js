import browser from 'webextension-polyfill'
import initSimpleSettings from './lib/simple-settings'


var button = document.getElementById("enter")
var input = document.getElementById("userinput")



console.log(input);

button.addEventListener("click", function(){
  if ( input.value.length && input.value.includes("https://mangaowl.net"))
    browser.storage.sync.set({website: input.value})
})