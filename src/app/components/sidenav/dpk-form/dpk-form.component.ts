import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { SideNavToggleService } from '../../../services/side-nav-toggle.service';
import { SlideService } from '../../../services/slide.service';
import { DpkFormService } from './dpk-form.service';

class CrossFieldMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        return control.dirty && form.invalid && form.errors !== null;
    }
}

@Component({
    selector: 'app-dpk-form',
    templateUrl: './dpk-form.component.html',
    styleUrls: ['./dpk-form.component.css']
})
export class DpkFormComponent implements OnInit {

    errorMatcher = new CrossFieldMatcher();

    constructor(public dpkFormService: DpkFormService,
                public sideNavToggleService: SideNavToggleService,
                private router: Router,
                private slideService: SlideService,) {
    }

    dpkForm = new FormGroup({
        title: new FormControl('', Validators.required),
        lyrics: new FormControl('', Validators.required),
        definitions: new FormControl(''),
        imagesURL: new FormControl('', Validators.required),
        dpk: new FormControl('', Validators.required),
        audioUploaded: new FormControl(false),
        audioTimings: new FormControl(''),
    }, { asyncValidators: [this.dpkFormService.validSubmission] });

    ngOnInit() {
    }

    onSubmit() {
        this.dpkFormService.submitDPK(this.dpkForm);
        this.openDPKSlides();
    }

    openDPKSlides() {
        const dpk = this.dpkForm.value.dpk;
        const title = this.dpkForm.value.title;
        this.slideService.updatePrevLocation([this.router.url]);
        setTimeout(() => this.router.navigate(['/dpk', dpk, title]), 1000);
    }
}
