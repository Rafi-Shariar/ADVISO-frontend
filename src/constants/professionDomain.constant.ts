export const PROFESSION_DOMAINS = {
  CAREER_AND_JOB_SEARCH: "Career & Job Search",
  SOFTWARE_ENGINEERING: "Software Engineering",
  PRODUCT_MANAGEMENT: "Product Management",
  UI_UX_DESIGN: "UI/UX Design",
  DATA_SCIENCE_AND_AI: "Data Science & AI",
  BUSINESS_AND_STARTUPS: "Business & Startups",
  FINANCE_AND_ACCOUNTING: "Finance & Accounting",
  LEGAL_ADVICE: "Legal Advice",
  DIGITAL_MARKETING: "Digital Marketing",
  SALES_AND_BUSINESS_DEVELOPMENT: "Sales & Business Development",
  HIGHER_EDUCATION_AND_ADMISSIONS: "Higher Education & Admissions",
  HEALTH_AND_WELLNESS: "Health & Wellness",
  LEADERSHIP_AND_MANAGEMENT: "Leadership & Management",
  CONTENT_CREATION_AND_MEDIA: "Content Creation & Media",
  HUMAN_RESOURCES_AND_RECRUITING: "Human Resources & Recruiting",
  CYBERSECURITY: "Cybersecurity",
  DEVOPS_AND_CLOUD_COMPUTING: "DevOps & Cloud Computing",
  REAL_ESTATE_AND_INVESTING: "Real Estate & Investing",
  PERSONAL_DEVELOPMENT_AND_LIFE_COACHING:
    "Personal Development & Life Coaching",
  CREATIVE_ARTS_AND_WRITING: "Creative Arts & Writing",
  OTHERS: "Others",
} as const;

// এর মানগুলোর (Values) ইউনিয়ন টাইপ
export type ProfessionDomain =
  (typeof PROFESSION_DOMAINS)[keyof typeof PROFESSION_DOMAINS];

// এর কিগুলোর (Keys) ইউনিয়ন টাইপ (যদি প্রয়োজন হয়)
export type ProfessionDomainKey = keyof typeof PROFESSION_DOMAINS;
