import { AfterViewChecked, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { AudioControlService } from './audio-control.service';

@Component({
    selector: 'app-audio',
    templateUrl: './audio.component.html',
    styleUrls: [ './audio.component.css' ]
})
export class AudioComponent implements OnInit, AfterViewChecked {
    @Input()
    bhajanSource: URL;

    @ViewChild('bhajanAudio') audioPlayerRef: ElementRef<HTMLAudioElement>;

    constructor(private audioControlService: AudioControlService) {
    }

    ngOnInit(): void {
    }

    ngAfterViewChecked(): void {
        this.audioControlService.updateAudio(this.audioPlayerRef);
    }
}
