const inquirer = require('inquirer')
const questions = require('./questions')
const Players = require('./players/players')
const Player = require('./players/player')
const WorldTour = require('./modes/worldtour')
const ThreeHundredOne = require('./modes/threehundredone')
const Cricket = require('./modes/cricket')
const messages = require('../messages.js')
const tools = require('./tools')

const players = new Players()
const shotnumbers = 3

inquirer.prompt([questions.mode, questions.nbplayer])
.then(async answers => {
    tools.switch(answers.mode, 
        x => mode = new WorldTour(answers.mode),
        x => mode = new ThreeHundredOne(answers.mode),
        x => mode = new Cricket(answers.mode)
        )
    for(let i=0; i<answers.nbplayer; i++){
        await inquirer.prompt(questions.name(i+1)).then( (answers) => { 
            players.addPlayer(new Player(answers.name, mode.name))
        })
    }
}).then(async answers => {
    let position = 1
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
                        for(let i=0; i<shotnumbers; i++){
                            let sector = await inquirer.prompt(questions.worldtour(i+1))
                            mode.run(sector.score, player)
                            console.log(messages.score.worldtour(player.name, player.score))
                            if(!player.isPlaying){
                                console.log(messages.winner(player.name, position))
                                players.addWinner(player)
                                player.winner = position
                                position++
                                break
                            }
                        }

                    },
                    async () => {
                        for(let i=0; i<shotnumbers; i++){
                            let score = 0
                            let sector = await inquirer.prompt(questions.threehundredone(i+1))
                            let double = await inquirer.prompt(questions.multiplicator)
                            score = sector.score * double.multiplicator
                            await mode.run(score, double.multiplicator, player)
                            console.log(messages.score.threehundredone(player.name, player.score))
                            if(!player.isPlaying){
                                console.log(messages.winner(player.name, position))
                                players.addWinner(player)
                                player.winner = position
                                position++
                                break
                            }
                        }
                    },
                    x => null)
            }
        }
    }
}).catch()