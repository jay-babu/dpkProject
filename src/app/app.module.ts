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
import { PdfSlideComponent } from './components/pdf-slide/pdf-slide.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { SliderItemsComponent } from './components/slider-items/slider-items.component';
import { SliderItemDirective } from './components/slider-items/slider/slider-item.directive';
import { SliderComponent } from './components/slider-items/slider/slider.component';
import { DpkParseService } from './components/slides/dpk-parse.service';
import { SlideComponent } from './components/slides/slide/slide.component';
import { SlidesComponent } from './components/slides/slides.component';
import { DriveAPIService } from './services/drive-api.service';
import { FirebaseService } from './services/firebase.service';
import { SideNavToggleService } from './services/side-nav-toggle.service';
import { SlideService } from './services/slide.service';
import { ThemeService } from './services/theme.service';
import { OptionsFabComponent } from './components/slides/options-fab/options-fab.component';
import { OptionsComponent } from './components/slides/options/options.component';
import { ColorPickerModule } from 'ngx-color-picker';
import { SingerViewComponent } from './components/singer-view/singer-view.component';
import { AudioComponent } from './components/audio-component/audio.component';
import { AudioControlService } from './components/audio-component/audio-control.service';

@NgModule({
    declarations: [
        AppComponent,
        SlideComponent,
        SlidesComponent,
        DpkFormComponent,
        PasswordlessAuthComponent,
        SliderComponent,
        SliderItemDirective,
        SliderItemsComponent,
        PdfSlideComponent,
        SidenavComponent,
        OptionsFabComponent,
        OptionsComponent,
        SingerViewComponent,
        AudioComponent,
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
        ColorPickerModule,
    ],
    providers: [
        AngularFireAuthGuard,
        FirebaseService,
        DpkFormService,
        DpkParseService,
        DriveAPIService,
        SideNavToggleService,
        ThemeService,
        SlideService,
        AudioControlService,
    ],
    bootstrap: [ AppComponent ],
})
export class AppModule {
}
