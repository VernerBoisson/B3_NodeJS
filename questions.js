module.exports = {
    mode: {
        type: 'rawlist',
        name: 'mode',
        message: 'Quel est le mode de jeu ?',
        choices: [
          'Tour du monde',
          '301',
          'Cricket'
        ]
    },
    nbplayer:{
        type: 'input',
        name: 'nbplayer',
        message: "Combien de joueurs ?",
        validate: function(value) {
          let pass = value.match(
            /^[0-9]+/gm
          );
          if (pass && pass>1) {
            return true;
          }
    
          return `S'il vous plait, entrer un nombre de joueur valide.`;
        }
    },
    name: (i) => {return {
        type: 'input',
        name: 'name',
        message: "Quel est ton nom ?",
        default: function() {
          return `player${i+1}`;
        }
    }},
}