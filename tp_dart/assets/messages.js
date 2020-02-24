module.exports = {
    "modename":{
        "worldtour":"Tour du monde",
        "threehundredone":"301",
        "cricket":"Cricket"
    },
    "questions":{
        "mode":"Quel est le mode de jeu ?",
        "players":"Combien de joueurs ?",
        "playername":"Quel est ton nom ?",
        "worldtour": x => `Quel est le secteur du tir ${x} ?`,
        "threehundredone": x => `Quel est le secteur du tir ${x} ?`,
        "cricket":"Quel est le score ?",
        "multiplicator":"Quel est le multiplicateur du tir ?"
    },
    "defaultplayer": i => `Player${i}`,
    "winner": (player, position) => `${player} a terminé à ${position} place.`,
    "turn": x => `Le tour de ${x}`,
    "errors":{
        "questions":{
            "players":"S'il vous plait, entrer un nombre de joueur valide.",
            "worldtour":"S'il vous plait, entrer un score valide.",
            "threehundredone":"S'il vous plait, entrer un score valide.",
            "cricket":"S'il vous plait, entrer un score valide."     
        },
        "mode":"Ce mode n'existe pas."
    },
    "score":{
        "worldtour":(player, score) => `Secteur a dévérouillé pour ${player} : ${score}.`,
        "threehundredone": (player, score) => `Le score de ${player} est ${score}.`,
        "cricket":""
    },
    "multiplicator":{
        "simple":"simple",
        "double":"double",
        "triple":"triple"
    },
    "gameStatus":{
        "draft":"draft",
        "started":"started",
        "ended":"ended"
    }
}