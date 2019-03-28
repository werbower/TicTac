import { Component, OnInit } from '@angular/core';
import { Player } from './player';
import { Box } from './box';

enum  GameStaus {
  Pause = 'pause',
  Play = 'play',
  Win = 'win',
  Standoff = 'standoff'
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'Tic Tac Toe';
  player1 = new Player('', 'clear');
  player2 = new Player('', 'panorama_fish_eye');
  boxes: Box[] = [];
  currentPlayer: Player;
  gameStatus: string;
  winner: Player;

  constructor() {

  }

  ngOnInit(): void {
    this.gameStatus = GameStaus.Pause;
    this.generateBoxes();
  }

  generateBoxes() {
    this.boxes = [];
    for (let x = 1; x <= 3 ; x++) {
      for (let y = 1; y <= 3 ; y++) {
        this.boxes.push(new Box(x, y));
      }
    }
  }

  onHit(box: Box) {
    if (this.gameStatus === GameStaus.Play && !box.player) {
      box.player = this.currentPlayer;
      if (this.isWin(this.currentPlayer)) {
        this.gameStatus = GameStaus.Win;
        this.winner = this.currentPlayer;
      } else if (!this.canPlay()) {
        this.gameStatus = GameStaus.Standoff;
      } else {
        this.currentPlayer = this.currentPlayer === this.player1 ? this.player2 : this.player1;
      }
    }
  }
  onStart() {
    this.winner = null;
    this.currentPlayer = this.player1;
    this.boxes.forEach(x => x.player = null);
    this.gameStatus = GameStaus.Play;
  }

  getStatus() {
    if (this.gameStatus === GameStaus.Pause) {
      return ' click start for play';
    } else if (this.gameStatus === GameStaus.Standoff) {
      return 'standoff. click start for play';
    } else if (this.gameStatus === GameStaus.Play) {
      const p = this.currentPlayer === this.player1 ? 'player1 ' : 'player2 ';
      return p + this.currentPlayer.name;
    } else if (this.gameStatus === GameStaus.Win) {
      const p = this.winner === this.player1 ? 'player1 ' : 'player2 ';
      return p + this.winner.name + ' win. click start for play';
    }
  }

  canPlay() {
    const r = this.boxes.findIndex(x => !x.player) > -1;
    console.log('can play ', r);
    return r;
  }

  isWin(player: Player): boolean {

    for (let i = 1; i <= 3; i++) {
      const qX = this.boxes.filter(x => x.player === player && x.x === i).length;
      if (qX === 3) {
        return true;
      }
      const qY = this.boxes.filter(x => x.player === player && x.y === i).length;
      if (qY === 3) {
        return true;
      }
    }

    let q = this.boxes.filter(x => x.player === player && x.x === x.y).length;
    if (q === 3) {
      return true;
    }
    q = this.boxes.filter(x => x.player === player && x.x + x.y === 4).length;
    if (q === 3) {
      return true;
    }

    return false;
  }
}
