# Deer Valley Guide Mobile Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the Deer Valley Basecamp guide feel purpose-built for phones while preserving the current desktop experience.

**Architecture:** Add mobile-only dashboard and highlight sections to the existing guide template, then wire them into a fixed mobile footer nav. Keep the desktop structure intact and use CSS/media-query layering rather than a separate mobile route.

**Tech Stack:** Static HTML, CSS, vanilla JavaScript, Node smoke test

---

### Task 1: Lock the mobile contract in the deploy smoke test

**Files:**
- Modify: `scripts/test-docelarhomes-deploy.mjs`

- [x] **Step 1: Write the failing test**
- [x] **Step 2: Run test to verify it fails**
- [ ] **Step 3: Update after implementation if assertions need tuning**
- [ ] **Step 4: Run test to verify it passes**

### Task 2: Implement the phone-first dashboard and curated highlight sections

**Files:**
- Modify: `guide/deervalleybasecamp/index.html`

- [ ] **Step 1: Add mobile-only sections for arrival dashboard, things-to-do highlights, restaurant highlights, and mobile footer nav**
- [ ] **Step 2: Add responsive CSS so the new mobile sections appear only on small screens and desktop remains intact**
- [ ] **Step 3: Add light interaction for copying Wi-Fi credentials on mobile**
- [ ] **Step 4: Add The Hub to the full dining section so the mobile highlight matches the full guide**

### Task 3: Verify locally and sync published source

**Files:**
- Modify: `guide/deervalleybasecamp/index.html`
- Sync later to: `Codes/deer-valley-guide/deer-valley-guide-v2/index.html`

- [ ] **Step 1: Run the deploy smoke test**
- [ ] **Step 2: Run the local HTTP smoke test against the preview server**
- [ ] **Step 3: Publish to Vercel**
- [ ] **Step 4: Sync the final guide source back into OneDrive**
