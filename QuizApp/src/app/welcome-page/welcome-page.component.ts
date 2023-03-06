import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.css'],
})
export class WelcomePageComponent implements OnInit {
  @ViewChild('name') nameKey!: ElementRef;
  constructor() {}
  ngOnInit(): void {}
  startQuiz() {
    localStorage.setItem('name', this.nameKey.nativeElement.value);
  }
}
