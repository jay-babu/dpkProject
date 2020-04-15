import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs'
import { fadeAnimation } from './animations/fade.animation'
import { ThemeService } from './services/theme.service'

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    animations: [fadeAnimation],
})
export class AppComponent implements OnInit {
    title = 'dpkProject'
    isDarkTheme$: Observable<boolean>

    constructor(private themeService: ThemeService) {}

    ngOnInit(): void {
        this.isDarkTheme$ = this.themeService.isDarkTheme$
    }
}
