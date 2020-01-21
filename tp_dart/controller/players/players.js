class Players{
    constructor(){
        this.players = []
    }

    add(Player){
        this.players.push(Player)
    }

    length(){
        return this.players.length
    }
}

module.exports = Players