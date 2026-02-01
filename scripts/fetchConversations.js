const axios = require('axios');

/**
 * Fetches conversations using the HelpScout API.
 * @param {string} apiKey - Your HelpScout API key.
 * @param {string} endpoint - API endpoint to fetch data from.
 */
async function fetchConversations(apiKey, endpoint = '/v2/conversations') {
    try {
        const response = await axios.get(`https://api.helpscout.net${endpoint}`, {
            headers: {
                Authorization: `Bearer ${apiKey}`,
            },
        });
        console.log('Conversations fetched successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching conversations:', error.response?.data || error.message);
        throw error;
    }
}

module.exports = fetchConversations;