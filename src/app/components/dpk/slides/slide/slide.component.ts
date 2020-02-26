import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { fadeAnimation } from '../../../../animations/fade.animation';
import { FirebaseBhajan } from '../../../../interfaces/bhajan';
import { SlideConfigI } from '../../../../interfaces/slide-config-i';
import { DriveAPIService } from '../../../../services/drive-api.service';
import { SlideService } from '../../../../services/slide.service';
import { DpkParseService } from '../dpk-parse.service';
import { AudioControlService } from '../../../audio-component/audio-control.service';

@Component({
    selector: 'app-slide',
    templateUrl: './slide.component.html',
    styleUrls: [ './slide.component.css' ],
    animations: [ fadeAnimation ]
})
export class SlideComponent implements OnInit {
    firebaseBhajan$: Observable<FirebaseBhajan>;

    slideIndex: number;
    hidden = true;
    timeOuts = [];

    slideConfig: SlideConfigI;

    constructor(private router: Router,
                private activeRouter: ActivatedRoute,
                private driveAPIService: DriveAPIService,
                public slideService: SlideService,
                private dpkParseService: DpkParseService,
                private audioControlService: AudioControlService,) {
    }

    ngOnInit() {

        this.activeRouter.params.subscribe(params => {
            this.slideIndex = (params.id === undefined) ? 0 : params.id;
        });
        this.firebaseBhajan$ = this.slideService.firebaseBhajan$;
        this.slideService.slideConfig$.subscribe(slideConfig => {
            this.slideConfig = slideConfig;
            if (this.slideConfig.playback && this.slideService.bhajan.audioTimings) {
                this.nextSlideAudio();
            } else {
                this.audioControlService.pause();
                this.timeOuts.forEach(times => clearTimeout(times));
            }
        });
        this.hidden = false;
    }

    nextSlideAudio() {
        this.timeOuts.forEach(times => clearTimeout(times));
        let index = this.slideIndex;
        this.audioControlService.seekTime(this.slideService.bhajan.audioTimings[index]);
        const removeSecond = -this.slideService.bhajan.audioTimings[index++];
        for (const seconds of this.slideService.bhajan.audioTimings.slice(index)) {
            this.timeOuts.push(setTimeout(() => this.upOrDown(true), (removeSecond + seconds) * 1000));
        }
    }

    imageMaxHeightDecrement() {
        /*
        Changes the Max Height of Img in CSS.
        4.5 was found to be a good number that worked for everything.
         */
        let imageMaxHeight = 100;
        let heightDecrement = 7.1;
        for (const {} of this.slideService.bhajan.stanza[this.slideIndex]) {
            imageMaxHeight -= heightDecrement;
        }
        if (!this.slideConfig.definitionShown) {
            heightDecrement -= 3;
        }

        if (this.slideService.bhajan.definitions[this.slideIndex]) {
            for (const {} of this.slideService.bhajan.definitions[this.slideIndex]) {
                imageMaxHeight -= heightDecrement - 1.5;
            }
        } else {
            imageMaxHeight -= heightDecrement - 3;
        }
        return imageMaxHeight;
    }

    async upOrDown(bool: boolean) {
        this.hidden = true;
        await new Promise(done => setTimeout(() => done(), 500));
        (bool) ? ++this.slideIndex : --this.slideIndex;
        this.slideIndex = this.slideService.edgeCheck(this.slideIndex, this.slideService.bhajan.stanza.length);
        this.hidden = false;
        this.navigateID();
    }

    @HostListener('window:keyup', [ '$event' ])
    async slideMovement(event: KeyboardEvent) {
        if ((event.key === 'ArrowRight' || event.key === ' ') && this.slideIndex < this.slideService.bhajan.stanza.length - 1) {
            this.upOrDown(true);
            if (this.slideConfig.playback && this.slideService.bhajan.audioTimings) {
                await new Promise(done => setTimeout(() => done(), 500));
                this.nextSlideAudio();
            }
        } else if (event.key === 'ArrowLeft' && this.slideIndex > 0) {
            this.upOrDown(false);
            if (this.slideConfig.playback && this.slideService.bhajan.audioTimings) {
                await new Promise(done => setTimeout(() => done(), 500));
                this.nextSlideAudio();
            }
        }

    }

    navigateID() {
        this.router.navigate([ `./`, {id: this.slideIndex} ], {relativeTo: this.activeRouter}).then(_ => _, err => console.log(err));
    }

    imageToURLL(index: number) {
        console.log(this.slideService.bhajan.imagePaths);
        return `url(${this.slideService.bhajan.imagePaths[index].href})`;
    }
}
