import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { OptionsFabComponent } from './options-fab.component'
import { LottieAudioFabComponent } from './lottie-audio-fab/lottie-audio-fab.component'
import { LottieLangFabComponent } from './lottie-lang-fab/lottie-lang-fab.component'
import { OptionsComponent } from './options/options.component'
import { MatIconModule } from '@angular/material/icon'
import { MatTooltipModule } from '@angular/material/tooltip'
import { RouterModule } from '@angular/router'
import { TutorialModule } from '../../tutorial/tutorial.module'
import { MatButtonModule } from '@angular/material/button'
import { MatDialogModule } from '@angular/material/dialog'
import { ReactiveFormsModule } from '@angular/forms'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatSelectModule } from '@angular/material/select'
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import { LottieModule } from 'ngx-lottie'
import { ToggleFullScreenModule } from '../../../directive/toggle-full-screen/toggle-full-screen.module'

@NgModule({
    declarations: [
        OptionsFabComponent,
        LottieAudioFabComponent,
        LottieLangFabComponent,
        OptionsComponent,
    ],
    imports: [
        CommonModule,
        MatIconModule,
        MatTooltipModule,
        RouterModule,
        TutorialModule,
        MatButtonModule,
        MatDialogModule,
        ReactiveFormsModule,
        MatSelectModule,
        MatSlideToggleModule,
        LottieModule,
        ToggleFullScreenModule,
    ],
    exports: [OptionsFabComponent],
})
export class OptionsFabModule {}
