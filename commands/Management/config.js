const Command = require("../../Base/Command");

class Config extends Command {
  constructor(client) {
    super(client, {
      name: "config",
      description: "Configuração do BOT.",
      aliases: ["conf", "botconfig", "botconf"],
      usage: ["config <prop | comando> <valor | index>"],
      permissions: ["MANAGE_GUILD"]
    });
  }

  async execute(message, args, Discord) {
    if (!message.member.hasPermission("MANAGE_GUILD"))
      return message.channel.send(
        "❌ | Você não tem o direto `MANAGE_GUILD` para executar este comando."
      );
    let Case = args[0];
    switch (Case) {
      case "prefix":
        if (!args[1])
          return message.channel.send(
            `Meu prefix é \`${this.client.prefix}\`.`
          );
        if (args[1].length > 10)
          return message.channel.send(
            "❌ | O prefix precisa ser menos de 10 caractéres."
          );
        if (args[1] === "reset") {
          this.client.db.delete(`prefix_${message.guild.id}`);
          return message.channel.send(
            `✅ | O prefix foi resetado para p?.`
          );
        }
        this.client.db.set(`prefix_${message.guild.id}`, args[1]);
        return message.channel.send(
          `✅ | O prefix foi configurado para ${args[1]}.`
        );
        break;
      default:
        const embed = new Discord.MessageEmbed()
          .setAuthor(message.guild.name, message.guild.iconURL())
          .setTitle("Configurações do servidor")
          .addField(
            "Prefix",
            this.client.db.fetch(`prefix_${message.guild.id}`)
              ? this.client.db.fetch(`prefix_${message.guild.id}`)
              : this.client.prefix
          )
          .setColor("#FFFF00")
          .setTimestamp()
          .setFooter(
            `Requisitado por ${message.member.user.tag}`,
            message.member.user.displayAvatarURL({ dynamic: true })
          );
        return message.channel.send(embed);
    }
  }
}

module.exports = Config;
