import { Component, OnInit } from '@angular/core'
import { auth } from 'firebase/app'
import { AngularFireAuth } from '@angular/fire/auth'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { Observable } from 'rxjs'
import { environment } from '../../../../environments/environment'
import { SideNavToggleService } from '../../../services/side-nav-toggle.service'
import { AngularFireAnalytics } from '@angular/fire/analytics'

declare var particlesJS: any
declare var gapi: any

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
    user$: Observable<any>
    emailSent = false

    errorMessage: string

    emailForm: FormGroup

    constructor(
        private afAuth: AngularFireAuth,
        private router: Router,
        private fb: FormBuilder,
        private sideNavToggleService: SideNavToggleService,
        private analytics: AngularFireAnalytics,
    ) {}

    ngOnInit() {
        this.user$ = this.afAuth.authState
        this.load()

        const url = this.router.url
        this.confirmSignIn(url)

        this.reactiveForm()
        setTimeout(() => this.sideNavToggleService.toggleSidenav(true), 0)
        particlesJS.load(
            'particles',
            'assets/data/particlesjs-image-config.json',
        )
    }

    /* Reactive form */
    reactiveForm() {
        this.emailForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
        })
    }

    async sendEmailLink() {
        const email = this.emailForm.value.email
        const actionCodeSettings = {
            // Redirect URL
            url: `${environment.url}login`,
            handleCodeInApp: true,
        }

        try {
            await this.afAuth.auth.sendSignInLinkToEmail(
                email,
                actionCodeSettings,
            )
            window.localStorage.setItem('emailForSignIn', email)
            this.emailSent = true
        } catch (err) {
            this.errorMessage = err.message
        }
    }

    naviDPKCreate() {
        return setTimeout(() => this.router.navigate(['../create']), 500)
    }

    confirmSignIn(url: string) {
        try {
            if (this.afAuth.auth.isSignInWithEmailLink(url)) {
                const email = window.localStorage.getItem('emailForSignIn')

                if (email) {
                    this.afAuth.auth
                        .signInWithEmailLink(email, url)
                        .then(user => {
                            const newUser = user.additionalUserInfo.isNewUser
                            this.analytics.logEvent('login', {
                                loginMethod: 'PasswordLess',
                            })
                            if (newUser) {
                                this.analytics.logEvent('sign_up', { newUser })
                            }
                            this.naviDPKCreate()
                        })
                    window.localStorage.removeItem('emailForSignIn')
                }

                // Sign In user and remove the email localStorage
            }
        } catch (err) {
            this.errorMessage = err.message
        }
    }

    public logout(): void {
        // NOTE: Firebase web-based user session are long-lived by default. If you want
        // to sign-out, you have to do so explicitly with an API call.
        this.afAuth.auth.signOut().then(
            () => {
                this.errorMessage = null
                this.emailSent = false
            },
            (error: any) => {
                this.errorMessage = error
            },
        )
    }

    load() {
        gapi.load('client', () => {
            gapi.client.init({
                apiKey: environment.firebaseConfig.apiKey,
                // clientId and scope are optional if auth is not required.
                clientId: environment.driveConfig.clientId,
                discoveryDocs: environment.driveConfig.discoveryDocs,
                scope: environment.driveConfig.scope,
            })
            gapi.auth2.init({
                // clientId and scope are optional if auth is not required.
                clientId: environment.driveConfig.clientId,
                scope: environment.driveConfig.scope,
            })

            gapi.client.load('drive', 'v3')
        })
    }

    async googleSignIn() {
        const googleAuth = gapi.auth2.getAuthInstance()
        let credential
        await googleAuth
            .signIn()
            .then(
                async (googleUser: {
                    getAuthResponse: () => {
                        (): any
                        new (): any
                        id_token: any
                    }
                }) => {
                    await this.analytics.logEvent('login', {
                        loginMethod: 'Google',
                    })
                    const token = googleUser.getAuthResponse().id_token
                    credential = auth.GoogleAuthProvider.credential(token)
                    await this.afAuth.auth.signInWithCredential(credential)
                    this.naviDPKCreate()
                },
            )
    }
}
