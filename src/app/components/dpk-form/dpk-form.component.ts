import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { DriveImageList } from '../../interfaces/drive';
import { DpkFormService } from './dpk-form.service';

@Component({
    selector: 'app-dpk-form',
    templateUrl: './dpk-form.component.html',
    styleUrls: ['./dpk-form.component.css']
})
export class DpkFormComponent implements OnInit {
    @ViewChild('form') dpkFullForm: { resetForm: () => void; };

    DPKRadio$: Observable<DriveImageList>;
    DPKs = new Map<string, string>(); // Key = Name, Value = Id

    constructor(private fb: FormBuilder, private dpkFormService: DpkFormService) {
    }


    dpkForm: FormGroup = this.fb.group({
        title: ['', Validators.required],
        lyrics: ['', Validators.required],
        definitions: [''],
        imagesURL: ['', Validators.required],
        dpk: ['', Validators.required]
    }, {validators: [this.dpkFormService.validSubmission]});

    ngOnInit() {
        this.getDPKRadio();
    }

    onSubmit() {
        this.dpkFormService.submitDPK(this.dpkForm);
        this.dpkFullForm.resetForm();
    }

    openDPKSlides() {
        this.dpkFormService.openDPKSlides(this.dpkForm);
    }

    getDPKRadio() {
        this.DPKRadio$ = this.dpkFormService.getDPKRadio();
        this.DPKRadio$.subscribe(foldersObject => {
            const folders = foldersObject.files;
            for (const folder of folders) {
                this.DPKs.set(folder.name, folder.id);
            }
        });
    }
}
