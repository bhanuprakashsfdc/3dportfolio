# Salesforce Park — Portfolio Development Plan
## Loop Engineering + Agent Swarm Approach

**Project**: Salesforce-themed Interactive 3D Portfolio  
**Domain**: Salesforce / Trailhead  
**Target Portfolio**: https://bhanuprakashsfdc.com/  
**Inspiration**: https://bruno-simon.com/  
**Mascots**: Astro, Codey, Einstein, Cloudy, Brandy, Ruth, Zig, Koa, Flo, Appy, Max  
**Mascot Source**: https://www.salesforce.com/in/blog/meet-trailhead-characters-blog/

---

## SECTION 1: Project Overview

### What We Are Building
A Bruno Simon-inspired interactive 3D portfolio where visitors drive a vehicle (named **TrailRider**) through a Salesforce-themed world called **"Salesforce Park"** or **"Trailhead Universe"**.

### Core Concept
- **Entry Hub**: Welcome plaza with Astro statue and Trailhead emblem
- **11 Zones/Districts**: Each governed by a Salesforce mascot character
- **16 Collectible Badges**: Representing Bhanu's Salesforce certifications
- **Certification Hall**: Central gallery of all 16 badges
- **Agentblazer Tower**: Central spire for AI/Agentforce content
- **Content Panels**: HTML overlays triggered when driving into zones
- **Whispers**: Community messages visitors can leave

### Key Features
1. **3D Driving Experience**: WASD + mouse controls with physics
2. **Trailhead Theme**: Tree-tunnel learning paths, badge monuments, mascot NPCs
3. **Mobile Support**: Touch joystick, responsive quality settings
4. **Achievement System**: 16 certification badges + milestone unlocks
5. **Map Overlay**: Minimap showing all zones and collected badges
6. **Audio**: Engine SFX, ambient Trailhead sounds, achievement chimes
7. **Loading Screen**: Salesforce cloud animation with Trailblazer tagline

---

## SECTION 2: Loop Engineering Technique

### What is Loop Engineering?
Loop Engineering is an iterative development methodology where the project is built in **repeating cycles (loops)**. Each loop consists of:

1. **Plan**: Define what to build in this iteration
2. **Build**: Implement the feature
3. **Verify**: Test and validate
4. **Refine**: Fix issues and improve
5. **Loop**: Start next iteration with improved foundation

### Loop Structure for This Project

```
┌─────────────────────────────────────┐
│          LOOP 1: WORLD BASE         │
│  ┌───────────────────────────────┐  │
│  │ 1. Three.js Scene Setup       │  │
│  │ 2. Terrain (Cloud Platform)   │  │
│  │ 3. Road Network (Trail System)│  │
│  │ 4. Basic Lighting & Sky       │  │
│  │ 5. Camera Follow (Arcade)     │  │
│  └───────────────────────────────┘  │
└───────────────┬─────────────────────┘
                │
                ▼ verified
┌─────────────────────────────────────┐
│          LOOP 2: INTERACTION         │
│  ┌───────────────────────────────┐  │
│  │ 1. Vehicle Physics (Rapier)   │  │
│  │ 2. Input System (WASD/Gamepad)│  │
│  │ 3. Interactive Zones (Trigger)│  │
│  │ 4. Content Panel Overlays     │  │
│  │ 5. Mobile Controls (Nipple)   │  │
│  └───────────────────────────────┘  │
└───────────────┬─────────────────────┘
                │
                ▼ verified
┌─────────────────────────────────────┐
│          LOOP 3: WORLD CONTENT       │
│  ┌───────────────────────────────┐  │
│  │ 1. All 11 Zone Buildings      │  │
│  │ 2. Mascot NPCs Placement      │  │
│  │ 3. Certification Badges (16)  │  │
│  │ 4. Trailhead Visual Elements  │  │
│  │ 5. Particle Effects & Glow    │  │
│  └───────────────────────────────┘  │
└───────────────┬─────────────────────┘
                │
                ▼ verified
┌─────────────────────────────────────┐
│          LOOP 4: GAMIFICATION        │
│  ┌───────────────────────────────┐  │
│  │ 1. Achievement System         │  │
│  │ 2. Badge Collection Logic     │  │
│  │ 3. Map Overlay                │  │
│  │ 4. Progress Save/Load         │  │
│  │ 5. Score Tracking             │  │
│  └───────────────────────────────┘  │
└───────────────┬─────────────────────┘
                │
                ▼ verified
┌─────────────────────────────────────┐
│          LOOP 5: POLISH & DEPLOY     │
│  ┌───────────────────────────────┐  │
│  │ 1. Audio Integration          │  │
│  │ 2. Performance Optimization   │  │
│  │ 3. Mobile Testing             │  │
│  │ 4. SEO & Meta Tags            │  │
│  │ 5. Production Build           │  │
│  └───────────────────────────────┘  │
└─────────────────────────────────────┘
```

