'use client';

import React, { useState, useCallback } from 'react';
import {
  DataProvider,
  ActionProvider,
  VisibilityProvider,
  useUIStream,
  Renderer,
} from '@json-render/react';
import { spaceComponentRegistry } from './json-render';
import type { UITree } from '@json-render/core';

// Pre-generated demo tree for static showcase
const DEMO_TREE: UITree = {
  root: 'hero-section',
  elements: {
    'hero-section': {
      key: 'hero-section',
      type: 'Starfield',
      props: { density: 'dense', height: 'lg' },
      children: ['hero-content'],
    },
    'hero-content': {
      key: 'hero-content',
      type: 'Stack',
      props: { direction: 'vertical', gap: 'lg', align: 'start' },
      children: ['section-label', 'hero-heading', 'hero-text', 'cta-buttons', 'stats-divider', 'stats-grid'],
    },
    'section-label': {
      key: 'section-label',
      type: 'SectionLabel',
      props: { text: 'INTRODUCING' },
    },
    'hero-heading': {
      key: 'hero-heading',
      type: 'HeroHeading',
      props: { line1: 'LUNAR', line2: 'VOYAGER', emphasis: 'line2' },
    },
    'hero-text': {
      key: 'hero-text',
      type: 'Text',
      props: {
        content: 'The first civilian mission around the Moon. Experience the journey of a lifetime aboard Starship.',
        variant: 'lead',
        maxWidth: 'md',
      },
    },
    'cta-buttons': {
      key: 'cta-buttons',
      type: 'Stack',
      props: { direction: 'horizontal', gap: 'md' },
      children: ['reserve-btn', 'watch-btn'],
    },
    'reserve-btn': {
      key: 'reserve-btn',
      type: 'SpaceButton',
      props: { label: 'RESERVE YOUR SEAT', variant: 'primary', action: 'reserve_seat' },
    },
    'watch-btn': {
      key: 'watch-btn',
      type: 'SpaceButton',
      props: { label: 'WATCH FILM', variant: 'outline', action: 'watch_film' },
    },
    'stats-divider': {
      key: 'stats-divider',
      type: 'Divider',
      props: { variant: 'glow' },
    },
    'stats-grid': {
      key: 'stats-grid',
      type: 'Grid',
      props: { columns: 4, gap: 'md' },
      children: ['stat-1', 'stat-2', 'stat-3', 'stat-4'],
    },
    'stat-1': {
      key: 'stat-1',
      type: 'MissionStat',
      props: { value: '6', label: 'DAY MISSION' },
    },
    'stat-2': {
      key: 'stat-2',
      type: 'MissionStat',
      props: { value: '384K', label: 'KM FROM EARTH' },
    },
    'stat-3': {
      key: 'stat-3',
      type: 'MissionStat',
      props: { value: '12', label: 'PASSENGERS' },
    },
    'stat-4': {
      key: 'stat-4',
      type: 'MissionStat',
      props: { value: '2026', label: 'LAUNCH YEAR' },
    },
  },
};

const MISSION_DATA = {
  mission: {
    name: 'Lunar Voyager',
    duration: 6,
    distance: 384000,
    passengers: 12,
    launchYear: 2026,
  },
  vehicle: {
    name: 'Starship',
    height: '120m',
    payloadLEO: '100+ t',
    cabinVolume: '1000m³',
  },
  pricing: {
    startingPrice: '$55M',
    currency: 'USD',
  },
};

const ACTION_HANDLERS = {
  reserve_seat: () => alert('Opening reservation form...'),
  watch_film: () => alert('Playing mission video...'),
  apply_now: () => alert('Opening application...'),
  learn_more: () => console.log('Scrolling to details...'),
};

interface JSONShowcaseProps {
  mode?: 'demo' | 'live';
  initialPrompt?: string;
}

