import browser from 'webextension-polyfill'


let id = 0;
/**
 * This is a function to create the notifications of the extension
 * 
 * @param {string} id- this id will help the notif. to do actions properly, is sent as the first parameter.
 * 
 *   Next to the id they all are parameters of the notification object
 * 
 * @typedef{Object} Notification- The notification that will appear on the screen when the app is installed or if it finds a new chapter
 * 
 * 
    * @property {string} iconUrl - the iconUrl is the icon that will show the notification, preferably use a favicon or an .ico
    * 
    * @property {string} title - The title of the notification, if it has been initialized or if it has been an update, this will tell first
    * 
    * @property {string }message - it tells in depth what does the notification mean.
    * 
    * @property {string}buttonLabel -This one will be what appears on the button to click on the notification.
    * 
    * @property {string}type -The type of the notification, there are more types around, be sure to check the API documentation to inform better.  
 */
const createNotification = ({id, iconUrl, title, message, buttonLabel, type}) => {
    browser.notifications.create(id ,{
        type,
        iconUrl,
        title,
        message,
        buttons: [{title:buttonLabel}]
    },)
}
browser.notifications.onButtonClicked.addListener(function(notificationId,buttonIndex){
    if ((notificationId==="initialize" || notificationId==="change") && buttonIndex === 0) {
        browser.notifications.clear(notificationId)
    }else if (notificationId==="update" && buttonIndex === 0){
        let page = browser.storage.sync.get('website');
        page.then((data) => {
            var site = browser.tabs.create({
                index:0,
                url: data.website,
                active:false,
            })
        })
        browser.notifications.clear("update")
    }
})

/**
 * The message manager. Depending on the messages it will do diverse options.
 * 
 * @typedef{Object} Request-  will tell what to do and what it will show.
 * 
 * 
 * @property{string} message- is the part of the request that tells the extension what to do.
 * 
 * @property{Notification} params - the parameters that come with the request, in this extension, they are notifications
 * 
 * @typedef {Object} sender - these are the properties of  the tab that sends the message. only .tab.id is used in this instance to close the tabs.
 *   
 */
browser.runtime.onMessage.addListener((request,sender) =>{
    switch(request.message){
        case 'createNotification':
            createNotification(request.params)
            break;
        case 'closeTab':
            browser.tabs.remove(sender.tab.id)
            break;
        case 'updateNotification':
            createNotification(request.params)
            break;
        default:
            console.error('Request not handled', request)
    }
})


browser.runtime.onInstalled.addListener(function(){
    browser.storage.sync.set({lastChapter:""})
    browser.storage.sync.set( {website:"https://mangaowl.net/single/150/boku-no-hero-academia"})
})

browser.tabs.onCreated.addListener(function(tab){
    id = tab.id;
    return id;
})

let checker = browser.alarms.create("Hourly checker", {
    when: Date.now()+600,
    periodInMinutes: 60
})

browser.alarms.onAlarm.addListener(function(){
    let page = browser.storage.sync.get('website');
    page.then((data) => {
        var site = browser.tabs.create({
            index:0,
            url: data.website,
            active:false,
        })
        site.then(()=>{   
            browser.tabs.executeScript(id, {
                file:'content.js'
            })
        })
    })
});



