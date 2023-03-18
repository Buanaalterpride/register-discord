const { MessageEmbed, Permissions } = require('discord.js');
const { ID_CHANNEL, TAG, ID_ROLE, ID_ROLE_REMOVE } = require('../../util/config.json');

module.exports = {
  name: 'register',
  aliases: ['r'],
  description: 'This is the command for registration',
  async execute(message, args, client) {
    const nickname = args.join(' ');
    const channel = await `${ID_CHANNEL}`;
    const role = await `${ID_ROLE}`;
    const roleremove = `${ID_ROLE_REMOVE}`;
    const tag = await `${TAG}`;

    if (message.channel.id != `${channel}`) {
      const embed2 = new MessageEmbed().setTitle(`**❌ Channel Non Supported**`);
      return message.reply({ embeds: [embed2] });
    }

    if (!nickname) {
      const embed3 = new MessageEmbed().setDescription(`**❌ Please enter the name you want to use**`);
      return message.reply({ embeds: [embed3] });
    }

    if (nickname.length > 32) {
      const embed4 = new MessageEmbed().setDescription(`**❌ Name Must Be 32 Words**`);
      return message.reply({ embeds: [embed4] });
    }

    try {
      if (!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
        const embed = new MessageEmbed().setDescription(`**✅ Account Success Registered Please Perform IP Register Stage**`);

        if (!(await roleremove)) {
          await message.member.roles.add(`${role}`);
          if (await tag) {
            await message.member.setNickname(`${tag} ${nickname}`);
          } else {
            await message.member.setNickname(`${nickname}`);
          }
          return message.reply({ embeds: [embed] });
        } else if (!(await tag)) {
          await message.member.roles.add(`${role}`);
          if (await roleremove) {
            await message.member.roles.remove(`${roleremove}`);
          }
          await message.member.setNickname(`${nickname}`);
          return message.reply({ embeds: [embed] });
        } else {
          await message.member.roles.add(`${role}`);
          await message.member.roles.remove(`${roleremove}`);
          await message.member.setNickname(`${tag} ${nickname}`);
          return message.reply({ embeds: [embed] });
        }
      } else {
        const embed5 = new MessageEmbed().setDescription(`**❌ You Are Admin Or Developers**`);
        return message.reply({ embeds: [embed5] });
      }
    } catch (e) {
      console.log(e);
    }
  },
};
