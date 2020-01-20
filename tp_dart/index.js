const inquirer = require('inquirer')
const questions = require('./questions')
const Players = require('./players')
const Player = require('./player')
const WorldTour = require('./modes/worldtour')
const ThreeHundredOne = require('./modes/threehundredone')
const Cricket = require('./modes/cricket')
const messages = require('./messages.js')
const tools = require('./tools')

const players = new Players()
const winner = []
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
            players.add(new Player(answers.name, mode.name))
        })
    }
}).then(async answers => {
    let winner = false
    tools.shuffleArray(players.players)
    while(!winner){
        for(let player of players.players){
            console.log(messages.turn(player.name))
            x = await tools.switch(mode.name,
                async () => {
                    let score = await inquirer.prompt(questions.worldtour)
                    console.log(score, score.score)
                    return score.score
                },
                async () => {
                    x= {score:[]}
                    let sum = 0
                    for(let i=0; i<shotnumbers; i++){
                        let score = await inquirer.prompt(questions.threehundredone)
                        let double = await inquirer.prompt(questions.multiplicator)
                        if(double===messages.multiplicator.double){
                            mode.winnable = true
                        }else{
                            mode.winnable = false
                        }
                        x.score.push(score.score)
                        sum += +score.score
                        if(i!=2)
                            if(player.score-sum>1)
                                console.log(messages.score.threehundredone(player.name, player.score - sum))
                        if(player.score-sum === 0 && mode.winnable){
                            player.winner = true
                            player.score = 0
                            break
                        }
                    }
                    return x.score
                },
                x => null)
            await mode.run(x , player)
            if(player.winner){
                winner = true
                console.log(messages.winner(player.name))
                break
            }else{
                await tools.switch(mode.name, 
                    x => console.log(messages.score.worldtour(player.name, player.score)),
                    x => console.log(messages.score.threehundredone(player.name, player.score)),
                    x => console.log()
                    )
            }
        }
    }
}).catch()