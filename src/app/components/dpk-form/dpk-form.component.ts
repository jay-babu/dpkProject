import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'app-dpk-form',
    templateUrl: './dpk-form.component.html',
    styleUrls: ['./dpk-form.component.css']
})
export class DpkFormComponent implements OnInit {
    constructor(private fb: FormBuilder) {
    }

    DPKs = ['Dhun', 'Prathana', 'Kirtan'];

    dpkForm = this.fb.group({
        lyrics: ['', Validators.required],
        definitions: ['', Validators.required],
        imagePaths: ['', Validators.required],
        dpk: ['', Validators.required]
    });

    ngOnInit() {
    }

    onSubmit() {
        console.warn(this.dpkForm.value);
    }

}
