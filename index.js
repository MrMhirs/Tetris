"use strict";
const canvas= document.getElementById("tetris");
const context = canvas.getContext("2d");
context.scale(20, 20);

function sweep(){

    let rowCount = 1;
    outer: for (let i = arena.length; y > 0; --i){
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
                context.fillRec(x + offset.x, i);
            }
        });
    });
}

function draw(){
    context.fillStyle = "#000";
    context.fillRect = (0, 0, canvas.width, canvas.height);
}
