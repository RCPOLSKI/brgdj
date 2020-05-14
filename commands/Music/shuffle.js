const Command = require("../../Base/Command");

class Shuffle extends Command {
  constructor(client) {
    super(client, {
      name: "shuffle",
      description: "Embaralha a fila.",
      aliases: ["embaralha"],
      usage: ["embaralha"]
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
    if (queue.songs.length < 3)
      return message.channel.send("❌ | Você não pode embaralhar a fila com menos de 3 músicas.");
    queue.songs = queue.songs.shuffle();
    return message.channel.send("✅ | Fila embaralhada!");
  }
}

module.exports = Shuffle;
