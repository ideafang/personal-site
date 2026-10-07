import { getCollection } from 'astro:content';

// Keep the listing and generated article routes on the same publication policy.
export async function getWritingEntries() {
  const entries = await getCollection('writing', ({ data }) =>
    import.meta.env.DEV || !data.draft,
  );
  return entries.sort((a, b) => b.data.date.getTime() - a.data.date.getTime() || a.id.localeCompare(b.id));
}

export function formatDate(date: Date) {
  return date.toISOString().slice(0, 10);
}
