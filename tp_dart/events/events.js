const events = require('events')
const eventEmitter = new events.EventEmitter()

const lunchGame = (play) => {
    play()
}

module.exports = eventEmitter