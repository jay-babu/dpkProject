import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DpkParseService } from '../slides/dpk-parse.service';
import { Observable } from 'rxjs';
import { FirebaseBhajan } from '../../interfaces/bhajan';
import { AudioControlService } from '../audio-component/audio-control.service';
import { DriveImageList } from '../../interfaces/drive';
import { DriveAPIService } from '../../services/drive-api.service';
import { environment } from '../../../environments/environment';

@Component({
    selector: 'app-singer-view',
    templateUrl: './singer-view.component.html',
    styleUrls: [ './singer-view.component.css' ]
})
export class SingerViewComponent implements OnInit {
    firebaseBhajan$: Observable<FirebaseBhajan>;
    bhajan: string[][];
    definitions: string[][];
    keyframes: number[];
    driveBhajanImages$: Observable<DriveImageList>;
    bhajanSource: string;

    constructor(private router: Router,
                private activeRouter: ActivatedRoute,
                private slidesService: DpkParseService,
                private audioControlService: AudioControlService,
                private driveAPIService: DriveAPIService,) {
    }

    ngOnInit(): void {
        let slideName;
        let slideDPK;
        this.activeRouter.params.subscribe(params => {
            slideName = (params.name === undefined) ? '' : params.name;
            slideDPK = params.dpk;
        });

        this.firebaseBhajan$ = this.slidesService.getDPK(slideDPK, slideName);

        this.firebaseBhajan$.subscribe(bhajan => {
            this.bhajan = this.slidesService.parseSlideText(bhajan.lyrics);
            this.keyframes = bhajan.audioTimings;

            const imagesURL = new URL(bhajan.imagesURL).pathname.split('/')[3];
            this.driveBhajanImages$ = this.driveAPIService.getListOfFiles(`'${imagesURL}' in parents`);
            this.driveBhajanImages$.subscribe(driveFiles => {
                for (const item of driveFiles.files) {
                    const mimeType = item.mimeType.split('/')[0];
                    if (mimeType === 'audio') {
                        this.bhajanSource = `https://www.googleapis.com/drive/v3/files/${item.id}?key=${environment.driveConfig.key}&alt=media`;
                        break;
                    }
                }
            });
        })
    }

    seekPosition(time: number) {
        this.audioControlService.seekTime(time);
    }
}
