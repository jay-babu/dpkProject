import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FirebaseBhajan } from '../../interfaces/bhajan';
import { DriveImageList } from '../../interfaces/drive';
import { DriveAPIService } from '../../services/drive-api.service';
import { DpkParseService } from '../slides/dpk-parse.service';

@Component({
    selector: 'app-pdf-slide',
    templateUrl: './pdf-slide.component.html',
    styleUrls: ['./pdf-slide.component.css']
})
export class PdfSlideComponent implements OnInit {

    firebaseBhajan$: Observable<FirebaseBhajan>;

    driveBhajanImages$: Observable<DriveImageList>;

    stanza: string[][];
    definitions: string[][];
    imagesURL: string;
    images: HTMLImageElement[];

    constructor(private router: Router,
                private activeRouter: ActivatedRoute,
                private slidesService: DpkParseService,
                private driveAPIService: DriveAPIService) {
    }

    ngOnInit(): void {
        let slideName;
        let slideDPK;
        this.activeRouter.params.subscribe(params => {
            slideName = (params.name === undefined) ? '' : params.name;
            slideDPK = params.dpk;
        });
        this.firebaseBhajan$ = this.slidesService.getDPK(slideName, slideName);

        this.firebaseBhajan$.subscribe(bhajan => {
            this.stanza = bhajan.lyrics.map(paragraph => paragraph.split(`\n`));
            this.definitions = bhajan.definitions.map(paragraph => paragraph.split(`\n`));
            this.imagesURL = new URL(bhajan.imagesURL).pathname.split('/')[3];
            this.driveBhajanImages$ = this.driveAPIService.getListOfFiles(`'${this.imagesURL}' in parents`);
            this.driveBhajanImages$.subscribe(driveFiles => this.imageDownload(driveFiles.files));
        });
    }

    imageDownload(files: { id: string; name: string }[]) {
        this.images = [];
        for (const [index, driveFile] of files.entries()) {
            this.images[index] = this.driveAPIService.getImage(driveFile.id);
        }
    }

    imageMaxHeightDecrement(i: number) {
        /*
        Changes the Max Height of Img in CSS.
        4.5 was found to be a good number that worked for everything.
         */
        let imageMaxHeight = 100;
        for (const {} of this.stanza[i]) {
            imageMaxHeight -= 6;
        }
        for (const {} of this.definitions[i]) {
            imageMaxHeight -= 6;
        }
        return imageMaxHeight;
    }
}
