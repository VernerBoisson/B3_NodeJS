const messages = require('../../messages.js')

class Player{
    constructor(name, mode){
        this.name = name
        this.score
        this.winner = false

        this.initScore(mode)
    }

    initScore(mode){
        switch (mode) {
            case messages.modename.worldtour:
                this.score = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]
                break;
            case messages.modename.threehundredone:
                this.score = 301
                break;
            case messages.modename.cricket:
                break;
            default:
                console.log(messages.errors.mode)
        }
    }
}

module.exports = Player