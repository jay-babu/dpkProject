import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { SideNavToggleService } from '../../services/side-nav-toggle.service';
import { ThemeService } from '../../services/theme.service';

@Component({
    selector: 'app-sidenav',
    templateUrl: './sidenav.component.html',
    styleUrls: [ './sidenav.component.css' ]
})
export class SidenavComponent implements OnInit, OnDestroy {
    isDarkTheme$: Observable<boolean>;

    isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
        .pipe(
            map(result => result.matches),
            shareReplay()
        );

    opened: boolean;

    subscriptions: Subscription[] = [];


    constructor(private breakpointObserver: BreakpointObserver,
                public sideNavToggleService: SideNavToggleService,
                private themeService: ThemeService) {
    }

    ngOnInit(): void {
        this.subscriptions.push(this.sideNavToggleService.sideNavToggle$.subscribe(bool => this.opened = bool));
        this.isDarkTheme$ = this.themeService.isDarkTheme$;
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }

    toggleDarkTheme(checked: boolean) {
        this.themeService.setDarkTheme(checked);
    }
}
