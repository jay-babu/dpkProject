import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { SideNavToggleService } from '../../../services/side-nav-toggle.service';
import { DpkFormService } from './dpk-form.service';

class CrossFieldMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        return control.dirty && form.invalid && form.errors !== null;
    }
}

@Component({
    selector: 'app-dpk-form',
    templateUrl: './dpk-form.component.html',
    styleUrls: [ './dpk-form.component.css' ]
})
export class DpkFormComponent implements OnInit {

    errorMatcher = new CrossFieldMatcher();

    constructor(public dpkFormService: DpkFormService,
                public sideNavToggleService: SideNavToggleService,
                private router: Router,
                private fb: FormBuilder) {
    }

    dpkForm = this.fb.group({
        titleSection: this.fb.group({
            dpk: [ '', Validators.required ],
            title: [ '', Validators.required ],
        }),
        bhajanSection: this.fb.group({
            lyrics: [ '', Validators.required ],
            gujarati: [ '' ],
            definitions: [ '' ],
        }),
        materialSection: this.fb.group({
            imagesURL: [ '', Validators.required ],
            audioUploaded: [ false ],
            audioTimings: [ '' ],
        }),
    }, { asyncValidators: [ this.dpkFormService.validSubmission ] });

    ngOnInit() {
    }

    onSubmit() {
        this.dpkFormService.submitDPK(this.dpkForm).then(
            () => this.openDPKSlides(), err => console.error(err)
        );
    }

    openDPKSlides() {
        const dpk = this.dpkForm.value.dpk;
        const title = this.dpkForm.value.title;
        this.router.navigate([ '/dpk', 'slideShow', dpk, title ]);
    }
}
