// ============================================================================
// File: content/team.ts
// Purpose: Leadership team profiles ("The three heads").
//          Powers /team and About page leadership highlights.
// ============================================================================

export interface TeamMemberSocial {
  platform: 'github' | 'linkedin' | 'twitter';
  url: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role?: string;
  bio?: string;
  photoUrl?: string;
  skills?: string[];
  socials?: TeamMemberSocial[];
}

export const teamMembers: TeamMember[] = [
  {
    id: 'nasib-mohammad-arif',
    name: 'Nasib Mohammad Arif',
    role: 'Co-founder & Creative Director',
    bio: 'Leads brand identity systems, art direction, and UI/UX architecture. Background in multimedia design, commercial photography, and digital marketing across Dhaka and Vilnius.',
    photoUrl: '/images/team/nasib-mohammad-arif.jpg',
    skills: ['Brand Identity', 'UI/UX Design', 'Design Systems', 'Figma', 'Creative Direction'],
    socials: [
      {
        platform: 'linkedin',
        url: 'https://www.linkedin.com/in/nasibmohammadarif/',
      },
    ],
  },
  {
    id: 'abu-sayed-md-saad',
    name: 'Abu Sayed Md Saad',
    role: 'Co-founder & Technical Lead',
    bio: 'Directs web engineering, content management architecture, and digital automation pipelines. Focused on clean frontend code, CMS integrations, and high-performance client delivery.',
    photoUrl: '/images/team/abu-sayed-md-saad.jpg',
    skills: ['Web Engineering', 'WordPress & CMS', 'JavaScript', 'Workflow Automation', 'Frontend Architecture'],
    socials: [
      {
        platform: 'linkedin',
        url: 'https://www.linkedin.com/in/abusayedmdsaad/',
      },
    ],
  },
  {
    id: 'jabir-abdullah-haian',
    name: 'Jabir Abdullah Haian',
    role: 'Co-founder & Systems Architect',
    bio: 'Directs business systems, operational architecture, and data workflows. Background in financial accounting systems (AIS, University of Dhaka), internal controls, and data analytics.',
    photoUrl: '/images/team/jabir-abdullah-haian.jpg',
    skills: ['Systems Architecture', 'Data Analytics', 'Financial Controls', 'Operations', 'Business Systems'],
    socials: [
      {
        platform: 'linkedin',
        url: 'https://www.linkedin.com/in/jabir-abdullah-haian/',
      },
    ],
  },
];

// Query helper functions
export function getTeamMembers(): TeamMember[] {
  return teamMembers;
}

export function getTeamMemberById(id: string): TeamMember | undefined {
  return teamMembers.find((member) => member.id === id);
}
