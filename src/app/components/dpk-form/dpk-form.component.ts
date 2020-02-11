import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { DpkFormService } from './dpk-form.service';

class CrossFieldMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        return control.dirty && form.invalid && form.errors !== null;
    }
}

declare var particlesJS: any;

@Component({
    selector: 'app-dpk-form',
    templateUrl: './dpk-form.component.html',
    styleUrls: ['./dpk-form.component.css']
})
export class DpkFormComponent implements OnInit {
    @ViewChild('form') dpkFullForm: { resetForm: () => void; };

    DPKs: Map<string, string>; // Key = Name, Value = Id
    errorMatcher = new CrossFieldMatcher();

    constructor(private fb: FormBuilder, private dpkFormService: DpkFormService) {
    }

    dpkForm = new FormGroup({
        title: new FormControl('', Validators.required),
        lyrics: new FormControl('', Validators.required),
        definitions: new FormControl(''),
        imagesURL: new FormControl('', Validators.required),
        dpk: new FormControl('', Validators.required),
    }, { asyncValidators: [this.dpkFormService.validSubmission] });

    ngOnInit() {
        this.DPKs = this.getDPKRadio();
        particlesJS.load('particles', 'assets/data/particlesjs-config.json');
    }

    onSubmit() {
        this.dpkFormService.submitDPK(this.dpkForm);
        this.dpkFullForm.resetForm();
    }

    openDPKSlides() {
        this.dpkFormService.openDPKSlides(this.dpkForm);
    }

    getDPKRadio() {
        return this.dpkFormService.getDPKRadio();
    }
}
