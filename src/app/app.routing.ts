import { ModuleWithProviders } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { SidenavComponent } from './components/sidenav/sidenav.component';


const appRoutes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'slides' },
    { path: 'dpk', loadChildren: () => import('./components/dpk/dpk.module').then(m => m.DpkModule), },
    {
        path: '',
        component: SidenavComponent,
        loadChildren: () => import('./components/sidenav/sidenav.module').then(m => m.SidenavModule),
    },
    { path: '**', redirectTo: 'slides' }
];

export const AppRoutingModule: ModuleWithProviders = RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules });
