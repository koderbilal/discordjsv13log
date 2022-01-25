// main

/*
gerekli modüller:
npm i discord.js
npm i fs
npm i process
npm i moment


aşağıdaki token kısmı ve kanalid kısımları sizler tarafından doldurulacaktır.
*/


const discord = require("discord.js")
const { Client, Intents, Collection } = require('discord.js');
// const client = new discord.Client()
//config = require("./config.json")
const fs = require("fs")
const allIntents = new Intents(32509);
allIntents.add(Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_MEMBERS);
const client = new Client({ intents: allIntents });
const { MessageActionRow, MessageButton } = require('discord.js');
//const { MessageActionRow, MessageButton } = require('discord.js');
const { resourceUsage } = require("process");
const { MessageEmbed } = require('discord.js');


client.on('ready', async () => {
  console.log(`${client.user.tag} is ready!`)
  client.user.setActivity(`Zehra ❤ Cem`) // bot oynuyor kısmı, yani durum kısmı
  //console.log(`${client.user.id} is ready!`)
});

var moment = require('moment');


client.login("token");


// mesaj silme log

client.on("messageDelete", message => {
    //console.log(message)
      if (!message || message.partial) return
      if (typeof message.author === "undefined" ) return
      if (message.author && message.author.bot === true) return
      if (message.channel && message.channel.type !== "GUILD_TEXT") return
      // validate if it's from a guild
    const channel2 = client.channels.cache.get("kanalid")
      const messageDeletedEmbed = new MessageEmbed()
          .setColor("RANDOM")
          .setAuthor(message.author.username, message.author.avatarURL({ dynamic: true, format: 'png', size: 1024 }))
          let user = message.author
          let avatar = user.displayAvatarURL({dynamic: true, size: 1024})
      var messageHadAttachment = message.attachments.map(x => x.proxyURL)[0]
      if (messageHadAttachment) { // if there is an attachement
          messageDeletedEmbed.setDescription(` <@${message.author.id}> üyesi <#${message.channel.id}> kanalında mesajını sildi. 
          
          **__silinen mesaj:__**
          silinen mesaj yoktur.
          
          **__silinen resim:__**
          ${message.attachments.map(x => x.proxyURL)}
  
  \`\`\`
Kanal: ${message.channel.name}  (${message.channel.id})
Kullanıcı: ${message.author.tag}  (${message.author.id})
Mesaj ID: ${message.id}
Atılma Tarihi: ${moment(message.createdAt).locale("tr").format('LLL')} \`\`\``)
           }
          else {
            messageDeletedEmbed.setDescription(` <@${message.author.id}> üyesi <#${message.channel.id}> kanalında mesajını sildi. 
          
            **__silinen mesaj:__**
            ${message.content.replace(/`/g, "'")}
  
            **__silinen resim:__**
            Silinen resim yoktur.
            
  \`\`\`
Kanal: ${message.channel.name}  (${message.channel.id})
Kullanıcı: ${message.author.tag}  (${message.author.id})
Mesaj ID: ${message.id}
Atılma Tarihi: ${moment(message.createdAt).locale("tr").format('LLL')}\`\`\``)
          }
          if(avatar.endsWith(".gif?size=1024")){
            messageDeletedEmbed.setThumbnail(message.author.avatarURL({ dynamic: true, format: 'gif', size: 1024 }))
          } else {
            messageDeletedEmbed.setThumbnail(message.author.avatarURL({ dynamic: true, format: 'png', size: 1024 }))
          }
       return channel2.send({ 
         embeds: [messageDeletedEmbed]
         }) // ({embeds: [embed]}) (messageDeletedEmbed)
    });




    // mesaj değiştirme log

    client.on("messageUpdate", (oldMessage, newMessage) => {
        if (oldMessage.author.bot === true) return
        if (oldMessage.channel.type !== "GUILD_TEXT") return
        if (newMessage.channel.type !== "GUILD_TEXT") return
        if (oldMessage.content === newMessage.content) return
      const messageEditedEmbed = new MessageEmbed()
      .setColor("RANDOM")
      .setAuthor(newMessage.author.username, newMessage.author.avatarURL({ dynamic: true, format: 'png', size: 1024 }))
      
      .setDescription(` <@${newMessage.author.id}> üyesi <#${newMessage.channel.id}> kanalında mesajını düzenledi. 
      
      **__Düzenlenmeden Önce:__**
      ${oldMessage.content.replace(/`/g, "'")}
      
      **__Düzenlenlendikten Sonra:__**
      ${newMessage.content.replace(/`/g, "'")}
      
      \`\`\`
Kanal: ${newMessage.channel.name}  (${newMessage.channel.id})
Kullanıcı: ${newMessage.author.tag}  (${newMessage.author.id})
Mesaj ID: ${newMessage.id}
Atılma Tarihi: ${moment(oldMessage.createdAt).locale("tr").format('LLL')}\`\`\``)
        let user = newMessage.author
        let avatar = user.displayAvatarURL({dynamic: true, size: 1024})
        if(avatar.endsWith(".gif?size=1024")){
          messageEditedEmbed.setThumbnail(newMessage.author.avatarURL({ dynamic: true, format: 'gif', size: 1024 }))
        } else {
          messageEditedEmbed.setThumbnail(newMessage.author.avatarURL({ dynamic: true, format: 'png', size: 1024 }))
        }
      
      return client.channels.cache.get("kanalid").send({ 
        embeds: [messageEditedEmbed]
        })
      });



      
