// Role Types for BYC App - 15 Approved Roles with Eligibility Thresholds

// =============================================================================
// ROLE STREAMS
// =============================================================================

export type RoleStream = 'data-engineering' | 'ai-ml' | 'bi-reporting' | 'entry-level';

export interface RoleStreamInfo {
    id: RoleStream;
    name: string;
    color: string;
    bgColor: string;
}

export const ROLE_STREAMS: Record<RoleStream, RoleStreamInfo> = {
    'data-engineering': {
        id: 'data-engineering',
        name: 'Data Engineering',
        color: 'text-blue-600',
        bgColor: 'bg-blue-100',
    },
    'ai-ml': {
        id: 'ai-ml',
        name: 'AI / Machine Learning',
        color: 'text-purple-600',
        bgColor: 'bg-purple-100',
    },
    'bi-reporting': {
        id: 'bi-reporting',
        name: 'BI & Reporting',
        color: 'text-green-600',
        bgColor: 'bg-green-100',
    },
    'entry-level': {
        id: 'entry-level',
        name: 'Entry-Level Data Roles',
        color: 'text-orange-600',
        bgColor: 'bg-orange-100',
    },
};

// =============================================================================
// ROLE ELIGIBILITY THRESHOLDS
// =============================================================================

export interface RoleThresholds {
    sql?: number;       // Minimum SQL score (0-100)
    python?: number;    // Minimum Python score (0-100)
    de?: number;        // Minimum Data Engineering score (0-100)
    academic?: number;  // Minimum academic score
}

// =============================================================================
// ROLE DEFINITION
// =============================================================================

export interface RoleDefinition {
    id: string;
    title: string;
    stream: RoleStream;
    description: string;
    salaryRange: {
        min: number;    // In lakhs INR
        max: number;    // In lakhs INR
    };
    thresholds: RoleThresholds;
    skills: string[];
}

// =============================================================================
// 15 APPROVED ROLES
// =============================================================================

export const APPROVED_ROLES: RoleDefinition[] = [
    // ----- DATA ENGINEERING (4 roles) -----
    {
        id: 'junior-data-engineer',
        title: 'Junior Data Engineer',
        stream: 'data-engineering',
        description: 'Build and maintain data pipelines, work with ETL processes',
        salaryRange: { min: 5, max: 8 },
        thresholds: { de: 70, sql: 65, python: 65 },
        skills: ['SQL', 'Python', 'ETL', 'Data Pipelines'],
    },
    {
        id: 'analytics-engineer',
        title: 'Analytics Engineer',
        stream: 'data-engineering',
        description: 'Bridge between data engineering and analytics teams',
        salaryRange: { min: 6, max: 10 },
        thresholds: { de: 70, sql: 70, python: 60 },
        skills: ['dbt', 'SQL', 'Data Modeling', 'Analytics'],
    },
    {
        id: 'data-platform-engineer',
        title: 'Data Platform Engineer',
        stream: 'data-engineering',
        description: 'Design and maintain data infrastructure and platforms',
        salaryRange: { min: 7, max: 10 },
        thresholds: { de: 75, sql: 65, python: 70 },
        skills: ['Cloud Platforms', 'Infrastructure', 'Python', 'SQL'],
    },
    {
        id: 'data-systems-analyst',
        title: 'Data Systems Analyst',
        stream: 'data-engineering',
        description: 'Analyze data systems requirements and design solutions',
        salaryRange: { min: 5, max: 8 },
        thresholds: { de: 65, sql: 70, python: 55 },
        skills: ['Systems Analysis', 'SQL', 'Documentation', 'Requirements'],
    },

    // ----- AI / MACHINE LEARNING (6 roles) -----
    {
        id: 'ml-engineer-junior',
        title: 'Machine Learning Engineer (Junior)',
        stream: 'ai-ml',
        description: 'Develop and deploy machine learning models',
        salaryRange: { min: 6, max: 10 },
        thresholds: { python: 75, de: 65, sql: 60 },
        skills: ['Python', 'ML Frameworks', 'Statistics', 'Model Deployment'],
    },
    {
        id: 'ai-engineer',
        title: 'AI Engineer',
        stream: 'ai-ml',
        description: 'Build AI-powered applications and solutions',
        salaryRange: { min: 7, max: 10 },
        thresholds: { python: 80, de: 65, sql: 55 },
        skills: ['Python', 'Deep Learning', 'AI Frameworks', 'APIs'],
    },
    {
        id: 'data-scientist-junior',
        title: 'Data Scientist (Junior)',
        stream: 'ai-ml',
        description: 'Extract insights from data using statistical methods',
        salaryRange: { min: 6, max: 9 },
        thresholds: { python: 75, sql: 70, de: 55 },
        skills: ['Python', 'Statistics', 'ML', 'Data Visualization'],
    },
    {
        id: 'nlp-engineer-junior',
        title: 'NLP Engineer (Junior)',
        stream: 'ai-ml',
        description: 'Work on natural language processing applications',
        salaryRange: { min: 6, max: 10 },
        thresholds: { python: 80, de: 60, sql: 55 },
        skills: ['Python', 'NLP Libraries', 'Text Processing', 'ML'],
    },
    {
        id: 'cv-engineer-junior',
        title: 'Computer Vision Engineer (Junior)',
        stream: 'ai-ml',
        description: 'Develop computer vision and image processing solutions',
        salaryRange: { min: 6, max: 10 },
        thresholds: { python: 80, de: 55, sql: 50 },
        skills: ['Python', 'OpenCV', 'Deep Learning', 'Image Processing'],
    },
    {
        id: 'applied-ai-analyst',
        title: 'Applied AI Analyst',
        stream: 'ai-ml',
        description: 'Apply AI solutions to business problems',
        salaryRange: { min: 5, max: 8 },
        thresholds: { python: 70, sql: 65, de: 55 },
        skills: ['Python', 'AI Tools', 'Business Analysis', 'Reporting'],
    },

    // ----- BI & REPORTING (5 roles) -----
    {
        id: 'bi-analyst',
        title: 'Business Intelligence Analyst',
        stream: 'bi-reporting',
        description: 'Create dashboards and business reports',
        salaryRange: { min: 5, max: 8 },
        thresholds: { sql: 70 },
        skills: ['SQL', 'Power BI', 'Tableau', 'Excel'],
    },
    {
        id: 'mis-reporting-analyst',
        title: 'MIS / Reporting Analyst',
        stream: 'bi-reporting',
        description: 'Generate management information system reports',
        salaryRange: { min: 5, max: 7 },
        thresholds: { sql: 65 },
        skills: ['SQL', 'Excel', 'Reporting Tools', 'Data Analysis'],
    },
    {
        id: 'sql-developer',
        title: 'SQL Developer',
        stream: 'bi-reporting',
        description: 'Write and optimize SQL queries for data retrieval',
        salaryRange: { min: 5, max: 8 },
        thresholds: { sql: 75 },
        skills: ['SQL', 'Database Design', 'Query Optimization', 'Stored Procedures'],
    },
    {
        id: 'data-quality-analyst',
        title: 'Data Quality Analyst',
        stream: 'bi-reporting',
        description: 'Ensure data accuracy and consistency',
        salaryRange: { min: 5, max: 7 },
        thresholds: { sql: 70 },
        skills: ['SQL', 'Data Validation', 'Quality Frameworks', 'Documentation'],
    },
    {
        id: 'analytics-engineer-junior',
        title: 'Analytics Engineer (Junior)',
        stream: 'bi-reporting',
        description: 'Support analytics infrastructure and data models',
        salaryRange: { min: 5, max: 8 },
        thresholds: { sql: 70, python: 55 },
        skills: ['SQL', 'dbt', 'Data Modeling', 'Python Basics'],
    },
];

