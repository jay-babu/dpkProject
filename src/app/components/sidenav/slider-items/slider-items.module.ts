import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SliderItemsComponent } from './slider-items.component';
import { SliderComponent } from './slider/slider.component';
import { TutorialModule } from '../../tutorial/tutorial.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { SliderService } from './slider/slider.service';

const sliderRoutes: Routes = [
    { path: '', component: SliderItemsComponent },
];

@NgModule({
    declarations: [
        SliderItemsComponent,
        SliderComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(sliderRoutes),
        MatToolbarModule,
        TutorialModule,
        MatIconModule,
        MatCardModule,
        MatButtonModule,
    ],
    providers: [
        SliderService,
    ]
})
export class SliderItemsModule {
}
