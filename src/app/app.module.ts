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
import { AngularFireAnalyticsModule, ScreenTrackingService } from '@angular/fire/analytics';
import { LottieModule } from 'ngx-lottie';
import { ServiceWorkerModule } from '@angular/service-worker';

export function playerFactory() {
    return import('lottie-web');
}

@NgModule({
    declarations: [
        AppComponent,
        SidenavComponent,
    ],
    imports: [
        AngularMaterialModule,
        AppRoutingModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFirestoreModule.enablePersistence({ synchronizeTabs: true }),
        AngularFireAuthModule,
        AngularFireAnalyticsModule,
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        LottieModule.forRoot({ player: playerFactory }),
        ReactiveFormsModule,
        RouterModule,
        HammerModule,
        ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    ],
    providers: [
        FirebaseService,
        SideNavToggleService,
        ScreenTrackingService,
    ],
    bootstrap: [ AppComponent ],
})
export class AppModule {
}
