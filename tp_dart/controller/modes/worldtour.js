const Mode = require('./mode')

class WorldTour extends Mode{
    constructor(name){
        super(name)
    }

    run(secteur, multiplicator=null,player){
        if(player.score[0] ==secteur){
            player.score.shift()
        }
        if(!player.score.length > 0){
            player.isPlaying = false
        }
    }
}

module.exports = WorldTour