export function JSONShowcase({ mode = 'demo', initialPrompt }: JSONShowcaseProps) {
  const [currentMode, setCurrentMode] = useState<'demo' | 'live'>(mode);
  const [prompt, setPrompt] = useState(initialPrompt || '');

  const { tree, isStreaming, error, send, clear } = useUIStream({
    api: '/api/generate-ui',
    onError: (err) => console.error('Generation error:', err),
  });

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!prompt.trim()) return;
      await send(prompt);
    },
    [prompt, send]
  );

  const displayTree = currentMode === 'demo' ? DEMO_TREE : tree;
  const hasElements = displayTree && Object.keys(displayTree.elements).length > 0;

  return (
    <div className="mt-3 rounded-2xl overflow-hidden border border-gray-200 bg-black shadow-sm">
      {/* Mode Toggle & Input */}
      <div className="bg-zinc-900 border-b border-white/10 p-3">
        <div className="flex items-center gap-2 mb-2">
          <button
            onClick={() => setCurrentMode('demo')}
            className={`px-3 py-1 text-xs rounded-full transition ${
              currentMode === 'demo'
                ? 'bg-white text-black'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Demo
          </button>
          <button
            onClick={() => setCurrentMode('live')}
            className={`px-3 py-1 text-xs rounded-full transition ${
              currentMode === 'live'
                ? 'bg-white text-black'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Live AI
          </button>
          {currentMode === 'live' && tree && Object.keys(tree.elements).length > 0 && (
            <button
              onClick={clear}
              className="ml-auto px-3 py-1 text-xs text-gray-400 hover:text-white transition"
            >
              Clear
            </button>
          )}
        </div>

        {currentMode === 'live' && (
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe any UI... (e.g., 'Create a pricing page' or 'Build a dashboard with stats')"
              disabled={isStreaming}
              className="flex-1 bg-zinc-800 border border-white/10 rounded px-3 py-2 text-sm text-white placeholder-gray-500 outline-none focus:border-white/30"
            />
            <button
              type="submit"
              disabled={isStreaming || !prompt.trim()}
              className="px-4 py-2 bg-white text-black text-sm font-medium rounded disabled:opacity-50 hover:bg-gray-100 transition"
            >
              {isStreaming ? 'Generating...' : 'Generate'}
            </button>
          </form>
        )}
      </div>

      {/* Render Area */}
      <div className="w-full h-[680px] sm:h-[830px] md:h-[980px] landscape:h-[530px] overflow-auto">
        {error && (
          <div className="p-4 text-red-400 text-sm bg-red-900/20 border-b border-red-900/30">
            Error: {error.message}
          </div>
        )}

        <DataProvider initialData={MISSION_DATA}>
          <VisibilityProvider>
            <ActionProvider handlers={ACTION_HANDLERS}>
              {hasElements ? (
                <div className={isStreaming ? 'opacity-80' : ''}>
                  <Renderer
                    tree={displayTree!}
                    registry={spaceComponentRegistry}
                  />
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-gray-500 p-8">
                  {currentMode === 'live' ? (
                    <>
                      <div className="text-lg mb-2">Enter a prompt to generate UI</div>
                      <div className="text-sm text-gray-600">
                        Try: "Create a pricing page" or "Build a timeline for a project"
                      </div>
                    </>
                  ) : (
                    <div className="text-lg">Loading demo...</div>
                  )}
                </div>
              )}
            </ActionProvider>
          </VisibilityProvider>
        </DataProvider>
      </div>

      {/* Footer */}
      <div className="bg-gray-50 p-3 text-sm hover:bg-gray-100 transition cursor-pointer border-t border-gray-200">
        <div className="text-gray-500 text-xs truncate">json-render.dev</div>
        <div className="text-black font-normal line-clamp-1">
          {currentMode === 'demo'
            ? 'SpaceX Lunar Voyager — AI-Generated Preview'
            : isStreaming
            ? 'Generating UI...'
            : 'Live AI Generation — Build Any UI'}
        </div>
        <div className="text-gray-500 text-xs line-clamp-2">
          Powered by json-render. Guardrailed AI UI generation.
        </div>
      </div>
    </div>
  );
}
