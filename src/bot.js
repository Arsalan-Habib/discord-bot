require("dotenv").config();
const { Client } = require("discord.js");

const client = new Client();
const PREFIX = "$";

client.login(process.env.DISCORD_JS_BOT_TOKEN);
client.on("ready", () => {
    console.log(`${client.user.username} has logged in successfully.`);
});
client.on("message", (message) => {
    if (!message.author.bot) {
        if (message.content.startsWith(PREFIX)) {
            const [CMD_NAME, ...args] = message.content
                .trim()
                .substring(PREFIX.length)
                .split(/\s+/);

            console.log(CMD_NAME);
            if (CMD_NAME === "kick") {
                if (!message.member.hasPermission("KICK_MEMBERS"))
                    return message.reply(
                        "You don't have permission to use that command."
                    );
                if (args.length === 0)
                    return message.reply("Please provide an ID.");

                const member = message.guild.members.cache.get(args[0]);
                if (member) {
                    member
                        .kick()
                        .then((member) => {
                            message.channel.send(`${member} was kicked.`);
                        })
                        .catch((err) => {
                            message.channel.send(
                                `I don't have permissions to kick ${member.user.username} :(`
                            );
                        });
                } else {
                    message.reply("Member not found.");
                }
            }
        }
    } else {
        return;
    }
});
