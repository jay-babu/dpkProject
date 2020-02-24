import { ModuleWithProviders } from '@angular/core';
import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { DpkFormComponent } from './components/sidenav/dpk-form/dpk-form.component';
import { LoginComponent } from './components/sidenav/login/login.component';
import { PdfSlideComponent } from './components/dpk/pdf-slide/pdf-slide.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { SliderItemsComponent } from './components/sidenav/slider-items/slider-items.component';
import { SlidesComponent } from './components/dpk/slides/slides.component';
import { SingerViewComponent } from './components/dpk/singer-view/singer-view.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);

const appRoutes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'slides' },
    {
        path: 'dpk', children: [
            { path: 'pdf/:dpk/:name', component: PdfSlideComponent, },
            { path: ':dpk/:name', component: SlidesComponent, },
            { path: 'singerView/:dpk/:name', component: SingerViewComponent, },
        ]
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
