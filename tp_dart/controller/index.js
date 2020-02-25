const inquirer = require('inquirer')
const questions = require('./questions')
const Players = require('./players/players')
const Player = require('./players/player')
const WorldTour = require('./modes/worldtour')
const ThreeHundredOne = require('./modes/threehundredone')
const Cricket = require('./modes/cricket')
const messages = require('../assets/messages')
const tools = require('./tools')
const events = require('../events/events')

events.on('play', play)

async function shots(player, position){
    for(let i=0; i<3; i++){
        let score = 0
        let sector = await events.emit('shots').sector
        multiplicator = await events.emit('shots').multiplicator
        score = sector.score * multiplicator.multiplicator
        await mode.run(score, multiplicator.multiplicator, player)
        if(!player.isPlaying){
            players.addWinner(player)
            player.winner = position
            position++
            break
        }
    }
}


async function play(){
    const players = new Players()
    let position = 1
    const answerMode = await events.emit('game').mode
    const answerPlayer = await events.emit('players')

    tools.switch(answerMode, 
        () => mode = new WorldTour(answerMode.mode),
        () => mode = new ThreeHundredOne(answerMode.mode),
        () => mode = new Cricket(answerMode.mode))
    for(let player of answerPlayer){
        players.addPlayer(new Player(player.name, answerMode))
    }
    tools.shuffleArray(players.players)
    while(players.lengthRanking() < players.lengthPlayers()){
        for(let player of players.players){
            if(players.lengthRanking() === players.lengthPlayers()-1){
                players.addWinner(players)
                break
            }
            if(player.isPlaying){
                await tools.switch(mode.name,
                    async () => {
                        await shots(player, 
                            messages.score.worldtour,
                            position,
                            questions.worldtour, 
                        )

                    },
                    async () => {
                        await shots(player,
                            messages.score.threehundredone,
                            position,
                            questions.threehundredone, 
                            questions.multiplicator, 
                        )
                    },
                    x => null)
            }
        }
    }
}

play()