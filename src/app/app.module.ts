import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';


import { AppComponent } from './app.component';
import { AngularMaterialModule } from './angular-material.module';
import { SlideComponent } from './components/slide/slide.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SlidesComponent } from './components/slides/slides.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';

@NgModule({
    declarations: [
        AppComponent,
        SlideComponent,
        SlidesComponent,
        NavBarComponent
    ],
    imports: [
        AngularMaterialModule,
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule,
        AppRoutingModule
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {
}
