import { Component, HostListener, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { fadeAnimation } from '../../../animations/fade.animation';
import { FirebaseBhajan } from '../../../interfaces/bhajan';
import { DriveImageList } from '../../../interfaces/drive';
import { SlideConfigI } from '../../../interfaces/slide-config-i';
import { DriveAPIService } from '../../../services/drive-api.service';
import { SlideService } from '../../../services/slide.service';
import { DpkParseService } from '../dpk-parse.service';

@Component({
    selector: 'app-slide',
    templateUrl: './slide.component.html',
    styleUrls: [ './slide.component.css' ],
    animations: [ fadeAnimation ]
})
export class SlideComponent implements OnInit {
    @Input()
    firebaseBhajan$: Observable<FirebaseBhajan>;
    driveBhajanImages$: Observable<DriveImageList>;

    stanza: string[][];
    definitions: string[][];
    images: HTMLImageElement[];
    imagePaths: URL[] = [];
    bhajanSource: URL;

    slideIndex: number;
    hidden = true;

    slideConfig: SlideConfigI;

    constructor(private router: Router,
                private activeRouter: ActivatedRoute,
                private driveAPIService: DriveAPIService,
                public slideService: SlideService,
                private dpkParseService: DpkParseService,) {
    }

    ngOnInit() {
        this.activeRouter.params.subscribe(params => {
            this.slideIndex = (params.id === undefined) ? 0 : params.id;
        });
        this.firebaseBhajan$.subscribe(bhajan => {
            this.stanza = this.dpkParseService.parseSlideText(bhajan.lyrics);
            this.definitions = this.dpkParseService.parseSlideText(bhajan.definitions);
            const imagesURL = new URL(bhajan.imagesURL).pathname.split('/')[3];
            this.driveBhajanImages$ = this.driveAPIService.getListOfFiles(`'${imagesURL}' in parents`);
            this.driveBhajanImages$.subscribe(driveFiles => {
                for (const item of driveFiles.files) {
                    const mimeType = item.mimeType.split('/')[0];
                    if (mimeType === 'audio') {
                        this.bhajanSource = this.driveAPIService.exportImageDriveURL(item.id);
                    } else if (mimeType === 'image') {
                        this.imagePaths.push(this.driveAPIService.exportImageDriveURL(item.id));
                    }
                }
                this.imageDownload(this.imagePaths);
            });
        });
        this.hidden = false;
        this.slideService.slideConfig$.subscribe(slideConfig => this.slideConfig = slideConfig);
    }

    imageDownload(files: URL[]) {
        this.images = [];
        this.images[this.slideIndex] = this.driveAPIService.preloadImage(files[this.slideIndex]);

        for (const [ index, driveFile ] of files.entries()) {
            if (this.slideIndex !== index) {
                this.images[index] = this.driveAPIService.preloadImage(driveFile);
            }
        }
    }

    imageMaxHeightDecrement() {
        /*
        Changes the Max Height of Img in CSS.
        4.5 was found to be a good number that worked for everything.
         */
        let imageMaxHeight = 100;
        let heightDecrement = 7.1;
        for (const {} of this.stanza[this.slideIndex]) {
            imageMaxHeight -= heightDecrement;
        }
        if (!this.slideConfig.definitionShown) {
            heightDecrement -= 3;
        }

        if (this.definitions[this.slideIndex]) {
            for (const {} of this.definitions[this.slideIndex]) {
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
        this.slideIndex = this.slideService.edgeCheck(this.slideIndex, this.stanza.length);
        this.hidden = false;
        this.navigateID();
    }

    @HostListener('window:keyup', [ '$event' ])
    async slideMovement(event: KeyboardEvent) {
        if ((event.key === 'ArrowRight' || event.key === ' ') && this.slideIndex < this.stanza.length - 1) {
            this.upOrDown(true);
        } else if (event.key === 'ArrowLeft' && this.slideIndex > 0) {
            this.upOrDown(false);
        }
    }

    navigateID() {
        this.router.navigate([ `./`, {id: this.slideIndex} ], {relativeTo: this.activeRouter}).then(_ => _, err => console.log(err));
    }

    imageToURLL(index: number) {
        return `url(${this.imagePaths[index]})`;
    }
}
