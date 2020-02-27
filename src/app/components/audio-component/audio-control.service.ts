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

        this.paused$.subscribe(off => {
            (off) ? this.bhajanAudio.pause() : this.bhajanAudio.play();
        });
    }

    get audioExist() {
        return !!this.bhajanAudio;
    }

    updateAudio(audioPlayerRef: ElementRef<HTMLAudioElement>) {
        this.bhajanAudio = audioPlayerRef.nativeElement
    }

    seekTime(time: number) {
        this.bhajanAudio.play();
        this.bhajanAudio.currentTime = time;
    }

    toggleAudio() {
        this._paused.next(!this.bhajanAudio.paused);
    }
}
