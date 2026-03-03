import { defineCollection, z, reference } from 'astro:content';
import { glob } from 'astro/loaders';

const coaches = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/coaches' }),
  schema: z.object({
    name: z.string(),
    photo: z.string().optional(),
    location: z.object({
      city: z.string(),
      country: z.string(),
    }),
    instagram: z.string().optional(),
    youtube: z.string().url().optional(),
    website: z.string().url().optional(),
    featured: z.boolean().default(false),
  }),
});

const retreats = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/retreats' }),
  schema: z.object({
    title: z.string(),
    status: z.enum(['upcoming', 'past']),
    coaches: z.array(z.string()),
    location: z.object({
      city: z.string(),
      country: z.string(),
      venue: z.string().optional(),
    }),
    dateStart: z.coerce.date(),
    dateEnd: z.coerce.date(),
    level: z.array(z.enum(['beginner', 'intermediate', 'advanced'])),
    type: z.enum(['retreat', 'intensive', 'workshop', 'seminar', 'tour']),
    registrationUrl: z.string().url().optional(),
    venueUrl: z.string().url().optional(),
    heroImage: z.string().optional(),
    gallery: z.array(z.string()).default([]),
    videos: z.array(z.string()).default([]),
    description: z.string().optional(),
    highlightQuote: z.string().optional(),
  }),
});

export const collections = { coaches, retreats };
