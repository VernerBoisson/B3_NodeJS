const Mode = require('./mode')

class ThreeHundredOne extends Mode{
    constructor(name){
        super(name)
        this.winnable = false
    }

    run(score, multiplicator, player){
        let result = player.score - score
        if(result === 0 && multiplicator===2){
            player.score = result
            player.isPlaying = false
        }else if(result > 1){
            player.score = result
        }
    }
}

module.exports = ThreeHundredOne