const mongoose = require('mongoose');
const { mongodb, admin } = require('../config');

const AdminUserModel = require('../models/admin-user');
const SiteSettingModel = require('../models/site-setting');
const ExperienceModel = require('../models/experience');
const ProjectModel = require('../models/project');
const PostModel = require('../models/post');
const BlogPostModel = require('../models/blog-post');
const SkillModel = require('../models/skill');

const siteSettingsData = {
  name: 'Kader Kaya',
  role: 'Full Stack Developer',
  location: 'Istanbul, Turkey',
  summary: 'Experienced Full Stack Developer with a passion for building scalable web applications and clean, maintainable code.',
  avatar_url: null,
  email: 'kader@kaderkaya.com',
  github_url: 'https://github.com/kaderkaya',
  linkedin_url: 'https://linkedin.com/in/kaderkaya',
  medium_url: 'https://medium.com/@kaderkaya',
};

const experiencesData = [
  {
    company: 'Bulbi',
    title: 'Full Stack Developer',
    location: 'Istanbul, Turkey',
    start_date: '2023-01',
    end_date: null,
    is_current: true,
    bullets: [
      'Developing and maintaining web applications using React and Node.js',
      'Collaborating with cross-functional teams to define and implement new features',
      'Writing clean, testable, and efficient code',
    ],
    technologies: ['React', 'Node.js', 'TypeScript', 'MongoDB', 'Redis'],
    order: 1,
  },
  {
    company: 'Mikigi',
    title: 'Frontend Developer',
    location: 'Istanbul, Turkey',
    start_date: '2022-03',
    end_date: '2022-12',
    is_current: false,
    bullets: [
      'Built responsive user interfaces with React and Next.js',
      'Implemented state management solutions using Redux and Context API',
      'Optimized application performance and load times',
    ],
    technologies: ['React', 'Next.js', 'Redux', 'Tailwind CSS'],
    order: 2,
  },
  {
    company: 'Softalya',
    title: 'Junior Developer',
    location: 'Antalya, Turkey',
    start_date: '2021-06',
    end_date: '2022-02',
    is_current: false,
    bullets: [
      'Developed REST APIs using Express.js and MongoDB',
      'Participated in code reviews and agile development processes',
      'Maintained and improved existing codebase',
    ],
    technologies: ['JavaScript', 'Express.js', 'MongoDB', 'Git'],
    order: 3,
  },
  {
    company: 'Talya',
    title: 'Intern Developer',
    location: 'Antalya, Turkey',
    start_date: '2021-01',
    end_date: '2021-05',
    is_current: false,
    bullets: [
      'Learned web development fundamentals and best practices',
      'Assisted senior developers in building web applications',
      'Developed small features and bug fixes',
    ],
    technologies: ['HTML', 'CSS', 'JavaScript', 'React'],
    order: 4,
  },
];

const projectsData = [
  {
    name: 'E-Commerce Backend',
    description: 'A scalable e-commerce backend API built with Node.js and MongoDB',
    bullets: [
      'RESTful API with JWT authentication',
      'Product catalog with search and filtering',
      'Order management and payment integration',
    ],
    tags: ['Node.js', 'Express', 'MongoDB', 'JWT'],
    repo_url: 'https://github.com/kaderkaya/ecommerce-backend',
    live_url: null,
    featured: true,
    order: 1,
  },
  {
    name: 'Task Tracker',
    description: 'A full-stack task management application with real-time updates',
    bullets: [
      'Drag-and-drop kanban board interface',
      'Real-time collaboration features',
      'User authentication and team management',
    ],
    tags: ['React', 'Node.js', 'Socket.io', 'PostgreSQL'],
    repo_url: 'https://github.com/kaderkaya/task-tracker',
    live_url: 'https://task-tracker.kaderkaya.com',
    featured: true,
    order: 2,
  },
  {
    name: 'Blog Management',
    description: 'A content management system for blogs with Markdown support',
    bullets: [
      'Markdown editor with live preview',
      'SEO optimization tools',
      'Analytics dashboard',
    ],
    tags: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL'],
    repo_url: 'https://github.com/kaderkaya/blog-management',
    live_url: null,
    featured: false,
    order: 3,
  },
];

const postsData = [
  {
    title: 'Building Scalable APIs with Node.js',
    description: 'A comprehensive guide to designing and building scalable REST APIs using Node.js and Express.',
    cover_image: null,
    external_url: 'https://medium.com/@kaderkaya/building-scalable-apis',
    published_at: '2024-01-15',
    tags: ['Node.js', 'API', 'Backend'],
    featured: true,
    order: 1,
  },
  {
    title: 'React Performance Optimization Tips',
    description: 'Learn how to optimize your React applications for better performance and user experience.',
    cover_image: null,
    external_url: 'https://medium.com/@kaderkaya/react-performance-tips',
    published_at: '2023-11-20',
    tags: ['React', 'Performance', 'Frontend'],
    featured: true,
    order: 2,
  },
  {
    title: 'Getting Started with TypeScript',
    description: 'An introduction to TypeScript and how to integrate it into your existing JavaScript projects.',
    cover_image: null,
    external_url: 'https://medium.com/@kaderkaya/getting-started-typescript',
    published_at: '2023-09-10',
    tags: ['TypeScript', 'JavaScript'],
    featured: false,
    order: 3,
  },
];

