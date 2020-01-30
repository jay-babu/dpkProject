import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
    imports: [
        CommonModule,
        MatButtonModule,
        MatToolbarModule,
        MatIconModule,
        MatSidenavModule,
        MatBadgeModule,
        MatListModule,
        MatGridListModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatRadioModule,
        MatDatepickerModule,
        MatChipsModule,
        MatTooltipModule,
        MatTableModule,
        MatPaginatorModule,
        MatCardModule
    ], exports: [
        MatButtonModule,
        MatToolbarModule,
        MatIconModule,
        MatSidenavModule,
        MatBadgeModule,
        MatListModule,
        MatGridListModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatRadioModule,
        MatDatepickerModule,
        MatChipsModule,
        MatTooltipModule,
        MatTableModule,
        MatPaginatorModule,
        MatCardModule
    ]
})

export class AngularMaterialModule {
}
