const Command = require("../../Base/Command");

class Queue extends Command {
  constructor(client) {
    super(client, {
      name: "queue",
      description: "Vê a fila de músicas.",
      aliases: ["q", "fila", "tudo"],
      usage: ["fila"]
    });
  }

  async execute(message, args, Discord) {
    let queue = this.client.queue.get(message.guild.id);
    if (!queue) return message.channel.send("❌ | Eu não estou tocando nada... Estou?");
    if (!message.member.voice.channel)
      return message.channel.send(`❌ | Você não está em um canal de voz!`);
    if (
      queue &&
      message.guild.me.voice.channel.id !== message.member.voice.channel.id
    )
      return message.channel.send(`❌ | Você não está no mesmo canal de voz que eu!`);
    let songs = queue.songs;
    let songsa = songs
      .slice(0, 20)
      .map(
        m =>
          `${songs.indexOf(m) + 1}. ` +
          Discord.Util.escapeMarkdown(
            m.title.length > 30 ? m.title.substr(0, 30) + "..." : m.title
          )
      );
    const embed = new Discord.MessageEmbed()
      .setAuthor(`Fila`, message.guild.iconURL())
      .setDescription(songsa.join("\n"))
      .setFooter(`Exibindo ${songs.length}/${songsa.length} músicas`)
      .setColor("#FFFF00");
    return message.channel.send(embed);
  }
}

module.exports = Queue;
