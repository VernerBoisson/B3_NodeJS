const inquirer = require('inquirer')
const questions = require('./questions')
const Players = require('./players')
const Player = require('./player')
const WorldTour = require('./modes/worldtour')
const ThreeHundredOne = require('./modes/threehundredone')
const Cricket = require('./modes/cricket')
const messages = require('./messages.json')
const players = new Players()

let mode

async function score(mode){
    let x
    switch (mode) {
        case messages.modename.worldtour:
            x = await inquirer.prompt(questions.worldtour)
            break;
        case messages.modename.threehundredone:
            x = []
            for(let i=0; i<3; i++){
                x.push(await inquirer.prompt(questions.threehundredone))
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
.then(async (answers) => {
    switch (answers.mode) {
        case messages.modename.worldtour:
            mode = new WorldTour(answers.mode)
            break;
        case messages.modename.threehundredone:
            mode = new ThreeHundredOne(answers.mode)
            break;
        case messages.modename.cricket:
            mode = new Cricket(answers.mode)
            break;
        default:
            break;
    }
    for(let i=0; i<answers.nbplayer; i++){
        await inquirer.prompt(questions.name(i)).then( (answers) => { 
            players.add(new Player(answers.name, mode.name))
        })
    }
}).then(async (x) => {
    let winner = false
    while(!winner){
        for(let player of players.players){
            console.log(messages.turn+player.name)
            mode.run(await score(mode.name), player)
            if(player.winner){
                winner = true
                console.log(messages.winner+player.name)
                break
            }else{
                console.log(player.score)
            }
        }
    }
}).catch()