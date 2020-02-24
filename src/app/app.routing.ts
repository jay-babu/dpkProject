import { ModuleWithProviders } from '@angular/core';
import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { DpkFormComponent } from './components/sidenav/dpk-form/dpk-form.component';
import { LoginComponent } from './components/sidenav/login/login.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { SliderItemsComponent } from './components/sidenav/slider-items/slider-items.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);

const appRoutes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'slides' },
    {
        path: 'dpk', loadChildren: () => import('./components/dpk/dpk.module').then(m => m.DpkModule),
    },
    {
        path: '', component: SidenavComponent, children: [
            { path: 'login', component: LoginComponent, },
            {
                path: 'dpkCreate',
                component: DpkFormComponent,
                canActivate: [AngularFireAuthGuard],
                data: { authGuardPipe: redirectUnauthorizedToLogin },
            },
            { path: 'privacy-policy', component: PrivacyPolicyComponent, },
            { path: 'slides', component: SliderItemsComponent, },
        ]
    },
    { path: '**', redirectTo: 'slides' }
];

export const AppRoutingModule: ModuleWithProviders = RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules });
