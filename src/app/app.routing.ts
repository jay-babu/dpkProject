import { ModuleWithProviders } from '@angular/core';
import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { DpkFormComponent } from './components/dpk-form/dpk-form.component';
import { PasswordlessAuthComponent } from './components/passwordless-auth/passwordless-auth.component';
import { PdfSlideComponent } from './components/pdf-slide/pdf-slide.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { SliderItemsComponent } from './components/slider-items/slider-items.component';
import { SlidesComponent } from './components/slides/slides.component';
import { TestComponent } from './components/test/test.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);

const appRoutes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'slides' },
    {
        path: 'dpk', children: [
            { path: 'pdf/:dpk/:name', component: PdfSlideComponent, },
            { path: ':dpk/:name', component: SlidesComponent, },
        ]
    },
    {
        path: '', component: SidenavComponent, children: [
            { path: 'login', component: PasswordlessAuthComponent, },
            {
                path: 'dpkCreate',
                component: DpkFormComponent,
                canActivate: [AngularFireAuthGuard],
                data: { authGuardPipe: redirectUnauthorizedToLogin },
            },
            { path: 'privacy-policy', component: PrivacyPolicyComponent, },
            { path: 'slides', component: SliderItemsComponent, },
            { path: 'test', component: TestComponent, },
        ]
    },
    { path: '**', redirectTo: 'slides' }
];

export const AppRoutingModule: ModuleWithProviders = RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules });
