"use strict";
/// <reference path="../TSDef/p5.global-mode.d.ts" />
const size = 800;
let grid;
let squares = [];
let turn = true;
let endgame = false;
let winner = undefined;
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
            textAlign(CENTER, CENTER);
            fill(0, 0, 0);
            textSize(60);
            text(square.letter, square.x + size / 6, square.y + size / 6);
        }
    });
    if (winner) {
        textSize(150);
        fill(255, 0, 0);
        text(winner, width / 2, height / 2);
    }
}
function mousePressed() {
    if (!endgame) {
        squares.forEach((square) => {
            if (square.x < mouseX &&
                square.x + size / 3 > mouseX &&
                square.y < mouseY &&
                square.y + size / 3 > mouseY) {
                if (square.letter === undefined) {
                    square.letter = pickLetter();
                    turn = !turn;
                    console.log(square.letter);
                }
            }
        });
        winner = check();
    }
}
function check() {
    const row1 = squares.slice(0, 3);
    const row2 = squares.slice(3, 6);
    const row3 = squares.slice(6);
    let winner;
    const horizontal = (row) => {
        if (row.every((square) => square.letter !== undefined)) {
            if (row[0].letter === row[1].letter && row[1].letter === row[2].letter) {
                endgame = true;
                winner = row[0].letter;
            }
        }
    };
    const vertical = (square1, square2, square3) => {
        const sq = [square1, square2, square3];
        if (sq.every((square) => square.letter !== undefined)) {
            if (square1.letter === square2.letter &&
                square2.letter === square3.letter) {
                endgame = true;
                winner = square1.letter;
            }
        }
    };
    if (row1[0].letter !== undefined &&
        row2[1].letter !== undefined &&
        row3[2] !== undefined) {
        if (row1[0].letter === row2[1].letter &&
            row2[1].letter === row3[2].letter) {
            endgame = true;
            winner = row1[0].letter;
        }
    }
    if (row1[2].letter !== undefined &&
        row2[1].letter !== undefined &&
        row3[0] !== undefined) {
        if (row1[2].letter === row2[1].letter &&
            row2[1].letter === row3[0].letter) {
            endgame = true;
            winner = row1[2].letter;
        }
    }
    horizontal(row1);
    horizontal(row2);
    horizontal(row3);
    vertical(row1[0], row2[0], row3[0]);
    vertical(row1[1], row2[1], row3[1]);
    vertical(row1[2], row2[2], row3[2]);
    console.log(endgame);
    if (!winner) {
        if (squares.every((square) => square.letter)) {
            winner = "Tie";
        }
    }
    return winner;
}
function pickLetter() {
    return turn === true ? "X" : "O";
}
class Grid {
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
                const current = this.grid[i][j];
                rect(current.x, current.y, size / 3, size / 3);
            }
        }
    }
}
