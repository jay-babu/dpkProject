// fade.animation.ts
import { animate, state, style, transition, trigger } from '@angular/animations';

export const fadeAnimation =

    // the fade-in/fade-out animation.
    trigger('openClose', [
        // ...
        state('open', style({opacity: 1})),
        state('closed', style({opacity: 0})),
        transition('open => closed', [
            animate('0.5s ease-in')
        ]),
        transition('closed => open', [
            animate('0.5s ease-out')
        ]),
        transition(':enter', [
            style({opacity: 0}),
            animate('0.5s ease-in', style({opacity: 1}))
        ])
    ]);
