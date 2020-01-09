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



async function score(mode){
    let x
    switch (mode) {
        case messages.modename.worldtour:
            x = await inquirer.prompt(questions.worldtour)
            break;
        case messages.modename.threehundredone:
            x = {score:[]}
            for(let i=0; i<3; i++){
                let y = await inquirer.prompt(questions.threehundredone) 
                x.score.push(y.score)
            }
            break;
        case messages.modename.cricket:
            break;
        default:
            break;
    }
    return x.score
}

inquirer.prompt([questions.mode, questions.nbplayer])
.then(async answers => {
    tools.myfunction(answers.mode, 
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
            let x = await score(mode.name)
            mode.run(x , player)
            if(player.winner){
                winner = true
                console.log(messages.winner(player.name))
                break
            }else{
                tools.myfunction(mode.name, 
                    x => console.log(messages.score.worldtour(player.name, player.score)),
                    x => console.log(messages.score.threehundredone(player.name, player.score)),
                    x => console.log()
                    )
            }
        }
    }
}).catch()