import { Component, OnDestroy, OnInit } from '@angular/core'
import { YoutubeService } from './youtube.service'
import { AvControlService } from '../../../../audio-component/av-control.service'
import { Subscription } from 'rxjs'

@Component({
    selector: 'app-youtube',
    templateUrl: './youtube.component.html',
    styleUrls: [ './youtube.component.css' ],
})
export class YoutubeComponent implements OnInit, OnDestroy {
    player: YT.Player
    pause: boolean
    officialVideo: boolean

    subscriptions: Subscription[] = []

    constructor(
        public youtubeService: YoutubeService,
        private avControlService: AvControlService,
    ) {
    }

    ngOnInit(): void {
        // This code loads the IFrame Player API code asynchronously, according to the instructions at
        // https://developers.google.com/youtube/iframe_api_reference#Getting_Started
        const tag = document.createElement('script')

        tag.src = 'https://www.youtube.com/iframe_api'
        document.body.appendChild(tag)

        this.subscriptions.push(
            this.avControlService.paused$.subscribe(paused => {
                // console.log(`pause`)
                this.pause = paused
                this.toggleVideo()
            }),
        )
        this.subscriptions.push(
            this.youtubeService.officialVideo$.subscribe(official => {
                // console.log(`official`)
                this.officialVideo = official
                this.toggleVideo()
            }),
        )

        this.subscriptions.push(
            this.avControlService.avTime$.subscribe(time => {
                if (this.player && this.officialVideo)
                    this.player.seekTo(time, true)
            }),
        )
        // setTimeout(() => console.log(`timeout`, this.player), 5000)
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(subscription => subscription.unsubscribe())
    }

    toggleVideo() {
        if (this.player) {
            if (this.pause === undefined) this.pause = true
            // console.log('Youtube', this.pause, this.officialVideo)

            if (this.pause && this.officialVideo) this.player.pauseVideo()
            else this.player.playVideo()
        }
    }

    start(event: YT.PlayerEvent) {
        this.player = event.target
        // console.log(`player ready`)
        this.player.mute()
        this.toggleVideo()
    }

    width() {
        return window.innerWidth - 150
    }

    height() {
        return (window.innerWidth - 150) * (946 / 1680)
    }

    ready(ytState: YT.OnStateChangeEvent) {
        // console.log(`ready ready`)
        if (ytState.data === -1) {
            ytState.target.playVideo()
        } else if (ytState.data === 0) {
            this.youtubeService.randomVideoId()
        }
    }
}
