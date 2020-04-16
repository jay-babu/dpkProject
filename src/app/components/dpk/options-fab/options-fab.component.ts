import { Component, HostListener, OnInit } from '@angular/core'
import { TutorialDialog } from '../../tutorial/tutorial-dialog'

@Component({
    selector: 'app-options-fab',
    templateUrl: './options-fab.component.html',
    styleUrls: ['./options-fab.component.css'],
})
export class OptionsFabComponent implements OnInit {
    toggleButton: boolean
    timer: any

    sliderTutorial: TutorialDialog[]

    @HostListener('document:mousemove', ['$event'])
    onMouseMove() {
        this.toggleButton = true
        this.timeClear()
        this.timer = setTimeout(() => (this.toggleButton = false), 1300)
    }

    constructor() {}

    ngOnInit(): void {
        this.toggleButton = false

        this.sliderTutorial = [
            {
                key: `Play Button (Bottom Left)`,
                usages: `(If available) Plays Bhajan Audio and AUTO Navigates Slides`,
            },
            {
                key: `Full Screen (Bottom Right)`,
                usages: `Enter/Exit Full Screen (Not available on Mobile Devices)`,
            },
            {
                key: `Settings`,
                usages: `Change Font Style or Hide Definitions`,
            },
            {
                key: `Globe`,
                usages: `(If available) Switch between Gujarati and English Lyrics`,
            },
            { key: `Arrow Right`, usages: `Goes to Next Slide` },
            { key: `Arrow Left`, usages: `Goes to Previous Slide` },
            {
                key: `'B' Keyboard Button`,
                usages: `Press B to fade in/out screen`,
            },
            {
                key: `'F' Keyboard Button`,
                usages: `Press F to toggle Fullscreen Mode`,
            },
            {
                key: `Clicker Compatibility`,
                usages: `Compatible with Most Clickers`,
            },
        ]
    }

    timeClear() {
        clearTimeout(this.timer)
    }
}
