const { SlashCommandBuilder } = require("@discordjs/builders");
const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActivityType,
  GuildScheduledEventPrivacyLevel,
  ClientUser,
  Embed,
} = require("discord.js");


/**
 * Create a text progress bar
 * @param {Number} value - The value to fill the bar
 * @param {Number} maxValue - The max value of the bar
 * @param {Number} size - The bar size (in letters)
 * @return {String} - The bar
 */
function progressBar(value, maxValue, size){
  const percentage = value / maxValue; // Calculate the percentage of the bar
  const progress = Math.round((size * percentage)); // Calculate the number of square caracters to fill the progress side.
  const emptyProgress = size - progress; // Calculate the number of dash caracters to fill the empty progress side.

  const progressText = '▇'.repeat(progress); // Repeat is creating a string with progress * caracters in it
  const emptyProgressText = '—'.repeat(emptyProgress); // Repeat is creating a string with empty progress * caracters in it
  const percentageText = Math.round(percentage * 100) + '%'; // Displaying the percentage of the bar

  const bar = '```[' + progressText + emptyProgressText + ']' + percentageText + '```'; // Creating the bar
  return bar;
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName("yearprogress")
    .setDescription("How far are we into the year?")
    .setDMPermission(true),
  async execute(interaction) {
    await interaction.deferReply();

    var today = new Date();
    let DateNumber;
    let DatePercent;
    DateNumber = Math.ceil((today - new Date(today.getFullYear(),0,1)) / 86400000);
    DatePercent = DateNumber/365*100

    let MaxDate;
    if (DateNumber > 365) {
      MaxDate = 366
    } else {
      MaxDate = 365
    }

    let title;
    let embColor;
    let iconDesc;
    if (DateNumber == 1) {
      title = "Happy new year! Have a nice " + today.getFullYear()
      embColor = "#fc5b8d"
      iconDesc = "✨ "
    } else {
      title = "We are currently " + Math.floor(DatePercent) + "% into the year " + today.getFullYear() + "!"
      embColor = "#f5bc42"
      iconDesc = "⭐ "
    }

    let DateEmbed = new EmbedBuilder()
    .setTitle(title)
    .setColor(embColor)
    .setDescription(
      iconDesc + DateNumber + "/" + MaxDate + " | " + today.getFullYear() +
      "\n" +
      progressBar(DatePercent, 100, 20))

        return interaction.editReply({ embeds: [DateEmbed] });
  },
};
