import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-home',
    templateUrl: './faq.component.html',
    styleUrls: ['./faq.component.css']
})
export class FaqComponent {
    myFunction1(element, text) {
        const x = document.getElementById('myDIV1');
        if (x.style.display === 'block') {
            element.textContent = '+';
            x.style.display = 'none';
        } else {
            element.textContent = text;
            x.style.display = 'block';
        }
    }

    myFunction2(element, text) {
        const x = document.getElementById('myDIV2');
        if (x.style.display === 'block') {
            x.style.display = 'none';
            element.textContent = '+';
        } else {
            x.style.display = 'block';
            element.textContent = text;
        }
    }

    myFunction3(element, text) {
        const x = document.getElementById('myDIV3');
        if (x.style.display === 'block') {
            x.style.display = 'none';
            element.textContent = '+';
        } else {
            x.style.display = 'block';
            element.textContent = text;
        }
    }
}
