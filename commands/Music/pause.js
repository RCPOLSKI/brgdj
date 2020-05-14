const Command = require("../../Base/Command");

class Pause extends Command {
  constructor(client) {
    super(client, {
      name: "pause",
      description: "Pausa a reprodução.",
      aliases: ["calma", "oxi", "pausar"],
      usage: ["pausar"]
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
    if (queue && queue.playing) {
      queue.playing = false;
      queue.connection.dispatcher.pause();
      return message.channel.send("⏸ Pausado!");
    }
    return message.channel.send(
      "❌ | Eu não posso pausar se não estou tocando nada."
    );
  }
}

module.exports = Pause;
