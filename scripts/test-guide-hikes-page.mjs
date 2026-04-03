import assert from 'node:assert/strict'
import fs from 'node:fs/promises'
import path from 'node:path'

const repoRoot = '/Users/braghini/Library/CloudStorage/OneDrive-minasglobaltrading.com/Codes/docelarhomes-deploy'
const hikesPath = path.join(repoRoot, 'guide', 'deervalleybasecamp', 'hikes', 'index.html')

const hikesSource = await fs.readFile(hikesPath, 'utf8')

assert.match(hikesSource, /Top 10 Hikes Near Deer Valley Basecamp/i, 'hikes page should expose the hiking guide title')
assert.match(hikesSource, />Easy</i, 'hikes page should expose an Easy section')
assert.match(hikesSource, />Moderate</i, 'hikes page should expose a Moderate section')
assert.match(hikesSource, />Hard</i, 'hikes page should expose a Hard section')
assert.match(hikesSource, /Provo River Parkway/i, 'hikes page should include a Provo River easy option')
assert.match(hikesSource, /Jordanelle Reservoir Perimeter Trail/i, 'hikes page should include Jordanelle in the moderate picks')
assert.match(hikesSource, /South Fork Little Deer Creek/i, 'hikes page should include a hard backcountry option')
assert.match(
  hikesSource,
  /https:\/\/maps\.google\.com\/\?q=Provo\+River\+Parkway\+Trail\+Vivian\+Park\+UT/i,
  'hikes page should link Provo River Parkway to maps'
)
assert.match(
  hikesSource,
  /https:\/\/maps\.google\.com\/\?q=Silver\+Lake\+Lodge\+Deer\+Valley\+Resort\+Park\+City\+UT/i,
  'hikes page should link Deer Valley access to maps'
)

if (process.argv[2]) {
  const baseUrl = process.argv[2].replace(/\/$/, '')
  const response = await fetch(`${baseUrl}/guide/deervalleybasecamp/hikes/`)
  assert.equal(response.status, 200, 'hikes route should return 200')

  const html = await response.text()
  assert.match(html, /Top 10 Hikes Near Deer Valley Basecamp/i, 'live hikes page should contain the hiking guide title')
}

console.log('guide hikes page test passed')
