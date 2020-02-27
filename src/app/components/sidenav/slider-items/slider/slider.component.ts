import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { DriveImageList } from '../../../../interfaces/drive';
import { Slider } from '../../../../interfaces/slider';
import { DriveAPIService } from '../../../../services/drive-api.service';

@Component({
    selector: 'app-slider',
    templateUrl: './slider.component.html',
    styleUrls: [ './slider.component.scss' ]
})
export class SliderComponent implements OnInit, OnDestroy {
    @Input()
    DPK: string;
    @Input()
    dpkID;

    subscriptions: Subscription[] = [];

    dpkObservable: Observable<DriveImageList>;

    dpk: Slider[];

    constructor(private driveAPIService: DriveAPIService) {
    }

    ngOnInit(): void {
        this.dpk = this.getSomething(this.DPK, this.dpkID);
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }

    exportThumbnailDriveURL(id: string) {
        return this.driveAPIService.exportThumbnailDriveURL(id);
    }

    getSomething(type: string, id: string) {
        const dpk: Slider[] = [];
        this.dpkObservable = this.driveAPIService.getListOfFiles(`'${ id }' in parents`);
        this.subscriptions.push(this.dpkObservable.subscribe(
            DPKs => {
                for (const DPK of DPKs.files) {
                    const name = DPK.name;
                    this.subscriptions.push(this.driveAPIService.getListOfFiles(`'${ DPK.id }' in parents`).subscribe(images => {
                        const imageID = images.files[0].id;
                        dpk.push({
                            title: name,
                            imgID: imageID,
                            type,
                        });
                    }));
                }
            }
        ));
        return dpk;
    }
}
