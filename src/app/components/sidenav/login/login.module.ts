import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule, Routes } from '@angular/router'
import { LoginComponent } from './login.component'
import { MatCardModule } from '@angular/material/card'
import { ReactiveFormsModule } from '@angular/forms'
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'

const loginRoute: Routes = [{ path: '', component: LoginComponent }]

@NgModule({
    declarations: [LoginComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(loginRoute),
        MatCardModule,
        ReactiveFormsModule,
        MatInputModule,
        MatButtonModule,
    ],
})
export class LoginModule {}
