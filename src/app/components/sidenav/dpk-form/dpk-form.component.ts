import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { SideNavToggleService } from '../../../services/side-nav-toggle.service';
import { DpkFormService } from './dpk-form.service';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { FirebaseBhajan } from '../../../interfaces/bhajan';
import { MatSelectChange } from '@angular/material/select';
import { DpkParseService } from '../../dpk/slides/dpk-parse.service';

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

    editMode: boolean;
    submittedBhajans: FirebaseBhajan[];

    constructor(public dpkFormService: DpkFormService,
                public sideNavToggleService: SideNavToggleService,
                private dpkParseService: DpkParseService,
                private router: Router,
                private fb: FormBuilder,) {
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
            audioUploaded: [ false ],
            audioTimings: [ '' ],
        }),
    }, { asyncValidators: [ this.dpkFormService.validSubmission ], updateOn: 'blur', });

    ngOnInit() {
    }

    onSubmit() {
        this.dpkFormService.submitDPK(this.dpkForm).then(
            () => this.openDPKSlides(), err => console.error(err)
        );
    }

    pullData(toggle: MatSlideToggleChange) {
        this.editMode = toggle.checked;
        if (this.editMode && this.dpkForm.value.titleSection.dpk) {
            this.dpkFormService.getOwnData(this.dpkForm).subscribe(submittedBhajans => this.submittedBhajans = submittedBhajans);
        }
    }

    openDPKSlides() {
        const dpk = this.dpkForm.value.titleSection.dpk;
        const title = this.dpkForm.value.titleSection.title;
        this.router.navigate([ '../dpk', 'slideShow', dpk, title ]);
    }

    dpkEditSelection(title: MatSelectChange) {
        this.dpkParseService.getDPK(this.dpkForm.value.titleSection.dpk, title.value).subscribe(firebaseBhajan => {
            this.dpkForm.patchValue({
                bhajanSection: {
                    lyrics: this.dpkParseService.firebaseParseText(firebaseBhajan.lyrics),
                    gujarati: this.dpkParseService.firebaseParseText(firebaseBhajan.gujarati || []),
                    definitions: this.dpkParseService.firebaseParseText(firebaseBhajan.definitions),
                },
                materialSection: {
                    // imagesURL: firebaseBhajan.imagesURL,
                    audioUploaded: ((firebaseBhajan.audioTimings) ? firebaseBhajan.audioTimings.length > 1 : false),
                    audioTimings: this.dpkParseService.firebaseParseNumber(firebaseBhajan.audioTimings || []),
                }
            });
        });
    }
}
