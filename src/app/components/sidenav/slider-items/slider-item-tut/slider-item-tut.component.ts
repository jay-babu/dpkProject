import { Component, OnInit, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

const ELEMENT_DATA = [
    { key: 'Presentation View', usages: 'Presenters should use this view to Present in Sabha' },
    { key: 'Singer View', usages: 'Kirtan Team should use this view (Landscape) when singing' },
    { key: 'Sidebar', usages: 'Navigate between creating a DPK or viewing Slides' },
    { key: 'DPK Creation', usages: 'To create a DPK, please login then head over to the creation page for detailed instructions' },
    { key: 'Next Steps', usages: 'View a current DPK or create a new DPK one' },
];

@Component({
    selector: 'app-slider-item-tut',
    templateUrl: './slider-item-tut.component.html',
    styleUrls: [ './slider-item-tut.component.css' ]
})
export class SliderItemTutComponent implements OnInit {
    displayedColumns: string[] = [ 'key', 'usages', ];
    dataSource = ELEMENT_DATA;

    constructor(private dialog: MatDialog,) {
    }

    ngOnInit(): void {
    }

    tutorialOpen(tutorial: TemplateRef<any>): void {
        this.dialog.open(tutorial, {
            width: '80vw',
        });
    }

}
