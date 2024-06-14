import pkg from 'discord.js';
const { Interaction, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = pkg;

export async function bypass(interaction) {
    const modal = new ModalBuilder()
        .setCustomId('bypassmodal')
        .setTitle('Bypass Link');

    const url = new TextInputBuilder()
        .setCustomId('link')
        .setLabel("Input Your Link:")
        .setStyle(TextInputStyle.Short);
    
    const urlinput = new ActionRowBuilder().addComponents(url);
    modal.addComponents(urlinput);
    
    await interaction.showModal(modal);
}
