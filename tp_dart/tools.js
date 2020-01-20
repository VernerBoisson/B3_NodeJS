const modes = require('./messages').modename

module.exports ={
    switch: async (mode, ...callbacks) => {
        let obj = {}
        let c = 0
        for(let mode in modes){
            obj[modes[mode]] = callbacks[c]
            c++
        }
        return await obj[mode]()
    },

    shuffleArray: (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
}