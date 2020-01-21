class Players{
    constructor(){
        this.players = []
        this.rank = []
    }

    addPlayer(Player){
        this.players.push(Player)
    }

    lengthPlayers(){
        return this.players.length
    }

    addWinner(Player){
        this.rank.push(Player)
    }

    lengthRanking(){
        return this.rank.length
    }
}

module.exports = Players