# Deer Valley Basecamp Handoff

Last updated: March 24, 2026

This document is the operational handoff for the Deer Valley Basecamp family inside `docelarhomes.com`.

It is meant to give OpenClaw enough context to safely update the property website, the private guest guide, and supporting pages without re-learning the project from scratch.

## Live Routes

- Public property site:
  - `https://docelarhomes.com/deervalleybasecamp`
  - `https://www.docelarhomes.com/deervalleybasecamp` redirects to the apex URL
- Private guest guide:
  - `https://docelarhomes.com/guide/deervalleybasecamp/`
- Hiking subpage:
  - `https://docelarhomes.com/guide/deervalleybasecamp/hikes/`
- Reviews page for the property site:
  - `https://docelarhomes.com/deervalleybasecamp/reviews.html`

## Product Roles

### 1. Property Site

Purpose:
- Sell the stay
- Present the house as high-luxury, calm, private, and year-round
- Feel editorial, not template-like

Important decisions already made:
- Use only `DM Sans`
- Keep the tone quiet, premium, and spacious
- Avoid AI-looking layouts, crowded cards, stat boxes, and extra buttons
- Use these live lines on the property site:
  - `Where every season is lived like home`
  - `Long mountain days. Quiet evenings back home.`

### 2. Private Guest Guide

Purpose:
- Help guests who already booked
- Reduce repeat questions before arrival and during the stay
- Prioritize utility without looking like a dashboard or a generic app

Important decisions already made:
- The guide is private in spirit and should read as `Private Guest Guide`
- It should belong to the same family as the public property site
- It should not behave like a second public sales page
- The information guests ask for most is:
  - what to do nearby
  - where to eat
- Mobile must reflect the same content priorities, not become a different product

## Brand Rules

These rules are important and should be treated as constraints, not suggestions.

- Do not introduce extra font families. Use `DM Sans` only.
- Do not let the design drift into AI-slop, SaaS dashboard, or template energy.
- Do not overload the layout with cards, pills, buttons, and boxes.
- Do not add unnecessary text. Guests should scan and understand quickly.
- Do not add public-booking language back into the guide.
- Do not reintroduce `Book Your Stay` into the guide.
- The guide does not need to be linked from the public property site.
- The guide should feel like a private concierge, not a microsite.

## Current Source Files

### Property Site

- Main landing:
  - `deervalleybasecamp/index.html`
- Reviews page:
  - `deervalleybasecamp/reviews.html`
- Manual review data:
  - `deervalleybasecamp/js/reviews-data.js`
- Landing review renderer:
  - `deervalleybasecamp/js/landing-testimonials.js`
- Reviews page renderer:
  - `deervalleybasecamp/js/reviews.js`

### Guide

- Main guide:
  - `guide/deervalleybasecamp/index.html`
- Hikes page:
  - `guide/deervalleybasecamp/hikes/index.html`

### Verification Scripts

- Main deploy smoke test:
  - `scripts/test-docelarhomes-deploy.mjs`
  - Note: this script still contains expectations from an abandoned guide redesign and may need refresh before relying on it for the guide
- Guide arrival hero test:
  - `scripts/test-guide-arrival-hero.mjs`
- Guide curated favorites test:
  - `scripts/test-guide-curated-favorites.mjs`

## Property Site State

### Reviews

The property site now uses manual review data, not the old public Supabase feed.

Current file:
- `deervalleybasecamp/js/reviews-data.js`

Current review set:
- Rafael
- Nicholas
- Tina

Featured on landing:
- Rafael
- Nicholas

Shown on reviews page:
- Rafael
- Nicholas
- Tina

If reviews are updated manually:
- Add the new review into `reviews-data.js`
- Use `featured: true` only for reviews that belong on the landing
- Keep the landing to 2 or 3 reviews max

### Writing and Tone

The property site copy should keep emphasizing:
- privacy
- valley calm
- quiet evenings
- year-round appeal
- mountain living without resort chaos

Avoid:
- ski-only language
- over-explaining
- obvious marketing filler

## Guide State

### Top-Level Structure

