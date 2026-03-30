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
  /stay-card[\s\S]*?Wi-?Fi[\s\S]*?DeerValleyBasecamp[\s\S]*?Password[\s\S]*?MountainView[\s\S]*?Copy Password/i,
  'guide hero should combine Wi-Fi and password in one quick details card'
)

assert.match(
  guideSource,
  /stay-card--wifi[\s\S]*?stay-value stay-value--compact stay-value--password[\s\S]*?MountainView/i,
  'desktop Wi-Fi card should give the password a stronger visual treatment than the network'
)

assert.match(
  guideSource,
  /class="stay-card stay-card--details(?:\s+[a-z0-9\-]+)*"/i,
  'desktop arrival should use the details card treatment for richer arrival information'
)

assert.match(
  guideSource,
  /stay-card[\s\S]*?Address[\s\S]*?6047 N Fairview Dr,[\s\S]*?Heber City[\s\S]*?Open Maps/i,
  'guide hero should show the house address with a maps action'
)

assert.match(
  guideSource,
  /class="stay-card stay-card--details stay-card--address"/i,
  'desktop arrival should use a dedicated address card treatment for maps and spacing'
)

assert.match(
  guideSource,
  /class="stay-card stay-card--timing-pair"[\s\S]*?Check-in[\s\S]*?4:00 PM[\s\S]*?Checkout[\s\S]*?11:00 AM/i,
  'desktop arrival should combine check-in and checkout in one refined timing card'
)

assert.match(
  guideSource,
  /mobile-arrival-card[\s\S]*?Network[\s\S]*?Deer<wbr>Valley<wbr>Basecamp[\s\S]*?Password[\s\S]*?Mountain<wbr>View[\s\S]*?Copy Password/i,
  'mobile arrival should also combine Wi-Fi and password with a password copy action'
)

assert.match(
  guideSource,
  /mobile-arrival-card[\s\S]*?Address[\s\S]*?6047 N Fairview Dr,[\s\S]*?Heber City[\s\S]*?Open Maps/i,
  'mobile arrival should show the address and open maps'
)

console.log('guide arrival hero test passed')
