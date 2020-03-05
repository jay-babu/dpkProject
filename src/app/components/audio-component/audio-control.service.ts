import { ElementRef, Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AudioControlService {

    private bhajanAudio: HTMLAudioElement;

    private _paused: Subject<boolean>;
    paused$: Observable<boolean>;

    constructor() {
        this._paused = new Subject<boolean>();
        this.paused$ = this._paused.asObservable();
    }

    get audioExist() {
        return !!this.bhajanAudio;
    }

    updateAudio(audioPlayerRef: ElementRef<HTMLAudioElement>) {
        this.bhajanAudio = (audioPlayerRef) ? audioPlayerRef.nativeElement : null;
    }

    seekTime(time: number) {
        setTimeout(() => this.bhajanAudio.currentTime = time, 0);
        if (this.bhajanAudio.paused) this.bhajanAudio.play();
    }

    toggleAudio() {
        const pause = !this.bhajanAudio.paused;
        (pause) ? this.bhajanAudio.pause() : this.bhajanAudio.play();
        this._paused.next(pause);
    }
}