// sesli kanala giriş log
       client.on('voiceStateUpdate', async (oldState, newState) => {
        if (!oldState.channelId && newState.channelId) { 
          //  let users = newState.guild.members.cache.get(newState.id)
            let member = newState.guild.members.cache.get(newState.id)
            let microphone = member.voice.selfMute ? "kapalı" : "açık";
            let headphones = member.voice.selfDeaf ? "kapalı" : "açık";
            //console.log()
            let SesMicEmbed = new MessageEmbed()
          .setColor("RANDOM")
          .setAuthor(newState.member.user.username, newState.member.user.displayAvatarURL({ dynamic: true, size: 1024 }))
          .setThumbnail(newState.member.user.displayAvatarURL({ dynamic: true}))
          .setDescription(`
          <@${newState.member.user.id}> üyesi <#${newState.channel.id}> kanalına giriş yaptı.
          
**Kanala girdiği anda:**
\`•\` Mikrofon durumu: \`${microphone}\`. 
\`•\` Kulaklık durumu: \`${headphones}\`.
      
      \`\`\`
Giridiği kanal: ${newState.channel.name}
(${newState.channelId})
Kullanıcı: ${newState.member.user.tag}
(${newState.member.user.id})
Eylem Gerçekleşme: ${moment(newState.createdAt).locale("tr").format('LLL')}\`\`\`   
      Girdiği kanalda bulunan üyeler:
      ${newState.channel.members.map(x => `${x.user} - \`${x.user.id}\``).join("\n")}
          `)   
          return newState.guild.channels.cache.get("kanalid").send({ 
            embeds: [SesMicEmbed]
            })
        } 
      });
   
// sesli kanaldan çıkış log
        client.on('voiceStateUpdate', async (oldState, newState) => {
          if(oldState.channelId && !newState.channelId){
            let member = newState.guild.members.cache.get(newState.id);
          let microphone = member.voice.selfMute ? "kapalı" : "açık";
          let headphones = member.voice.selfDeaf ? "kapalı" : "açık";
          if(oldState.channel.members.map(x => x)[0]){
            var makro = oldState.channel.members.map(x => `${x.user} - \`${x.user.id}\``).join("\n")
          } else {
            var makro = "Maalesef bu kanalda üye bulunmamaktadır.";
          }
          let SesMicEmbed = new MessageEmbed()
          .setColor("RANDOM")
          .setAuthor(oldState.member.user.username, oldState.member.user.displayAvatarURL({ dynamic: true, size: 1024 }))
          .setThumbnail(oldState.member.user.displayAvatarURL({ dynamic: true}))
          .setDescription(`
<@${oldState.member.user.id}> üyesi <#${oldState.channel.id}> kanalından ayrıldı.
       
**Kanaldan Çıktığı anda:**
          \`•\` Mikrofon durumu: \`${microphone}\`. 
          \`•\` Kulaklık durumu: \`${headphones}\`.

          \`\`\`
Çıktığı kanal: ${oldState.channel.name}
(${oldState.channelId})
Kullanıcı: ${oldState.member.user.tag}
(${oldState.member.user.id})
Eylem Gerçekleşme: ${moment(oldState.createdAt).locale("tr").format('LLL')}\`\`\`
          Çıktığı kanalda bulunan üyeler:
          ${makro}
          `)   
          return oldState.guild.channels.cache.get("kanalid").send({ 
              embeds: [SesMicEmbed]
              })
          }
          });




          // sesli kanal değiştirme log
client.on('voiceStateUpdate', async (oldState, newState) => {
  //console.log("sa") 
  if (oldState.channelId && newState.channelId && oldState.channel && newState.channel) {
    if (oldState.channelId !== newState.channelId) {
    //console.log("sam")
    let member = newState.guild.members.cache.get(newState.id);
          let microphone = member.voice.selfMute ? "kapalı" : "açık";
          let headphones = member.voice.selfDeaf ? "kapalı" : "açık";
          if(oldState.channel.members.map(x => x)[0]){
            var makro = oldState.channel.members.map(x => `${x.user} - \`${x.user.id}\``).join("\n")
          } else {
            var makro = "Maalesef bu kanalda üye bulunmamaktadır.";
          }
          let SesMicEmbed1 = new MessageEmbed()
          .setColor("RANDOM")
          .setAuthor(oldState.member.user.username, oldState.member.user.displayAvatarURL({ dynamic: true, size: 1024 }))
          .setThumbnail(oldState.member.user.displayAvatarURL({ dynamic: true}))
          .setDescription(`
<@${oldState.member.user.id}> üyesi <#${oldState.channel.id}> kanalından <#${newState.channel.id}> kanalına geçiş yaptı.

**Kanal Değiştirdiği Anda:**
          \`•\` Mikrofon durumu: \`${microphone}\`. 
          \`•\` Kulaklık durumu: \`${headphones}\`.

          \`\`\`
Çıktığı kanal: ${oldState.channel.name}
(${oldState.channelId})
Kullanıcı: ${oldState.member.user.tag}
(${oldState.member.user.id})
Eylem Gerçekleşme: ${moment(oldState.createdAt).locale("tr").format('LLL')}\`\`\`

Eski Kanalında Bulunan Üyeler:
${makro}

Yeni Kanalında Bulunan Üyeler:        
${newState.channel.members.map(x => `${x.user} - \`${x.user.id}\``).join("\n")}
`)   
          return oldState.guild.channels.cache.get("kanalid").send({ 
              embeds: [SesMicEmbed1]
              })
  }}
}); 