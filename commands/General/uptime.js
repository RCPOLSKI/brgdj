const Command = require("../../Base/Command");
const moment = require('moment');
require('moment-duration-format');

class Uptime extends Command {
  constructor(client) {
    super(client, {
      name: "uptime",
      description: "Mostra o tempo de operação do BOT.",
      aliases: [],
      usage: ["uptime"]
    });
  }

  async execute(message, args, Discord) {
    const duration = moment.duration(this.client.uptime).format(' D [Dias], H [Horas], m [Minutos], s [Segundos]')
  
    const embed = new Discord.MessageEmbed()
    .setColor('RANDOM')
    .setAuthor('EM OPERAÇÃO')
    .setThumbnail(`${this.client.user.displayAvatarURL(({ dynamic: true }))}`)
    .addField("Tempo:", `${duration}`)
    .setFooter(`${this.client.user.username}`, `${this.client.user.displayAvatarURL({ dynamic: true })}`)
    .setTimestamp()
    return message.channel.send(embed);
  }
}

module.exports = Uptime;
