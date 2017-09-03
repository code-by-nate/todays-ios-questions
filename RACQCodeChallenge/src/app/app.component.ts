import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  questions : string[];
  
  ngOnInit() {
      this.questions = ["Question 1", "Question 2"];
  }
}
