import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    private slideIndex: number;

    constructor() {}

    ngOnInit() {
        this.slideIndex = 1;
        this.currentSlide(this.slideIndex);
        this.changeSlide();
    }

    showSlides(n) {
        let i: number;
        const slides = document.getElementsByClassName('mySlides');
        const dots = document.getElementsByClassName('dot');
        console.log('Slides length is ' + slides.length);
        console.log('Current slide is ' + this.slideIndex);
        if (n > slides.length) {
            this.slideIndex = 1;
        }
        if (n < 1) {
            this.slideIndex = slides.length;
        }
        for (i = 0; i < slides.length; i++) {
            slides[i].classList.add('stylenone');
        }
        for (i = 0; i < dots.length; i++) {
            dots[i].classList.remove('active');
        }
        slides[this.slideIndex - 1].classList.remove('stylenone');
        slides[this.slideIndex - 1].classList.add('styleblock');
        dots[this.slideIndex - 1].classList.add('active');
    }
    plusSlides(n) {
        this.showSlides((this.slideIndex += n));
    }
    currentSlide(n) {
        this.showSlides((this.slideIndex = n));
    }
    changeSlide() {
        setInterval(() => {
            this.plusSlides(1);
        }, 5000); // Change image every 2 seconds
    }
}
