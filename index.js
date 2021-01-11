const config = require('dotenv').config({path: __dirname + '/.env'})
const discord = require('discord.js')
const client = new discord.Client()
const token = process.env.DISCORD_KEY

client.login(token)

console.clear()

client.on('ready', () =>{
    console.log('Bot pret.')
})

client.on('message', message => {
    if (!message.content.startsWith('*')) return

})