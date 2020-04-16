import { Injectable } from '@angular/core'
import { Observable, Subject } from 'rxjs'

@Injectable({
    providedIn: 'root',
})
export class ThemeService {
    private _darkTheme = new Subject<boolean>()
    isDarkTheme$: Observable<boolean>

    constructor() {
        this.isDarkTheme$ = this._darkTheme.asObservable()
    }

    setDarkTheme(isDarkTheme: boolean): void {
        this._darkTheme.next(isDarkTheme)
    }
}
