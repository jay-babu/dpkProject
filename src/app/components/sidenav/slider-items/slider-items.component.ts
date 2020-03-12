import { Component, OnInit } from '@angular/core';
import { SideNavToggleService } from '../../../services/side-nav-toggle.service';
import { TutorialDialog } from '../../tutorial/tutorial-dialog';


@Component({
    selector: 'app-slider-items',
    templateUrl: './slider-items.component.html',
    styleUrls: [ './slider-items.component.css' ]
})
export class SliderItemsComponent implements OnInit {
    sliderTutorial: TutorialDialog[];

    constructor(public sideNavToggleService: SideNavToggleService,) {
    }

    ngOnInit() {
        this.sliderTutorial = [
            { key: 'Presentation View', usages: 'Presenters should use this view to Present in Sabha' },
            { key: 'Singer View', usages: 'Kirtan Team should use this view (Landscape) when singing' },
            { key: 'Sidebar', usages: 'Navigate between creating a DPK or viewing Slides' },
            { key: 'DPK Creation', usages: 'To create a DPK, please login then head over to the creation page for detailed instructions' },
            { key: 'Next Steps', usages: 'View a current DPK or create a new DPK one' },
        ];

    }
}
