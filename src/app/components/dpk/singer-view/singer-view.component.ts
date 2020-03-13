import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Bhajan, DriveMaterial } from '../../../interfaces/bhajan';
import { DriveAPIService } from '../../../services/drive-api.service';
import { SlideService } from '../../../services/slide.service';

@Component({
    selector: 'app-singer-view',
    templateUrl: './singer-view.component.html',
    styleUrls: [ './singer-view.component.css' ]
})
export class SingerViewComponent implements OnInit, OnDestroy {
    firebaseBhajan$: Observable<Bhajan>;
    driveBhajanImages$: Observable<DriveMaterial>;

    stanza: string[][];
    definitions: string[][];
    audioTimings: number[];
    bhajanSource: URL;

    subscriptions: Subscription[] = [];

    constructor(public slideService: SlideService,
                private driveAPIService: DriveAPIService,) {
    }

    ngOnInit(): void {
        this.firebaseBhajan$ = this.slideService.bhajan$;
        this.driveBhajanImages$ = this.driveAPIService.driveMaterial$;

        this.subscriptions.push(this.firebaseBhajan$.subscribe(bhajan => {
            this.stanza = bhajan.stanzaVisible;
            this.definitions = bhajan.definitions;
            this.audioTimings = bhajan.audioTimings;
        }));

        this.subscriptions.push(this.driveBhajanImages$.subscribe(material => {
            if (material) {
                this.bhajanSource = material.bhajanSource;
            }
        }));
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }
}
