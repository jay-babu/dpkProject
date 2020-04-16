import { ElementRef, Injectable } from '@angular/core'
import { BehaviorSubject, Observable, Subject } from 'rxjs'

@Injectable({
    providedIn: 'root',
})
export class AvControlService {
    private bhajanAudio: HTMLAudioElement

    private _paused: Subject<boolean>
    paused$: Observable<boolean>

    private _avTime: BehaviorSubject<number>
    avTime$: Observable<number>

    constructor() {
        this._paused = new Subject<boolean>()
        this.paused$ = this._paused.asObservable()

        this._avTime = new BehaviorSubject<number>(0)
        this.avTime$ = this._avTime.asObservable()
    }

    get audioExist() {
        return !!this.bhajanAudio
    }

    set avTime(time: number) {
        this._avTime.next(time)
    }

    updateAudio(audioPlayerRef: ElementRef<HTMLAudioElement>) {
        this.bhajanAudio = audioPlayerRef ? audioPlayerRef.nativeElement : null
    }

    toggleAudio() {
        if (this.bhajanAudio) {
            const pause = !this.bhajanAudio.paused
            pause ? this.bhajanAudio.pause() : this.bhajanAudio.play()
            this._paused.next(pause)
        }
    }
}
