import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SlideConfigI } from '../../../interfaces/slide-config-i';
import { SlideConfigService } from '../../../services/slide-config.service';

@Component({
    selector: 'app-options',
    templateUrl: './options.component.html',
    styleUrls: ['./options.component.css']
})
export class OptionsComponent implements OnInit {
    customForm: FormGroup;
    fontStyles: Set<string>;

    constructor(private fb: FormBuilder, private slideConfigService: SlideConfigService) {
    }

    ngOnInit(): void {
        this.fontStyles = new Set(['Roboto', 'cursive', 'Avenir', 'Montserrat', 'Calibri', 'Helvetica Neue']);
        this.customForm = this.fb.group({
            bgColor: '#141414',
            fontStyle: 'Roboto',
            definitionShown: true,
        });
        this.customForm.valueChanges.subscribe(customForm => this.slideConfigService.updateSlideConfig(customForm as SlideConfigI));
    }
}
