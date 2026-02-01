const fetch = require('node-fetch');
const config = require('openclaw-config');

// Loads Helpscout API credentials securely
const getCredentials = () => {
  const apiKey = config.get("helpscout.apiKey");
  const appSecret = config.get("helpscout.appSecret");
  const inboxIds = config.get("helpscout.inboxIds");

  if (!apiKey || !appSecret || !Array.isArray(inboxIds) || inboxIds.length === 0) {
    throw new Error("Invalid Helpscout credentials. Please configure your API key, app secret, and at least one Inbox ID using the OpenClaw config system.");
  }

  return { apiKey, appSecret, inboxIds };
};

// Fetch Helpscout OAuth token
const getToken = async () => {
  const { apiKey, appSecret } = getCredentials();

  const response = await fetch('https://api.helpscout.net/v2/oauth2/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: apiKey,
      client_secret: appSecret
    })
  });

  if (!response.ok) {
    throw new Error(`Failed to get Helpscout token: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  return data.access_token;
};

module.exports = { getCredentials, getToken };