### Loop Engineering Rules
1. **Each loop MUST produce a working, playable prototype**
2. **Do NOT skip loops** — each builds on verified foundation
3. **Agent swarm runs within each loop** to parallelize tasks
4. **Feature flag gating**: New features invisible until loop verified
5. **LocalStorage progress**: Save state after each loop for continuity

---

## SECTION 3: Technology Stack

| Layer | Technology | Rationale |
|-------|-----------|-----------|
| **3D Engine** | Three.js r183+ (WebGPU-first) | Bruno Simon's proven approach, WebGPU+TSL |
| **Physics** | @dimforge/rapier3d | Vehicle physics, collision, raycasting |
| **Animations** | GSAP 3.12 | Camera tween, UI transitions, zones |
| **Audio** | Howler.js | Engine SFX, ambient sounds, chimes |
| **Bundler** | Vite 7.2 | Fast dev, asset hot-reload |
| **Styling** | Tailwind CSS (existing) + 3D overlays | Minimal disruption to current portfolio |
| **Fonts** | Plus Jakarta Sans + Amatic SC | Existing fonts + game UI font |
| **State** | localStorage (primary) + optional server | Offline-first, no dependency |
| **Mobile Controls** | Nipple.js | Touch virtual joystick |
| **Inputs** | camera-controls | Debug free-camera mode |
| **Dev Tools** | Tweakpane | Live physics tuning during development |

---

## SECTION 4: Agent Swarm Strategy

### Swarm Architecture
Agent Swarm means launching **multiple parallel agents** to work on different aspects concurrently. Each agent specializes in a domain.

### Agent Types & Responsibilities

| Agent | Role | Tasks Per Loop |
|-------|------|----------------|
| **Design Agent** | UI/UX, visual design | Design review, accessibility, responsive checks |
| **Gameplay Agent** | Physics, controls, game feel | Drivability tuning, input responsiveness |
| **Content Agent** | Portfolio content integration | Certifications, blog posts, contact info |
| **Performance Agent** | Optimization, LOD, compression | FPS monitoring, texture compression |
| **QA Agent** | Testing, bug hunting | Cross-browser, mobile, edge cases |

### Swarm Usage Pattern
```
For each LOOP:
1. Launch Designer Agent → UI/UX review
2. Launch Gameplay Agent → Drivability tuning
3. Launch Content Agent → Content integration
4. Launch Performance Agent → Optimization checks
5. Launch QA Agent → Testing
6. Collect results in parallel
7. Merge fixes
8. Verify loop
9. Proceed to next loop
```

---

## SECTION 5: Detailed Loop Plans

### LOOP 1: World Base (Week 1)
**Goal**: Running 3D world you can drive around

#### Agent Swarm Tasks
| Agent | Task | Deliverable |
|-------|------|-------------|
| **Gameplay** | Set up Three.js scene, camera, lights, renderer | Working Three.js scene |
| **Gameplay** | Implement Rapier physics world with gravity | Physics step running |
| **Gameplay** | Create basic ground plane + vehicle body | Visible ground + falling car |
| **Design** | Define color palette: Salesforce blue sky + orange ground | `palette.json` |
| **Performance** | Set up Vite config with WASM support | `vite.config.js` |
| **QA** | Verify WebGPU fallback to WebGL | Browser compatibility report |

#### Key Decisions (Made in Research)
- WebGPU-first with WebGL fallback (`three/webgpu`)
- Rapier vehicle physics: 4-ray suspension arcade style
- Camera follows at ~49° elevation, magnet behavior
- Loading screen with Salesforce cloud animation

---

### LOOP 2: Interaction (Week 2)
**Goal**: Drive the car with controls, content panels appear

