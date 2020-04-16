import {
    Component,
    ElementRef,
    Input,
    OnDestroy,
    OnInit,
    ViewChild,
} from '@angular/core'
import { AvControlService } from './av-control.service'
import { Observable, Subscription } from 'rxjs'
import { Bhajan } from '../../interfaces/bhajan'
import { delay } from 'rxjs/operators'

@Component({
    selector: 'app-audio',
    templateUrl: './audio.component.html',
    styleUrls: ['./audio.component.css'],
})
export class AudioComponent implements OnInit, OnDestroy {
    @Input()
    bhajanObservable$: Observable<Bhajan>

    bhajanLink: URL
    @ViewChild('bhajanAudio') audioPlayerRef: ElementRef<HTMLAudioElement>
    subscriptions: Subscription[] = []

    constructor(private audioControlService: AvControlService) {}

    ngOnInit(): void {
        setTimeout(
            () => this.audioControlService.updateAudio(this.audioPlayerRef),
            0,
        )
        this.subscriptions.push(
            this.bhajanObservable$.subscribe(bhajan => {
                this.bhajanLink = bhajan.audioLink

                if (this.bhajanLink)
                    setTimeout(
                        () =>
                            (this.audioPlayerRef.nativeElement.src = this.bhajanLink.href),
                        0,
                    )
            }),
        )

        this.subscriptions.push(
            this.audioControlService.avTime$
                .pipe(delay(0))
                .subscribe(time => this.seekTime(time)),
        )
    }

    seekTime(time: number) {
        const bhajanAudio = this.audioPlayerRef.nativeElement
        bhajanAudio.currentTime = time
        if (time !== 0 && bhajanAudio.paused) bhajanAudio.play()
    }

    ngOnDestroy(): void {
        this.audioControlService.updateAudio(null)
        this.subscriptions.forEach(subscription => subscription.unsubscribe())
    }
}
