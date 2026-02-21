import { MetadataRoute } from 'next';
import { getBySection } from '@/lib/explainers/registry';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://scrolly.to';
  const now = new Date();

  const staticPages = [
    { url: base, lastModified: now, changeFrequency: 'weekly' as const, priority: 1.0 },
    { url: `${base}/learn`, lastModified: now, changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${base}/explore`, lastModified: now, changeFrequency: 'weekly' as const, priority: 0.9 },
  ];

  const learnPages = getBySection('learn').map(e => ({
    url: `${base}/learn/${e.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const explorePages = getBySection('explore').map(e => ({
    url: `${base}/explore/${e.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [...staticPages, ...learnPages, ...explorePages];
}
