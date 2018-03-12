import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'wallet',
    templateUrl: './wallet.component.html',
    styleUrls: ['./wallet.component.css']
})

export class WalletComponent implements OnInit {
    constructor() {}
    private points = 17;

    showInfo() {
    const popup = document.getElementById('myPopup');
    popup.classList.toggle('show');
  }

  doSomething() {

  }

  ngOnInit() {}
}
