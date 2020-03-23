import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { fadeAnimation } from '../../../../animations/fade.animation';
import { SlideConfigI } from '../../../../interfaces/slide-config-i';
import { DriveAPIService } from '../../../../services/drive-api.service';
import { SlideService } from '../../../../services/slide.service';
import { AudioControlService } from '../../../audio-component/audio-control.service';
import { Bhajan, DriveMaterial } from '../../../../interfaces/bhajan';
import * as screenfull from 'screenfull';

@Component({
    selector: 'app-slide',
    templateUrl: './slide.component.html',
    styleUrls: [ './slide.component.css' ],
    animations: [ fadeAnimation ]
})
export class SlideComponent implements OnInit, OnDestroy {
    firebaseBhajan$: Observable<Bhajan>;
    driveBhajanImages$: Observable<DriveMaterial>;

    stanza: string[][];
    definitions: string[][];
    audioTimings: number[];

    // images: HTMLImageElement[];
    // imagePaths: URL[];
    bhajanSource: URL;

    subscriptions: Subscription[] = [];

    slideIndex: number;
    hidden = true;
    timeOuts = [];

    slideConfig: SlideConfigI;
    playBack: boolean;

    constructor(private router: Router,
                private activeRouter: ActivatedRoute,
                private driveAPIService: DriveAPIService,
                public slideService: SlideService,
                private audioControlService: AudioControlService,) {
    }

    ngOnInit() {
        this.activeRouter.params.subscribe(params => {
            this.slideIndex = params.id || 0;
        });
        this.firebaseBhajan$ = this.slideService.bhajan$;
        this.driveBhajanImages$ = this.driveAPIService.driveMaterial$;

        this.subscriptions.push(this.firebaseBhajan$.subscribe(bhajan => {
            this.stanza = bhajan.stanzaVisible;
            this.definitions = bhajan.definitions;
            this.audioTimings = bhajan.audioTimings;
            if (this.audioTimings) this.audioTimings[0] = 0;
        }));

        this.subscriptions.push(this.driveBhajanImages$.subscribe(material => {
            if (material) {
                this.bhajanSource = material.bhajanSource;
                // this.imagePaths = material.imagePaths;
                // this.images = material.images;
            }
        }));

        this.subscriptions.push(this.slideService.slideConfig$.subscribe(slideConfig => {
            this.slideConfig = slideConfig;
        }));

        this.subscriptions.push(this.audioControlService.paused$.subscribe(off => {
            this.playBack = !off;
            if (off) {
                this.timeOuts.forEach(times => clearTimeout(times));
            } else {
                this.nextSlideAudio();
            }
        }));
        this.hidden = false;
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }

    nextSlideAudio() {
        this.timeOuts.forEach(times => clearTimeout(times));
        let index = this.slideIndex;
        this.audioControlService.seekTime(this.audioTimings[index]);
        const removeSecond = -this.audioTimings[index++];
        for (const seconds of this.audioTimings.slice(index)) {
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
        imageMaxHeight -= heightDecrement * this.stanza[this.slideIndex].length;

        if (!this.slideConfig.definitionShown) {
            heightDecrement -= 3;
        }

        if (this.definitions[this.slideIndex]) {
            imageMaxHeight -= (heightDecrement - 1.5) * this.definitions[this.slideIndex].length;
        } else {
            imageMaxHeight -= heightDecrement - 3;
        }
        return imageMaxHeight;
    }

    async upOrDown(bool: boolean) {
        this.hidden = true;
        await new Promise(done => setTimeout(() => done(), 500));
        (bool) ? ++this.slideIndex : --this.slideIndex;
        this.slideIndex = this.slideService.edgeCheck(this.slideIndex, this.stanza.length);
        this.hidden = false;
        this.navigateID();
    }

    @HostListener('window:keyup', [ '$event' ])
    async slideMovement(event: KeyboardEvent) {
        if ((event.key === 'ArrowRight' || event.key === ' ' || event.key === 'PageDown') && this.slideIndex < this.stanza.length - 1) {
            this.upOrDown(true);
            if (this.playBack && this.audioTimings) {
                await new Promise(done => setTimeout(() => done(), 500));
                this.nextSlideAudio();
            }
        } else if ((event.key === 'ArrowLeft' || event.key === 'PageUp') && this.slideIndex > 0) {
            this.upOrDown(false);
            if (this.playBack && this.audioTimings) {
                await new Promise(done => setTimeout(() => done(), 500));
                this.nextSlideAudio();
            }
        } else if (event.key === 'b') {
            this.hidden = !this.hidden;
        } else if (event.key === 'f') {
            if (screenfull.isEnabled) {
                await screenfull.toggle();
            }
        }
    }

    navigateID() {
        this.router.navigate([ `./`, { id: this.slideIndex } ], { relativeTo: this.activeRouter })
            .then(_ => _, err => console.error(err));
    }

    // imageToURLL(index: number) {
    //     return `url(${ this.imagePaths[index].href })`;
    // }
}
