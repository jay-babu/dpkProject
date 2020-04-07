import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AvControlService } from './av-control.service';
import { Observable } from 'rxjs';
import { Bhajan } from '../../interfaces/bhajan';

@Component({
    selector: 'app-audio',
    templateUrl: './audio.component.html',
    styleUrls: [ './audio.component.css' ]
})
export class AudioComponent implements OnInit, OnDestroy {
    @Input()
    bhajanObservable$: Observable<Bhajan>;

    bhajanLink: URL;

    @ViewChild('bhajanAudio') audioPlayerRef: ElementRef<HTMLAudioElement>;

    constructor(private audioControlService: AvControlService) {
    }

    ngOnInit(): void {
        setTimeout(() => this.audioControlService.updateAudio(this.audioPlayerRef), 0);
        this.bhajanObservable$.subscribe(bhajan => {
            this.bhajanLink = bhajan.audioLink;
            if (this.bhajanLink) setTimeout(() => this.audioPlayerRef.nativeElement.src = this.bhajanLink.href, 0);
        });
    }

    ngOnDestroy(): void {
        this.audioControlService.updateAudio(null);
    }
}
