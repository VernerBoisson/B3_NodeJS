class Player{
    constructor(name, mode){
        this.name = name
        this.score = this.initScore(mode)
    }

    initScore(mode){
        switch (mode) {
            case 'Tour du monde':
                return [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]
            case '301':
                return 301
            case 'Cricket':
                break;
            default:
                console.log(`Ce mode n'existe pas`)
        }
    }
}

module.exports = Player