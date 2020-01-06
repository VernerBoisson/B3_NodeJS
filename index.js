const inquirer = require('inquirer')
const questions = require('./questions')
const Players = require('./players')
const Player = require('./player')
const Mode = require('./mode')

const players = new Players()
let mode

inquirer.prompt([questions.mode, questions.nbplayer])
.then(async (answers) => {
    console.log(answers.mode)
    mode = new Mode(answers.mode)
    for(let i=0; i<answers.nbplayer; i++){
        await inquirer.prompt(questions.name(i)).then( (answers) => { 
            players.add(new Player(answers.name, mode.name))
        })
    }  
}).then(x => {
    mode.loopGame()
}).catch()