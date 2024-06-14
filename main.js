import { Client, ActivityType } from 'discord.js';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import { bypass } from './bypass.js';

// change import to const if it doesn't work

const token = ``; // Your Bot Token!
const clientId = ``; // Your Bot ClientID!

// footer

const OwnerName = `Made by Shouko`; // Your Name Or Something I Dont Care!

// api key & endpoint

const apiKey = `goatbypassersontop`;
const Endpoint = `http://45.90.13.151:6132`;

// author

const rlowisgay = `Shouko Bot -- Template`;
const iconlink = `https://cdn.discordapp.com/icons/1221286752027672686/5ae16d3a1d7411a46abf6d4d6ac53934.png`;
const monkey = `https://discord.gg/shoukohub`

const commands = [
  { name: 'bypass', description: 'Whitelist/Get Key'}, 
];

const client = new Client({ intents: 0 });

client.once('ready', async () => {
  console.log(`Starting initialization for Client!`);
  const servers = client.guilds.cache.size;
  console.log(`Number of servers: ${servers}`);

  const rest = new REST({ version: '9' }).setToken(token);
  try {
    console.log('Start refreshing global application commands (/) for client.');
    await rest.put(Routes.applicationCommands(clientId), { body: commands });
    console.log('Successfully reloaded global application commands (/) for client.');
  } catch (error) {
    console.error('Error refreshing commands:', error);
  }
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;
  switch (interaction.commandName) {
      case 'bypass':
          await bypass(interaction);
          break;
      default:
          break;
  }
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isModalSubmit() || interaction.customId !== 'bypassmodal') return;

  const link = interaction.fields.getTextInputValue('link');
  const box = '```';

  if (!link.startsWith('https://')) {
    await interaction.reply({ content: 'Invalid link format!', ephemeral: true });
    return;
  }

  const bypassEndpoints = [
    'https://flux.li/android/external/start.php?HWID=',
    'https://gateway.platoboost.com/a/8?id=',
    'https://gateway.platoboost.com/',
    'https://banana-hub.xyz/getkey'
  ];

  let apiUrl = bypassEndpoints.find(endpoint => link.startsWith(endpoint));

  if (!apiUrl) {
    await interaction.reply({ content: 'This link is under maintenance or not supported', ephemeral: true });
    return;
  }

  apiUrl = `${Endpoint}/api/bypass?link=${encodeURIComponent(link)}&api_key=${apiKey}`;

  try {
    await interaction.deferReply({
      embeds: [{
        title: '<a:Loading:1232607552886411337> Bypassing...',
        color: 0xFFFF00,
        author: {
          name: 'Shouko Collective | NO-Intelligent Units | 2024',
          iconURL: 'https://cdn.discordapp.com/icons/1221286752027672686/5ae16d3a1d7411a46abf6d4d6ac53934.png',
          url: 'https://discord.gg/shoukohub'
        },
        fields: [
          { name: '<a:papitas:1228689486012223568> Status:', value: `${box}Please wait...${box}` },
        ],
        footer: {
          text: `${OwnerName} | Today at ${new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true })}`,
          icon_url: `https://i.imgur.com/I4QkKtY.jpeg`
        }
      }],
    });

    const fetchBypassResult = async (url) => {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Something went wrong, try again later!');
      return await response.json();
    };

    const primaryResponse = await fetchBypassResult(apiUrl);

    if (!primaryResponse.success) {
      const errorMessage = 'An error occurred. Please try again later!';
      throw new Error(errorMessage);
    }

    let bypassResult = primaryResponse.key;
    if (!bypassResult) {
      throw new Error('Key not found. Please try again with a valid link.');
    }

    const user = interaction.user;
    const avatarURL = user.displayAvatarURL({ format: 'png', dynamic: true, size: 4096 });

    let embed;

    if (link.startsWith("https://banana-hub.xyz/getkey")) {
      embed = {
        title: `✅ Success`,
        color: 0xf08080,
        author: {
          name: `${rlowisgay}`,
          iconURL: `${iconlink}`,
          url: `${monkey}`
        },
        thumbnail: { url: avatarURL },
        fields: [
          { name: '🔑 Key:', value: `${box}${bypassResult}${box}` },
          { name: '🍌 Script:', value: `\`\`\`lua\nrepeat task.wait() until game:IsLoaded()\ngetgenv().Key = "${bypassResult}"\ngetgenv().NewBanana = true\nrepeat task.wait() until game:IsLoaded()\nloadstring(game:HttpGet("https://raw.githubusercontent.com/obiiyeuem/vthangsitink/main/BananaHub.lua"))()\n\`\`\`` },
        ],
        footer: {
          text: `${OwnerName} | Today at ${new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true })}`,
          icon_url: `https://i.imgur.com/I4QkKtY.jpeg`
        }
      };
    } else {
      embed = {
        title: `✅ Success`,
        color: 0xf08080,
        author: {
          name: `${rlowisgay}`,
          iconURL: `${iconlink}`,
          url: `${monkey}`
        },
        thumbnail: { url: avatarURL },
        fields: [
          { name: '🔑 Result:', value: `${box}${bypassResult}${box}` },
        ],
        footer: {
          text: `${OwnerName} | Today at ${new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true })}`,
          icon_url: `https://i.imgur.com/I4QkKtY.jpeg`
        }
      };
    }

    await interaction.editReply({
      embeds: [embed],
      components: [
        {
          type: 1,
          components: [
            {
              type: 2,
              style: 5,
              label: "Support Server",
              url: "https://discord.gg/shoukohub"
            },
            {
              type: 2,
              style: 5,
              label: "Invite Me",
              url: "https://example.com/"
            },
          ]
        }
      ]
    });

    await interaction.followUp({ content: `${bypassResult}`, ephemeral: true });

  } catch (error) {
    const user = interaction.user;
    const avatarURL = user.displayAvatarURL({ format: 'png', dynamic: true, size: 4096 });
    await interaction.editReply({
      embeds: [{
        title: "❌ Error",
        color: 0xFF2A04,
        author: {
          name: `${rlowisgay}`,
          iconURL: `${iconlink}`,
          url: `${monkey}`
        },
        thumbnail: { url: avatarURL },
        fields: [
          { name: '❌ Status:', value: `${box}${error.message}${box}` },
        ],
        footer: {
          text: `${OwnerName} | Today at ${new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true })}`,
          icon_url: `https://i.imgur.com/I4QkKtY.jpeg`
        }
      }],
    });
  }
});

client.login(token);
