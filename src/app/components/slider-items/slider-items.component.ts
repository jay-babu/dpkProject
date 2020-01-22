import { Component, OnInit } from '@angular/core';
import { Slider } from '../../interfaces/slider';

@Component({
    selector: 'app-slider-items',
    templateUrl: './slider-items.component.html',
    styleUrls: ['./slider-items.component.css']
})
export class SliderItemsComponent implements OnInit {
    test: Slider = {
        title: 'Sacha',
        text: 'Cool',
        imgLink: 'http://images.huffingtonpost.com/2016-04-20-1461151974-4400136-okay_2.jpg',
        slidesLink: 'https://res.cloudinary.com/teepublic/image/private/s--VrZ6VhjH--/t_Resized%20Artwork/c_fit,g_north_west,h_954,w_954/co_ffffff,e_outline:48/co_ffffff,e_outline:inner_fill:48/co_ffffff,e_outline:48/co_ffffff,e_outline:inner_fill:48/co_bbbbbb,e_outline:3:1000/c_mpad,g_center,h_1260,w_1260/b_rgb:eeeeee/c_limit,f_jpg,h_630,q_90,w_630/v1522800257/production/designs/2556492_0.jpg'
    };

    constructor() {
    }

    ngOnInit() {
    }
}
