import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AudioControlService } from './audio-control.service';

@Component({
    selector: 'app-audio',
    templateUrl: './audio.component.html',
    styleUrls: [ './audio.component.css' ]
})
export class AudioComponent implements OnInit, OnDestroy {
    @Input()
    bhajanSource: URL;

    @ViewChild('bhajanAudio') audioPlayerRef: ElementRef<HTMLAudioElement>;

    constructor(private audioControlService: AudioControlService) {
    }

    ngOnInit(): void {
        setTimeout(() => this.audioControlService.updateAudio(this.audioPlayerRef), 0);
    }

    ngOnDestroy(): void {
        this.audioPlayerRef.nativeElement.src = null;
    }
}
