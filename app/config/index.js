const path = require('path')
const config = {}
if (process.env.NODE_ENV === 'production') {
    config.env = require('./prod.js')
} else {
    config.env = require('./dev.js')
}
module.exports = config