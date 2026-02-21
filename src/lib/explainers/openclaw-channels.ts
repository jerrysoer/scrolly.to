import type { ChannelAdapter, Skill } from "./openclaw-types";

export const channelAdapters: ChannelAdapter[] = [
  { name: "WhatsApp", library: "Baileys", icon: "MessageCircle", color: "#25D366" },
  { name: "Telegram", library: "grammY", icon: "Send", color: "#26A5E4" },
  { name: "Slack", library: "Bolt", icon: "Hash", color: "#4A154B" },
  { name: "Discord", library: "discord.js", icon: "Gamepad2", color: "#5865F2" },
  { name: "Signal", library: "signal-client", icon: "Shield", color: "#3A76F0" },
  { name: "iMessage", library: "applescript bridge", icon: "Smartphone", color: "#34C759" },
  { name: "Matrix", library: "matrix-js-sdk", icon: "Globe", color: "#0DBD8B" },
  { name: "Teams", library: "Bot Framework", icon: "Users", color: "#6264A7" },
];

export const sampleSkills: Skill[] = [
  { name: "bluesky-post", description: "Post to Bluesky with threading", category: "Social", icon: "Share2" },
  { name: "email-summarizer", description: "Summarize unread Gmail inbox", category: "Productivity", icon: "Mail" },
  { name: "smart-home", description: "Control lights, locks, thermostat", category: "IoT", icon: "Home" },
  { name: "calendar-manager", description: "Schedule, reschedule, and decline meetings", category: "Productivity", icon: "Calendar" },
  { name: "code-reviewer", description: "Review GitHub PRs and post comments", category: "Dev", icon: "GitBranch" },
  { name: "finance-tracker", description: "Track expenses and bank balance", category: "Finance", icon: "DollarSign" },
  { name: "web-scraper", description: "Extract data from any URL", category: "Data", icon: "Globe" },
  { name: "cron-runner", description: "Schedule recurring background tasks", category: "System", icon: "Clock" },
];

export const clawHubStats = {
  totalSkills: 5705,
  categories: 42,
  contributors: 1830,
  downloadsPerDay: 12400,
};
