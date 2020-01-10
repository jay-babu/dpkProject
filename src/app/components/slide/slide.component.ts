import { Component, HostListener, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { fadeAnimation } from '../../animations/fade.animation';
import { FirebaseBhajan } from '../../interfaces/bhajan';
import { DriveImageList } from '../../interfaces/drive';
import { DriveAPIService } from '../../services/drive-api.service';

@Component({
    selector: 'app-slide',
    templateUrl: './slide.component.html',
    styleUrls: ['./slide.component.css'],
    animations: [fadeAnimation]
})
export class SlideComponent implements OnInit {
    @Input()
    firebaseBhajan$: Observable<FirebaseBhajan>;
    driveBhajanImages$: Observable<DriveImageList>;

    stanza: string[][];
    definitions: string[][];
    imagesURL: string;
    images: any[];

    slideIndex: number;
    imageMaxHeight: number;
    hidden = true;

    constructor(private router: Router, private activeRouter: ActivatedRoute, private driveAPIService: DriveAPIService) {
    }

    ngOnInit() {
        this.activeRouter.params.subscribe(params => {
            this.slideIndex = (params.id === undefined) ? 0 : params.id;
        });
        this.firebaseBhajan$.subscribe(bhajan => {
            this.stanza = bhajan.lyrics.map(paragraph => paragraph.split(`\n`));
            this.definitions = bhajan.definitions.map(paragraph => paragraph.split(`\n`));
            this.imagesURL = bhajan.imagesURL;
            this.driveBhajanImages$ = this.driveAPIService.getListOfFiles(`'${this.imagesURL}' in parents`);
            this.driveBhajanImages$.subscribe(driveFiles => this.imageDownload(driveFiles.files));
        });

        this.hidden = false;
    }

    imageDownload(files: { id: string; name: string }[]) {
        this.images = [];
        for (const driveFile of files) {
            this.images.push(new URL(`https://drive.google.com/uc?export=view&id=${driveFile.id}`));
        }
    }

    imageMaxHeightDecrement() {
        /*
        Changes the Max Height of Img in CSS.
        4.5 was found to be a good number that worked for everything.
         */
        this.imageMaxHeight = 100;
        for (const index of this.stanza[this.slideIndex]) {
            this.imageMaxHeight -= 6;
        }
        for (const index of this.definitions[this.slideIndex]) {
            this.imageMaxHeight -= 6;
        }
    }

    edgeCheck(): number {
        if (this.slideIndex < 0) {
            this.slideIndex = 0;
            this.router.navigate([`./`, {id: this.slideIndex}], {relativeTo: this.activeRouter}).then(_ => _, err => console.log(err));
        }
        if (this.slideIndex > this.stanza.length - 1) {
            this.slideIndex = this.stanza.length - 1;
            this.router.navigate([`./`, {id: this.slideIndex}], {relativeTo: this.activeRouter}).then(_ => _, err => console.log(err));
        }
        this.imageMaxHeightDecrement();
        return this.slideIndex;
    }

    async upOrDown(bool: boolean) {
        this.hidden = true;
        await new Promise(done => setTimeout(() => done(), 500));
        (bool) ? ++this.slideIndex : --this.slideIndex;
        this.hidden = false;
        this.router.navigate([`./`, {id: this.slideIndex}], {relativeTo: this.activeRouter}).then(_ => _, err => console.log(err));
    }

    @HostListener('window:keyup', ['$event'])
    async slideMovement(event: KeyboardEvent) {
        if (event.key === 'ArrowRight' && this.slideIndex < this.stanza.length - 1) {
            this.upOrDown(true);
        } else if (event.key === 'ArrowLeft' && this.slideIndex > 0) {
            this.upOrDown(false);
        }
    }
}
