const { SlashCommandBuilder } = require("@discordjs/builders");
const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActivityType,
  GuildScheduledEventPrivacyLevel,
  ClientUser,
  Client,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
      .setName('hug')
      .setDescription('Hug Someone!')
      .addUserOption(option =>
          option
              .setName('user')
              .setDescription('The user you want to hug')
              .setRequired(true)
      ),
  async execute(interaction) {
    fetch("https://some-random-api.ml/animu/hug")
      .then((res) => res.json())
      .then((data) => {
        let hugEmbed = new EmbedBuilder()
        .setImage(data.link)
        .setDescription(`${interaction.user} hugs ${interaction.options.getUser('user')}`)
      //.setTitle(interaction.user + ' hugs ' + interaction.options.getUser('user'))
      return interaction.reply({embeds: [hugEmbed]})
    });
  },
};