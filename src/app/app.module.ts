import { NgModule } from '@angular/core';
// Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { environment } from '../environments/environment';
import { AngularMaterialModule } from './angular-material.module';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { DpkFormComponent } from './components/dpk-form/dpk-form.component';
import { SlideComponent } from './components/slide/slide.component';
import { SlidesComponent } from './components/slides/slides.component';
import { TempOptionsComponent } from './components/temp-options/temp-options.component';

@NgModule({
    declarations: [
        AppComponent,
        SlideComponent,
        SlidesComponent,
        DpkFormComponent,
        TempOptionsComponent
    ],
    imports: [
        AngularMaterialModule,
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule,
        AppRoutingModule,
        AngularFireModule.initializeApp(environment.firebaseConfig, 'dpkProject'),
        AngularFirestoreModule,
        ReactiveFormsModule
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {
}
