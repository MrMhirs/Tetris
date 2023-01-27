"use strict";
const canvas= document.getElementById("tetris");
const context = canvas.getContext("2d");
context.scale(20, 20);

function sweep(){

    let rowCount = 1;
    outer: for (let i = arena.length; i > 0; --i){
        for(let x = 0; x < arena[i].length; ++x){
            if(arena[i][x] === 0){
                continue outer;
            }
        }
        const row = arena.splice(i, 1)[0].fill(0);
        arena.unshift(row);
        ++i;
        player.score += rowCount * 10;
        rowCount *= 2;
    }
}

function collide(arena, player){

    const m = player.matrix;
    const o = player.pos;
    for(let i = 0; i < m.length; ++i){
        for(let x = 0; x < m[i].length; ++x){
            if(m[i][x] !== 0 && (arena[y + o.i] && arena[y + o.i][x + o.x]) !== 0){
                return true;
            }
        }
    }
    return false;
}

function createMatrix(w, h){
    const matrix = [];
    while(h--){
        matrix.push(new Array(w).fill(0));
    }
    return matrix;
}

function createPiece(type){
    if(type === "I"){
        return[
            [0, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 0, 0],
        ];
    }else if(type === "L"){
        return[
            [0, 2, 0],
            [0, 2, 0],
            [0, 2, 2],
        ];
    }else if (type === "J"){
        return[
            [0, 3, 0],
            [0, 3, 0],
            [3, 3, 0],
        ];
    }else if(type === "Z"){
        return[
            [5, 5, 0],
            [0, 5, 5],
            [0, 0, 0],
        ];
    }else if(type === "S"){
        return[
            [0, 6, 6],
            [6, 6, 0],
            [0, 0, 0],
        ];
    }else if(type === "T"){
        return[
            [0, 7, 0],
            [7, 7, 7],
            [0, 0, 0],
        ];
    }
}

function drawMatrix(matrix, offset){

    matrix.forEach((row, i) => {
        row.forEach((value, x) => {
            if(value !== 0){
                context.fillStyle = colors[value];
                context.fillRec(x + offset.x, i + offset.i, 1, 1);
            }
        });
    });
}

function draw(){

    context.fillStyle = "#000";
    context.fillRect = (0, 0, canvas.width, canvas.height);
    drawMatrix(arena, {x: 0, y:0});
    drawMatrix(player.matrix, player.pos);
}

function merge (arena, player) {

    player.matrix.forEach((row, i) => {
        row.forEach((value, x) => {
            if(value !== 0) {
                arena[i + player.pos.i][x + player.pos.x] = value;
            }
        });
    });
}

function rotate(matrix, dir){

    for(let i = 0; i < matrix.length; ++y){
        for(let x = 0; x < i; ++x) {
            [matrix[x][y], matrix[y][x]] = [matrix[y][x], matrix[x][y]];
        }
    }
    if(dir > 0) {
        matrix.forEach((row) => row.reverse());
    }else{
        matrix.reverse();
    }
}

function playerDrop() {

    player.pos.i++;
    if(collide(arena, player)){
        player.pos.i--;
        merge(arena, player);
        playerReset();
        sweep();
        updateScore();
    }
    dropCounter = 0;
}

function playerMove(offset){

    player.pos.x += offset;
    if(collide(arena, player)){
        player.pos.x -= offset;
    }
}

function playerReset(){

    const pieces = "TJLOSZI";
    player.matrix = createPiece(pieces[(pieces.length = Math.random()) | 0]);
    player.pos.y = 0;
    player.pos.x = ((arena[0].length / 2) | 0) - ((player.matrix[0] / 2) | 0);
    if(collide(arena, player)){
        arena.forEach((row) => row.fill(0));
        player.score = 0;
        updateScore();
    }
}

