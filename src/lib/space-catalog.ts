import { createCatalog } from '@json-render/core';
import { z } from 'zod';

export const spaceCatalog = createCatalog({
  name: 'space-mission',
  components: {
    // Layout Components
    MissionCard: {
      props: z.object({
        title: z.string().nullable().optional(),
        subtitle: z.string().nullable().optional(),
        variant: z.enum(['default', 'dark', 'highlight']).nullable().optional(),
      }),
      hasChildren: true,
      description: 'Container card with space theme styling',
    },

    Stack: {
      props: z.object({
        direction: z.enum(['horizontal', 'vertical']).nullable().optional(),
        gap: z.enum(['sm', 'md', 'lg', 'xl']).nullable().optional(),
        align: z.enum(['start', 'center', 'end', 'stretch']).nullable().optional(),
        justify: z.enum(['start', 'center', 'end', 'between']).nullable().optional(),
      }),
      hasChildren: true,
      description: 'Flex layout container',
    },

    Grid: {
      props: z.object({
        columns: z.number().min(1).max(4).nullable().optional(),
        gap: z.enum(['sm', 'md', 'lg']).nullable().optional(),
      }),
      hasChildren: true,
      description: 'Grid layout with responsive columns',
    },

    // Space-Themed Data Display
    MissionStat: {
      props: z.object({
        value: z.string(),
        label: z.string(),
        unit: z.string().nullable().optional(),
        size: z.enum(['sm', 'md', 'lg']).nullable().optional(),
      }),
      description: 'Display a mission statistic (e.g., "384K", "KM FROM EARTH")',
    },

    Countdown: {
      props: z.object({
        targetDate: z.string(),
        label: z.string().nullable().optional(),
        showDays: z.boolean().nullable().optional(),
        showHours: z.boolean().nullable().optional(),
      }),
      description: 'Launch countdown timer',
    },

    VehicleSpec: {
      props: z.object({
        name: z.string(),
        specs: z.array(
          z.object({
            label: z.string(),
            value: z.string(),
          })
        ),
      }),
      description: 'Vehicle specifications display',
    },

    Timeline: {
      props: z.object({
        items: z.array(
          z.object({
            day: z.string(),
            title: z.string(),
            description: z.string().nullable().optional(),
          })
        ),
      }),
      description: 'Mission timeline with day markers',
    },

    // Typography
    HeroHeading: {
      props: z.object({
        line1: z.string(),
        line2: z.string().nullable().optional(),
        emphasis: z.enum(['line1', 'line2']).nullable().optional(),
      }),
      description: 'Large hero heading with optional two-line layout',
    },

    SectionLabel: {
      props: z.object({
        text: z.string(),
      }),
      description: 'Small uppercase section label (e.g., "THE MISSION")',
    },

    Heading: {
      props: z.object({
        text: z.string(),
        level: z.enum(['h1', 'h2', 'h3', 'h4']).nullable().optional(),
        light: z.boolean().nullable().optional(),
      }),
      description: 'Section heading text',
    },

    Text: {
      props: z.object({
        content: z.string(),
        variant: z.enum(['body', 'lead', 'caption', 'muted']).nullable().optional(),
        maxWidth: z.enum(['sm', 'md', 'lg', 'full']).nullable().optional(),
      }),
      description: 'Paragraph text',
    },

    // Interactive
    SpaceButton: {
      props: z.object({
        label: z.string(),
        variant: z.enum(['primary', 'secondary', 'outline']).nullable().optional(),
        size: z.enum(['sm', 'md', 'lg']).nullable().optional(),
        action: z.string().nullable().optional(),
      }),
      description: 'Space-themed action button',
    },

    // Visual Elements
    Starfield: {
      props: z.object({
        density: z.enum(['sparse', 'medium', 'dense']).nullable().optional(),
        height: z.enum(['sm', 'md', 'lg', 'full']).nullable().optional(),
      }),
      hasChildren: true,
      description: 'Animated starfield background container',
    },

    Moon: {
      props: z.object({
        size: z.enum(['sm', 'md', 'lg']).nullable().optional(),
        position: z.enum(['top-right', 'center', 'background']).nullable().optional(),
        glow: z.boolean().nullable().optional(),
      }),
      description: 'Moon visual element',
    },

    Divider: {
      props: z.object({
        variant: z.enum(['line', 'glow', 'fade']).nullable().optional(),
      }),
      description: 'Visual separator',
    },

    // Pricing/CTA
    PricingCard: {
      props: z.object({
        price: z.string(),
        currency: z.string().nullable().optional(),
        period: z.string().nullable().optional(),
        features: z.array(z.string()),
        ctaLabel: z.string().nullable().optional(),
        ctaAction: z.string().nullable().optional(),
      }),
      description: 'Pricing display with features list',
    },

    FeatureList: {
      props: z.object({
        items: z.array(
          z.object({
            text: z.string(),
            included: z.boolean().nullable().optional(),
          })
        ),
      }),
      description: 'List of features with checkmarks',
    },
  },

  actions: {
    reserve_seat: { description: 'Open seat reservation flow' },
    watch_film: { description: 'Play mission video' },
    apply_now: { description: 'Open application form' },
    learn_more: { description: 'Navigate to details section' },
  },
});

export const spaceComponentList = Object.keys(spaceCatalog.components);
