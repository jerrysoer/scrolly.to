export interface ProductionStat {
  label: string;
  value: string;
  subtext: string;
}

export const productionStats: ProductionStat[] = [
  { label: "Daily Active Users", value: "Hundreds of Millions", subtext: "via Doubao, ByteDance's AI assistant" },
  { label: "Production Uptime", value: "99.9%+", subtext: "Enterprise-grade reliability" },
  { label: "API Availability", value: "Global", subtext: "Volcengine cloud platform" },
];

export interface PipelineStep {
  id: string;
  label: string;
  description: string;
}

export const pipelineSteps: PipelineStep[] = [
  { id: "query", label: "User Query", description: "Natural language input from Doubao users" },
  { id: "routing", label: "Model Routing", description: "Intelligent tier selection (Pro/Lite/Mini)" },
  { id: "inference", label: "Seed2.0 Inference", description: "Model processes with optimized serving" },
  { id: "safety", label: "Safety & Filtering", description: "Content safety and quality checks" },
  { id: "response", label: "Response", description: "Delivered to hundreds of millions of users" },
];

export interface LabVsProductionRow {
  dimension: string;
  lab: string;
  production: string;
}

export const labVsProduction: LabVsProductionRow[] = [
  { dimension: "Latency", lab: "Benchmark-optimized", production: "Real-time SLA targets" },
  { dimension: "Throughput", lab: "Single request", production: "Millions of concurrent requests" },
  { dimension: "Failure Handling", lab: "Clean retry", production: "Graceful degradation + fallback" },
  { dimension: "Input Quality", lab: "Curated test sets", production: "Noisy, multilingual, multimodal" },
  { dimension: "Evaluation", lab: "Automated metrics", production: "User satisfaction + engagement" },
];
