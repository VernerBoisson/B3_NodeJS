const message = require('../messages.js')

module.exports = {
    mode: {
        type: 'rawlist',
        name: 'mode',
        message: message.questions.mode,
        choices: [
          message.modename.worldtour,
          message.modename.threehundredone,
          message.modename.cricket
        ]
    },
    nbplayer:{
        type: 'input',
        name: 'nbplayer',
        message: message.questions.players,
        validate: function(value) {
          let pass = value.match(
            /^[0-9]+/gm
          );
          if (pass && pass>1) {
            return true;
          }
    
          return message.errors.questions.players;
        }
    },
    name: (i) => {return {
        type: 'input',
        name: 'name',
        message: message.questions.playername,
        default: function() {
          return message.defaultplayer(i);
        }
    }},
    worldtour: x => { return {
        type: 'input',
        name: 'score',
        message: message.questions.worldtour(x),
        validate: function(value) {
          let pass = value.match(
            /[0-9]|1[0-9]|20+/gm
          );
          if (pass && pass > 0 && pass < 21) {
            return true;
          }
          return message.errors.questions.worldtour;
        }
    }},
    threehundredone:x => { return {
        type: 'input',
        name: 'score',
        message: message.questions.threehundredone(x),
        validate: function(value) {
          let pass = value.match(
            /[0-9]|1[0-9]|20|25+/gm
          );
          if (pass && pass >= 0) {
            return true;
          }
          return message.errors.questions.threehundredone;
        }
    }},
    cricket:{
        type: 'input',
        name: 'score',
        message: message.questions.cricket,
        validate: function(value) {
          let pass = value.match(
            /[0-9]|1[0-9]|20|25+/gm
          );
          if (pass) {
            return true;
          }
          return message.errors.questions.cricket;
        }
    },
    multiplicator:{
      type: 'rawlist',
      name: 'multiplicator',
      message: message.questions.multiplicator,
      choices: [
        message.multiplicator.simple,
        message.multiplicator.double,
        message.multiplicator.triple
      ],
      filter: x => {
        switch (x) {
          case message.multiplicator.simple:
            return 1
          case message.multiplicator.double:
            return 2
          case message.multiplicator.triple:
            return 3
          default:
            break;
        }
      }
  },
}