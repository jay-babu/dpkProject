import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule, Routes } from '@angular/router'
import { PrivacyPolicyComponent } from '../privacy-policy/privacy-policy.component'
import { ThemeService } from '../../services/theme.service'
import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard'

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo([ 'login' ])

const sidenavRoutes: Routes = [
    {
        path: 'login',
        loadChildren: () =>
            import('./login/login.module').then(m => m.LoginModule),
    },
    {
        path: 'create',
        loadChildren: () =>
            import('./dpk-form/dpk-form.module').then(m => m.DpkFormModule),
    },
    { path: 'privacy-policy', component: PrivacyPolicyComponent },
    {
        path: 'slides',
        loadChildren: () =>
            import('./slider-items/slider-items.module').then(
                m => m.SliderItemsModule,
            ),
        canActivate: [ AngularFireAuthGuard ],
        data: { authGuardPipe: redirectUnauthorizedToLogin },
    },
]

@NgModule({
    declarations: [ PrivacyPolicyComponent ],
    imports: [ CommonModule, RouterModule.forChild(sidenavRoutes) ],
    providers: [ ThemeService ],
})
export class SidenavModule {
}
