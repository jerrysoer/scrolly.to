export interface FileNode {
  name: string;
  type: "dir" | "file" | "symlink";
  children?: FileNode[];
  highlight?: boolean;
  label?: string;
}

export const worktreeRepoTree: FileNode = {
  name: "projects/",
  type: "dir",
  children: [
    {
      name: "myproject/",
      type: "dir",
      highlight: true,
      label: "main branch",
      children: [
        {
          name: ".git/",
          type: "dir",
          label: "Shared git database",
          highlight: true,
          children: [
            { name: "objects/", type: "dir" },
            { name: "refs/", type: "dir" },
            { name: "HEAD", type: "file" },
            {
              name: "worktrees/",
              type: "dir",
              highlight: true,
              children: [
                { name: "hotfix/", type: "dir" },
                { name: "experiment/", type: "dir" },
              ],
            },
          ],
        },
        {
          name: "src/",
          type: "dir",
          children: [{ name: "index.ts", type: "file" }],
        },
      ],
    },
    {
      name: "hotfix/",
      type: "dir",
      highlight: true,
      label: "hotfix branch",
      children: [
        {
          name: ".git",
          type: "symlink",
          label: "Points to myproject/.git/worktrees/hotfix",
        },
        {
          name: "src/",
          type: "dir",
          children: [{ name: "index.ts", type: "file" }],
        },
      ],
    },
    {
      name: "experiment/",
      type: "dir",
      highlight: true,
      label: "experiment branch",
      children: [
        {
          name: ".git",
          type: "symlink",
          label: "Points to myproject/.git/worktrees/experiment",
        },
        {
          name: "src/",
          type: "dir",
          children: [{ name: "index.ts", type: "file" }],
        },
      ],
    },
  ],
};

export const scrollSteps = [
  {
    title: "A normal git repository",
    text: "Every git repo has a .git/ directory \u2014 the database that stores all commits, branches, and history. Your working directory is just one view into that database.",
    highlightPaths: [".git/"],
  },
  {
    title: "One repo, one branch at a time",
    text: "Normally, you can only have one branch checked out. Want to switch? You stash, commit, or lose your work-in-progress. It\u2019s like having only one window into a building.",
    highlightPaths: ["HEAD"],
  },
  {
    title: "Worktrees: multiple windows",
    text: "A worktree creates a new working directory that shares the same .git database. Each worktree checks out a different branch \u2014 but they all share the same commits, refs, and history.",
    highlightPaths: ["hotfix/", "experiment/"],
  },
  {
    title: "The .git file (not directory)",
    text: "In a worktree, .git is a file \u2014 not a directory. It contains a single line pointing back to the main repo\u2019s .git/worktrees/ folder. This is how git knows they\u2019re linked.",
    highlightPaths: [".git"],
  },
  {
    title: "Shared objects, separate state",
    text: "All worktrees share git objects (commits, blobs, trees) and refs. But each has its own HEAD, index (staging area), and working tree. You can stage and commit independently in each.",
    highlightPaths: ["objects/", "worktrees/"],
  },
];

export interface Command {
  name: string;
  syntax: string;
  description: string;
  flags: { flag: string; description: string }[];
  examples: { command: string; explanation: string }[];
}

export const commands: Command[] = [
  {
    name: "git worktree add",
    syntax: "git worktree add <path> [<branch>]",
    description: "Create a new worktree at <path> checking out <branch>",
    flags: [
      { flag: "-b <new-branch>", description: "Create a new branch and check it out" },
      { flag: "--detach", description: "Detach HEAD in the new worktree" },
      { flag: "--lock", description: "Lock the worktree after creation" },
    ],
    examples: [
      { command: "git worktree add ../hotfix main", explanation: "Check out main branch in ../hotfix directory" },
      { command: "git worktree add -b feature/auth ../auth main", explanation: "Create new branch from main in ../auth" },
    ],
  },
  {
    name: "git worktree list",
    syntax: "git worktree list",
    description: "List all worktrees and their checked-out branches",
    flags: [{ flag: "--porcelain", description: "Machine-readable output format" }],
    examples: [{ command: "git worktree list", explanation: "Show all linked worktrees" }],
  },
  {
    name: "git worktree remove",
    syntax: "git worktree remove <worktree>",
    description: "Remove a worktree and its administrative files",
    flags: [{ flag: "--force", description: "Remove even with uncommitted changes" }],
    examples: [{ command: "git worktree remove ../hotfix", explanation: "Clean up the hotfix worktree" }],
  },
  {
    name: "git worktree prune",
    syntax: "git worktree prune",
    description: "Clean up stale worktree references",
    flags: [
      { flag: "--dry-run", description: "Show what would be pruned" },
      { flag: "--verbose", description: "Report pruned worktrees" },
    ],
    examples: [{ command: "git worktree prune --dry-run", explanation: "Preview which references would be cleaned" }],
  },
  {
    name: "git worktree lock",
    syntax: "git worktree lock <worktree>",
    description: "Prevent a worktree from being pruned",
    flags: [{ flag: "--reason <string>", description: "Add a reason for the lock" }],
    examples: [
      { command: "git worktree lock ../experiment --reason 'long-running test'", explanation: "Lock with a reason note" },
    ],
  },
];

export interface Strategy {
  name: string;
  description: string;
  diskUsage: string;
  setupTime: string;
  sharedHistory: boolean;
  branchRestriction: string;
  bestFor: string;
  pros: string[];
  cons: string[];
}