#### Agent Swarm Tasks
| Agent | Task | Deliverable |
|-------|------|-------------|
| **Gameplay** | WASD input system with WASM Rapier import | Keyboard -> vehicle torque |
| **Gameplay** | Mouse camera with look-behind drag | Smooth orbit camera |
| **Gameplay** | Raycasting + zone triggers | Driving into zone = content appears |
| **Gameplay** | Mobile Nipple.js touch joystick | Mobile controls working |
| **Design** | Design content panel HTML templates | 3 zone panel mockups |
| **Content** | Map 11 zones to portfolio sections | Zone config JSON |
| **QA** | Desktop + mobile browser testing | Bug list + fixes |

#### Key Decisions
- `Inputs` class with action-map system
- `InteractivePoints` for proximity-based reveals
- GSAP cinematic for zone entry
- `Overlay` class bridges 3D and HTML

---

### LOOP 3: World Content (Week 3-4)
**Goal**: All 11 zones, mascots, badges, visual effects

#### Agent Swarm Tasks
| Agent | Task | Deliverable |
|-------|------|-------------|
| **Gameplay** | 11 zone building models (GLB placeholders) | Models loading in zones |
| **Gameplay** | Mascot NPC placement + idle animations | All mascots visible |
| **Gameplay** | Badge collectible system (16 badges) | Collectible mechanics |
| **Design** | Zone visual aesthetic per character | Character-specific color themes |
| **Content** | Write NPC dialogue for all 11 mascots | `dialogues.json` |
| **Content** | Map 16 certs to badgelocations | Certification positions |
| **Performance** | Instanced meshing for vegetation | Performance baseline |
| **QA** | Content accuracy review | Content coverage checklist |

#### Key Decisions
- Each mascot = GLB model + particle emitter
- Badges = glowing ring shapes (different per certification)
- `InstancedMesh` for repeated decorations
- Error-correction: if badge model missing, show 2D sprite fallback

---

### LOOP 4: Gamification (Week 5)
**Goal**: Achievements, map HUD, progress persistence

#### Agent Swarm Tasks
| Agent | Task | Deliverable |
|-------|------|-------------|
| **Gameplay** | Achievement system with milestones | Achievement toasts/unlocks |
| **Gameplay** | Badge collection state management | localStorage save/load |
| **Gameplay** | Minimap with player position + zone labels | HUD minimap component |
| **Design** | HUD UI layout (top-left info, bottom controls) | UI component styles |
| **Content** | Trailblazer rank progression mapping | Rank thresholds JSON |
| **Performance** | Mobile quality settings (shadow LOD) | Quality presets |
| **QA** | Save/load + persistence testing | State restoration report |

#### Key Decisions
- `localStorage` key: `salesforce-portfolio-2025-progress`
- Trailblazer Ranks: points-based progression
- Badge glow reflects real Trailhead count (live API optional)
- `Map.js` shows collected badges as filled icons

---

### LOOP 5: Polish & Deploy (Week 6)
**Goal**: Audio, performance tuning, production build

#### Agent Swarm Tasks
| Agent | Task | Deliverable |
|-------|------|-------------|
| **Performance** | Texture compression (ETC1S/UASTC) | Compressed GLB/KTX assets |
| **Performance** | Mobile LOD + quality toggles | Low/High quality modes |
| **Gameplay** | Howler.js audio integration | Engine + ambient + SFX |
| **Content** | SEO meta tags, Open Graph, Schema.org | `index.html` head |
| **Design** | Loading screen animation + transitions | Seamless load experience |
| **QA** | Full regression testing across devices | Production readiness report |
| **All** | Final polish + accessibility | A11y checklist |

#### Key Decisions
- Quality auto-detection by device
- Progressive loading with preloader
- Analytics: Google Analytics (existing GTM preserved)

---

## SECTION 6: File Structure

