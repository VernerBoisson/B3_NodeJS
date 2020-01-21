const inquirer = require('inquirer')
const questions = require('./questions')
const Players = require('./players/players')
const Player = require('./players/player')
const WorldTour = require('./modes/worldtour')
const ThreeHundredOne = require('./modes/threehundredone')
const Cricket = require('./modes/cricket')
const messages = require('../messages.js')
const tools = require('./tools')

async function shots(player, callbackSector, callbackMutiplicator, callbackMessage, position){
    console.log(callbackMutiplicator)
    for(let i=0; i<3; i++){
        let score = 0
        let sector = await inquirer.prompt(callbackSector(i+1))
        let multiplicator = callbackMutiplicator
        score = sector.score * multiplicator.multiplicator
        await mode.run(score, multiplicator.multiplicator, player)
        console.log(callbackMessage(player.name, player.score))
        if(!player.isPlaying){
            console.log(messages.winner(player.name, position))
            players.addWinner(player)
            player.winner = position
            position++
            break
        }
    }
}


async function play(){
    const players = new Players()
    const shotnumbers = 3
    let position = 1
    const answerMode = await inquirer.prompt(questions.mode)
    const answerNbPlayer = await inquirer.prompt(questions.nbplayer)
    tools.switch(answerMode.mode, 
        () => mode = new WorldTour(answerMode.mode),
        () => mode = new ThreeHundredOne(answerMode.mode),
        () => mode = new Cricket(answerMode.mode))
    for(let i=0; i<answerNbPlayer.nbplayer; i++){
        let name = await inquirer.prompt(questions.name(i+1))
        players.addPlayer(new Player(name.name, mode.name))
    }
    tools.shuffleArray(players.players)
    while(players.lengthRanking() < players.lengthPlayers()){
        for(let player of players.players){
            if(players.lengthRanking() === players.lengthPlayers()-1){
                console.log(messages.winner(player.name, position))
                players.addWinner(players)
                break
            }
            if(player.isPlaying){
                console.log(messages.turn(player.name))
                await tools.switch(mode.name,
                    async () => {
                        await shots(player, 
                            questions.worldtour,
                            {multiplicator:1}, 
                            messages.score.worldtour,
                            position
                        )

                    },
                    async () => {
                        await shots(player, 
                            questions.threehundredone, 
                            await inquirer.prompt(questions.multiplicator), 
                            messages.score.threehundredone,
                            position
                        )
                    },
                    x => null)
            }
        }
    }
}

play()