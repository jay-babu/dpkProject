import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
// Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule, HammerModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { environment } from '../environments/environment';
import { AngularMaterialModule } from './angular-material.module';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { DpkFormComponent } from './components/dpk-form/dpk-form.component';
import { DpkFormService } from './components/dpk-form/dpk-form.service';
import { PasswordlessAuthComponent } from './components/passwordless-auth/passwordless-auth.component';
import { SlideComponent } from './components/slides/slide/slide.component';
import { SliderItemsComponent } from './components/slider-items/slider-items.component';
import { SliderItemDirective } from './components/slider-items/slider/slider-item.directive';
import { SliderComponent } from './components/slider-items/slider/slider.component';
import { DpkParseService } from './components/slides/dpk-parse.service';
import { SlidesComponent } from './components/slides/slides.component';
import { TempOptionsComponent } from './components/temp-options/temp-options.component';
import { DriveAPIService } from './services/drive-api.service';
import { FirebaseService } from './services/firebase.service';
import { PdfSlideComponent } from './components/pdf-slide/pdf-slide.component';
import { TestComponent } from './components/test/test.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';

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
        PdfSlideComponent,
        TestComponent,
        SidenavComponent,
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
        RouterModule,
        HammerModule,
    ],
    providers: [
        AngularFireAuthGuard,
        FirebaseService,
        DpkFormService,
        DpkParseService,
        DriveAPIService,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
}
