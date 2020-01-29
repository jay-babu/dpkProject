import { Component, OnInit } from '@angular/core';
import { DriveAPIService } from '../../services/drive-api.service';

@Component({
    selector: 'app-slider-items',
    templateUrl: './slider-items.component.html',
    styleUrls: ['./slider-items.component.css']
})
export class SliderItemsComponent implements OnInit {
    DPKs = new Map<string, string>();

    constructor(private driveAPIService: DriveAPIService) {
    }

    ngOnInit() {
        this.DPKItems();
    }

    async DPKItems() {
        await this.driveAPIService.getDPKRadio(`1NFdcrnJLViJgJyz9MiSxkCQOll3v5QnQ`).toPromise().then(DPKs => {
            for (const DPK of DPKs.files) {
                this.DPKs.set(DPK.name, DPK.id);
            }
        });
        return this.DPKs;
    }
}
