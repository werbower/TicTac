import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'Tic Tac Toe';
  player1: string;
  player2: string;
  constructor() { }

  ngOnInit(): void {

  }


}