export const strategies: Strategy[] = [
  {
    name: "Git Worktree",
    description: "Additional working directories linked to the same repository",
    diskUsage: "~1x (shared .git objects)",
    setupTime: "< 1 second",
    sharedHistory: true,
    branchRestriction: "Each branch can only be checked out in one worktree",
    bestFor: "Parallel branch work with minimal overhead",
    pros: ["Instant setup", "Shared git objects (saves disk)", "Shared stash and refs", "No network needed"],
    cons: ["Can't check out same branch twice", "Must manage multiple directories", "Less isolation than clones"],
  },
  {
    name: "Git Clone",
    description: "Full copy of the entire repository",
    diskUsage: "~2x+ (full duplicate)",
    setupTime: "Seconds to minutes (network)",
    sharedHistory: false,
    branchRestriction: "None \u2014 fully independent",
    bestFor: "Complete isolation, CI/CD, or different remotes",
    pros: ["Full isolation", "Any branch anywhere", "Independent config", "Can point to different remotes"],
    cons: ["Doubles disk usage", "Requires network for initial clone", "No shared stash/refs", "Must push/pull to sync"],
  },
  {
    name: "Git Stash",
    description: "Temporarily shelve changes to switch branches in-place",
    diskUsage: "None (same directory)",
    setupTime: "Instant",
    sharedHistory: true,
    branchRestriction: "One branch at a time",
    bestFor: "Quick context switches when you'll return soon",
    pros: ["No extra directories", "Fast", "Simple mental model", "Built into normal workflow"],
    cons: [
      "Only one branch at a time",
      "Stash conflicts possible",
      "Easy to forget stashed changes",
      "Breaks flow / context switching cost",
    ],
  },
];

export interface Workflow {
  id: string;
  title: string;
  scenario: string;
  steps: string[];
  commands: string[];
  icon: string;
}

export const workflows: Workflow[] = [
  {
    id: "hotfix",
    title: "Hotfix While Developing",
    scenario: "You're mid-feature when a critical bug is reported in production.",
    steps: [
      "Create a worktree from main for the hotfix",
      "Fix the bug in the worktree, commit and push",
      "Create a PR from the hotfix branch",
      "Return to your feature branch \u2014 no stash, no lost context",
      "Clean up the worktree after merge",
    ],
    commands: [
      "git worktree add ../hotfix -b hotfix/critical-bug main",
      "cd ../hotfix && git commit -am 'fix: resolve critical bug'",
      "git push -u origin hotfix/critical-bug",
      "cd ../myproject  # back to feature work",
      "git worktree remove ../hotfix",
    ],
    icon: "Siren",
  },
  {
    id: "pr-review",
    title: "Review PRs Locally",
    scenario: "A teammate's PR needs testing but you don't want to lose your place.",
    steps: [
      "Fetch the remote branch",
      "Create a worktree for the PR branch",
      "Run the app, test the changes",
      "Leave review comments",
      "Remove the worktree when done",
    ],
    commands: [
      "git fetch origin feature/new-auth",
      "git worktree add ../review-auth origin/feature/new-auth",
      "cd ../review-auth && npm install && npm run dev",
      "# Test and review...",
      "git worktree remove ../review-auth",
    ],
    icon: "GitPullRequest",
  },
  {
    id: "parallel-test",
    title: "Run Tests on Two Branches",
    scenario: "Compare test results between your feature branch and main.",
    steps: [
      "Create a worktree with main checked out",
      "Run tests in both directories simultaneously",
      "Compare results side by side",
      "Clean up when done",
    ],
    commands: [
      "git worktree add ../main-tests main",
      "npm test & (cd ../main-tests && npm test)",
      "# Compare outputs",
      "git worktree remove ../main-tests",
    ],
    icon: "FlaskConical",
  },
  {
    id: "experiment",
    title: "Long-Running Experiment",
    scenario: "You want to try a risky refactor without polluting your main work.",
    steps: [
      "Create a worktree with a new experiment branch",
      "Lock it so it won't be pruned accidentally",
      "Work on it whenever you have time",
      "Merge or discard when the experiment concludes",
    ],
    commands: [
      "git worktree add -b experiment/new-arch ../experiment main",
      "git worktree lock ../experiment --reason 'architecture experiment'",
      "# Work on it over days/weeks...",
      "git worktree remove ../experiment",
    ],
    icon: "Beaker",
  },
];

export const faqs = [
  {
    q: "What is a git worktree?",
    a: "A git worktree is an additional working directory linked to an existing git repository. It lets you check out a different branch in a separate folder while sharing the same .git database \u2014 no clone needed.",
  },
  {
    q: "How do git worktrees differ from git clone?",
    a: "Worktrees share the same .git object database as the original repo, so they take nearly zero extra disk space. Clones duplicate everything. Worktrees are instant; clones require network access and time.",
  },
  {
    q: "Can I check out the same branch in two worktrees?",
    a: "No. Git prevents checking out the same branch in more than one worktree. Create a new branch based on the target to work around this.",
  },
  {
    q: "How do I remove a git worktree?",
    a: "Run 'git worktree remove <path>' from the main repository. Add --force if there are uncommitted changes. Then run 'git worktree prune' to clean stale references.",
  },
  {
    q: "What git version introduced worktrees?",
    a: "Git worktrees were introduced in Git 2.5 (July 2015) and have been stable since. Check your version with 'git --version'.",
  },
];
