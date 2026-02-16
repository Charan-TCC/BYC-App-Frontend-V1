// Assessment Types for BYC App - Student Assessment & Career Recommendation System

// =============================================================================
// ACADEMIC RECORDS
// =============================================================================

export interface AcademicRecord {
    semesters: number[];        // 8 semester percentages (0-100)
    backlogs: number;           // Number of backlogs
    averagePercentage: number;  // Calculated average across semesters
    academicScore: number;      // (averagePercentage / 10) - backlogs
}

// =============================================================================
// COVER LETTER
// =============================================================================

export type CoverLetterType = 'uploaded' | 'written' | 'none';

export interface CoverLetter {
    type: CoverLetterType;
    fileName?: string;          // For uploaded files
    content?: string;           // For written content
    wordCount?: number;         // Character/word count
    score: number;              // Calculated score (0-25)
}

// =============================================================================
// PROJECT EVALUATION
// =============================================================================

export interface ProjectScores {
    sqlAnalytics: number;        // 0-100, Weight: 30%
    pythonDataCleaning: number;  // 0-100, Weight: 30%
    dataPipeline: number;        // 0-100, Weight: 40%
    totalScore: number;          // Weighted average (0-100)
}

export const PROJECT_WEIGHTS = {
    sqlAnalytics: 0.30,
    pythonDataCleaning: 0.30,
    dataPipeline: 0.40,
} as const;

// =============================================================================
// CAREER QUESTIONNAIRE
// =============================================================================

export interface QuestionnaireQuestion {
    id: number;
    question: string;
    options: QuestionnaireOption[];
}

export interface QuestionnaireOption {
    text: string;
    streamWeights: Partial<StreamScores>;
}

export interface StreamScores {
    dataEngineering: number;
    aiMl: number;
    biReporting: number;
    entryLevel: number;
}

export interface QuestionnaireResponse {
    answers: Record<number, number>;  // question ID -> selected option index
    streamScores: StreamScores;
    completedAt?: string;
}

// =============================================================================
// STUDENT GRADING
// =============================================================================

export type GradeLetter = 'A+' | 'A' | 'A-' | 'B+' | 'B' | 'B-' | 'C+' | 'C' | 'D';

export interface GradeBreakdown {
    academic: number;      // out of 25
    projects: number;      // out of 50
    coverLetter: number;   // out of 25
}

export interface StudentGrade {
    grade: GradeLetter;
    totalScore: number;         // 0-100
    breakdown: GradeBreakdown;
    strengths: string[];
    improvementAreas: ImprovementArea[];
}

export interface ImprovementArea {
    area: string;
    priority: 'critical' | 'high' | 'medium';
    recommendation: string;
    unlockedRoles: string[];    // Roles that unlock after improvement
}

// Grade thresholds
export const GRADE_THRESHOLDS: Record<GradeLetter, { min: number; max: number; label: string }> = {
    'A+': { min: 90, max: 100, label: 'Outstanding performance' },
    'A': { min: 85, max: 89, label: 'Excellent performance' },
    'A-': { min: 80, max: 84, label: 'Very good performance' },
    'B+': { min: 75, max: 79, label: 'Good performance' },
    'B': { min: 70, max: 74, label: 'Fair performance' },
    'B-': { min: 65, max: 69, label: 'Average performance' },
    'C+': { min: 60, max: 64, label: 'Below average' },
    'C': { min: 50, max: 59, label: 'Needs improvement' },
    'D': { min: 0, max: 49, label: 'Requires significant work' },
};

// Score weights for final grading
export const SCORE_WEIGHTS = {
    academic: 0.25,     // 25%
    projects: 0.50,     // 50%
    coverLetter: 0.25,  // 25%
} as const;

// =============================================================================
// SKILL CATEGORIES (4 Final)
// =============================================================================

export type SkillCategory =
    | 'business-acumen'
    | 'data-analytical-thinking'
    | 'communication-stakeholder'
    | 'quality-governance';

export interface SkillCategoryInfo {
    id: SkillCategory;
    name: string;
    icon: string;
    description: string;
}

export const SKILL_CATEGORIES: SkillCategoryInfo[] = [
    {
        id: 'business-acumen',
        name: 'Business Acumen',
        icon: '💼',
        description: 'Business metrics, KPIs, industry analysis',
    },
    {
        id: 'data-analytical-thinking',
        name: 'Data & Analytical Thinking',
        icon: '📊',
        description: 'SQL, Statistics, Python',
    },
    {
        id: 'communication-stakeholder',
        name: 'Communication & Stakeholder Skills',
        icon: '💬',
        description: 'Data storytelling, Power BI, Tableau',
    },
    {
        id: 'quality-governance',
        name: 'Quality, Governance & Reliability',
        icon: '✓',
        description: 'Data quality, governance frameworks',
    },
];

// =============================================================================
// FOUNDATION COURSES
// =============================================================================

export type CourseModule = 'sql-basics' | 'python-basics' | 'de-101';

export interface FoundationCourse {
    id: CourseModule;
    title: string;
    description: string;
    duration: string;
    lessons: number;
    completedLessons: number;
    status: 'not-started' | 'in-progress' | 'completed';
}

// =============================================================================
// ASSESSMENT PHASES (Updated)
// =============================================================================

export type AssessmentPhase =
    | 'not-started'
    | 'initial-assessment'      // NEW: Initial Skills Quiz
    | 'foundation-courses'      // NEW: Foundation Learning
    | 'aptitude'                // Existing
    | 'coding'                  // Existing
    | 'problem-solving'         // Existing
    | 'video'                   // Existing
    | 'final-assessment'        // NEW: Projects + Academic + Cover Letter
    | 'completed';

// =============================================================================
// EXTENDED ASSESSMENT PROGRESS
// =============================================================================

export interface ExtendedAssessmentProgress {
    currentPhase: AssessmentPhase;
    overallProgress: number;    // 0-100

    // Initial Assessment (Pre-course)
    initialAssessment?: {
        completed: boolean;
        aptitudeScore: number;
        logicalReasoningScore: number;
        dataAnalyticsScore: number;
        completedAt?: string;
    };

    // Foundation Courses
    foundationCourses?: {
        sqlBasics: FoundationCourse;
        pythonBasics: FoundationCourse;
        de101: FoundationCourse;
    };

    // Existing phases (preserved)
    aptitude?: {
        completed: boolean;
        score?: number;
        completedAt?: string;
    };
    coding?: {
        completed: boolean;
        score?: number;
        completedAt?: string;
    };
    problemSolving?: {
        completed: boolean;
        score?: number;
        completedAt?: string;
    };
    video?: {
        completed: boolean;
        score?: number;
        completedAt?: string;
    };

    // Final Assessment (NEW)
    finalAssessment?: {
        projectScores: ProjectScores;
        academicRecord: AcademicRecord;
        coverLetter: CoverLetter;
        questionnaire: QuestionnaireResponse;
        studentGrade: StudentGrade;
        completedAt?: string;
    };
}
