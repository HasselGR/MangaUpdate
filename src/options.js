import browser from 'webextension-polyfill'
import initSimpleSettings from './lib/simple-settings'


var button = document.getElementById("enter")
var input = document.getElementById("userinput")




button.addEventListener("click", function(){
  if ( input.value.length && input.value.includes("https://mangaowl.net")){
    browser.storage.sync.set({website: input.value})
    browser.runtime.sendMessage({
      message: 'createNotification',
      params: {
          id: "change",
          title: 'MangaUpdate',
          message: 'The manga has been succesfully changed',
          iconUrl: 'https://icon-icons.com/icons2/2479/PNG/32/alien_icon_149778.png',
          type: 'basic',
          buttonLabel: 'Ok'
      }
  })
    window.close();
  }
})