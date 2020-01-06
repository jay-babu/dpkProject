import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { SlidesComponent } from './components/slides/slides.component';

const appRoutes: Routes = [
    {path: '', pathMatch: 'full', redirectTo: 'dpk'},
    {path: 'dpk', component: SlidesComponent},
    {path: 'dpk/:id', component: SlidesComponent},
];

export const AppRoutingModule: ModuleWithProviders = RouterModule.forRoot(appRoutes);
