export interface Section {
  id: string;
  label: string;
  title: string;
}

export interface TimelineEvent {
  date: string;
  name: string;
  description: string;
  color: string;
}

export interface SecurityIssue {
  id: string;
  severity: "critical" | "high" | "medium";
  title: string;
  description: string;
  cve?: string;
  cvss?: number;
}

export interface Skill {
  name: string;
  description: string;
  category: string;
  icon: string;
}

export interface ChannelAdapter {
  name: string;
  library: string;
  icon: string;
  color: string;
}
