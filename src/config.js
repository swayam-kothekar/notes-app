const { SecretsManagerClient, GetSecretValueCommand } = require('@aws-sdk/client-secrets-manager');

const client = new SecretsManagerClient({ region: 'us-east-1' });

async function loadSecrets(secretName) {
  try {
    const response = await client.send(
      new GetSecretValueCommand({ SecretId: secretName })
    );

    const secrets = JSON.parse(response.SecretString);

    Object.entries(secrets).forEach(([key, value]) => {
      process.env[key] = value;
    });

    console.log('Secrets loaded successfully');
  } catch (error) {
    console.error('Failed to load secrets from Secrets Manager, falling back to .env:', error.message);
  }
}

module.exports = { loadSecrets };