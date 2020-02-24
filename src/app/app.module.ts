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
import { DpkFormComponent } from './components/sidenav/dpk-form/dpk-form.component';
import { DpkFormService } from './components/sidenav/dpk-form/dpk-form.service';
import { LoginComponent } from './components/sidenav/login/login.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { SliderItemsComponent } from './components/sidenav/slider-items/slider-items.component';
import { SliderItemDirective } from './components/sidenav/slider-items/slider/slider-item.directive';
import { SliderComponent } from './components/sidenav/slider-items/slider/slider.component';
import { DpkParseService } from './components/dpk/slides/dpk-parse.service';
import { DriveAPIService } from './services/drive-api.service';
import { FirebaseService } from './services/firebase.service';
import { SideNavToggleService } from './services/side-nav-toggle.service';
import { ThemeService } from './services/theme.service';

@NgModule({
    declarations: [
        AppComponent,
        DpkFormComponent,
        LoginComponent,
        SliderComponent,
        SliderItemDirective,
        SliderItemsComponent,
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
        SideNavToggleService,
        ThemeService,
    ],
    bootstrap: [ AppComponent ],
})
export class AppModule {
}
