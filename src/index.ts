/// <reference path="../TSDef/p5.global-mode.d.ts" />

const size = 800;
let grid: Grid;
let squares: Array<{ x: number; y: number; letter?: string }> = [];
let turn = true;

function setup() {
  createCanvas(size, size);
  background(0);
  grid = new Grid();
}

function draw() {
  background(0);
  grid.show();
  squares.forEach((square) => {
    if (square.letter) {
      fill(0, 0, 0);
      textSize(60);
      text(square.letter, square.x + size / 6, square.y + size / 6);
    }
  });
}

function mousePressed() {
  squares.forEach((square) => {
    if (
      square.x < mouseX &&
      square.x + size / 3 > mouseX &&
      square.y < mouseY &&
      square.y + size / 3 > mouseY
    ) {
      if (square.letter === undefined) {
        square.letter = pickLetter();
        turn = !turn;
        console.log(square.letter);
      }
    }
  });
}

function pickLetter() {
  return turn === true ? "X" : "O";
}

class Grid {
  grid: Array<any[]>;
  constructor() {
    this.grid = new Array(3);
    for (let i = 0; i < 3; i++) {
      this.grid[i] = new Array(3);
    }

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        this.grid[i][j] = {
          x: floor((size / 3) * j),
          y: floor((size / 3) * i),
        };
        squares.push(this.grid[i][j]);
      }
    }
  }

  show() {
    fill(255, 255, 255);
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const current: { x: number; y: number } = this.grid[i][j];
        rect(current.x, current.y, size / 3, size / 3);
      }
    }
  }
}
