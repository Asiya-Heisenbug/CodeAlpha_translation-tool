exports.handler = async (event) => {
  // Handle preflight CORS
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
      },
      body: '',
    };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { text, sourceLang, targetLang } = JSON.parse(event.body);

    if (!text || !targetLang) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Missing text or targetLang' }) };
    }

    const fromStr = sourceLang === 'auto' ? 'the detected language' : sourceLang;

    const prompt = `You are a professional translation assistant. Translate the following text from ${fromStr} to ${targetLang}.
${sourceLang === 'auto' ? 'First detect what language this is, then translate it.' : ''}
Provide ONLY the translated text — no explanations, no notes, no quotation marks around the output. If you detect the language (because auto-detect was selected), add a single line at the very end in the format: [Detected: LanguageName]

Text to translate:
${text}`;

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',,
        max_tokens: 1000,
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      return {
        statusCode: response.status,
        headers: { 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ error: errData.error?.message || 'Anthropic API error' }),
      };
    }

    const data = await response.json();
    const result = data.content?.map((b) => b.text || '').join('').trim();

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ result }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: err.message || 'Internal server error' }),
    };
  }
};
