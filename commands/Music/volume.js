const Command = require("../../Base/Command");

class Volume extends Command {
  constructor(client) {
    super(client, {
      name: "volume",
      description: "Altera o volume do BOT.",
      aliases: ["vol"],
      usage: ["volume", "volume <valor>"]
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
    if (!args[0])
      return message.channel.send(`O volume atual está em ${queue.volume * 20}`);
    if (isNaN(args[0]))
      return message.channel.send(`❌ | Por favor, escolha um número de 1 à 100.`);
    if (args[0] < 1)
      return message.channel.send("❌ | O volume minimo é 1.");
    if (args[0] > 100)
      return message.channel.send("❌ | O volume máximo é 100.");
    queue.volume = args[0] / 20;
    queue.connection.dispatcher.setVolumeLogarithmic(args[0] / 100);
    return message.channel.send(`✅ | Volume configurado para ${args[0]}.`);
  }
}

module.exports = Volume;
