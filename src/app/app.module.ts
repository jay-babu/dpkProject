import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
// Firebase
import { AngularFireModule } from '@angular/fire'
import { AngularFireAuthModule } from '@angular/fire/auth'
import { AngularFirestoreModule } from '@angular/fire/firestore'
import { ReactiveFormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { RouterModule } from '@angular/router'
import { environment } from '../environments/environment'

import { AppComponent } from './app.component'
import { AppRoutingModule } from './app.routing'
import { SidenavComponent } from './components/sidenav/sidenav.component'
import { FirebaseService } from './services/firebase.service'
import { SideNavToggleService } from './services/side-nav-toggle.service'
import {
    AngularFireAnalyticsModule,
    ScreenTrackingService,
} from '@angular/fire/analytics'
import { LottieModule } from 'ngx-lottie'
import { ServiceWorkerModule } from '@angular/service-worker'
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatButtonModule } from '@angular/material/button'
import { MatListModule } from '@angular/material/list'
import { MatIconModule } from '@angular/material/icon'

export function playerFactory() {
    return import('lottie-web')
}

@NgModule({
    declarations: [AppComponent, SidenavComponent],
    imports: [
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
        ServiceWorkerModule.register('ngsw-worker.js', {
            enabled: environment.production,
        }),
        MatSidenavModule,
        MatToolbarModule,
        MatButtonModule,
        MatListModule,
        MatIconModule,
    ],
    providers: [FirebaseService, SideNavToggleService, ScreenTrackingService],
    bootstrap: [AppComponent],
})
export class AppModule {}
