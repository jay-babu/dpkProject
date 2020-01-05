import { Component } from '@angular/core';
import { Bhajan } from './interface/bhajan';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'dpkProject';

    bhajan: Bhajan = {
        lyrics: [['First', 'Second', 'Third'], ['Fourth', 'Fifth', 'Sixth']],
        definitions: [['First', 'Second', 'Third'], ['Fourth', 'Fifth', 'Sixth']],
        imagePaths: ['../assets/Sacha Sadhu Re - Akshar Patel.jpg', '../assets/Sacha Sadhu Re - Akshar Patel.jpg']
    };
}
