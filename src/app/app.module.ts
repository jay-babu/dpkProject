import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
// Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
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
import { DpkFormService } from './components/dpk-form/dpk-form.service';
import { PasswordlessAuthComponent } from './components/passwordless-auth/passwordless-auth.component';
import { SlideComponent } from './components/slide/slide.component';
import { DpkParseService } from './components/slides/dpk-parse.service';
import { SlidesComponent } from './components/slides/slides.component';
import { TempOptionsComponent } from './components/temp-options/temp-options.component';
import { DriveAPIService } from './services/drive-api.service';
import { FirebaseService } from './services/firebase.service';
import { SliderComponent } from './components/slider/slider.component';
import { SliderItemDirective } from './components/slider/slider-item.directive';
import { SliderItemsComponent } from './components/slider-items/slider-items.component';

@NgModule({
    declarations: [
        AppComponent,
        SlideComponent,
        SlidesComponent,
        DpkFormComponent,
        TempOptionsComponent,
        PasswordlessAuthComponent,
        SliderComponent,
        SliderItemDirective,
        SliderItemsComponent,
    ],
    imports: [
        AngularMaterialModule,
        AppRoutingModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFirestoreModule,
        AngularFireAuthModule,
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        ReactiveFormsModule,
        RouterModule
    ],
    providers: [
        FirebaseService,
        DpkFormService,
        DpkParseService,
        DriveAPIService
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
}
