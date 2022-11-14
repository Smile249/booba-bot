const { SlashCommandBuilder } = require("@discordjs/builders");
const fetch = require("node-fetch");
const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActivityType,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("recent")
    .setDMPermission(false)
    .setDescription("Retreive the most recent score set by a player.")
    .addStringOption((option) =>
      option
        .setName("id")
        .setDescription(
          "The scoresaber ID of the person you want to get the score from."
        )
        .setMinLength(6)
        .setRequired(true)
    ),
  execute(interaction, client) {
    fetch(
      "https://scoresaber.com/api/player/" +
        interaction.options.getString("id") +
        "/scores?limit=1&sort=recent&withMetadata=false"
    )
      .then((res) => res.json())
      .then((data) => {
      if(data.playerScores.length < 1){
      return interaction.reply({content:"Couldn't find player. Please enter a valid id",ephemeral:true}) // send a private message if player wasnt found
      }
        const score = data.playerScores[0];
//         console.log(score);
        
        const diffraw = score.leaderboard.difficulty.difficultyRaw;
        let diffArr = diffraw.split("_");
        diffArr.shift(); //removing first element in array because the diff string has _ in the beginning
        let diff = ""  
        if(diffArr[0] == "ExpertPlus") diffArr[0] = "Expert+";
        if(diffArr[1] == "SoloStandard"){
        diff = diffArr[0];
        }else{
        diff = `${diffArr[0]} (${diffArr[1]})`;
        }



        //Create Embed Format
        let scoreEmbed = new EmbedBuilder()
          .setTitle(score.leaderboard.songName)
          .setURL("https://scoresaber.com/leaderboard/" + score.leaderboard.id)
          .setDescription(
            score.leaderboard.songAuthorName +
              "\n" +
              "**" + score.leaderboard.levelAuthorName + "**"
          )
          .setThumbnail(score.leaderboard.coverImage)
          .addFields({
            name: "Accuracy",
            value:
              (
                (score.score.baseScore / score.leaderboard.maxScore) *
                100
              ).toFixed(2) + "%",
          })
          .addFields({
            name: "PP",
            value: JSON.stringify(score.score.pp),
          })
          .addFields({
            name: "Difficulty",
            value: diff,
          })
          .addFields({
            name: "Rank",
            value: JSON.stringify(score.score.rank)
          })

        return interaction.reply({ embeds: [scoreEmbed] });
      });
  },
};