```
portfolio-root/
├── index.html                    # Entry point (extends current)
├── package.json
├── vite.config.js                # Three.js + WASM + Rapier
├── tailwind.config.js            # Existing (preserved)
├── postcss.config.js             # Existing (preserved)
│
├── sources/                      # NEW: 3D game source
│   ├── index.js                  # Mount point
│   ├── style.styl                # 3D-specific styles
│   │
│   ├── Game/
│   │   ├── Game.js               # Singleton orchestrator
│   │   ├── Ticker.js             # rAF loop with priorities
│   │   ├── Time.js               # Time utilities
│   │   ├── Viewport.js           # Resize observer
│   │   ├── Debug.js              # Tweakpane integration
│   │   ├── Performance/
│   │   │   └── Quality.js        # Low/High quality presets
│   │   ├── Inputs/
│   │   │   ├── Keyboard.js       # WASD bindings
│   │   │   ├── Pointer.js        # Mouse camera
│   │   │   ├── Gamepad.js        # Xbox/PlayStation
│   │   │   └── Nipple.js         # Mobile touch joystick
│   │   ├── Physics/
│   │   │   ├── PhysicsWorld.js   # Rapier wrapper
│   │   │   ├── PhysicsVehicle.js # Vehicle physics
│   │   │   └── PhysicsWireframe.js
│   │   ├── World/
│   │   │   ├── Terrain.js        # Cloud platforms
│   │   │   ├── Roads.js          # Trail network
│   │   │   ├── Buildings.js      # Zone structures
│   │   │   ├── Mascots.js        # NPC placement
│   │   │   ├── Badges.js         # 16 collectibles
│   │   │   └── Trees.js          # Vegetation
│   │   ├── Vehicle/
│   │   │   ├── TrailRider visual # Player vehicle mesh
│   │   │   └── Wheels.js         # Visual wheel sync
│   │   ├── Interactive/
│   │   │   ├── Zones.js          # Drive-into triggers
│   │   │   ├── InteractivePoints.js # Diamond markers
│   │   │   └── Overlay.js        # HTML panel bridge
│   │   ├── Gami/
│   │   │   ├── Achievements.js   # Badge + milestone system
│   │   │   ├── BadgeCollector.js # 16 cert tracking
│   │   │   └── TrailblazerRank.js # Progress levels
│   │   └── UI/
│   │       ├── HUD.js            # Top-left info panel
│   │       ├── Minimap.js        # World minimap
│   │       ├── Controls.js       # Bottom button bar
│   │       └── Notifications.js  # Toast messages
│   │
│   └── data/
│       ├── zones.json            # 11 zone configs
│       ├── certifications.json   # 16 cert data
│       ├── dialogues.json        # Mascot NPC text
│       └── palette.json          # Color definitions
│
├── static/                       # Asset server
│   ├── models/
│   │   ├── buildings/            # Zone building GLBs
│   │   ├── mascots/              # Character GLBs
│   │   ├── vehicle/              # TrailRider GLB
│   │   └── badges/               # Badge/models
│   ├── textures/
│   │   ├── terrain/              # Ground, road textures
│   │   ├── palette/              # Vertex color atlas
│   │   └── ui/                   # HUD elements
│   ├── audio/
│   │   ├── engine/               # Engine SFX loops
│   │   ├── ambient/              # Cloud/wind sounds
│   │   └── sfx/                  # Achievement chimes
│   └── fonts/
│       └── amatic/               # Game UI font
│
├── scripts/
│   └── compress.js               # Texture compression pipeline
│
├── design-mockup.svg             # Visual reference
└── devlog/                       # Development notes
```

---

## SECTION 7: Content Mapping

### 11 Zones → 11 Portfolio Sections

| Zone | Character | Architecture Section | Content |
|------|-----------|---------------------|---------|
| **Entry Hub** | Astro | Hero / Intro | Welcome message, short bio, "Who am I" |
| **Admin Gardens** | Cloudy | Salesforce Admin | Admin skills, flow builder, automation |
| **Developer District** | Codey | LWC + Apex Dev | Code snippets, dev projects, Heroku |
| **Data & AI Quarter** | Einstein | Einstein AI / Agentforce | AI projects, Agentblazer status |
| **Architecture Summit** | Ruth | Solution Architect | Arch diagrams, integration patterns |
| **Integration Bridge** | Max | MuleSoft + APIs | MuleSoft, REST, SOAP, ETL |
| **Automation Skies** | Flo | Flow Automation | Flow Builder, Process Builder |
| **Marketing Plaza** | Brandy | Marketing Cloud | Marketing, Pardot, engagement |
| **Sales Trail** | Zig | Sales Cloud | Sales Cloud, CPQ, opportunity |
| **Community Commons** | Koa | Community + Blog | Blog posts, testimonials, contact |
| **Agentblazer Tower** | Astro | Agentforce Specialist | Agentforce builders, AI agents |

