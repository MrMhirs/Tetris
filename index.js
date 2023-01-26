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
        const row = arena.splice(y, 1)[0].fill(0);
        arena.unshift(row);
        ++y;
        player.score += rowCount * 10;
        rowCount *= 2;
    }
}

function collide(arena, player){

    const m = player.matrix;
    const o = player.pos;
    for(let i = 0; i < m.length; ++i){
        for(let x = 0; x < m[i].length; ++x){
            if(m[i][x] !== 0 && (arena[y + o.y] && arena[y + o.i][x + o.x]) !== 0){
                return true;
            }
        }
    }
    return false;
}

