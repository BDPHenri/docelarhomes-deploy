import assert from 'node:assert/strict'
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const repoRoot = path.resolve(__dirname, '..')

const requiredFiles = [
  'deervalleybasecamp/index.html',
  'deervalleybasecamp/book.html',
  'deervalleybasecamp/gallery.html',
  'deervalleybasecamp/reviews.html',
  'deervalleybasecamp/css/variables.css',
  'deervalleybasecamp/js/components.js',
  'deervalleybasecamp/js/reviews-data.js',
  'deervalleybasecamp/js/landing-testimonials.js',
  'guide/deervalleybasecamp/index.html',
  'guide/deervalleybasecamp/hikes/index.html',
  'guide/deervalleybasecamp/assets/logo.png',
]

for (const relativePath of requiredFiles) {
  await fs.access(path.join(repoRoot, relativePath))
}

const landingSource = await fs.readFile(path.join(repoRoot, 'deervalleybasecamp', 'index.html'), 'utf8')
const reviewsPageSource = await fs.readFile(path.join(repoRoot, 'deervalleybasecamp', 'reviews.html'), 'utf8')
const reviewsDataSource = await fs.readFile(path.join(repoRoot, 'deervalleybasecamp', 'js', 'reviews-data.js'), 'utf8')
const landingTestimonialsSource = await fs.readFile(path.join(repoRoot, 'deervalleybasecamp', 'js', 'landing-testimonials.js'), 'utf8')
const guideSource = await fs.readFile(path.join(repoRoot, 'guide', 'deervalleybasecamp', 'index.html'), 'utf8')
const hikesSource = await fs.readFile(path.join(repoRoot, 'guide', 'deervalleybasecamp', 'hikes', 'index.html'), 'utf8')
const singleFontFiles = [
  'deervalleybasecamp/index.html',
  'deervalleybasecamp/book.html',
  'deervalleybasecamp/gallery.html',
  'deervalleybasecamp/reviews.html',
  'deervalleybasecamp/css/footer.css',
  'deervalleybasecamp/css/components.css',
  'deervalleybasecamp/css/layout.css',
  'deervalleybasecamp/css/reviews.css',
  'deervalleybasecamp/css/nav.css',
  'deervalleybasecamp/css/hero.css',
  'deervalleybasecamp/css/booking.css',
  'deervalleybasecamp/css/guide.css',
  'guide/deervalleybasecamp/index.html',
]
const singleFontSources = await Promise.all(
  singleFontFiles.map(async (relativePath) => ({
    relativePath,
    source: await fs.readFile(path.join(repoRoot, relativePath), 'utf8'),
  }))
)

assert.match(
  landingSource,
  /<base href="\/deervalleybasecamp\/">/i,
  'landing should set a base href so assets load from /deervalleybasecamp/ even without a trailing slash'
)

