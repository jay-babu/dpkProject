import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'

@Injectable({
    providedIn: 'root',
})
export class SideNavToggleService {
    private sideNavToggleSubject = new BehaviorSubject(false)

    sideNavToggle$: Observable<boolean>

    constructor() {
        this.sideNavToggle$ = this.sideNavToggleSubject.asObservable()
    }

    toggleSidenav(show?: boolean) {
        this.sideNavToggleSubject.next(show || !this.sideNavToggleSubject.value)
    }
}
