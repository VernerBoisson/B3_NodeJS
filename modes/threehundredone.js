const Mode = require('./mode')

class ThreeHundredOne extends Mode{
    constructor(name){
        super(name)
    }

    run(score, player){
        score = score.reduce( (a,b) => +a + +b)
        let result = player.score - score
        if(result == 0){
            player.score = result
            player.winner = true
        }else if(result > 0){
            player.score = result
        }
    }
}

module.exports = ThreeHundredOne