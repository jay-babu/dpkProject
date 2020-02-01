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
    images: HTMLImageElement[];

    slideIndex: number;
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
            this.imagesURL = new URL(bhajan.imagesURL).pathname.split('/')[3];
            this.driveBhajanImages$ = this.driveAPIService.getListOfFiles(`'${this.imagesURL}' in parents`);
            this.driveBhajanImages$.subscribe(driveFiles => this.imageDownload(driveFiles.files));
        });

        this.hidden = false;
    }

    imageDownload(files: { id: string; name: string }[]) {
        this.images = [];
        this.images[this.slideIndex] = this.driveAPIService.getImage(files[this.slideIndex].id);

        for (const [index, driveFile] of files.entries()) {
            if (this.slideIndex !== index) {
                this.images[index] = this.driveAPIService.getImage(driveFile.id);
            }
        }
    }

    imageMaxHeightDecrement() {
        /*
        Changes the Max Height of Img in CSS.
        4.5 was found to be a good number that worked for everything.
         */
        let imageMaxHeight = 100;
        for (const index of this.stanza[this.slideIndex]) {
            imageMaxHeight -= 6;
        }
        for (const index of this.definitions[this.slideIndex]) {
            imageMaxHeight -= 6;
        }
        return imageMaxHeight;
    }

    edgeCheck(): number {
        if (this.slideIndex < 0) {
            this.slideIndex = 0;
            this.navigateID();
        }
        if (this.slideIndex > this.stanza.length - 1) {
            this.slideIndex = this.stanza.length - 1;
            this.navigateID();
        }
        return this.slideIndex;
    }

    async upOrDown(bool: boolean) {
        this.hidden = true;
        await new Promise(done => setTimeout(() => done(), 500));
        (bool) ? ++this.slideIndex : --this.slideIndex;
        this.hidden = false;
        this.navigateID();
    }

    @HostListener('window:keyup', ['$event'])
    async slideMovement(event: KeyboardEvent) {
        if (event.key === 'ArrowRight' && this.slideIndex < this.stanza.length - 1) {
            this.upOrDown(true);
        } else if (event.key === 'ArrowLeft' && this.slideIndex > 0) {
            this.upOrDown(false);
        }
    }

    navigateID() {
        this.router.navigate([`./`, { id: this.slideIndex }], { relativeTo: this.activeRouter }).then(_ => _, err => console.log(err));
    }
}