The guide currently starts with:
- branded topbar
- guide hero
- arrival information
- guest favorites near the top
- amenities and practical sections below

### Arrival / Hero Essentials

The desktop guide hero now includes:
- one card for `Wi-Fi + Password`
- one card for `Address`
- one shared card for `Arrival + Departure`

The mobile guide keeps the same information priority:
- network
- password
- copy password
- address
- open maps
- check-in
- checkout

Current live arrival data:
- Wi-Fi network: `DeerValleyBasecamp`
- Password: `MountainView`
- Address: `6047 N Fairview Dr, Heber City`
- Maps URL:
  - `https://maps.google.com/?q=6047+N+Fairview+Dr,+Heber+City,+UT`
- Check-in: `4:00 PM`
- Checkout: `11:00 AM`

### Guest Favorites

A dedicated section near the top of the guide surfaces the items guests reach for first.

Section title:
- `The short list guests reach for first.`

Top restaurants:
- Back 40 Ranch House
- Midway Mercantile
- The Hub

Top activities:
- East Deer Valley Resort
- Jordanelle State Park
- Top Hiking Guide

### Important Map Targets

Use these exact map targets unless there is a verified change:

- House:
  - `6047 N Fairview Dr, Heber City, UT`
- East Deer Valley resort activity:
  - `Deer Valley East Village - Main Parking`
- Jordanelle:
  - `Jordanelle State Park UT`
- Back 40 Ranch House:
  - `Back 40 Ranch House Heber City UT`
- Midway Mercantile:
  - `Midway Mercantile Midway UT`
- The Hub:
  - `The Hub Heber City UT`

### Dining Organization

The broader dining section was reorganized into a cleaner sequence rather than awkward grouped columns.

The intended categories are:
- `Best Dinners`
- `Casual + Group-Friendly`
- `Breakfast / Brunch`
- `Park City Night Out`

If this section is updated later:
- keep it continuous and readable
- avoid broken grid groupings that make cards overlap or feel cramped

## Mobile Rules

Mobile should not be a compressed desktop page.

Important mobile principles:
- no big decorative hero photo in the most valuable space
- arrival info should be immediate
- what to do and where to eat should be easy to spot
- users should feel invited to explore, not overwhelmed
- do not turn the guide into a Word document or a dense dashboard

## Known Risks

- `scripts/test-docelarhomes-deploy.mjs` still contains old expectations from a reset-style guide redesign that was not kept. Do not trust it for guide structure until updated.
- The guide has gone through multiple design iterations. Before a major redesign, inspect the current live HTML instead of assuming the last prototype direction won.
- The user is highly sensitive to:
  - empty space that feels wasted
  - too many boxes
  - too much text
  - anything that looks cheap, static, or AI-generated

## Safe Editing Rules

Before changing anything:
- check whether the route is public or private
- preserve the `DM Sans` single-font rule
- keep the landing and guide in the same family
- do not publish experimental redesigns without approval

When editing the guide:
- keep arrival info correct first
- keep `what to do` and `where to eat` obvious
- do not bury the most-used answers

When editing the property site:
- maintain the editorial tone
- keep the landing restrained
- do not reintroduce busy UI patterns

## Deploy / Sync Workflow

Project:
- Vercel project name: `dcl-final-deploy`
- Vercel config:
  - `.vercel/project.json`

Local deploy root:
- `/Users/braghini/Documents/Playground/docelarhomes-deploy`

OneDrive mirror:
- `/Users/braghini/Library/CloudStorage/OneDrive-minasglobaltrading.com/Codes/docelarhomes-deploy`

Local preview:
- `python3 -m http.server 8081`

Production deploy:
- `npx vercel --prod --yes`

Recommended verification after deploy:
- `curl -I https://docelarhomes.com/deervalleybasecamp`
- `curl -I https://docelarhomes.com/guide/deervalleybasecamp/`
- `curl -I https://www.docelarhomes.com/deervalleybasecamp`

## What Was Last Published

Published on March 24, 2026:
- guide visual consistency pass
- updated guide arrival cards
- `Guest Favorites` section
- updated East Deer Valley maps destination
- improved guide dining organization

This handoff reflects that state.
