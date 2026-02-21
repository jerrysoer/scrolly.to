export const SKILL_CATEGORIES = [
  {
    name: 'Engineering',
    color: 'var(--accent-indigo)',
    skills: ['code-reviewer', 'debugger', 'backend-architect', 'frontend-developer', 'web-dev'],
  },
  {
    name: 'Design',
    color: 'var(--accent-violet)',
    skills: ['ui-designer', 'mobile-ux-optimizer', 'brand-guardian'],
  },
  {
    name: 'Product',
    color: 'var(--accent-cyan)',
    skills: ['prd-specialist', 'ux-researcher', 'project-shipper'],
  },
  {
    name: 'Content',
    color: 'var(--accent-emerald)',
    skills: ['executive-summary', 'decision-doc', 'stakeholder-update'],
  },
  {
    name: 'Specialized',
    color: 'var(--accent-amber)',
    skills: ['scrolly', 'frontend-slides', 'playwright-cli'],
  },
] as const;

export const FRONTMATTER_FIELDS = [
  {
    field: 'name',
    required: true,
    description: 'Unique identifier — lowercase, hyphens, used as the /slash-command',
    example: 'code-reviewer',
  },
  {
    field: 'description',
    required: true,
    description: 'What the skill does — shown in skill discovery and matching',
    example: 'Expert code review specialist. Proactively reviews code for quality, security, and maintainability.',
  },
  {
    field: 'allowed-tools',
    required: false,
    description: 'Comma-separated list of tools this skill can access — security boundary',
    example: 'Read, Grep, Glob, Bash',
  },
] as const;

export const EXAMPLE_SKILLS = [
  {
    name: 'code-reviewer',
    category: 'Engineering',
    lines: 29,
    tools: ['Read', 'Grep', 'Glob', 'Bash'],
    purpose: 'Reviews code for quality, security, naming, duplication, error handling, and performance',
    complexity: 'simple',
  },
  {
    name: 'scrolly',
    category: 'Specialized',
    lines: 1255,
    tools: ['Write', 'Read', 'Edit', 'Bash', 'Grep', 'Glob', 'WebSearch', 'WebFetch'],
    purpose: 'Generates entire interactive explainer apps with Next.js, Tailwind, charts, and SEO',
    complexity: 'complex',
  },
  {
    name: 'debugger',
    category: 'Engineering',
    lines: 30,
    tools: ['Read', 'Grep', 'Glob', 'Bash', 'Write', 'Edit'],
    purpose: 'Systematic debugging: reproduce → isolate → identify root cause → fix → prevent',
    complexity: 'simple',
  },
  {
    name: 'prd-specialist',
    category: 'Product',
    lines: 63,
    tools: ['Write', 'Read', 'Edit', 'WebSearch', 'WebFetch'],
    purpose: 'Creates comprehensive PRDs with strategic foundation, requirements architecture, and implementation blueprint',
    complexity: 'medium',
  },
  {
    name: 'decision-doc',
    category: 'Content',
    lines: 125,
    tools: ['Write', 'Read', 'Edit'],
    purpose: 'Structures decisions with context, options A/B/C, recommendation, and open questions',
    complexity: 'medium',
  },
] as const;

export const INVOCATION_STEPS = [
  {
    step: 1,
    label: 'User types command',
    detail: 'You type /code-reviewer in the Claude Code CLI',
    icon: 'terminal',
    duration: 'instant',
  },
  {
    step: 2,
    label: 'Skill tool match',
    detail: 'Claude matches the command to a registered skill name from the skills directory',
    icon: 'search',
    duration: '~10ms',
  },
  {
    step: 3,
    label: 'SKILL.md loaded',
    detail: 'The full SKILL.md file is read — frontmatter parsed, markdown body extracted as prompt',
    icon: 'file',
    duration: '~5ms',
  },
  {
    step: 4,
    label: 'Prompt expansion',
    detail: 'The markdown body becomes the system prompt — user arguments are appended as context',
    icon: 'expand',
    duration: '~1ms',
  },
  {
    step: 5,
    label: 'Tool restrictions applied',
    detail: 'allowed-tools from frontmatter creates a sandbox — only listed tools are available',
    icon: 'shield',
    duration: '~1ms',
  },
  {
    step: 6,
    label: 'Agent executes',
    detail: 'Claude runs with the expanded prompt, restricted tools, and full conversation context',
    icon: 'play',
    duration: 'varies',
  },
] as const;

export const TOOL_ICONS: Record<string, string> = {
  Read: '📖',
  Write: '✍️',
  Edit: '✏️',
  Bash: '💻',
  Grep: '🔍',
  Glob: '📂',
  WebSearch: '🌐',
  WebFetch: '🌐',
  Task: '🔀',
};

export const FAQS = [
  {
    q: 'What are Claude Code skills?',
    a: 'Claude Code skills are custom slash commands that extend the Claude CLI with specialized behaviors. Each skill is a SKILL.md file containing YAML frontmatter (name, description, allowed tools) and a markdown prompt template that tells Claude exactly how to handle a particular type of task.',
  },
  {
    q: 'How do I create a custom Claude Code skill?',
    a: "Create a directory under ~/.claude/skills/ with your skill name, then add a SKILL.md file inside it. The file needs YAML frontmatter with name, description, and optionally allowed-tools fields, followed by a markdown prompt template that defines the skill's behavior, expertise, and output format.",
  },
  {
    q: 'What is the SKILL.md file format?',
    a: "SKILL.md files have two parts: YAML frontmatter (delimited by ---) containing name, description, and allowed-tools fields, and a markdown body that serves as the prompt template. The body can include sections for purpose, methodology, examples, output format, and tone guidelines.",
  },
  {
    q: 'Where are Claude Code skills stored?',
    a: 'Skills are stored as SKILL.md files inside named directories under ~/.claude/skills/. For example, a code review skill would be at ~/.claude/skills/code-reviewer/SKILL.md. Claude Code discovers them by scanning this directory on startup.',
  },
  {
    q: 'Can I restrict which tools a skill can access?',
    a: 'Yes. The allowed-tools field in the YAML frontmatter lets you specify exactly which Claude Code tools the skill can use, like Read, Write, Bash, Grep, or Glob. This provides a security boundary — a read-only skill cannot accidentally modify files.',
  },
  {
    q: 'Where can I learn more about building skills?',
    a: 'Anthropic published a comprehensive 32-page guide covering skill architecture, progressive disclosure, best practices, and advanced patterns.',
    link: {
      label: 'The Complete Guide to Building Skills for Claude (PDF)',
      url: 'https://resources.anthropic.com/hubfs/The-Complete-Guide-to-Building-Skill-for-Claude.pdf?hsLang=en',
    },
  },
];
