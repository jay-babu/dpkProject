import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DpkParseService } from '../slides/dpk-parse.service';
import { Observable, Subscription } from 'rxjs';
import { FirebaseBhajan } from '../../../interfaces/bhajan';
import { AudioControlService } from '../../audio-component/audio-control.service';
import { DriveImageList } from '../../../interfaces/drive';
import { DriveAPIService } from '../../../services/drive-api.service';

@Component({
    selector: 'app-singer-view',
    templateUrl: './singer-view.component.html',
    styleUrls: [ './singer-view.component.css' ]
})
export class SingerViewComponent implements OnInit, OnDestroy {
    firebaseBhajan$: Observable<FirebaseBhajan>;
    bhajan: string[][];
    definitions: string[][];
    keyframes: number[];
    driveBhajanImages$: Observable<DriveImageList>;
    bhajanSource: URL;

    subscriptions: Subscription[] = [];

    constructor(private router: Router,
                private activeRouter: ActivatedRoute,
                private slidesService: DpkParseService,
                private audioControlService: AudioControlService,
                private driveAPIService: DriveAPIService,) {
    }

    ngOnInit(): void {
        let slideName;
        let slideDPK;
        this.subscriptions.push(this.activeRouter.params.subscribe(params => {
            slideName = (params.name === undefined) ? '' : params.name;
            slideDPK = params.dpk;
        }));

        this.firebaseBhajan$ = this.slidesService.getDPK(slideDPK, slideName);

        this.subscriptions.push(this.firebaseBhajan$.subscribe(bhajan => {
            this.bhajan = this.slidesService.parseSlideText(bhajan.lyrics);
            this.keyframes = bhajan.audioTimings;

            const imagesURL = new URL(bhajan.imagesURL).pathname.split('/')[3];
            this.driveBhajanImages$ = this.driveAPIService.getListOfFiles(`'${ imagesURL }' in parents`);
            this.driveBhajanImages$.subscribe(driveFiles => {
                for (const item of driveFiles.files) {
                    const mimeType = item.mimeType.split('/')[0];
                    if (mimeType === 'audio') {
                        this.bhajanSource = this.driveAPIService.exportImageDriveURL(item.id);
                        break;
                    }
                }
            });
        }));
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }

    seekPosition(time: number) {
        this.audioControlService.seekTime(time);
    }
}