// =============================================================================
// ROLE ELIGIBILITY RESULT
// =============================================================================

export interface RoleEligibility {
    role: RoleDefinition;
    isEligible: boolean;
    matchScore: number;         // 0-100 match percentage
    missingRequirements: string[];
}

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

/**
 * Format salary in INR (₹5L - ₹10L format)
 */
export function formatSalaryINR(min: number, max: number): string {
    return `₹${min}L - ₹${max}L`;
}

/**
 * Get roles by stream
 */
export function getRolesByStream(stream: RoleStream): RoleDefinition[] {
    return APPROVED_ROLES.filter(role => role.stream === stream);
}

/**
 * Check if a candidate meets role thresholds
 */
export function checkRoleEligibility(
    role: RoleDefinition,
    scores: { sql: number; python: number; de: number; academic?: number }
): RoleEligibility {
    const missingRequirements: string[] = [];
    let meetsAll = true;

    if (role.thresholds.sql !== undefined && scores.sql < role.thresholds.sql) {
        missingRequirements.push(`SQL score needs ${role.thresholds.sql}% (current: ${scores.sql}%)`);
        meetsAll = false;
    }
    if (role.thresholds.python !== undefined && scores.python < role.thresholds.python) {
        missingRequirements.push(`Python score needs ${role.thresholds.python}% (current: ${scores.python}%)`);
        meetsAll = false;
    }
    if (role.thresholds.de !== undefined && scores.de < role.thresholds.de) {
        missingRequirements.push(`Data Engineering score needs ${role.thresholds.de}% (current: ${scores.de}%)`);
        meetsAll = false;
    }
    if (role.thresholds.academic !== undefined && (scores.academic ?? 0) < role.thresholds.academic) {
        missingRequirements.push(`Academic score needs ${role.thresholds.academic}% (current: ${scores.academic ?? 0}%)`);
        meetsAll = false;
    }

    // Calculate match score based on how close to thresholds
    let matchScore = 100;
    if (!meetsAll) {
        const thresholdCount = Object.keys(role.thresholds).length;
        const metCount = thresholdCount - missingRequirements.length;
        matchScore = Math.round((metCount / thresholdCount) * 100);
    }

    return {
        role,
        isEligible: meetsAll,
        matchScore,
        missingRequirements,
    };
}

/**
 * Get all eligible roles for given scores
 */
export function getEligibleRoles(
    scores: { sql: number; python: number; de: number; academic?: number }
): RoleEligibility[] {
    return APPROVED_ROLES.map(role => checkRoleEligibility(role, scores))
        .filter(result => result.isEligible)
        .sort((a, b) => b.matchScore - a.matchScore);
}

/**
 * Get potential roles (not eligible but close)
 */
export function getPotentialRoles(
    scores: { sql: number; python: number; de: number; academic?: number }
): RoleEligibility[] {
    return APPROVED_ROLES.map(role => checkRoleEligibility(role, scores))
        .filter(result => !result.isEligible && result.matchScore >= 50)
        .sort((a, b) => b.matchScore - a.matchScore);
}
