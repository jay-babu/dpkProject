import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { TutorialComponent } from './tutorial.component'
import { MatButtonModule } from '@angular/material/button'
import { FontAwesomeModule } from '../../font-awesome.module'
import { MatTableModule } from '@angular/material/table'
import { MatDialogModule } from '@angular/material/dialog'

@NgModule({
    declarations: [TutorialComponent],
    imports: [
        CommonModule,
        MatButtonModule,
        FontAwesomeModule,
        MatTableModule,
        MatDialogModule,
    ],
    exports: [TutorialComponent],
})
export class TutorialModule {}
