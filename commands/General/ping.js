const Command = require("../../Base/Command");

class Ping extends Command {
  constructor(client) {
    super(client, {
      name: "ping",
      description: "Mostra o ping do BOT.",
      aliases: ["latency", "pong"],
      usage: ["ping"],
      permissions: []
    });
  }

  async execute(message, args, Discord) {
    message.channel.send("Pinging...").then(m => {
      let latency = Math.round(m.createdTimestamp - message.createdTimestamp);
      let api = this.client.ws.ping ? Math.round(this.client.ws.ping) : 0;

      const embed = new Discord.MessageEmbed()
        .addField("Latência do BOT", `${latency}ms`)
        .addField("latência da API", `${api}ms`)
        .setColor("BLURPLE")
        .setFooter(
          `Requisitado por ${message.author.tag}`,
          message.author.displayAvatarURL({ dynamic: true })
        );
      return m.edit("Pong!", embed);
    });
  }
}

module.exports = Ping;
