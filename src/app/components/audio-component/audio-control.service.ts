import { ElementRef, Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AudioControlService {

    private bhajanAudio: HTMLAudioElement;

    constructor() {
    }

    updateAudio(audioPlayerRef: ElementRef<HTMLAudioElement>) {
        this.bhajanAudio = audioPlayerRef.nativeElement
    }

    seekTime(time: number) {
        this.bhajanAudio.play();
        this.bhajanAudio.currentTime = time;
    }
}
