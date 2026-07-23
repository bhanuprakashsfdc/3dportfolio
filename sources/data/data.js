export const data = {
  colors: {
    sfBlue: '#00A1E0',
    sfBlueAlt: '#1589EE',
    sfDeepNavy: '#005290',
    sfDarkBg: '#0D001A',
    sfOrange: '#FF7F50',
    sfPurple: '#7B2D8E',
    sfGreen: '#4CAF50',
    sfGold: '#FFD700',
    sfSilver: '#C0C0C0',
    sfWhite: '#FFFFFF',
    sfTrailBlue: '#2E5BFF',
    sfDarkBlue: '#081835',
    sfCoral: '#FF6B6B',
    sfMint: '#3EB489',
    sfMagenta: '#E91E8C'
  },

  settings: {
    title: 'Salesforce Park',
    subtitle: 'Trailhead Universe',
    playerTag: 'Bhanu Prakash',
    playerTitle: 'Salesforce Architect & Technical Lead',
    totalCertifications: 16,
    defaultQuality: 'high',
    mobileCutoff: 768,
    gravity: -9.81,
    vehicle: {
      mass: 80,
      maxSteer: 0.5,
      maxForce: 180,
      brakeForce: 30,
      acceleration: 120,
      boostMultiplier: 1.6,
      maxSpeed: 35,
      boostMaxSpeed: 55
    },
    camera: {
      phi: 0.27 * Math.PI,
      theta: 0.25 * Math.PI,
      minRadius: 15,
      maxRadius: 40,
      magnetStrength: 0.15,
      smoothing: 4
    },
    physics: {
      timestep: 1 / 60,
      rayCount: 4,
      suspensionStiffness: 60,
      suspensionDamping: 2.3,
      suspensionRestLength: 0.4,
      friction: 0.8,
      lateralGrip: 0.6
    }
  },

  zones: [
    { id: 'entryHub', name: 'Entry Hub', subtitle: 'Welcome Plaza', mascot: 'Astro', position: { x: 0, y: 0, z: 0 }, radius: 18, color: '#00A1E0', icon: '🧑‍🚀', description: 'Start your journey at Salesforce Park.' },
    { id: 'adminGardens', name: 'Admin Gardens', subtitle: "Cloudy's Domain", mascot: 'Cloudy', position: { x: -45, y: 0, z: 25 }, radius: 16, color: '#3EB489', icon: '🐐', description: 'Admin secrets flow through garden paths.' },
    { id: 'developerDistrict', name: 'Developer District', subtitle: "Codey's Workshop", mascot: 'Codey', position: { x: -35, y: 0, z: -35 }, radius: 18, color: '#FF7F50', icon: '🐻', description: 'Build anything with clicks or code.' },
    { id: 'dataAIQuarter', name: 'Data & AI Quarter', subtitle: "Einstein's Lab", mascot: 'Einstein', position: { x: 40, y: 0, z: -30 }, radius: 17, color: '#9C6ADE', icon: '🧠', description: 'Predict the future with AI.' },
    { id: 'architectureSummit', name: 'Architecture Summit', subtitle: "Ruth's Peak", mascot: 'Ruth', position: { x: 50, y: 3, z: 35 }, radius: 20, color: '#C5A059', icon: '🐘', description: 'Scale new heights as an architect.' },
    { id: 'integrationBridge', name: 'Integration Bridge', subtitle: "Max's Viaduct", mascot: 'Max', position: { x: 0, y: 0, z: -55 }, radius: 16, color: '#FF6B6B', icon: '🫏', description: 'Connect apps, data, and devices.' },
    { id: 'automationSkies', name: 'Automation Skies', subtitle: "Flo's Flight Zone", mascot: 'Flo', position: { x: -55, y: 1.5, z: -15 }, radius: 18, color: '#5BCEFA', icon: '🦿', description: 'Reach new heights with automation.' },
    { id: 'marketingPlaza', name: 'Marketing Plaza', subtitle: "Brandy's Corner", mascot: 'Brandy', position: { x: -50, y: 0, z: 50 }, radius: 16, color: '#E91E8C', icon: '🦊', description: 'Turn moments into memories.' },
    { id: 'salesTrail', name: 'Sales Trail', subtitle: "Zig's Route", mascot: 'Zig', position: { x: 55, y: 0, z: 55 }, radius: 17, color: '#7A7A7A', icon: '🦓', description: 'Every lane leads to closed-won.' },
    { id: 'communityCommons', name: 'Community Commons', subtitle: "Koa's Park", mascot: 'Koa', position: { x: 60, y: 0, z: 0 }, radius: 15, color: '#F4D03F', icon: '🐕', description: 'Friends make everything better.' },
    { id: 'agentblazerTower', name: 'Agentblazer Tower', subtitle: 'AI Central', mascot: 'Astro', position: { x: 0, y: 4, z: 65 }, radius: 22, color: '#FFD700', icon: '🤖', description: 'Design, test, and deploy autonomous agents.' }
  ],

  certifications: [
    { id: 'admin', name: 'Salesforce Administrator', cloud: 'Sales Cloud', difficulty: 'Beginner', position: { x: -28, y: 0.8, z: 18 }, zone: 'adminGardens', icon: '🪪' },
    { id: 'platformAppBuilder', name: 'Platform App Builder', cloud: 'Platform', difficulty: 'Intermediate', position: { x: -42, y: 1, z: -28 }, zone: 'developerDistrict', icon: '🧱' },
    { id: 'salesCloudConsultant', name: 'Sales Cloud Consultant', cloud: 'Sales Cloud', difficulty: 'Consultant', position: { x: 60, y: 1, z: 48 }, zone: 'salesTrail', icon: '💰' },
    { id: 'serviceCloudConsultant', name: 'Service Cloud Consultant', cloud: 'Service Cloud', difficulty: 'Consultant', position: { x: 55, y: 1, z: -10 }, zone: 'communityCommons', icon: '💬' },
    { id: 'communityCloudConsultant', name: 'Community Cloud Consultant', cloud: 'Experience Cloud', difficulty: 'Consultant', position: { x: -5, y: 1.5, z: -45 }, zone: 'integrationBridge', icon: '🌐' },
    { id: 'marketingEmailSpecialist', name: 'Marketing Cloud Email Specialist', cloud: 'Marketing Cloud', difficulty: 'Specialist', position: { x: -45, y: 1.2, z: 45 }, zone: 'marketingPlaza', icon: '📧' },
    { id: 'marketingCloudConsultant', name: 'Marketing Cloud Consultant', cloud: 'Marketing Cloud', difficulty: 'Consultant', position: { x: -38, y: 1, z: 60 }, zone: 'marketingPlaza', icon: '📊' },
    { id: 'cpqSpecialist', name: 'CPQ Specialist', cloud: 'Sales Cloud', difficulty: 'Specialist', position: { x: 48, y: 1, z: 65 }, zone: 'salesTrail', icon: '⚙️' },
    { id: 'b2bCommerceAdmin', name: 'B2B Commerce Administrator', cloud: 'Commerce Cloud', difficulty: 'Admin', position: { x: 8, y: 1, z: -62 }, zone: 'integrationBridge', icon: '🛒' },
    { id: 'b2cCommerceDeveloper', name: 'B2C Commerce Developer', cloud: 'Commerce Cloud', difficulty: 'Developer', position: { x: -18, y: 1.2, z: -50 }, zone: 'developerDistrict', icon: '🏪' },
    { id: 'einsteinAnalyticsConsultant', name: 'Einstein Analytics Discovery Consultant', cloud: 'Einstein Analytics', difficulty: 'Consultant', position: { x: 35, y: 1.5, z: -38 }, zone: 'dataAIQuarter', icon: '📈' },
    { id: 'platformDeveloperI', name: 'Platform Developer I', cloud: 'Platform', difficulty: 'Developer I', position: { x: -25, y: 1, z: -45 }, zone: 'developerDistrict', icon: '💻' },
    { id: 'platformDeveloperII', name: 'Platform Developer II', cloud: 'Platform', difficulty: 'Developer II', position: { x: -48, y: 1.5, z: -38 }, zone: 'developerDistrict', icon: '⚡' },
    { id: 'javascriptDeveloper', name: 'JavaScript Developer I', cloud: 'Platform', difficulty: 'Developer I', position: { x: -30, y: 1, z: -55 }, zone: 'developerDistrict', icon: '📜' },
    { id: 'b2bArchitect', name: 'B2B Solution Architect', cloud: 'Architecture', difficulty: 'Architect', position: { x: 58, y: 2.5, z: 25 }, zone: 'architectureSummit', icon: '🏗️' },
    { id: 'technicalArchitect', name: 'Technical Architect', cloud: 'Architecture', difficulty: 'Architect', position: { x: 45, y: 3.5, z: 45 }, zone: 'architectureSummit', icon: '🏆' }
  ],

  mascots: [
    { id: 'Astro', name: 'Astro Nomical', role: 'Community & Inclusion', color: '#00A1E0', position: { x: 0, y: 0, z: 0 } },
    { id: 'Cloudy', name: 'Cloudy the Goat', role: 'Salesforce Admins', color: '#3EB489', position: { x: -45, y: 0, z: 25 } },
    { id: 'Codey', name: 'Codey the Bear', role: 'Salesforce Developers', color: '#FF7F50', position: { x: -35, y: 0, z: -35 } },
    { id: 'Einstein', name: 'Einstein', role: 'AI Innovation', color: '#9C6ADE', position: { x: 40, y: 0, z: -30 } },
    { id: 'Ruth', name: 'Ruth the Elephant', role: 'Architects', color: '#C5A059', position: { x: 50, y: 3, z: 35 } },
    { id: 'Zig', name: 'Zig the Zebra', role: 'Salesblazer Community', color: '#7A7A7A', position: { x: 55, y: 0, z: 55 } },
    { id: 'Koa', name: 'Koa the Dog', role: 'Community & Love', color: '#F4D03F', position: { x: 60, y: 0, z: 0 } },
    { id: 'Flo', name: 'Flo the Flying Squirrel', role: 'Automation', color: '#5BCEFA', position: { x: -55, y: 1.5, z: -15 } },
    { id: 'Appy', name: 'Appy the Bobcat', role: 'Partners', color: '#E91E8C', position: { x: -55, y: 1, z: 20 } },
    { id: 'Max', name: 'Max the Mule', role: 'Integration / MuleSoft', color: '#FF6B6B', position: { x: 0, y: 0, z: -55 } },
    { id: 'Brandy', name: 'Brandy the Fox', role: 'Marketing', color: '#E91E8C', position: { x: -50, y: 0, z: 50 } }
  ],

  dialogues: {
    Astro: { short: 'Welcome, Trailblazer! Ready to blaze your trail?', long: 'Every journey starts with a single step — and yours just dropped into Salesforce Park.' },
    Cloudy: { short: 'Hi there! Admin work is like a garden — with the right processes, everything grows.', long: 'I climb every summit one sure-footed step at a time. Want to see how I keep this place blooming?' },
    Codey: { short: 'What\'s up, builder? Whether it\'s clicks or code, if you can dream it, you can build it.', long: 'Paws-deep in code, but always ready to help. Let me show you my workshop!' },
    Einstein: { short: 'Data is the compass; AI is the engine. Shall I project something for you?', long: 'Quick-thinking genius ready to help you unlock your inner potential and make smart predictions.' },
    Ruth: { short: 'I\'m Ruth — Responsible, Universal, Technical, Humble. Ready to scale new heights?', long: 'Architecture is about understanding the whole forest before studying a single tree.' },
    Zig: { short: 'Yo! I\'m Zig. In sales, teamwork wins the deal. Let\'s run the track!', long: 'I travel in a dazzle, and every lane leads to closed-won!' },
    Koa: { short: 'Woof! I\'m Koa, your Chief Love Officer. Grab a seat — friends make everything better.', long: 'I\'ve been here since the beginning, and I\'m here for you.' },
    Flo: { short: 'Hiya! Flo here. Automation is action, fast and repeatable. Ready to soar?', long: 'I glide, I climb, I connect — and so do my flows!' },
    Brandy: { short: 'Hey there, moment-maker! Let me show you how I turn moments into memories.', long: 'Bold, brilliant and dependable — every marketer needs strategy and a little magic.' },
    Max: { short: 'Hey friend! I connect the dots. If it needs to talk to something else, there\'s a tube for that.', long: 'I combine the strength of a donkey with the speed of a stallion for heroic integrations.' },
    Appy: { short: 'Did you ever wish you had a guide through AppExchange? Appy is here for that!', long: 'A mover and shaker with inside scoop on everything Salesforce.' }
  },

  hails: [
    'Ready for your trailblazer journey?',
    'Drive, explore, and discover!',
    'Don\'t break anything — or do!',
    'Your Salesforce adventure awaits',
    'Welcome to the Trailhead Universe',
    'Learn, grow, and blaze trails',
    'Every certification is a milestone',
    'The cloud is your playground'
  ],

  controls: {
    desktop: [
      { keys: ['W', 'ArrowUp'], action: 'Forward' },
      { keys: ['S', 'ArrowDown'], action: 'Backward' },
      { keys: ['A', 'ArrowLeft'], action: 'Steer Left' },
      { keys: ['D', 'ArrowRight'], action: 'Steer Right' },
      { keys: ['Shift'], action: 'Boost' },
      { keys: ['Control'], action: 'Brake' },
      { keys: ['Space'], action: 'Jump' },
      { keys: ['E', 'Enter'], action: 'Interact' },
      { keys: ['M'], action: 'Map' },
      { keys: ['L'], action: 'Mute' },
      { keys: ['R'], action: 'Respawn' }
    ],
    mobile: [
      { gesture: 'One Finger', action: 'Drive' },
      { gesture: 'Two Fingers', action: 'Camera' },
      { gesture: 'Tap Vehicle', action: 'Jump' },
      { gesture: 'Button B', action: 'Boost' },
      { gesture: 'Button Y', action: 'Jump' },
      { gesture: 'Button X', action: 'Brake' },
      { gesture: 'Button A', action: 'Interact' }
    ]
  },

  audio: {
    music: [
      'static/audio/music/ambient-loop.mp3'
    ],
    engine: {
      idle: 'static/audio/engine/idle-loop.mp3',
      low: 'static/audio/engine/low-loop.mp3',
      high: 'static/audio/engine/high-loop.mp3'
    },
    sfx: {
      boost: 'static/audio/sfx/boost.wav',
      honk: 'static/audio/sfx/honk.wav',
      jump: 'static/audio/sfx/jump.wav',
      badgeCollect: 'static/audio/sfx/badge-collect.wav',
      zoneEnter: 'static/audio/sfx/zone-enter.wav',
      achievement: 'static/audio/sfx/achievement.wav',
      respawn: 'static/audio/sfx/respawn.wav'
    }
  },

  roads: [
    { from: 'entryHub', to: 'adminGardens', width: 8, color: '#1589EE' },
    { from: 'entryHub', to: 'developerDistrict', width: 8, color: '#1589EE' },
    { from: 'entryHub', to: 'dataAIQuarter', width: 8, color: '#1589EE' },
    { from: 'entryHub', to: 'communityCommons', width: 8, color: '#1589EE' },
    { from: 'entryHub', to: 'agentblazerTower', width: 9, color: '#FFD700' },
    { from: 'adminGardens', to: 'marketingPlaza', width: 7, color: '#00A1E0' },
    { from: 'adminGardens', to: 'automationSkies', width: 7, color: '#00A1E0' },
    { from: 'developerDistrict', to: 'integrationBridge', width: 7, color: '#FF7F50' },
    { from: 'developerDistrict', to: 'automationSkies', width: 7, color: '#FF7F50' },
    { from: 'communityCommons', to: 'integrationBridge', width: 7, color: '#005290' },
    { from: 'dataAIQuarter', to: 'architectureSummit', width: 7, color: '#9C6ADE' },
    { from: 'communityCommons', to: 'salesTrail', width: 7, color: '#005290' },
    { from: 'integrationBridge', to: 'architectureSummit', width: 7, color: '#FF6B6B' },
    { from: 'marketingPlaza', to: 'salesTrail', width: 7, color: '#E91E8C' },
    { from: 'salesTrail', to: 'architectureSummit', width: 7, color: '#7A7A7A' }
  ],

  achievements: [
    { id: 'first-drive', name: 'First Drive', description: 'Drive your first 100 meters', threshold: 100, reward: 'Basic Paint' },
    { id: 'trailblazer', name: 'Trailblazer', description: 'Drive 1000 meters', threshold: 1000, reward: 'Snow Tires' },
    { id: 'collector', name: 'Collector', description: 'Collect 4 certifications', threshold: 4, reward: 'Chrome Finish' },
    { id: 'master', name: 'Certification Master', description: 'Collect all 16 certifications', threshold: 16, reward: 'Gold Trophy Skin' },
    { id: 'explorer', name: 'Explorer', description: 'Visit all 11 zones', threshold: 11, reward: 'Trailblazer Hoodie' },
    { id: 'social', name: 'Trailblazer Society', description: 'Leave 5 whispers', threshold: 5, reward: 'Party Horn' }
  ]
}

export default data
