import browser from 'webextension-polyfill'

        let firstTime = false


        browser.storage.sync.get('lastChapter').then(({lastChapter})=>{
            if (lastChapter === ''){
                firstTime = true;
            }
        })

        const executed = setInterval(() =>{
            const lastEpisode = document.querySelector('.chapter-title')
            if (lastEpisode) {
                clearInterval(executed)
                let chapter = lastEpisode.innerHTML

                let data = browser.storage.sync.get('lastChapter')
                data.then((last)=>{
                    if(chapter != last.lastChapter && firstTime === true){
                        browser.storage.sync.set({lastChapter:chapter})
                        browser.runtime.sendMessage({
                            message: 'createNotification',
                            params: {
                                id: "initialize",
                                title: 'MangaUpdate',
                                message: 'Extension fully initialized, enjoy!',
                                iconUrl: 'https://icon-icons.com/icons2/2479/PNG/32/alien_icon_149778.png',
                                type: 'basic',
                                buttonLabel: 'Ok'
                            }
                        })
                    } else if (chapter != last.lastChapter && firstTime === false){
                        browser.storage.sync.set({lastChapter: chapter})
                        browser.runtime.sendMessage( {
                            message:'updateNotification',
                            params: {
                                id: "update",
                                title: 'MangaUpdate',
                                message: 'A new chapter of the manga has Arrived! Go check it out!',
                                iconUrl: 'https://icon-icons.com/icons2/2479/PNG/32/alien_icon_149778.png',
                                type:'basic',
                                buttonLabel: 'Check it!'
                            }
                        })
                    }
                    browser.runtime.sendMessage({message:'closeTab'})
                }, 1000)
            }
        })