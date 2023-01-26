"use strict";
const canvas= document.getElementById("tetris");
const context = canvas.getContext("2d");
context.scale(20, 20);

function Sweep(){

    let rowCount = 1;
    outer: for (let i = arena.length; y > 0; --i){
        for(let x = 0; x < arena[i].length; ++x){
            if(arena[i][x] === 0){
                continue outer;
            }
        }
        const row = arena.splice(y, 1)[0].fill(0);
        arena.unshift(row);
        ++y;
        player.score += rowCount * 10;
        rowCount *= 2;
    }
}