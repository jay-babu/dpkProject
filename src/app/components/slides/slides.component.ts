import { Component } from '@angular/core';
import { Bhajan } from '../../interface/bhajan';

@Component({
    selector: 'app-slides',
    templateUrl: './slides.component.html',
    styleUrls: ['./slides.component.css']
})
export class SlidesComponent {
    bhajan: Bhajan = {
        lyrics: [['Sāchā sādhu re, sundar guṇdhām;', 'Samjīne Satsang kījie...'],
            ['Jī re Sant sulakshaṇnā bharyā, avguṇno re,', 'Urmā nahi lesh, mahānubhavī muni te kharā;', 'Āpe sahune re, sācho upḍesh...'],
            ['Jī re sant sadā shītaḷ rahe, kyāre na tape re,', 'Kām krodhnī jhāḷ, lobh tajī Harine bhaje;', 'Dhāre urmā re, dradh karī Shrī Gopāḷ...'],
            ['Jī re tribhuvannī sampat maḷe, toy na taje re,', 'Ardha paḷ Haridhyān, brahmarūp thaī Harine bhaje;', 'Evā santne re, kīch kanak samān...'],
            ['Jī re em shubh lakshaṇ oḷkhī, sadā karvī re,', 'Harijannī sev, Hari sam harijan jāṇvā;', 'Muktānand kahe re te tare tatkhev...']
        ],
        definitions: [['The true sadhu is the wonderful abode of virtues.', 'Understanding this, do Satsang.'],
            ['The Sant is filled with good qualities.', 'There is not the slightest fault in his heart.', 'That sadhu is truly experienced. He gives everyone true advice.'],
            ['The Sant always remains cool, calm, and at peace.', 'He is never disturbed or bound by the nets of lust or anger.', 'He has renounced all greed and worships Bhagwan. He firmly holds Bhagwan in his heart.'],
            ['Even if the Sant were to receive the wealth of all the realms,', 'he would never give up his meditation of Bhagwan for even half-a-second.', 'He is brahmarup and worships Bhagwan. For such a Sant, mud and gold are equal.'],
            ['Recognizing [the sant] according to these pure qualities, constantly do his seva.', 'Understand him to be equal to Bhagwan.', 'Muktanand Swami says, “He will liberate you instantly...”']
        ],
        imagePaths: ['../assets/Sacha Sadhu Re - Akshar Patel.jpg',
            '../assets/Sacha Sadhu Re - Akshar Patel.jpg',
            '../assets/Sacha Sadhu Re - Akshar Patel.jpg',
            '../assets/Sacha Sadhu Re - Akshar Patel.jpg',
            '../assets/Sacha Sadhu Re - Akshar Patel.jpg'
        ]
    };

    constructor() {
    }
}
