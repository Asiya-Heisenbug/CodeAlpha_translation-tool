exports.handler = async (event) => {
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
      return {
        statusCode: 400,
        headers: { 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ error: 'Missing text or targetLang' }),
      };
    }

    const langMap = {
      'auto': 'autodetect',
      'English': 'en', 'Spanish': 'es', 'French': 'fr', 'German': 'de',
      'Italian': 'it', 'Portuguese': 'pt', 'Japanese': 'ja', 'Korean': 'ko',
      'Chinese (Simplified)': 'zh-CN', 'Chinese (Traditional)': 'zh-TW',
      'Arabic': 'ar', 'Hindi': 'hi', 'Russian': 'ru', 'Dutch': 'nl',
      'Swedish': 'sv', 'Polish': 'pl', 'Turkish': 'tr', 'Greek': 'el',
      'Hebrew': 'he', 'Thai': 'th', 'Vietnamese': 'vi', 'Indonesian': 'id',
      'Tamil': 'ta', 'Bengali': 'bn', 'Urdu': 'ur', 'Malay': 'ms',
      'Persian': 'fa', 'Ukrainian': 'uk', 'Romanian': 'ro', 'Czech': 'cs',
      'Hungarian': 'hu', 'Finnish': 'fi', 'Danish': 'da', 'Norwegian': 'no',
      'Catalan': 'ca', 'Croatian': 'hr', 'Slovak': 'sk', 'Swahili': 'sw',
      'Tagalog': 'tl'
    };

    const srcCode = langMap[sourceLang] || 'autodetect';
    const tgtCode = langMap[targetLang];

    if (!tgtCode) {
      return {
        statusCode: 400,
        headers: { 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ error: 'Unsupported target language' }),
      };
    }

    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${srcCode}|${tgtCode}`;

    const https = require('https');

    const apiResult = await new Promise((resolve, reject) => {
      https.get(url, (res) => {
        let data = '';
        res.on('data', (chunk) => { data += chunk; });
        res.on('end', () => resolve(data));
      }).on('error', reject);
    });

    const parsed = JSON.parse(apiResult);

    if (parsed.responseStatus !== 200) {
      return {
        statusCode: 502,
        headers: { 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ error: parsed.responseMessage || 'Translation service error' }),
      };
    }

    const result = parsed.responseData?.translatedText?.trim();

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
