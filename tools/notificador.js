const Discord = require("discord.js");
const path = require("path");
const client = new Discord.Client({
  intents: [
    Discord.GatewayIntentBits.Guilds,
    Discord.GatewayIntentBits.GuildMessages,
    Discord.GatewayIntentBits.MessageContent,
  ],
});
const token = process.env.tokenD;
const controller = {};

controller.getReady = () => {
  client.login(token);
  client.on("ready", () => {
    console.log("BOT Discord listo");
  });

  client.on("messageCreate", async (mensaje) => {
    console.log(mensaje.content, mensaje.channelId);
    if (
      mensaje.channelId == "1243247477474328646" &&
      mensaje.author.bot != true &&
      data
    ) {
      const canal = client.channels.cache.get("1243247477474328646");
      canal.send(`${data.toJSON()}`);
    }
  });
};

controller.enviarMensaje = (idCanal, mensaje, imagen = null) => {
  const canal = client.channels.cache.get(idCanal);
  canal.send(mensaje);
  if (imagen != null) {
    const adjunto = {
      files: [
        {
          attachment: path.join(__dirname, "../public/uploads/fotos", imagen),
          name: imagen,
          description: "A description of the file",
        },
      ],
    };
    canal.send(adjunto);
  }
};

module.exports = controller;
