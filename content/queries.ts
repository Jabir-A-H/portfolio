// ============================================================================
// File: content/queries.ts
// Purpose: Unified query facade for all portfolio content.
//          Centralizes typed access to projects, services, team, and process.
// ============================================================================

import {
  projects,
  getAllProjects as getRawAllProjects,
  getFeaturedProjects as getRawFeaturedProjects,
  getProjectBySlug as getRawProjectBySlug,
  getProjectsByCategory as getRawProjectsByCategory,
  getProjectCategories as getRawProjectCategories,
  type ProjectItem,
  type ProjectCategory,
  type ProjectResult,
} from './projects';

import {
  services,
  serviceGroups,
  getAllServices as getRawAllServices,
  getServiceBySlug as getRawServiceBySlug,
  getServicesByGroup as getRawServicesByGroup,
  getAllServiceGroups as getRawAllServiceGroups,
  getServiceGroupById as getRawServiceGroupById,
  type ServiceItem,
  type ServiceGroup,
  type ServiceGroupId,
  type ServiceDeliveryItem,
  type ServiceProcessStep,
  type ServiceTechItem,
  type ServiceFAQ,
} from './services';

import {
  teamMembers,
  getTeamMembers as getRawTeamMembers,
  getTeamMemberById as getRawTeamMemberById,
  type TeamMember,
  type TeamMemberSocial,
} from './team';

import {
  processSteps,
  getProcessSteps as getRawProcessSteps,
  getProcessStepByNumber as getRawProcessStepByNumber,
  type ProcessStep,
} from './process';

// ----------------------------------------------------------------------------
// Re-exported Domain Types
// ----------------------------------------------------------------------------
export type {
  ProjectItem,
  ProjectCategory,
  ProjectResult,
  ServiceItem,
  ServiceGroup,
  ServiceGroupId,
  ServiceDeliveryItem,
  ServiceProcessStep,
  ServiceTechItem,
  ServiceFAQ,
  TeamMember,
  TeamMemberSocial,
  ProcessStep,
};

// ----------------------------------------------------------------------------
// Projects Queries
// ----------------------------------------------------------------------------
export function getProjects(): ProjectItem[] {
  return projects;
}

export function getAllProjects(): ProjectItem[] {
  return getRawAllProjects();
}

export function getFeaturedProjects(): ProjectItem[] {
  return getRawFeaturedProjects();
}

export function getProjectBySlug(slug: string): ProjectItem | undefined {
  return getRawProjectBySlug(slug);
}

export function getProjectCategories(): string[] {
  return getRawProjectCategories();
}

export function getProjectsByCategory(category: ProjectCategory | 'All'): ProjectItem[] {
  return getRawProjectsByCategory(category);
}

// ----------------------------------------------------------------------------
// Services Queries
// ----------------------------------------------------------------------------
export function getServices(): ServiceItem[] {
  return services;
}

export function getAllServices(): ServiceItem[] {
  return getRawAllServices();
}

export function getServiceGroups(): ServiceGroup[] {
  return serviceGroups;
}

export function getAllServiceGroups(): ServiceGroup[] {
  return getRawAllServiceGroups();
}

export function getServiceGroupById(id: ServiceGroupId): ServiceGroup | undefined {
  return getRawServiceGroupById(id);
}

export function getServiceBySlug(slug: string): ServiceItem | undefined {
  return getRawServiceBySlug(slug);
}

export function getServicesByGroup(groupId: ServiceGroupId): ServiceItem[] {
  return getRawServicesByGroup(groupId);
}

export interface ServiceContactOption {
  value: string;
  label: string;
}

export function getServiceOptionsForContact(): ServiceContactOption[] {
  return [
    { value: 'general-inquiry', label: 'General Inquiry' },
    ...services.map((service) => ({
      value: service.slug,
      label: service.title,
    })),
  ];
}

// ----------------------------------------------------------------------------
// Team Queries
// ----------------------------------------------------------------------------
export { teamMembers };

export function getTeamMembers(): TeamMember[] {
  return getRawTeamMembers();
}

export function getTeamMemberById(id: string): TeamMember | undefined {
  return getRawTeamMemberById(id);
}

// ----------------------------------------------------------------------------
// Process Queries
// ----------------------------------------------------------------------------
export { processSteps };

export function getProcessSteps(): ProcessStep[] {
  return getRawProcessSteps();
}

export function getProcessStepByNumber(num: number): ProcessStep | undefined {
  return getRawProcessStepByNumber(num);
}
