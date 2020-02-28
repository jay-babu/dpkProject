import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DpkFormComponent } from './dpk-form/dpk-form.component';
import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { PrivacyPolicyComponent } from '../privacy-policy/privacy-policy.component';
import { SliderItemsComponent } from './slider-items/slider-items.component';
import { SliderComponent } from './slider-items/slider/slider.component';
import { DpkFormService } from './dpk-form/dpk-form.service';
import { DpkParseService } from '../dpk/slides/dpk-parse.service';
import { ThemeService } from '../../services/theme.service';
import { AngularMaterialModule } from '../../angular-material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SliderService } from './slider-items/slider/slider.service';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo([ 'login' ]);

const sidenavRoutes: Routes = [
    {path: 'login', component: LoginComponent,},
    {
        path: 'dpkCreate',
        component: DpkFormComponent,
        canActivate: [ AngularFireAuthGuard ],
        data: {authGuardPipe: redirectUnauthorizedToLogin},
    },
    {path: 'privacy-policy', component: PrivacyPolicyComponent,},
    {path: 'slides', component: SliderItemsComponent,},
];

@NgModule({
    declarations: [
        LoginComponent,
        DpkFormComponent,
        PrivacyPolicyComponent,
        SliderItemsComponent,
        SliderComponent,
    ],
    imports: [
        AngularMaterialModule,
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild(sidenavRoutes),
    ],
    providers: [
        AngularFireAuthGuard,
        DpkFormService,
        DpkParseService,
        SliderService,
        ThemeService,
    ],
})
export class SidenavModule {
}
