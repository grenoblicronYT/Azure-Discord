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

    if (message.content === "*join") {
        if (message.member.voice.channel) {
            const connection = await message.member.voice.channel.join();
          } else {
            message.reply('You need to join a voice channel first!');
          }
    }

    if (message.content.startsWith('*play')) {
        connection.play(fs.createReadStream('https://drive.google.com/uc?export=download&id=1FDm4Zq_pf3HK4m9T0dXkD_OA3CkoISWQ'), {
            type: 'audio/mpeg',
          });
          
    }

    
})