### 16 Certifications → Badge Layout

| Badge | Zone Location | Difficulty |
|-------|---------------|-----------|
| Salesforce Administrator | Admin Gardens (main) | Beginner |
| Platform App Builder | Developer District | Intermediate |
| Sales Cloud Consultant | Sales Trail | Consultant |
| Service Cloud Consultant | Community Commons | Consultant |
| Community Cloud Consultant | Integration Bridge | Consultant |
| Marketing Cloud Email Specialist | Marketing Plaza | Specialist |
| Marketing Cloud Consultant | Marketing Plaza | Consultant |
| B2B Commerce Administrator | Integration Bridge | Admin |
| B2C Commerce Developer | Developer District | Developer |
| CPQ Specialist | Sales Trail | Specialist |
| Einstein Analytics Discovery Consultant | Data & AI Quarter | Consultant |
| Platform Developer I | Developer District | Developer I |
| Platform Developer II | Developer District | Developer II |
| JavaScript Developer I | Developer District | Developer I |
| B2B Solution Architect | Architecture Summit | Architect |
| Technical Architect | Architecture Summit | Architect |

---

## SECTION 8: Risk Management & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Three.js version changes | Medium | High | Pin to specific version in package.json; use Bruno's proven stack |
| WebGPU not supported | Low | Medium | Fallback to WebGL2 (built-in Three.js) |
| Physics performance on mobile | Medium | Medium | Low quality preset; simplified colliders |
| Asset loading time | Medium | Medium | Progressive loading; compressed textures (KTX2) |
| School/Work firewall issues | Low | Low | HTTP + HTTPS dual; no CORS issues |
| Content maintenance | Low | Low | JSON data files; easy to update cert info |
| Mobile UX complexity | Medium | Medium | Test early; Nipple.js proven pattern |
| Debugging 3D issues | Medium | Low | Tweakpane + PhysicsWireframe debug overlays |

---

## SECTION 9: Success Metrics

### Loop Completion Criteria
- [ ] Loop 1: Scene loads, ground visible, car falls → PASS if FPS ≥ 45 on desktop
- [ ] Loop 2: WASD drives car, zones trigger panels, mobile works → PASS if 3+ zones work
- [ ] Loop 3: All 11 zones visible, mascots placed, 16 badges collectible → PASS if all reachable
- [ ] Loop 4: Achievements unlock, progress saves, minimap works → PASS if persistence > 1 day
- [ ] Loop 5: Audio plays, mobile 30+ FPS, production build runs → PASS if Lighthouse ≥ 80

### Final Portfolio Metrics
- **Performance**: 60 FPS desktop, 30+ FPS mobile
- **Load Time**: < 3 seconds to drivable state
- **Content**: 100% portfolio content integrated
- **Mobile**: Full touch control support
- **Accessibility**: Keyboard navigable, screen reader labels

---

## SECTION 10: Immediate Next Steps

1. **Create project skeleton** with Vite + Three.js + Rapier
2. **Install dependencies** (three, @dimforge/rapier3d, gsap, howler, nipplejs, camera-controls)
3. **Set up local server** with Vite dev mode
4. **Implement Loop 1** with focused gameplay agent
5. **Verify Loop 1** before proceeding

---

## SECTION 11: Visual Mockup Reference

The visual mockup is stored at:
```
portfolio-root/design-mockup.svg
```

This SVG shows:
- **Sky**: Salesforce blue gradient with floating clouds
- **Central Hub**: Entry Hub with Astro
- **11 Zones**: Positioned around the world
- **16 Badges**: Gold collectibles on roads and near zones
- **11 Mascots**: Placed at zone entrances
- **Roads**: Trail-style connections between zones
- **HUD**: Top-left info panel + top-right minimap
- **Controls**: Bottom control bar (Home, Audio, Awards, Map, Whispers)
- **Vehicle**: TrailRider (the player's car) at center
- **Agentblazer Tower**: Tall central spire

---

*Plan created: 2026-07-23*  
*Approach: Loop Engineering + Agent Swarm*  
*Inspiration: Bruno Simon's folio-2025 + Salesforce Trailhead ecosystem*
