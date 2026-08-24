import type { Project } from '../types'

const projects: Project[] = [
  {
    id: 'nufv-lost-found',
    title: 'NUFV Lost & Found Management System',
    description: 'Modern Lost & Found system for National University Fairview, replacing a legacy PHP workflow with a full-stack web application.',
    tags: ['Next.js 15', 'React 19', 'TypeScript', 'Tailwind CSS', 'Prisma ORM', 'PostgreSQL', 'Neon', 'JWT', 'bcryptjs', 'Nodemailer', 'Vercel Blob'],
    live: 'https://nufv-lostandfound.vercel.app/',
    featured: true,
    images: [
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
    featured: true,
    images: []
  },
  {
    id: 'aqualogic',
    title: 'AquaLogic — IoT Water Monitoring System',
    description: 'IoT-based aquarium monitoring and automation system for JRed Aquatics that tracks water parameters in real time.',
    tags: ['ESP32', 'Arduino', 'IoT Sensors', 'React', 'Node.js', 'WebSockets', 'Embedded C++'],
    featured: true,
    images: ["/projects/aqualogic/preview1.jpg", "/projects/aqualogic/preview2.png", "/projects/aqualogic/preview3.jpg"]
  },
  {
    id: 'cylens',
    title: 'CyLens',
    description: 'Android application that assists colorblind users through real-time color detection and camera-based analysis.',
    tags: ['Kotlin', 'Android Studio', 'Camera2 API', 'ML Kit'],
    featured: false,
    images: ["/projects/cylens/preview1.jpg", "/projects/cylens/preview2.png", "/projects/cylens/preview3.jpg"]
  },
  {
    id: 'empire-fitness',
    title: 'Empire Fitness',
    description: 'Gym management system featuring guest logging, attendance tracking, membership management, and administrative tools.',
    tags: ['PHP', 'MySQL', 'HTML', 'CSS', 'JavaScript'],
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
