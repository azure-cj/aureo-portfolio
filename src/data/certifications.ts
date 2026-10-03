export interface Certification {
  id: string
  name: string
  issuer: string
  issueDate: string
  expiryDate?: string
  credentialUrl?: string
  badgeUrl?: string
  skills: string[]
  certificateId?: string
  featured?: boolean
  description?: string
}

export const certifications: Certification[] = [
  {
    id: "appreciation-sdo-nufv",
    name: "Certificate of Appreciation",
    issuer: "Student Discipline Office, NU Fairview",
    issueDate: "Jul 2025",
    description: "In recognition of outstanding support and initiative in enhancing the Lost and Found process through the development of the Lost and Found Dashboard.",
    credentialUrl: "/certificates/CertificateofAppreciation.jpg",
    skills: ["Web Development", "Dashboard Development", "Full-Stack Development", "System Design"],
    featured: true
  },
  {
    id: "fullstack-web-developer",
    name: "Getting Started as a Full-Stack Web Developer",
    issuer: "LinkedIn Learning (CompTIA® Authorized Partner)",
    issueDate: "May 2026",
    credentialUrl: "/certificates/CertificateOfCompletion_Getting Started as a FullStack Web Developer_page-0001.jpg",
    skills: ["Web Development", "Full-Stack Development"],
    certificateId: "1b93cdc88885b5c3abc50c7cc1f887264b6c77f45cdbbf238341ef06d411d71e"
  },
  {
    id: "networking-basics",
    name: "Networking Basics",
    issuer: "Cisco Networking Academy",
    issueDate: "Oct 2025",
    credentialUrl: "/certificates/Networking_Basics_certificate_aureo_page-0001.jpg",
    skills: ["Networking", "Cisco"],
    certificateId: ""
  },
  {
    id: "intro-pen-testing",
    name: "Introduction to Pen Testing for Cybersecurity Professionals",
    issuer: "LinkedIn Learning",
    issueDate: "Oct 2025",
    credentialUrl: "/certificates/CertificateOfCompletion_Introduction to Pen Testing for Cybersecurity Professionals_page-0001.jpg",
    skills: ["Penetration Testing", "Cybersecurity"],
    certificateId: "92f7178376f4d4670859153198d7a49cd3ad22c67e121d1b943d428788811f0a"
  },
  {
    id: "computer-forensics",
    name: "Cybersecurity Foundations: Computer Forensics",
    issuer: "LinkedIn Learning",
    issueDate: "Sep 2025",
    credentialUrl: "/certificates/CertificateOfCompletion_Cybersecurity Foundations Computer Forensics_page-0001.jpg",
    skills: ["Cybersecurity", "Computer Forensics"],
    certificateId: "a67f31ea538a7efa5c2816bf59647a86a7db2e46b501518e6a8b17ccfa587f1d"
  },
  {
    id: "cybersecurity-awareness",
    name: "Cybersecurity Awareness: Cybersecurity Terminology",
    issuer: "LinkedIn Learning",
    issueDate: "Sep 2025",
    credentialUrl: "/certificates/CertificateOfCompletion_Cybersecurity Awareness_page-0001.jpg",
    skills: ["Cybersecurity", "Information Security Awareness"],
    certificateId: "3a629e7b1753831b98d042762a5e0f353de93ef429037644f0d8f7557664ff5b"
  },
  {
    id: "intro-risk-management",
    name: "Introduction to Risk Management",
    issuer: "LinkedIn Learning (PMI® Registered Education Provider)",
    issueDate: "Aug 2025",
    credentialUrl: "/certificates/CertificateOfCompletion_Introduction to Risk Management_page-0001.jpg",
    skills: ["Finance", "Financial Risk Management"],
    certificateId: "58c45be4928c4aef31e7dabb724433cb2b20b952242814e7c1bb2f1f6b790b32"
  },
  {
    id: "android-kotlin",
    name: "Complete Guide to Android Development with Kotlin for Beginners",
    issuer: "LinkedIn Learning",
    issueDate: "Dec 2024",
    credentialUrl: "/certificates/CertificateOfCompletion_Complete Guide to Android Development with Kotlin for Beginners_page-0001.jpg",
    skills: ["Kotlin", "Android Development"],
    certificateId: "c733ac546ac311510c8a8fcd1ccedc40be8f93881759c304cc84524647106243"
  },
  {
    id: "intro-web-apis",
    name: "Introduction to Web APIs",
    issuer: "LinkedIn Learning",
    issueDate: "Dec 2024",
    credentialUrl: "/certificates/CertificateOfCompletion_Introduction to Web APIs_page-0001.jpg",
    skills: ["API Development", "Application Programming Interfaces"],
    certificateId: "6202619af377f65180bc500ce3ec34685b24810b92abd1bd7dd8ee5106e68481"
  },
  {
    id: "excel-tips-tricks",
    name: "Excel: Tips and Tricks (2023)",
    issuer: "LinkedIn Learning",
    issueDate: "Oct 2023",
    credentialUrl: "/certificates/CertificateOfCompletion_Excel Tips and Tricks 2023_page-0001.jpg",
    skills: ["Microsoft Excel"],
    certificateId: "5fac049a2faa8dc72b4df9e9586e36c987195426b4f1cface230cbd68687251e"
  }
]

export default certifications
