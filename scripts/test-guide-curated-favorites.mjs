import assert from 'node:assert/strict'
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const repoRoot = path.resolve(__dirname, '..')

const guideSource = await fs.readFile(
  path.join(repoRoot, 'guide', 'deervalleybasecamp', 'index.html'),
  'utf8'
)

assert.match(
  guideSource,
  /id="guest-favorites"/i,
  'guide should include an early guest favorites section'
)

assert.match(
  guideSource,
  /The short list guests reach for first\./i,
  'guide should give the curated favorites section a calmer editorial title'
)

assert.match(
  guideSource,
  /id="guest-favorites"[\s\S]*?favorites-grid[\s\S]*?list-card/i,
  'guide should render the curated favorites using the same boxed card language as the rest of the guide'
)

assert.match(
  guideSource,
  /Top Restaurants[\s\S]*?Back 40 Ranch House[\s\S]*?Midway Mercantile[\s\S]*?The Hub/i,
  'guide should surface the three top restaurants near the top of the page'
)

assert.match(
  guideSource,
  /Top Activities[\s\S]*?East Deer Valley Resort[\s\S]*?Jordanelle State Park[\s\S]*?Top Hiking Guide/i,
  'guide should surface the three top activities near the top of the page'
)

assert.match(
  guideSource,
  /href="\/guide\/deervalleybasecamp\/hikes\/"/i,
  'guide should link from the curated activities list to the hikes guide'
)

assert.match(
  guideSource,
  /Best Dinners[\s\S]*?Back 40 Ranch House[\s\S]*?Midway Mercantile[\s\S]*?Riverhorse on Main/i,
  'guide should group stronger dinner picks together in the dining section'
)

assert.match(
  guideSource,
  /Casual \+ Group-Friendly[\s\S]*?The Hub[\s\S]*?Main St Pizza & Noodle[\s\S]*?Tacos El Cuero/i,
  'guide should group the easier casual options together in the dining section'
)

assert.match(
  guideSource,
  /Breakfast \/ Brunch[\s\S]*?Jade's Cafe[\s\S]*?Café Galleria/i,
  'guide should group breakfast and brunch options together in the dining section'
)

assert.match(
  guideSource,
  /Park City Night Out[\s\S]*?Flanagan's[\s\S]*?Hidden Ace/i,
  'guide should give Park City night options their own group in the dining section'
)

console.log('guide curated favorites test passed')
