import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { DpkFormComponent } from './dpk-form.component'
import { DpkFormService } from './dpk-form.service'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatIconModule } from '@angular/material/icon'
import { ReactiveFormsModule } from '@angular/forms'
import { MatStepperModule } from '@angular/material/stepper'
import { MatRadioModule } from '@angular/material/radio'
import { MatDividerModule } from '@angular/material/divider'
import { MatButtonModule } from '@angular/material/button'
import { MatSelectModule } from '@angular/material/select'
import { MatInputModule } from '@angular/material/input'
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import { MatCardModule } from '@angular/material/card'
import { RouterModule, Routes } from '@angular/router'
import {
    AngularFireAuthGuard,
    redirectUnauthorizedTo,
} from '@angular/fire/auth-guard'
import { DpkParseService } from '../../dpk/slides/dpk-parse.service'
import { FormCardsComponent } from './form-cards/form-cards.component'

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login'])

const dpkFormRoutes: Routes = [
    {
        path: '',
        component: DpkFormComponent,
        canActivate: [AngularFireAuthGuard],
        data: { authGuardPipe: redirectUnauthorizedToLogin },
    },
]

@NgModule({
    declarations: [DpkFormComponent, FormCardsComponent],
    imports: [
        CommonModule,
        MatToolbarModule,
        MatIconModule,
        ReactiveFormsModule,
        MatStepperModule,
        MatRadioModule,
        MatDividerModule,
        MatButtonModule,
        MatSelectModule,
        MatInputModule,
        MatSlideToggleModule,
        MatCardModule,
        RouterModule.forChild(dpkFormRoutes),
    ],
    providers: [AngularFireAuthGuard, DpkFormService, DpkParseService],
})
export class DpkFormModule {}
