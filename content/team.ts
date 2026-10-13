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
    role: '',
    bio: '',
    photoUrl: '',
    skills: [],
    socials: [],
  },
  {
    id: 'abu-sayed-md-saad',
    name: 'Abu Sayed Md Saad',
    role: '',
    bio: '',
    photoUrl: '',
    skills: [],
    socials: [],
  },
  {
    id: 'jabir-abdullah-haian',
    name: 'Jabir Abdullah Haian',
    role: '',
    bio: '',
    photoUrl: '',
    skills: [],
    socials: [],
  },
];

// Query helper functions
export function getTeamMembers(): TeamMember[] {
  return teamMembers;
}

export function getTeamMemberById(id: string): TeamMember | undefined {
  return teamMembers.find((member) => member.id === id);
}
