import '../styles/common.scss'
import '../styles/main.scss'
import './main'

window.addEventListener("DOMContentLoaded", () => {
    // initialize after page loaded
    const preload_videos = document.querySelectorAll('video[auto_play]')
    preload_videos.forEach((video, idx) => {
        video.controls = false
        setTimeout(() => {
            video.play()
            video.loop = true
        }, 100)
    })
})

window.addEventListener("onbeforeunload", () => {
    // initialize when take away from the page
    
})