import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
// Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule, HammerModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { environment } from '../environments/environment';
import { AngularMaterialModule } from './angular-material.module';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { FirebaseService } from './services/firebase.service';
import { SideNavToggleService } from './services/side-nav-toggle.service';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';

@NgModule({
    declarations: [
        AppComponent,
        SidenavComponent,
    ],
    imports: [
        AngularMaterialModule,
        AppRoutingModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFirestoreModule,
        AngularFireAuthModule,
        AngularFireAnalyticsModule,
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        ReactiveFormsModule,
        RouterModule,
        HammerModule,
    ],
    providers: [
        FirebaseService,
        SideNavToggleService,

    ],
    bootstrap: [ AppComponent ],
})
export class AppModule {
}
