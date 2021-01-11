const config = require('dotenv').config({path: __dirname + '/.env'})
const ytdl = require('ytdl-core')
const discord = require('discord.js')
const client = new discord.Client()
const token = process.env.DISCORD_KEY

client.login(token)

console.clear()

client.on('ready', () =>{
    console.log('Bot pret.')
})

client.on('message', async (message) => {
    if (!message.content.startsWith('*')) return

    if (message.content === "*stop") {
        if (message.member.voice.channel) {
            const connection = await message.member.voice.channel.join();
            connection.play(ytdl("https://www.youtube.com/watch?v=40tl67LFnKI"))
          } else {
            message.reply('You need to join a voice channel first!');
          }
    }

    if (message.content.startsWith('*play')) {
        if (message.member.voice.channel) {
            const connection = await message.member.voice.channel.join();
            let dispatcher = connection.play(ytdl("https://www.youtube.com/watch?v=1V6amNFNnN8n"))
            dispatcher.destroy()
          } else {
            message.reply('You need to join a voice channel first!');
          }
        
          
    }

    
})