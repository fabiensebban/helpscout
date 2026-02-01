const axios = require('axios');

module.exports = {
    name: "helpscout", // Skill name
    description: "Integrates HelpScout functionality with OpenClaw.",

    // Define the main function of the skill
    async handle(ctx, args) {
        // Fetch arguments (e.g., auth keys or task details)
        const apiKey = ctx.config.services.helpscout.apiKey;
        const endpoint = args.endpoint || '/v2/conversations';

        try {
            // Make a test call to HelpScout's API
            const response = await axios.get(`https://api.helpscout.com${endpoint}`, {
                headers: { "Authorization": `Bearer ${apiKey}` }
            });

            // Return results
            return ctx.reply(`API responded with: ${JSON.stringify(response.data)}`);
        } catch (e) {
            return ctx.reply(`Failed to fetch data from HelpScout: ${e.message}`);
        }
    },

    // Optional: CLI commands that extend OpenClaw
    cli: {
        helpscout: (args, cb) => {
            console.log("HelpScout CLI command received:", args);
            cb();
        }
    }
};
