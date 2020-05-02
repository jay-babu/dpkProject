import { Component, OnInit } from '@angular/core'
import { auth } from 'firebase/app'
import { AngularFireAuth } from '@angular/fire/auth'
import { FormBuilder, FormGroup } from '@angular/forms'
import { Router } from '@angular/router'
import { Observable } from 'rxjs'
import { SideNavToggleService } from '../../../services/side-nav-toggle.service'
import { AngularFireAnalytics } from '@angular/fire/analytics'

declare var particlesJS: any

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: [ './login.component.css' ],
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
    ) {
    }

    ngOnInit() {
        this.user$ = this.afAuth.authState
        setTimeout(() => this.sideNavToggleService.toggleSidenav(true), 0)
        particlesJS.load(
            'particles',
            'assets/data/particlesjs-image-config.json',
        )
    }

    gmailLogin() {
        this.afAuth.signInWithPopup(new auth.GoogleAuthProvider()).then((user: auth.UserCredential) => {
            this.logLogin(user, 'Gmail')
        }).then(_ => this.errorMessage = 'Please Sign In using your original sign in method.')
    }

    githubLogin() {
        this.afAuth.signInWithPopup(new auth.GithubAuthProvider()).then((user: auth.UserCredential) => {
            this.logLogin(user, 'GitHub')
        }).catch(_ => this.errorMessage = 'Please Sign In using your original sign in method.')
    }

    private logLogin(user: auth.UserCredential, loginMethod: string) {
        const newUser = user.additionalUserInfo.isNewUser
        this.analytics.logEvent('login', {
            loginMethod: loginMethod,
        })
        if (newUser) {
            this.analytics.logEvent('sign_up', { newUser })
        }
        this.naviDPKCreate()
    }

    logout() {
        this.afAuth.signOut()
    }

    naviDPKCreate() {
        return setTimeout(() => this.router.navigate([ '../create' ]), 500)
    }
}
