import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SlideConfigI } from '../../../../interfaces/slide-config-i';
import { SlideService } from '../../../../services/slide.service';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'app-options',
    templateUrl: './options.component.html',
    styleUrls: [ './options.component.css' ]
})
export class OptionsComponent implements OnInit, OnDestroy {
    customForm: FormGroup;
    fontStyles: Set<string>;

    subscriptions: Subscription[] = [];

    constructor(private fb: FormBuilder, private slideService: SlideService, private dialog: MatDialog,) {
    }

    ngOnInit(): void {
        this.fontStyles = new Set([ 'Madelina', 'Avenir', 'cursive', 'Roboto', 'Montserrat', 'Calibri', 'Helvetica Neue' ]);
        this.customForm = this.fb.group({
            fontStyle: 'Avenir',
            definitionShown: true,
        });
        this.subscriptions.push(
            this.customForm.valueChanges.subscribe(customForm => this.slideService.updateSlideConfig(customForm as SlideConfigI)));
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }

    optionDialog(optionRef: TemplateRef<any>): void {
        this.dialog.open(optionRef, {
            width: '250px',
            position: { right: '1%' },
        });
    }
}
