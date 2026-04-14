const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const BASE_URL = process.env.SMOKE_BASE_URL;
const TOKEN = process.env.SMOKE_BEARER_TOKEN;
const SAME_SCHOOL_USER_ID = process.env.SMOKE_SAME_SCHOOL_USER_ID;
const VERIFIED_SESSION_ID = process.env.SMOKE_VERIFIED_SESSION_ID;
const VERIFIED_GAME_CODE = process.env.SMOKE_VERIFIED_GAME_CODE;
const PROFILE_TITLE = process.env.SMOKE_PROFILE_TITLE;
const ALLOW_PROFILE_UPDATE = process.env.SMOKE_ALLOW_PROFILE_UPDATE === 'true';

function assertEnv(value, label) {
  if (!value) {
    throw new Error(`${label} is required`);
  }
}

async function apiRequest(label, endpoint, options = {}) {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${TOKEN}`,
      ...(options.headers || {}),
    },
  });

  const payload = await response.json().catch(() => ({}));
  return {
    label,
    ok: response.ok,
    status: response.status,
    payload,
  };
}

function printResult(result) {
  const prefix = result.ok ? 'PASS' : 'FAIL';
  console.log(`[${prefix}] ${result.label} (${result.status})`);
  if (!result.ok) {
    console.log(result.payload);
  }
}

async function run() {
  assertEnv(BASE_URL, 'SMOKE_BASE_URL');
  assertEnv(TOKEN, 'SMOKE_BEARER_TOKEN');

  const results = [];

  results.push(await apiRequest('Get profile', '/api/user', { method: 'GET' }));

  if (ALLOW_PROFILE_UPDATE && PROFILE_TITLE) {
    results.push(
      await apiRequest('Update profile title', '/api/user', {
        method: 'PUT',
        body: JSON.stringify({ title: PROFILE_TITLE }),
      })
    );
  } else {
    console.log('[SKIP] Profile update is disabled. Set SMOKE_ALLOW_PROFILE_UPDATE=true and SMOKE_PROFILE_TITLE to enable it.');
  }

  if (SAME_SCHOOL_USER_ID) {
    results.push(
      await apiRequest('Get same-school stats', `/api/user/${SAME_SCHOOL_USER_ID}/stats`, {
        method: 'GET',
      })
    );
  } else {
    console.log('[SKIP] Same-school stats check requires SMOKE_SAME_SCHOOL_USER_ID.');
  }

  results.push(
    await apiRequest('Create trivia session', '/api/trivia/session', {
      method: 'POST',
      body: JSON.stringify({
        title: 'Smoke Test Trivia Session',
        questions: [
          {
            question: 'What does APR stand for?',
            options: [
              'Annual Percentage Rate',
              'Average Payment Rule',
              'Applied Profit Ratio',
              'Annual Profit Return',
            ],
            correctAnswer: 0,
            timeLimit: 30,
          },
        ],
      }),
    })
  );

  if (VERIFIED_SESSION_ID || VERIFIED_GAME_CODE) {
    results.push(
      await apiRequest('Submit verified game result', '/api/game/result', {
        method: 'POST',
        body: JSON.stringify(
          VERIFIED_SESSION_ID ? { sessionId: VERIFIED_SESSION_ID } : { gameCode: VERIFIED_GAME_CODE }
        ),
      })
    );
  } else {
    console.log('[SKIP] Verified game result check requires SMOKE_VERIFIED_SESSION_ID or SMOKE_VERIFIED_GAME_CODE.');
  }

  results.push(await apiRequest('Get leaderboard', '/api/leaderboard/top', { method: 'GET' }));
  results.push(await apiRequest('Get challenges', '/api/challenges/daily', { method: 'GET' }));

  results.forEach(printResult);

  const failed = results.filter((result) => !result.ok);
  if (failed.length > 0) {
    throw new Error(`Smoke checks failed: ${failed.map((result) => result.label).join(', ')}`);
  }

  console.log('All requested smoke checks passed.');
}

if (require.main === module) {
  run().catch((error) => {
    console.error('Post-deploy smoke failed:', error);
    process.exitCode = 1;
  });
}

module.exports = { run };
