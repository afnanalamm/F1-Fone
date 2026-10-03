// Run with: node fetch-sessions.mjs   (Node 18+, no dependencies)
// Writes raceSessionsByYear.js in the same layout as the hand-built file.
import { writeFile } from 'node:fs/promises';

const YEARS = [2023, 2024, 2025, 2026, 2027];
const SESSIONS = [
  'Practice 1',
  'Practice 2',
  'Practice 3',
  'Qualifying',
  'Race',
  'Sprint Qualifying',
  'Sprint',
];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function getSessions(year, sessionName, attempt = 1) {
  const url = new URL('https://api.openf1.org/v1/sessions');
  url.searchParams.set('year', year);
  url.searchParams.set('session_name', sessionName);

  const res = await fetch(url);

  // OpenF1 answers 404 when nothing matches (e.g. 2027, or no sprint that year)
  if (res.status === 404) return [];

  // Rate limited: back off and retry
  if (res.status === 429 && attempt <= 5) {
    await sleep(2000 * attempt);
    return getSessions(year, sessionName, attempt + 1);
  }

  if (!res.ok) throw new Error(`${res.status} for ${url}`);
  return res.json();
}

let out = 'export const raceSessionsByYear = {\n\n';

for (const year of YEARS) {
  if (year === 2027) {
    out += '// 2027 races still needs to be confirmed, but here is the current schedule:\n';
  }
  out += `    ${year}: {\n`;

  for (const name of SESSIONS) {
    const rows = await getSessions(year, name);
    console.log(`${year} ${name}: ${rows.length} sessions`);
    out += `      '${name}': ${JSON.stringify(rows, null, 2)}, \n`;
    await sleep(400); // stay under the free-tier rate limit
  }

  out += '    },\n';
}

out += '};\n';

await writeFile('raceSessionsByYear.js', out);
console.log('Saved raceSessionsByYear.js');
