import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-options',
    templateUrl: './options.component.html',
    styleUrls: ['./options.component.css']
})
export class OptionsComponent implements OnInit {
    customForm: FormGroup;
    fontStyles: Set<string>;

    constructor(private fb: FormBuilder) {
    }


    ngOnInit(): void {
        this.fontStyles = new Set(['Roboto', 'cursive', 'Avenir', 'Montserrat', 'Calibri', 'Helvetica Neue']);
        this.customForm = this.fb.group({
            bgColor: '#141414',
            fontStyle: '',
            definitionShown: true,
        });
        this.onCustomFormChange();
    }

    onCustomFormChange() {
        this.customForm.valueChanges.subscribe(form => console.log(form));
    }

}
