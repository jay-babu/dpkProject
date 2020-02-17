import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DriveImageList } from '../../../interfaces/drive';
import { Slider } from '../../../interfaces/slider';
import { DriveAPIService } from '../../../services/drive-api.service';

@Component({
    selector: 'app-slider',
    templateUrl: './slider.component.html',
    styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {
    @Input()
    DPK: string;
    @Input()
    dpkID;

    dpkObservable: Observable<DriveImageList>;

    dpk: Slider[];

    constructor(private driveAPIService: DriveAPIService) {
    }

    ngOnInit(): void {
        this.dpk = this.getSomething(this.DPK, this.dpkID);
    }

    getImage(id: string) {
        return this.driveAPIService.getThumbnail(id);
    }

    getSomething(type: string, id: string) {
        const dpk: Slider[] = [];
        this.dpkObservable = this.driveAPIService.getListOfFiles(`'${id}' in parents`);
        this.dpkObservable.subscribe(
            DPKs => {
                for (const DPK of DPKs.files) {
                    const name = DPK.name;
                    this.driveAPIService.getListOfFiles(`'${DPK.id}' in parents`).subscribe(images => {
                        const imageID = images.files[0].id;
                        dpk.push({
                            title: name,
                            imgID: imageID,
                            type,
                        });
                    });
                }
            }
        );
        return dpk;
    }
}
