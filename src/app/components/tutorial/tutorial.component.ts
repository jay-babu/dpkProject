import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TutorialDialog } from './tutorial-dialog';

@Component({
    selector: 'app-tutorial',
    templateUrl: './tutorial.component.html',
    styleUrls: [ './tutorial.component.css' ]
})
export class TutorialComponent implements OnInit {
    @Input() displayedColumns: string[];
    @Input() dataSource: TutorialDialog[];

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
