const config = require('dotenv').config({path: __dirname + '/.env'})
const ytdl = require('ytdl-core')
const discord = require('discord.js')
const client = new discord.Client()
const pronote = require('pronote-api')
const token = process.env.DISCORD_KEY


async function Pronote(url, username, password, _msg)
{
    const session = await pronote.login(url, username, password/*, cas*/);
    
    _msg.author.send(session.user.name); // Affiche le nom de l'élève
    _msg.author.send(session.user.studentClass.name); // Affiche la classe de l'élève
    
    const timetable = await session.timetable(); // Récupérer l'emploi du temps d'aujourd'hui
    const marks = await session.marks(); // Récupérer les notes du trimestre
    
    _msg.author.send(`L'élève a ${timetable.length} cours aujourd'hui`); 
    _msg.author.send(`et a pour l'instant une moyenne de ${marks.averages.student} ce trimestre.`);
    
    // etc. les fonctions utilisables sont 'timetable', 'marks', 'contents', 'evaluations', 'absences', 
    // 'homeworks', 'infos', et 'menu', sans oublier les champs 'user' et 'params' qui regorgent d'informations.
}



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
            connection.play(ytdl("https://www.youtube.com/watch?v=1V6amNFNnN8n"))
          } else {
            message.reply('You need to join a voice channel first!');
          }
        
          
    }

    if (message.content.startsWith('*pronote')) {
      const msg = message
      const command = msg.content.split(' ')
      message.delete()
      Pronote(process.env.pronote_url, command[1], command[2], msg).catch(err => {
        if (err.code === pronote.errors.WRONG_CREDENTIALS.code) {
            msg.channel.send('Mauvais identifiants');    
        } else {
            if (err.code === 2) {
              msg.channel.send(err.message)
            }
            console.error(err);
        }
    });
    
      
    }

    
})