import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SlideConfigI } from '../../../interfaces/slide-config-i';
import { SlideService } from '../../../services/slide.service';

@Component({
    selector: 'app-options',
    templateUrl: './options.component.html',
    styleUrls: ['./options.component.css']
})
export class OptionsComponent implements OnInit {
    customForm: FormGroup;
    fontStyles: Set<string>;

    constructor(private fb: FormBuilder, private slideService: SlideService) {
    }

    ngOnInit(): void {
        this.fontStyles = new Set(['Avenir', 'cursive', 'Roboto', 'Montserrat', 'Calibri', 'Helvetica Neue']);
        this.customForm = this.fb.group({
            bgColor: '#141414',
            fontStyle: 'Avenir',
            definitionShown: true,
        });
        this.customForm.valueChanges.subscribe(customForm => this.slideService.updateSlideConfig(customForm as SlideConfigI));
    }
}