const blogPostsData = [
  {
    title: 'My Journey into Full Stack Development',
    slug: 'my-journey-into-full-stack-development',
    excerpt: 'How I transitioned from a beginner to a professional full stack developer.',
    content: '# My Journey\n\nThis is the story of how I became a full stack developer...',
    cover_image: null,
    published_at: '2024-02-01',
    tags: ['Career', 'Development'],
    order: 1,
  },
  {
    title: 'Why I Choose MongoDB for My Projects',
    slug: 'why-i-choose-mongodb',
    excerpt: 'A deep dive into why MongoDB is my go-to database for most projects.',
    content: '# MongoDB\n\nMongoDB has been my preferred database for several reasons...',
    cover_image: null,
    published_at: '2024-01-10',
    tags: ['MongoDB', 'Database', 'Backend'],
    order: 2,
  },
  {
    title: 'Setting Up a Modern Development Environment',
    slug: 'modern-dev-environment-setup',
    excerpt: 'My recommended tools and configurations for a productive development workflow.',
    content: '# Dev Environment\n\nHere are the tools I use daily...',
    cover_image: null,
    published_at: '2023-12-05',
    tags: ['Tools', 'Productivity'],
    order: 3,
  },
];

const skillsData = [
  { category: 'Frontend', name: 'React', icon: 'react', order: 1 },
  { category: 'Frontend', name: 'Next.js', icon: 'nextjs', order: 2 },
  { category: 'Frontend', name: 'TypeScript', icon: 'typescript', order: 3 },
  { category: 'Frontend', name: 'Tailwind CSS', icon: 'tailwindcss', order: 4 },
  { category: 'Backend', name: 'Node.js', icon: 'nodejs', order: 5 },
  { category: 'Backend', name: 'Express.js', icon: 'express', order: 6 },
  { category: 'Backend', name: 'REST API', icon: 'api', order: 7 },
  { category: 'Database', name: 'MongoDB', icon: 'mongodb', order: 8 },
  { category: 'Database', name: 'PostgreSQL', icon: 'postgresql', order: 9 },
  { category: 'Database', name: 'Redis', icon: 'redis', order: 10 },
  { category: 'DevOps', name: 'Docker', icon: 'docker', order: 11 },
  { category: 'DevOps', name: 'Git', icon: 'git', order: 12 },
  { category: 'DevOps', name: 'CI/CD', icon: 'cicd', order: 13 },
  { category: 'Tools', name: 'VS Code', icon: 'vscode', order: 14 },
  { category: 'Tools', name: 'Postman', icon: 'postman', order: 15 },
  { category: 'Tools', name: 'Figma', icon: 'figma', order: 16 },
];

async function seed() {
  try {
    await mongoose.connect(mongodb.url);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Promise.all([
      AdminUserModel.deleteMany({}),
      SiteSettingModel.deleteMany({}),
      ExperienceModel.deleteMany({}),
      ProjectModel.deleteMany({}),
      PostModel.deleteMany({}),
      BlogPostModel.deleteMany({}),
      SkillModel.deleteMany({}),
    ]);
    console.log('Cleared existing data');

    // Seed admin user
    await AdminUserModel.create({
      email: admin.email,
      password: admin.password,
    });
    console.log('Admin user created');

    // Seed all data in parallel
    await Promise.all([
      SiteSettingModel.create(siteSettingsData),
      ExperienceModel.insertMany(experiencesData),
      ProjectModel.insertMany(projectsData),
      PostModel.insertMany(postsData),
      BlogPostModel.insertMany(blogPostsData),
      SkillModel.insertMany(skillsData),
    ]);

    console.log('Seed data inserted:');
    console.log('  - 1 admin user');
    console.log('  - 1 site settings');
    console.log(`  - ${experiencesData.length} experiences`);
    console.log(`  - ${projectsData.length} projects`);
    console.log(`  - ${postsData.length} posts`);
    console.log(`  - ${blogPostsData.length} blog posts`);
    console.log(`  - ${skillsData.length} skills`);

    await mongoose.disconnect();
    console.log('Done. Disconnected from MongoDB.');
    process.exit(0);
  } catch (error) {
    console.error('Seed failed:', error);
    process.exit(1);
  }
}

seed();
