import type { Project } from '../types'

const projects: Project[] = [
  {
    id: 'cha0s-sim',
    title: 'cha0s;sim',
    tagline: 'Local chaos-injection and security-scanning proxy for testing frontend resilience.',
    description: 'A local reverse proxy you run in front of your own backend to inject network chaos (latency, status overrides, dropped connections, response mangling, fuzzing), passively scan traffic for missing security headers and leaked secrets, and run stress tests with p50/p95/p99 reporting. Includes a Windows desktop dashboard and a headless CLI that share the same rule engine.',
    tags: ['Go', 'Wails', 'React', 'Vite', 'WebView2'],
    highlights: [
      'Hot-reloaded chaos rules with five effect types',
      'Passive security scanning with remediation suggestions',
      'Flat/ramp/stepped/spike stress shapes',
      'Multi-step scenarios',
      'No-YAML rule builder in the desktop app',
    ],
    github: 'https://github.com/azure-cj/cha0s-sim',
    download: 'https://github.com/azure-cj/cha0s-sim/releases',
    secondaryLink: {
      label: 'Download',
      url: 'https://github.com/azure-cj/cha0s-sim/releases',
    },
    featured: true,
    icon: '/projects/cha0s-sim/appicon.png',
    images: [
      '/projects/cha0s-sim/sample1.png',
      '/projects/cha0s-sim/sample2.png',
      '/projects/cha0s-sim/sample3.png',
      '/projects/cha0s-sim/sample4.png',
    ],
  },
  {
    id: 'nufv-lost-found',
    title: 'NUFV Lost & Found Management System',
    description: 'Modern Lost & Found system for National University Fairview, replacing a legacy PHP workflow with a full-stack web application.',
    tags: ['Next.js 15', 'React 19', 'TypeScript', 'Tailwind CSS', 'Prisma ORM', 'PostgreSQL', 'Neon', 'JWT', 'bcryptjs', 'Nodemailer', 'Vercel Blob'],
    live: 'https://nufv-lostandfound.vercel.app/',
    featured: true,
    icon: '/icons/nu-logo.png',
    iconFit: 'contain',
    images: [
      "/projects/nufv-lost-found/preview.jpg",
      "/projects/nufv-lost-found/preview1.png",
      "/projects/nufv-lost-found/preview2.png",
      "/projects/nufv-lost-found/preview3.png",
    ]
  },
  {
    id: 'nufv-gmc-portal',
    title: 'NUFV Good Moral Certificate Request Portal',
    description: 'Online Good Moral Certificate request system for the National University Fairview Student Discipline Office, streamlining student applications, payment verification, and request tracking.',
    tags: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Vercel'],
    live: 'https://gmc-web-nufv.vercel.app/',
    status: 'in-progress',
    featured: true,
    icon: '/icons/nu-logo.png',
    iconFit: 'contain',
    images: ['/projects/nufv-gmc-portal/websitepreview.jpg']
  },
  {
    id: 'aqualogic',
    title: 'AquaLogic — IoT Water Monitoring System',
    description: 'IoT-based aquarium monitoring and automation system for JRed Aquatics that tracks water parameters in real time.',
    tags: ['ESP32', 'Arduino', 'IoT Sensors', 'React', 'Node.js', 'WebSockets', 'Embedded C++'],
    projectType: 'Software Development Project',
    featured: true,
    images: ["/projects/aqualogic/preview.jpg", "/projects/aqualogic/preview1.jpg"]
  },
  {
    id: 'cylens',
    title: 'CyLens',
    description: 'Android application that assists colorblind users through real-time color detection and camera-based analysis.',
    tags: ['Kotlin', 'Android Studio', 'Camera2 API', 'ML Kit'],
    projectType: 'Mobile Application Project',
    featured: false,
    images: ["/projects/cylens/preview1.jpg", "/projects/cylens/preview2.png", "/projects/cylens/preview3.jpg"]
  },
  {
    id: 'empire-fitness',
    title: 'Empire Fitness',
    description: 'Gym management system featuring guest logging, attendance tracking, membership management, and administrative tools.',
    tags: ['PHP', 'MySQL', 'HTML', 'CSS', 'JavaScript'],
    projectType: 'Capstone Project',
    featured: false,
    images: [] // TODO: add real screenshots
  },
  {
    id: 'smart-waste-sorter',
    title: 'Smart Waste Sorting System',
    description: 'Sensor-based automated waste classification system using Arduino, proximity sensors, and servo-controlled sorting mechanisms.',
    tags: ['Arduino', 'C++', 'Proximity Sensors', 'Servo Motors', 'Embedded Systems'],
    featured: false,
    images: ["/projects/smart-waste-sorter/preview1.png", "/projects/smart-waste-sorter/preview2.jpg", "/projects/smart-waste-sorter/preview3.jpg"]
  }
]

export default projects