assert.match(landingSource, /family=DM\+Sans/i, 'landing should import the single shared DM Sans family')
assert.match(landingSource, /hero--editorial/i, 'landing should expose the local A-direction editorial hero')
assert.match(
  landingSource,
  /Privacy, stillness, and mountain living in every season\./i,
  'landing hero should adopt the year-round A-direction editorial headline'
)
assert.match(
  landingSource,
  /intro-open-title">Where every season is lived like home</i,
  'landing should use the updated year-round phrase in the intro title'
)
assert.match(landingSource, /Private Evenings/i, 'landing intro should replace the public guest guide row with a private-evenings chapter')
assert.doesNotMatch(landingSource, /Guest Guide/i, 'landing should not advertise the guest guide publicly')
assert.doesNotMatch(landingSource, /\/guide\/deervalleybasecamp\//i, 'landing should not link publicly to the private guest guide')
assert.match(
  landingSource,
  /hero-fact-line[\s\S]*?Heber City, Utah[\s\S]*?4 bedrooms[\s\S]*?Sleeps 14[\s\S]*?Hot Tub \+ Sauna[\s\S]*?8 min to Deer Valley East Village/i,
  'landing should keep the key property facts in the upgraded editorial fact line'
)
assert.doesNotMatch(landingSource, /hero-house-line/i, 'landing hero should stay quieter without a second highlight line')
assert.match(landingSource, /The House/i, 'landing editorial intro should include the house chapter')
assert.match(landingSource, /View \+ Region/i, 'landing editorial intro should give the region a stronger role')
assert.match(
  landingSource,
  /Open views, quiet mornings, and a house that feels part of the valley\./i,
  'landing intro should distill the opening copy into a shorter regional statement'
)
assert.match(
  landingSource,
  /Heber Valley gives the stay its beauty\./i,
  'landing intro image should now foreground the beauty of the surrounding region'
)
assert.match(
  landingSource,
  /images\/photo-break-house\.jpg/i,
  'landing intro should use the more regional scenic image for the refined opening section'
)
assert.match(
  landingSource,
  /Warm interiors and easy gathering for longer stays\./i,
  'landing intro should present the house in a more understated editorial note'
)
assert.match(
  landingSource,
  /Open views and quick access to Deer Valley, Jordanelle, and Midway\./i,
  'landing intro should explicitly elevate both the view and the surrounding region'
)
assert.match(
  landingSource,
  /Hot tub, sauna, and quieter nights back home\./i,
  'landing intro should keep the private-evenings note brief and understated'
)
assert.match(
  landingSource,
  /Made for families, couples, and long weekends with room to breathe\./i,
  'landing should introduce the house section with a calmer editorial headline'
)
assert.match(
  landingSource,
  /A House for Gathering[\s\S]*?images\/gallery\/gameroom-1\.jpg[\s\S]*?Game Room[\s\S]*?Game room/i,
  'landing gathering section should showcase the game room instead of the bunk room in its supporting mosaic'
)
assert.doesNotMatch(
  landingSource,
  /A House for Gathering[\s\S]*?images\/gallery\/bedroom3-1\.jpg[\s\S]*?Bunk Room/i,
  'landing gathering section should no longer lead with the bunk room image'
)
assert.match(landingSource, /intro-open-grid/i, 'landing should use an open split intro layout instead of another boxed section')
assert.match(landingSource, /intro-open-image/i, 'landing should keep the scenic image as part of the open split layout')
assert.doesNotMatch(landingSource, /intro-scene-copy/i, 'landing should drop the boxed intro-scene copy container')
assert.match(
  landingSource,
  /feature-showcase feature-showcase--open/i,
  'landing private-evenings section should shift to the more open layout to reduce the boxed feel'
)
assert.match(
  landingSource,
  /Closer to the mountain, quieter at night\./i,
  'landing should keep the private-evenings headline while simplifying the section around it'
)
assert.match(
  landingSource,
  /Days stay close to Deer Valley, Midway, and Park City, while evenings return to firelight, the hot tub, and a house that feels entirely your own\./i,
  'landing private-evenings section should keep Park City present while staying calm and editorial'
)
assert.match(
  landingSource,
  /A quieter deck with open sky and a valley view\./i,
  'landing private-evenings section should reframe the supporting notes as shorter editorial route cues'
)
assert.match(
  landingSource,
  /Trails, riding, and fly fishing keep the stay as compelling in summer as it is in ski season\./i,
  'landing private-evenings section should fold the seasonal activities into one editorial sentence'
)
assert.doesNotMatch(
  landingSource,
  /feature-note-list|feature-route-row|feature-route-item|feature-route-copy|feature-route-meta/i,
  'landing private-evenings section should drop the leftover route-row UI entirely'
)
assert.match(
  landingSource,
  /Private Evenings[\s\S]*?images\/gallery\/outdoor-deck\.jpg[\s\S]*?Deck Firelight[\s\S]*?Outdoor deck/i,
  'landing private-evenings mosaic should replace the repeated game room image with the outdoor deck'
)
assert.doesNotMatch(
  landingSource,
  /Private Evenings[\s\S]*?images\/gallery\/gameroom-2\.jpg[\s\S]*?Game room/i,
  'landing private-evenings section should no longer repeat the game room image'
)
assert.match(
  landingSource,
  /Long mountain days\. Quiet evenings back home\./i,
  'landing photo break should complement the intro headline with its own quieter return-home phrase'
)
assert.match(landingSource, /id="landing-testimonials-grid"/i, 'landing should expose a dedicated testimonials grid for featured reviews')
assert.match(landingSource, /js\/reviews-data\.js/i, 'landing should load the shared manual reviews data')
assert.match(landingSource, /js\/landing-testimonials\.js/i, 'landing should render featured testimonials from the shared manual data file')
assert.doesNotMatch(landingSource, /Rodrigo/i, 'landing should no longer hardcode the old Rodrigo testimonial')
assert.doesNotMatch(landingSource, /Explore the Property/i, 'landing hero should no longer expose the old second button')
assert.doesNotMatch(landingSource, /hero-meta-item/i, 'landing hero should no longer show the old stat box row')
assert.match(reviewsDataSource, /Nicholas/i, 'manual reviews data should include Nicholas')
assert.match(reviewsDataSource, /Tina/i, 'manual reviews data should include Tina')
assert.match(reviewsDataSource, /Rafael/i, 'manual reviews data should include Rafael')
assert.match(reviewsDataSource, /featured:\s*true/i, 'manual reviews data should mark featured testimonials for the landing')
assert.match(reviewsDataSource, /Vivian is an incredible host\./i, 'manual reviews data should capture Nicholas review text')
assert.match(reviewsDataSource, /We enjoyed our time at the deer valley base camp\./i, 'manual reviews data should capture Tina review text')
assert.match(reviewsDataSource, /One of the best Airbnbs we['’]ve ever stayed at\./i, 'manual reviews data should capture Rafael review text')
assert.match(landingTestimonialsSource, /DEER_VALLEY_MANUAL_REVIEWS/i, 'landing testimonials script should render from the shared manual reviews data')
assert.match(landingTestimonialsSource, /featured/i, 'landing testimonials script should filter for featured reviews')
assert.match(reviewsPageSource, /js\/reviews-data\.js/i, 'reviews page should load the shared manual reviews data')
assert.doesNotMatch(reviewsPageSource, /cvmgylogeanxwtijhzpo\.supabase\.co/i, 'reviews page should not depend on the old Supabase feed for manual mode')
assert.match(reviewsPageSource, /Loading curated reviews/i, 'reviews page should describe the manual curated loading state')
assert.match(guideSource, /family=DM\+Sans/i, 'guide should import the single shared DM Sans family')
assert.doesNotMatch(landingSource, /Cormorant\+Garamond/i, 'landing should not import a second font family')
assert.doesNotMatch(guideSource, /Cormorant\+Garamond/i, 'guide should not import a second font family')
assert.doesNotMatch(guideSource, /Bodoni Moda/i, 'guide should no longer use the old Bodoni family')
assert.doesNotMatch(guideSource, /family=Sora/i, 'guide should no longer use the old Sora family import')
singleFontSources.forEach(({ relativePath, source }) => {
  assert.doesNotMatch(
    source,
    /Cormorant Garamond/i,
    `${relativePath} should only use the shared DM Sans family`
  )
})
assert.match(
  guideSource,
  /href="https:\/\/docelarhomes\.com\/deervalleybasecamp"/i,
  'guide should link back to the Deer Valley landing page'
)
assert.match(guideSource, /View Property/i, 'guide should expose a property-site CTA')
assert.match(guideSource, /id="mobile-arrival"/i, 'guide should expose a mobile arrival dashboard')
assert.match(
  guideSource,
  /id="mobile-arrival"[\s\S]*?Network[\s\S]*?DeerValleyBasecamp[\s\S]*?Password[\s\S]*?MountainView[\s\S]*?Copy Wi-Fi/i,
  'guide mobile dashboard should show Wi-Fi network, password, and a copy action'
)
assert.match(
  guideSource,
  /https:\/\/maps\.google\.com\/\?q=6047\+N\+Fairview\+Dr,\+Heber\+City,\+UT/i,
  'guide mobile directions card should open the exact property address in maps'
)
assert.match(
  guideSource,
  /mobile-arrival-detail-value--network/i,
  'guide should style the Wi-Fi network value separately from the password'
)
assert.match(
  guideSource,
  /Deer<wbr>Valley<wbr>Basecamp/i,
  'guide should allow clean line breaks in the Wi-Fi network name on narrow mobile screens'
)
assert.match(guideSource, /Things to do highlights/i, 'guide should prioritize things to do highlights on mobile')
assert.match(guideSource, /Restaurant highlights/i, 'guide should expose restaurant highlights on mobile')
assert.match(guideSource, /Best Trails Nearby/i, 'guide mobile highlights should include curated regional trails')
assert.match(
  guideSource,
  /Best Trails Nearby[\s\S]*?href="\/guide\/deervalleybasecamp\/hikes\/"/i,
  'guide mobile trails highlight should open the dedicated hikes guide'
)
assert.match(
  guideSource,
  /Top 10 Hikes Guide[\s\S]*?href="\/guide\/deervalleybasecamp\/hikes\/"/i,
  'guide desktop activities section should expose a hikes guide entry point'
)
assert.match(
  guideSource,
  /Deer Valley Resort[\s\S]*?https:\/\/maps\.google\.com\/\?q=Deer\+Valley\+East\+Village\+Park\+City\+UT[\s\S]*?Open Maps ↗/i,
  'guide mobile highlights should link Deer Valley Resort to Deer Valley East Village in maps'
)
assert.match(
  guideSource,
  /Jordanelle State Park[\s\S]*?https:\/\/maps\.google\.com\/\?q=Jordanelle\+State\+Park\+UT[\s\S]*?Open Maps ↗/i,
  'guide mobile highlights should link Jordanelle State Park to maps'
)
assert.match(guideSource, /Back 40 Ranch House/i, 'guide mobile restaurant highlights should include Back 40 Ranch House')
assert.match(guideSource, /Midway Mercantile/i, 'guide mobile restaurant highlights should include Midway Mercantile')
assert.match(guideSource, /The Hub/i, 'guide mobile restaurant highlights should include The Hub')
assert.match(
  guideSource,
  /https:\/\/maps\.google\.com\/\?q=Back\+40\+Ranch\+House\+Heber\+City\+UT/i,
  'guide mobile restaurant highlights should link Back 40 Ranch House to maps'
)
assert.match(
  guideSource,
  /https:\/\/maps\.google\.com\/\?q=Midway\+Mercantile\+Midway\+UT/i,
  'guide mobile restaurant highlights should link Midway Mercantile to maps'
)
assert.match(
  guideSource,
  /https:\/\/maps\.google\.com\/\?q=The\+Hub\+Heber\+City\+UT/i,
  'guide mobile restaurant highlights should link The Hub to maps'
)
assert.doesNotMatch(guideSource, /mobile-footer-nav/i, 'guide should not expose the removed mobile footer navigation')
assert.match(
  guideSource,
  /@media\s*\(max-width:\s*820px\)[\s\S]*?\.hero-right-logo\s*\{[\s\S]*?display:\s*none;/i,
  'guide should hide the oversized hero logo on mobile'
)
assert.match(
  guideSource,
  /\.brand img\s*\{[\s\S]*?object-fit:\s*contain;[\s\S]*?padding:\s*0;/i,
  'guide header logo should render without inner padding so it stays legible'
)
assert.match(
  guideSource,
  /\.mobile-arrival-main\s*\{[\s\S]*?align-items:\s*center;[\s\S]*?text-align:\s*center;/i,
  'guide mobile arrival content should be visually centered inside the cards'
)
assert.match(guideSource, /\.mobile-arrival-value\s*\{[\s\S]*?font-size:\s*1\.34rem;[\s\S]*?font-weight:\s*600;/i, 'guide mobile arrival primary values should stay visually prominent even with one shared font')
assert.match(
  guideSource,
  /\.mobile-arrival-detail-value--network\s*\{[\s\S]*?font-size:\s*0\.96rem;[\s\S]*?letter-spacing:\s*-0\.04em;/i,
  'guide Wi-Fi network value should use a compact style so the SSID does not break awkwardly'
)
assert.match(
  guideSource,
  /\.mobile-highlight-name\s*\{[\s\S]*?font-size:\s*1\.6rem;[\s\S]*?font-weight:\s*600;/i,
  'guide mobile highlight titles should feel distinctly stronger than supporting copy'
)
assert.match(
  guideSource,
  /\.mobile-highlight-copy\s*\{[\s\S]*?font-size:\s*0\.88rem;[\s\S]*?max-width:\s*18rem;/i,
  'guide mobile highlight supporting copy should stay lighter and narrower than the title'
)
assert.match(
  guideSource,
  /\.mobile-highlight-time\s*\{[\s\S]*?font-size:\s*0\.7rem;[\s\S]*?text-transform:\s*uppercase;/i,
  'guide mobile highlight times should be quieter utility metadata'
)
assert.match(
  guideSource,
  /\.mobile-highlight-link\s*\{[\s\S]*?font-size:\s*0\.66rem;[\s\S]*?text-transform:\s*uppercase;/i,
  'guide mobile restaurant links should be visually more discreet than titles'
)
assert.match(guideSource, /mobile-collapsible-section/i, 'guide should expose mobile-only collapsible long sections')
assert.match(guideSource, /mobile-section-toggle/i, 'guide should expose mobile accordion toggles')
assert.match(guideSource, /aria-expanded="false"/i, 'guide accordion sections should start closed')
assert.match(
  guideSource,
  /id="mobile-eat"[\s\S]*?<section id="amenities"[\s\S]*?mobile-collapsible-section/i,
  'guide accordion should start only after the mobile highlights'
)
assert.match(
  guideSource,
  /const mobileCollapsibleSections = document\.querySelectorAll\("\.mobile-collapsible-section"\)/i,
  'guide should wire mobile accordion behavior in JavaScript'
)
assert.match(hikesSource, /Top 10 Hikes Near Deer Valley Basecamp/i, 'hikes page should expose the new top hikes title')
assert.match(hikesSource, />Easy</i, 'hikes page should expose an Easy section')
assert.match(hikesSource, />Moderate</i, 'hikes page should expose a Moderate section')
assert.match(hikesSource, />Hard</i, 'hikes page should expose a Hard section')
assert.match(hikesSource, /Provo River Parkway/i, 'hikes page should include a Provo River easy option')
assert.match(hikesSource, /Jordanelle Reservoir Perimeter Trail/i, 'hikes page should include Jordanelle in the moderate picks')
assert.match(hikesSource, /South Fork Little Deer Creek/i, 'hikes page should include a hard backcountry option')
assert.match(
  hikesSource,
  /https:\/\/maps\.google\.com\/\?q=Provo\+River\+Parkway\+Trail\+Vivian\+Park\+UT/i,
  'hikes page should link easy Provo River hiking to maps'
)
assert.match(
  hikesSource,
  /https:\/\/maps\.google\.com\/\?q=Silver\+Lake\+Lodge\+Deer\+Valley\+Resort\+Park\+City\+UT/i,
  'hikes page should link the Bald Mountain access point to maps'
)

const retiredPath = path.join(repoRoot, 'welcomebook', 'deervalleybasecamp')
let retiredExists = true

try {
  await fs.access(retiredPath)
} catch {
  retiredExists = false
}

assert.equal(retiredExists, false, 'welcomebook/deervalleybasecamp should not exist in the deploy folder')

if (process.argv[2]) {
  const baseUrl = process.argv[2].replace(/\/$/, '')

  const [landingResponse, guideResponse, hikesResponse, retiredResponse, bookResponse, galleryResponse, reviewsResponse] = await Promise.all([
    fetch(`${baseUrl}/deervalleybasecamp/`),
    fetch(`${baseUrl}/guide/deervalleybasecamp/`),
    fetch(`${baseUrl}/guide/deervalleybasecamp/hikes/`),
    fetch(`${baseUrl}/welcomebook/deervalleybasecamp/`),
    fetch(`${baseUrl}/deervalleybasecamp/book.html`),
    fetch(`${baseUrl}/deervalleybasecamp/gallery.html`),
    fetch(`${baseUrl}/deervalleybasecamp/reviews.html`),
  ])

  assert.equal(landingResponse.status, 200, 'landing route should return 200')
  assert.equal(guideResponse.status, 200, 'guide route should return 200')
  assert.equal(hikesResponse.status, 200, 'hikes route should return 200')
  assert.equal(retiredResponse.status, 404, 'retired welcome-book route should return 404')
  assert.equal(bookResponse.status, 200, 'book page should return 200')
  assert.equal(galleryResponse.status, 200, 'gallery page should return 200')
  assert.equal(reviewsResponse.status, 200, 'reviews page should return 200')

  const [landingHtml, guideHtml, hikesHtml] = await Promise.all([
    landingResponse.text(),
    guideResponse.text(),
    hikesResponse.text(),
  ])

  assert.match(landingHtml, /Deer Valley Basecamp/i, 'landing should contain Deer Valley Basecamp')
  assert.match(guideHtml, /Deer Valley Basecamp/i, 'guide should contain Deer Valley Basecamp')
  assert.match(hikesHtml, /Top 10 Hikes Near Deer Valley Basecamp/i, 'hikes page should contain the new hiking guide title')
}

console.log('docelarhomes deploy tests passed')
