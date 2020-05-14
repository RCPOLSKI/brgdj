const Command = require("../../Base/Command");
const YouTube = require("simple-youtube-api");

class Play extends Command {
  constructor(client) {
    super(client, {
      name: "play",
      aliases: ["p", "joga", "toca"],
      usage: ["play <nome da música>", "play <link>", "play <ID do YouTube>"],
      description: "Toca algo."
    });
  }

  async execute(message, args, Discord) {
    const youtube = new YouTube(this.client.config.youtube);

    const query = args.join(" ");
    const url = args[0] ? args[0].replace(/<(.+)>/g, "$1") : "";
    if (!message.member.voice.channel)
      return message.channel.send(
        "❌ | Você poderia tentar novamente após entrar em um canal de voz?"
      );
    if (!query)
      return message.channel.send(
        "❌ | Você poderia especificar um nome, link ou ID?"
      );
    if (
      !message.member.voice.channel
        .permissionsFor(this.client.user)
        .has("CONNECT")
    )
      return message.channel.send(
        "❌ | Opoha, não consigo me juntar ao seu canal de voz!"
      );
    if (
      !message.member.voice.channel
        .permissionsFor(this.client.user)
        .has("SPEAK")
    )
      return message.channel.send(
        "❌ | Opoha, não consigo falar no seu canal de voz!"
      );
    const voiceChannel = message.member.voice.channel;
    if (!message.guild.me.voice.channel)
      await message.member.voice.channel.join();
    if (voiceChannel && message.guild.me.voice.channel.id !== voiceChannel.id)
      return message.channel.send(`❌ | Você não está no mesmo canal de voz que eu!`);
    if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
      message.channel.send("🔍 Pesquisando playlist `" + query + "`").then(msg => {
      msg.delete(1000);
    });
      const playlist = await youtube.getPlaylist(url);
      const videos = await playlist.getVideos();
      let video2;
      for (const video of Object.values(videos)) {
        if (youtube.getVideoByID(video.id)) {
          video2 = await youtube.getVideoByID(video.id);
          await this.client.player.handleVideo(
            video2,
            message,
            voiceChannel,
            true,
            0
          );
        } else return;
      }
      return;
    } else {
      try {
        var video = await youtube.getVideo(url);
      } catch (error) {
        try {
          var videos = await youtube.searchVideos(query, 3);
          let index = 0;
          message.channel.send("🔍 Pesquisando `" + query + "`").then(msg => {
            msg.delete(1000);
          });
          var video = await youtube.getVideoByID(videos[0].id);
        } catch (err) {
          console.error(err.message);
          return message.channel.send("❌ | Nenhum resultado encontrado.");
        }
      }
      return this.client.player.handleVideo(video, message, voiceChannel, false, 0);
    }
  }
}

module.exports = Play;
