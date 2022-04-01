const { createClient } = require('redis')
const client = createClient()

async function redisConnect(){
    let r = client.on('error', (err) => console.log('Redis Client Connection Error', err))
    return await r.connect()
}

module.exports = {
    redisConnect,
    client
}





















