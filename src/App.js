import React, { useState } from 'react';
import './App.css';
import heic2any from 'heic2any';

// API Configuration
const OPENAI_API_KEY = process.env.REACT_APP_OPENAI_API_KEY;

// Custom SVG Icons
const Icons = {
  home: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
      <polyline points="9,22 9,12 15,12 15,22"/>
    </svg>
  ),
  explore: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="8"/>
      <path d="m21 21-4.35-4.35"/>
    </svg>
  ),
  create: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 2L2 7l10 5 10-5-10-5z"/>
      <path d="M2 17l10 5 10-5"/>
      <path d="M2 12l10 5 10-5"/>
    </svg>
  ),
  universes: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="3"/>
      <path d="M12 1v6m0 6v6"/>
      <path d="M1 12h6m6 0h6"/>
    </svg>
  ),
  styles: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    </svg>
  ),
  gallery: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
      <circle cx="8.5" cy="8.5" r="1.5"/>
      <polyline points="21,15 16,10 5,21"/>
    </svg>
  ),
  celebrity: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  ),
  wand: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M15 4V2a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1z"/>
      <path d="M10 20V10a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1z"/>
      <path d="M5 14V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1z"/>
    </svg>
  ),
  universe: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10"/>
      <path d="M2 12s2-3 10-3 10 3 10 3-2 3-10 3-10-3-10-3z"/>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>
  ),
  style: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    </svg>
  ),
  camera: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
      <circle cx="12" cy="13" r="4"/>
    </svg>
  ),
  download: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
      <polyline points="7,10 12,15 17,10"/>
      <line x1="12" y1="15" x2="12" y2="3"/>
    </svg>
  ),
  share: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="18" cy="5" r="3"/>
      <circle cx="6" cy="12" r="3"/>
      <circle cx="18" cy="19" r="3"/>
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
    </svg>
  ),
  regenerate: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="23,4 23,10 17,10"/>
      <polyline points="1,20 1,14 7,14"/>
      <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"/>
    </svg>
  ),
  save: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
      <polyline points="17,21 17,13 7,13 7,21"/>
      <polyline points="7,3 7,8 15,8"/>
    </svg>
  ),
  back: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M19 12H5"/>
      <path d="M12 19l-7-7 7-7"/>
    </svg>
  ),
  folder: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"/>
    </svg>
  ),
  plus: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="12" y1="5" x2="12" y2="19"/>
      <line x1="5" y1="12" x2="19" y2="12"/>
    </svg>
  ),
  arrow: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="m9 18 6-6-6-6"/>
    </svg>
  ),
  help: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10"/>
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
      <path d="M12 17h.01"/>
    </svg>
  ),
  play: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polygon points="5,3 19,12 5,21"/>
    </svg>
  ),
  loading: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 12a9 9 0 11-6.219-8.56"/>
    </svg>
  ),
  generate: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 2L2 7l10 5 10-5-10-5z"/>
      <path d="M2 17l10 5 10-5"/>
      <path d="M2 12l10 5 10-5"/>
    </svg>
  ),
  user: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  ),
  creditCard: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
      <line x1="1" y1="10" x2="23" y2="10"/>
    </svg>
  ),
  logout: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
      <polyline points="16,17 21,12 16,7"/>
      <line x1="21" y1="12" x2="9" y2="12"/>
    </svg>
  ),
  info: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10"/>
      <path d="M12 16v-4"/>
      <path d="M12 8h.01"/>
    </svg>
  ),
  notification: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/>
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>
    </svg>
  ),
  coins: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10"/>
      <path d="M12 2v20"/>
      <path d="M17 2H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
    </svg>
  ),

  trending: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="22,12 18,12 15,21 9,3 6,12 2,12"/>
    </svg>
  ),
  viral: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    </svg>
  ),
  social: {
    chat: () => (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    ),
    twitter: () => (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
      </svg>
    ),
    music: () => (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M9 18V5l12-2v13"/>
        <circle cx="6" cy="18" r="3"/>
        <circle cx="18" cy="16" r="3"/>
      </svg>
    ),
    instagram: () => (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
      </svg>
    )
  },
  // Add missing icons used in tips and other sections
  target: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10"/>
      <circle cx="12" cy="12" r="6"/>
      <circle cx="12" cy="12" r="2"/>
    </svg>
  ),
  shield: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  ),
  zap: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polygon points="13,2 3,14 12,14 11,22 21,10 12,10 13,2"/>
    </svg>
  ),
  building: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="4" y="2" width="16" height="20" rx="2" ry="2"/>
      <rect x="9" y="9" width="1" height="1"/>
      <rect x="14" y="9" width="1" height="1"/>
      <rect x="9" y="14" width="1" height="1"/>
      <rect x="14" y="14" width="1" height="1"/>
      <rect x="9" y="19" width="1" height="1"/>
      <rect x="14" y="19" width="1" height="1"/>
    </svg>
  ),
  sword: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M14.5 17.5L3 6V3h3l11.5 11.5"/>
      <path d="M13 19l6-6"/>
      <path d="M16 16h4v4"/>
    </svg>
  ),
  star: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26 12,2"/>
    </svg>
  ),
  flame: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1.5-2.5L11 5c.5.5 1 1.5 1 2.5s-.5 2-1 2.5L8.5 14.5z"/>
      <path d="M15.5 14.5A2.5 2.5 0 0 1 13 12c0-1.38.5-2 1.5-2.5L13 5c-.5.5-1 1.5-1 2.5s.5 2 1 2.5L15.5 14.5z"/>
    </svg>
  ),
  castle: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M2 22h20"/>
      <path d="M3 22V10a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v12"/>
      <path d="M7 22V16a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v6"/>
      <path d="M9 10h.01"/>
      <path d="M15 10h.01"/>
    </svg>
  ),
  sparkle: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 3l1.09 6.26L22 12l-8.91 2.74L12 21l-1.09-6.26L2 12l8.91-2.74L12 3z"/>
    </svg>
  ),
  book: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
    </svg>
  ),
  ghost: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M9 11a3 3 0 1 0 6 0 3 3 0 0 0-6 0z"/>
      <path d="M8 12h8"/>
      <path d="M12 12v8"/>
      <path d="M16 20s1-1 4-1 4 2 4 2V10a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v10s1-1 4-1 4 2 4 2"/>
    </svg>
  ),
  crown: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14"/>
    </svg>
  ),
  lightsaber: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 2L2 7l10 5 10-5-10-5z"/>
      <path d="M2 17l10 5 10-5"/>
      <path d="M2 12l10 5 10-5"/>
    </svg>
  ),
  planet: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10"/>
      <path d="M2 12s2-3 10-3 10 3 10 3-2 3-10 3-10-3-10-3z"/>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>
  ),
  force: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    </svg>
  ),
  ship: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
    </svg>
  ),
  droid: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="11" width="18" height="10" rx="2" ry="2"/>
      <circle cx="12" cy="16" r="2"/>
      <path d="M8 11V7a4 4 0 0 1 8 0v4"/>
    </svg>
  ),
  helmet: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
      <path d="M12 6v6l4 2"/>
    </svg>
  ),
  family: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
  donut: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10"/>
      <circle cx="12" cy="12" r="6"/>
      <circle cx="12" cy="12" r="2"/>
    </svg>
  ),
  car: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M14 16H9m11 0h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2h-1l-2-4H9l-2 4H6a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h1"/>
      <circle cx="6" cy="16" r="2"/>
      <circle cx="18" cy="16" r="2"/>
    </svg>
  ),
  tv: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="7" width="20" height="15" rx="2" ry="2"/>
      <polyline points="17,2 12,7 7,2"/>
    </svg>
  ),
  pet: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  ),
  work: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
    </svg>
  ),
  ring: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10"/>
      <circle cx="12" cy="12" r="6"/>
      <circle cx="12" cy="12" r="2"/>
    </svg>
  ),
  horse: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M14.5 17.5L3 6V3h3l11.5 11.5"/>
      <path d="M13 19l6-6"/>
      <path d="M16 16h4v4"/>
    </svg>
  ),
  forest: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 2L2 7l10 5 10-5-10-5z"/>
      <path d="M2 17l10 5 10-5"/>
      <path d="M2 12l10 5 10-5"/>
    </svg>
  ),
  dragon: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M14.5 17.5L3 6V3h3l11.5 11.5"/>
      <path d="M13 19l6-6"/>
      <path d="M16 16h4v4"/>
    </svg>
  ),
  throne: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="11" width="18" height="10" rx="2" ry="2"/>
      <circle cx="12" cy="16" r="2"/>
      <path d="M8 11V7a4 4 0 0 1 8 0v4"/>
    </svg>
  ),
  wolf: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 2L2 7l10 5 10-5-10-5z"/>
      <path d="M2 17l10 5 10-5"/>
      <path d="M2 12l10 5 10-5"/>
    </svg>
  ),
  // New icons for tips
  target: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10"/>
      <circle cx="12" cy="12" r="6"/>
      <circle cx="12" cy="12" r="2"/>
    </svg>
  ),
  shield: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  ),
  zap: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polygon points="13,2 3,14 12,14 11,22 21,10 12,10 13,2"/>
    </svg>
  ),
  building: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="4" y="2" width="16" height="20" rx="2" ry="2"/>
      <rect x="9" y="9" width="1" height="1"/>
      <rect x="14" y="9" width="1" height="1"/>
      <rect x="9" y="14" width="1" height="1"/>
      <rect x="14" y="14" width="1" height="1"/>
      <rect x="9" y="19" width="1" height="1"/>
      <rect x="14" y="19" width="1" height="1"/>
    </svg>
  ),
  sword: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M14.5 17.5L3 6V3h3l11.5 11.5"/>
      <path d="M13 19l6-6"/>
      <path d="M16 16h4v4"/>
    </svg>
  ),
  star: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26 12,2"/>
    </svg>
  ),
  flame: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1.5-2.5S8 8.5 8 9c0 1.5 1 2.5 2.5 3.5"/>
      <path d="M12 2c-1.5 0-2.5 1-3 2.5S8 6 8 7c0 1.5 1 2.5 2.5 3.5S12 12 12 13c0 1.5-1 2.5-2.5 3.5S8 18 8 19c0 1.5 1 2.5 2.5 3.5"/>
    </svg>
  ),
  wand: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M15 4V2"/>
      <path d="M15 16v-2"/>
      <path d="M8 9h2"/>
      <path d="M20 9h2"/>
      <path d="M17.8 11.8L19 13"/>
      <path d="M15 15l2 2"/>
      <path d="M3 21l9-9"/>
      <path d="M12.2 6.2L11 5"/>
    </svg>
  ),
  castle: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M2 22l20-20"/>
      <path d="M6 22v-4a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v4"/>
      <path d="M2 22h20"/>
      <path d="M9 22v-4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v4"/>
    </svg>
  ),
  sparkle: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    </svg>
  ),
  book: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
    </svg>
  ),
  ghost: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M9 11a3 3 0 1 0 6 0 3 3 0 0 0-6 0z"/>
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
      <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
    </svg>
  ),
  crown: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14"/>
    </svg>
  ),
  lightsaber: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    </svg>
  ),
  planet: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10"/>
      <path d="M2 12h20"/>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>
  ),
  force: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    </svg>
  ),
  ship: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
    </svg>
  ),
  droid: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="11" width="18" height="10" rx="2" ry="2"/>
      <circle cx="12" cy="5" r="2"/>
      <path d="M8 11V7a4 4 0 0 1 8 0v4"/>
    </svg>
  ),
  helmet: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
      <path d="M12 2v20"/>
      <path d="M2 12h20"/>
    </svg>
  ),
  family: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
  donut: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  ),
  car: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M14 16H9m11 0h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2h-1"/>
      <path d="M3 16h1a2 2 0 0 1 2-2v-3a2 2 0 0 1-2-2H3"/>
      <path d="M7 8h10"/>
      <path d="M7 12h10"/>
    </svg>
  ),
  tv: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="7" width="20" height="15" rx="2" ry="2"/>
      <polyline points="17,2 12,7 7,2"/>
    </svg>
  ),
  pet: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  ),
  work: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
    </svg>
  ),
  ring: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10"/>
      <circle cx="12" cy="12" r="6"/>
      <circle cx="12" cy="12" r="2"/>
    </svg>
  ),
  horse: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 21l9-9"/>
      <path d="M12 12l9 9"/>
      <path d="M12 12l-9 9"/>
      <path d="M21 3l-9 9"/>
    </svg>
  ),
  forest: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    </svg>
  ),
  dragon: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    </svg>
  ),
  throne: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 21l18-18"/>
      <path d="M3 21l9-9"/>
      <path d="M12 12l9 9"/>
    </svg>
  ),
  wolf: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M9 18c-4.97 0-9-2.239-9-5s4.03-5 9-5 9 2.239 9 5-4.03 5-9 5z"/>
      <path d="M10 8c0 1.105-.895 2-2 2s-2-.895-2-2 .895-2 2-2 2 .895 2 2z"/>
      <path d="M18 8c0 1.105-.895 2-2 2s-2-.895-2-2 .895-2 2-2 2 .895 2 2z"/>
    </svg>
  ),
  // Add missing icons
  arrowUp: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="m18 15-6-6-6 6"/>
    </svg>
  ),
  clock: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10"/>
      <polyline points="12,6 12,12 16,14"/>
    </svg>
  ),
  coins: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10"/>
      <path d="M12 2v20"/>
      <path d="M2 12h20"/>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>
  ),
  plus: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="12" y1="5" x2="12" y2="19"/>
      <line x1="5" y1="12" x2="19" y2="12"/>
    </svg>
  ),
  user: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  ),
  creditCard: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
      <line x1="1" y1="10" x2="23" y2="10"/>
    </svg>
  ),
  logout: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
      <polyline points="16,17 21,12 16,7"/>
      <line x1="21" y1="12" x2="9" y2="12"/>
    </svg>
  ),
         check: () => (
         <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
           <polyline points="20,6 9,17 4,12"/>
         </svg>
       ),
       x: () => (
         <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
           <line x1="18" y1="6" x2="6" y2="18"/>
           <line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  ),
  settings: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="3"/>
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1 1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
    </svg>
  ),
  quick: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10"/>
      <path d="M12 6v6l4 2"/>
    </svg>
  )
};



function App() {
  // OpenAI API Helper Functions
  
  // Face detection and positioning for celebrity images
  const applyFaceAwarePositioning = async (imageElement) => {
    if (!imageElement || imageElement.dataset.faceDetected === 'true') return;
    
    try {
      // Initialize face detector
      const { FaceDetection } = await import('@mediapipe/face_detection');
      
      const faceDetection = new FaceDetection({
        locateFile: (file) => {
          return `https://cdn.jsdelivr.net/npm/@mediapipe/face_detection/${file}`;
        }
      });

      faceDetection.setOptions({
        modelSelection: 0,
        minDetectionConfidence: 0.5
      });

      return new Promise((resolve) => {
        faceDetection.onResults((results) => {
          if (results.detections && results.detections.length > 0) {
            // Get the first detected face
            const face = results.detections[0];
            const boundingBox = face.boundingBox;
            
            // Calculate center of the face
            const faceCenterX = boundingBox.xCenter;
            const faceCenterY = boundingBox.yCenter;
            
            // Convert to CSS object-position values
            const xPercent = Math.round(faceCenterX * 100);
            const yPercent = Math.round(faceCenterY * 100);
            
            // Apply the positioning
            imageElement.style.objectPosition = `${xPercent}% ${yPercent}%`;
            imageElement.dataset.faceDetected = 'true';
            
            console.log(`Face detected for ${imageElement.src}, position: ${xPercent}% ${yPercent}%`);
          } else {
            // No face detected, use default top positioning
            imageElement.style.objectPosition = '50% 0%';
            imageElement.dataset.faceDetected = 'true';
          }
          resolve();
        });

        // Process the image
        faceDetection.send({ image: imageElement });
      });
    } catch (error) {
      console.error('Face detection failed:', error);
      // Fallback to top positioning
      imageElement.style.objectPosition = '50% 0%';
      imageElement.dataset.faceDetected = 'true';
    }
  };

  // Handle image load for face detection
  const handleCelebrityImageLoad = (event) => {
    const imageElement = event.target;
    if (imageElement.dataset.faceDetected !== 'true') {
      // Since we're using contain, just center the image
      imageElement.style.objectPosition = 'center';
      imageElement.dataset.faceDetected = 'true';
    }
  };

  const callOpenAIImageEditAPI = async (prompt, inputImage, maskImage = null) => {
    try {
      // Convert base64 data URL to blob
      const base64Data = inputImage.split(',')[1];
      const imageBlob = await fetch(`data:image/png;base64,${base64Data}`).then(res => res.blob());
      
      const formData = new FormData();
      formData.append('image', imageBlob, 'image.png');
      formData.append('prompt', prompt);
      formData.append('n', 1);
      formData.append('size', '1024x1024');
      
      if (maskImage) {
        const maskBase64Data = maskImage.split(',')[1];
        const maskBlob = await fetch(`data:image/png;base64,${maskBase64Data}`).then(res => res.blob());
        formData.append('mask', maskBlob, 'mask.png');
      }

      const response = await fetch('https://api.openai.com/v1/images/edits', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${OPENAI_API_KEY}`
        },
        body: formData
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`OpenAI API Error: ${response.status} - ${errorData.error?.message || 'Unknown error'}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('OpenAI Image Edit API Error:', error);
      throw error;
    }
  };



  // Upload image to a temporary public URL
  const uploadImageToPublicURL = async (base64Image) => {
    try {
      // Convert base64 to blob
      const base64Data = base64Image.split(',')[1];
      const blob = await fetch(`data:image/png;base64,${base64Data}`).then(res => res.blob());
      
      // Create FormData for upload
      const formData = new FormData();
      formData.append('image', blob, 'image.png');
      
      // Upload to a free image hosting service (using imgbb as example)
              const response = await fetch(`https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_IMGBB_API_KEY}`, {
        method: 'POST',
        body: formData
      });
      
      if (!response.ok) {
        throw new Error('Failed to upload image');
      }
      
      const result = await response.json();
      return result.data.url;
    } catch (error) {
      console.error('Image upload failed:', error);
      throw error;
    }
  };

  // FLUX Kontext API for superior image editing
  const callFluxKontextAPI = async (prompt, inputImage, options = {}) => {
    try {
      console.log('=== FLUX API DIAGNOSTICS START ===');
      console.log('1. Checking if proxy server is accessible...');
      
      // Test proxy server connectivity first
      try {
        const testResponse = await fetch('http://localhost:3001/api/health', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        });
        console.log('✅ Proxy server is running and accessible');
        console.log('Proxy health check status:', testResponse.status);
      } catch (proxyError) {
        console.error('❌ Proxy server connection failed:', proxyError);
        console.error('This confirms the proxy server is not running or not accessible');
        throw new Error(`Proxy server not accessible: ${proxyError.message}`);
      }

      // Convert base64 data URL to a proper URI for FLUX
      let imageUri = inputImage;
      if (inputImage.startsWith('data:')) {
        console.log('2. Processing base64 image data...');
        imageUri = inputImage;
        console.log('✅ Image data processed successfully');
      }

      const input = {
        prompt: prompt,
        input_image: imageUri,
        aspect_ratio: "match_input_image",
        output_format: "jpg",
        safety_tolerance: 2,
        ...options
      };

      console.log('3. Preparing request payload...');
      console.log('Request payload:', {
        prompt: input.prompt,
        aspect_ratio: input.aspect_ratio,
        output_format: input.output_format,
        safety_tolerance: input.safety_tolerance,
        imageDataLength: input.input_image ? input.input_image.length : 0
      });
      
      console.log('4. Attempting to call FLUX API via proxy...');
      console.log('Target URL: http://localhost:3001/api/flux');
      
      // Use our proxy server to avoid CORS issues
      const response = await fetch('http://localhost:3001/api/flux', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(input)
      });

      console.log('5. Response received from proxy server');
      console.log('Response status:', response.status);
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));

      if (!response.ok) {
        console.error('❌ Proxy server returned error status:', response.status);
        let errorData;
        try {
          errorData = await response.json();
          console.error('Error response body:', errorData);
        } catch (parseError) {
          console.error('Could not parse error response:', parseError);
          errorData = { error: 'Unknown error' };
        }
        throw new Error(`FLUX API Error: ${response.status} - ${errorData.error || 'Unknown error'}`);
      }

      console.log('✅ Proxy server returned success status');
      const result = await response.json();
      console.log('6. Parsed response from FLUX API:', result);
      
      // FLUX returns a prediction ID, we need to poll for the result
      if (result.id) {
        // Poll for the result
        let predictionResult = null;
        let attempts = 0;
        const maxAttempts = 60; // 60 seconds max
        
        while (attempts < maxAttempts) {
          await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second
          
          const statusResponse = await fetch(`http://localhost:3001/api/flux/${result.id}`);
          predictionResult = await statusResponse.json();
          
          console.log('FLUX prediction status:', predictionResult.status);
          
          if (predictionResult.status === 'succeeded') {
            return {
              data: [{
                url: predictionResult.output
              }]
            };
          } else if (predictionResult.status === 'failed') {
            throw new Error(`FLUX prediction failed: ${predictionResult.error}`);
          }
          
          attempts++;
        }
        
        throw new Error('FLUX prediction timed out');
      }
      
      return {
        data: [{
          url: result.output
        }]
      };
    } catch (error) {
      console.error('=== FLUX API DIAGNOSTICS END ===');
      console.error('❌ FLUX Kontext API Error:', error);
      console.error('Error type:', error.constructor.name);
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
      throw error;
    }
  };

  // Alternative approach: Use DALL-E 3 with better prompts
  const callOpenAIImageVariationAPI = async (inputImage, prompt) => {
    try {
      // Convert base64 to blob
      const base64Data = inputImage.split(',')[1];
      const imageBlob = await fetch(`data:image/png;base64,${base64Data}`).then(res => res.blob());
      
      const formData = new FormData();
      formData.append('image', imageBlob, 'image.png');
      formData.append('n', 1);
      formData.append('size', '1024x1024');
      formData.append('response_format', 'url');

      const response = await fetch('https://api.openai.com/v1/images/variations', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${OPENAI_API_KEY}`
        },
        body: formData
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`OpenAI API Error: ${response.status} - ${errorData.error?.message || 'Unknown error'}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('OpenAI Image Variation API Error:', error);
      throw error;
    }
  };

  const callOpenAIResponsesAPI = async (prompt, inputImage = null, options = {}) => {
    try {
      const requestBody = {
        model: "gpt-4.1-mini",
        input: prompt,
        tools: [{"type": "image_generation"}],
        ...options
      };

      // If input image is provided, add it to the input
      if (inputImage) {
        requestBody.input = [{
          "role": "user",
          "content": [
            {"type": "input_text", "text": prompt},
            {
              "type": "input_image",
              "image_url": inputImage,
              "detail": "high"
            },
          ],
        }];
      }

      const response = await fetch('https://api.openai.com/v1/responses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`
        },
        body: JSON.stringify(requestBody)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`OpenAI API Error: ${response.status} - ${errorData.error?.message || 'Unknown error'}`);
      }
      
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('OpenAI API Error:', error);
      throw error;
    }
  };



  const [activeTab, setActiveTab] = useState('gallery');

  const [selectedCelebrity, setSelectedCelebrity] = useState(null);
  const [userSelfie, setUserSelfie] = useState(null);
  const [customPrompt, setCustomPrompt] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState(null);
  const [error, setError] = useState(null);

  const [selectedUniverse, setSelectedUniverse] = useState(null);
  const [selectedStyle, setSelectedStyle] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [currentPage, setCurrentPage] = useState('main'); // 'main', 'universe', 'style'
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedQuickIdea, setSelectedQuickIdea] = useState(null);
  const [billingPeriod, setBillingPeriod] = useState('yearly');

  const [generationMode, setGenerationMode] = useState('normal'); // normal, celebrity, universe, style

  // User Authentication & Membership
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login', 'signup'

  // AI Editor State
  const [editorPhoto, setEditorPhoto] = useState(null);
  const [selectedEdit, setSelectedEdit] = useState(null);
  const [selectedEditorCategory, setSelectedEditorCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedPhoto, setEditedPhoto] = useState(null);
  const [editHistory, setEditHistory] = useState([]);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [showOriginal, setShowOriginal] = useState(false);
  const [editorPrompt, setEditorPrompt] = useState('');
  const [promptCharacterCount, setPromptCharacterCount] = useState(0);
  const [showGenerationOverlay, setShowGenerationOverlay] = useState(false);
  const [generationStep, setGenerationStep] = useState(0);
  const [generationSteps] = useState([
    'Analyzing your photo...',
    'Preparing AI model...',
    'Generating your edit...',
    'Enhancing details...',
    'Finalizing result...'
  ]);
  
  // Age Slider State
  const [selectedAge, setSelectedAge] = useState(25);

  // Generated Image Popup State
  const [showGeneratedImagePopup, setShowGeneratedImagePopup] = useState(false);
  const [popupImageData, setPopupImageData] = useState(null);
  const [showSettingsDropdown, setShowSettingsDropdown] = useState(false);

  // Photo Management System
  const [savedPhotos, setSavedPhotos] = useState([]);
  const [showSavePhotoModal, setShowSavePhotoModal] = useState(false);
  const [showPhotoLibrary, setShowPhotoLibrary] = useState(false);
  const [photoToSave, setPhotoToSave] = useState(null);
  const [selectedSavedPhoto, setSelectedSavedPhoto] = useState(null);

  // Notification functions
  const addNotification = (message, type = 'info', data = null) => {
    const newNotification = {
      id: Date.now(),
      message,
      type,
      data,
      timestamp: new Date().toLocaleTimeString(),
      read: false
    };
    setNotifications(prev => [newNotification, ...prev]);
  };

  const markNotificationAsRead = (id) => {
    setNotifications(prev => prev.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  const handleNotificationClick = (notification) => {
    if (notification.data && notification.data.image) {
      setGeneratedImage(notification.data.image);
      setCurrentPage('result');
    }
    markNotificationAsRead(notification.id);
    setShowNotifications(false);
  };

  // Authentication Functions
  const handleTestLogin = () => {
    const testUser = {
      id: 'test-user-123',
      email: 'test@fameapp.com',
      name: 'Test User',
      membership: 'free',
      generationsUsed: 0,
      lastGenerationReset: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      paymentHistory: []
    };
    
    setUser(testUser);
    setIsAuthenticated(true);
    setShowAuthModal(false);
    addNotification('🎉 Welcome! You have 3 free generations per day to start creating!', 'success');
    
    // Save to localStorage
    localStorage.setItem('fameapp_user', JSON.stringify(testUser));
  };

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setActiveTab('celebrities'); // Reset to default tab
    setShowSettingsDropdown(false); // Close settings dropdown
    localStorage.removeItem('fameapp_user');
    addNotification('👋 Logged out successfully', 'info');
  };

  const handleMembershipUpgrade = (planId) => {
    if (!user) return;
    
    const plan = membershipPlans.find(p => p.id === planId);
    if (!plan) return;
    
      const updatedUser = {
        ...user,
      membership: planId,
      paymentHistory: [
        ...user.paymentHistory,
        {
          id: Date.now(),
          type: 'membership_upgrade',
          planId: planId,
          planName: plan.name,
          price: plan.price,
          timestamp: new Date().toISOString()
        }
      ]
    };
    
      setUser(updatedUser);
      localStorage.setItem('fameapp_user', JSON.stringify(updatedUser));
    addNotification(`✅ Upgraded to ${plan.name}!`, 'success');
  };

  const handleExtraGenerationsPurchase = () => {
    if (!user) return;
    
    const updatedUser = {
      ...user,
              extraGenerations: (user.extraGenerations || 0) + extraGenerationsPackage.generations,
      paymentHistory: [
        ...user.paymentHistory,
        {
          id: Date.now(),
          type: 'extra_generations',
                  generations: extraGenerationsPackage.generations,
        price: extraGenerationsPackage.price,
          timestamp: new Date().toISOString()
        }
      ]
    };
    
    setUser(updatedUser);
    localStorage.setItem('fameapp_user', JSON.stringify(updatedUser));
          addNotification(`✅ ${extraGenerationsPackage.generations} extra generations added!`, 'success');
  };

  const checkGenerationLimit = () => {
    if (!user) return false;
    
    const currentPlan = membershipPlans.find(p => p.id === user.membership);
    if (!currentPlan) return false;
    
    // Check if we need to reset daily generations
    const lastReset = new Date(user.lastGenerationReset);
    const now = new Date();
    const isNewDay = lastReset.getDate() !== now.getDate() || 
                     lastReset.getMonth() !== now.getMonth() || 
                     lastReset.getFullYear() !== now.getFullYear();
    
    if (isNewDay) {
      const updatedUser = {
        ...user,
        generationsUsed: 0,
        lastGenerationReset: now.toISOString()
      };
      setUser(updatedUser);
      localStorage.setItem('fameapp_user', JSON.stringify(updatedUser));
      return true;
    }
    
    const totalGenerationsAvailable = currentPlan.generationsPerDay + (user.extraGenerations || 0);
    return user.generationsUsed < totalGenerationsAvailable;
  };

  const incrementGeneration = () => {
    if (!user) return false;
    
    if (!checkGenerationLimit()) {
      addNotification('❌ Generation limit reached. Please upgrade your plan or purchase extra generations.', 'error');
      return false;
    }
    
    const updatedUser = {
      ...user,
      generationsUsed: user.generationsUsed + 1
    };
    
    setUser(updatedUser);
    localStorage.setItem('fameapp_user', JSON.stringify(updatedUser));
    return true;
  };

  // Photo Management Functions
  const savePhotoToLibrary = (photoData, name = 'My Photo') => {
    const newPhoto = {
      id: Date.now(),
      data: photoData,
      name: name,
      createdAt: new Date().toISOString(),
      isDefault: savedPhotos.length === 0 // First photo becomes default
    };
    
    const updatedPhotos = [...savedPhotos, newPhoto];
    setSavedPhotos(updatedPhotos);
    localStorage.setItem('fameapp_saved_photos', JSON.stringify(updatedPhotos));
    
    setPhotoToSave(null);
    setShowSavePhotoModal(false);
    addNotification(`📸 "${name}" saved to your photo library!`, 'success');
  };

  const removePhotoFromLibrary = (photoId) => {
    const updatedPhotos = savedPhotos.filter(photo => photo.id !== photoId);
    setSavedPhotos(updatedPhotos);
    localStorage.setItem('fameapp_saved_photos', JSON.stringify(updatedPhotos));
    
    // If we're removing the currently selected photo, clear it
    if (selectedSavedPhoto && selectedSavedPhoto.id === photoId) {
      setSelectedSavedPhoto(null);
      setUserSelfie(null);
    }
    
    addNotification('🗑️ Photo removed from library', 'info');
  };

  const selectPhotoFromLibrary = (photo) => {
    setSelectedSavedPhoto(photo);
    setUserSelfie(photo.data);
    setShowPhotoLibrary(false);
    addNotification(`📸 Using "${photo.name}" for generation`, 'info');
  };

  const setDefaultPhoto = (photoId) => {
    const updatedPhotos = savedPhotos.map(photo => ({
      ...photo,
      isDefault: photo.id === photoId
    }));
    setSavedPhotos(updatedPhotos);
    localStorage.setItem('fameapp_saved_photos', JSON.stringify(updatedPhotos));
    addNotification('⭐ Default photo updated!', 'success');
  };

  // Generated Image Popup Functions
  const openGeneratedImagePopup = (imageData) => {
    setPopupImageData(imageData);
    setShowGeneratedImagePopup(true);
  };

  const closeGeneratedImagePopup = () => {
    setShowGeneratedImagePopup(false);
    setPopupImageData(null);
  };

  const downloadGeneratedImage = async (imageUrl) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `generated-image-${Date.now()}.jpg`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      addNotification('✅ Image downloaded successfully!', 'success');
    } catch (error) {
      console.error('Error downloading image:', error);
      addNotification('❌ Failed to download image', 'error');
    }
  };

  const shareGeneratedImage = async (imageUrl) => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Check out my AI-generated image!',
          text: 'I created this using FameApp AI',
          url: imageUrl
        });
        addNotification('✅ Image shared successfully!', 'success');
      } else {
        // Fallback: copy to clipboard
        await navigator.clipboard.writeText(imageUrl);
        addNotification('✅ Image URL copied to clipboard!', 'success');
      }
    } catch (error) {
      console.error('Error sharing image:', error);
      addNotification('❌ Failed to share image', 'error');
    }
  };

  // Check for existing user and saved photos on app load
  React.useEffect(() => {
    const savedUser = localStorage.getItem('fameapp_user');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
      setIsAuthenticated(true);
    }
    
    const savedPhotosData = localStorage.getItem('fameapp_saved_photos');
    if (savedPhotosData) {
      const photos = JSON.parse(savedPhotosData);
      setSavedPhotos(photos);
      
      // Auto-select default photo if available
      const defaultPhoto = photos.find(photo => photo.isDefault);
      if (defaultPhoto) {
        setSelectedSavedPhoto(defaultPhoto);
        setUserSelfie(defaultPhoto.data);
      }
    }
  }, []);

  const celebrities = [
    // Keep only the 5 new Wikipedia celebrities
    {
      id: 'taylor-swift-wiki',
      name: 'Taylor Swift',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Taylor_Swift_at_the_2023_MTV_Video_Music_Awards_%283%29.png/330px-Taylor_Swift_at_the_2023_MTV_Video_Music_Awards_%283%29.png',
      category: 'Music'
    },
    {
      id: 'tom-cruise-wiki',
      name: 'Tom Cruise',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Tom_Cruise-2428.jpg/330px-Tom_Cruise-2428.jpg',
      category: 'Actors'
    },
    {
      id: 'angelina-jolie-wiki',
      name: 'Angelina Jolie',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Angelina_Jolie-643531_%28cropped%29.jpg/330px-Angelina_Jolie-643531_%28cropped%29.jpg',
      category: 'Actors'
    },
    {
      id: 'johnny-depp-wiki',
      name: 'Johnny Depp',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Johnny_Depp_2020.jpg/330px-Johnny_Depp_2020.jpg',
      category: 'Actors'
    },
    {
      id: 'jennifer-lawrence-wiki',
      name: 'Jennifer Lawrence',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Jennifer_Lawrence_in_2016.jpg/330px-Jennifer_Lawrence_in_2016.jpg',
      category: 'Actors'
    },
    {
      id: 'drake',
      name: 'Drake',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Drake_July_2016.jpg/330px-Drake_July_2016.jpg',
      category: 'Music'
    },
    {
      id: 'ed-sheeran',
      name: 'Ed Sheeran',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Ed_Sheeran-6886_%28cropped%29.jpg/330px-Ed_Sheeran-6886_%28cropped%29.jpg',
      category: 'Music'
    },
    {
      id: 'ariana-grande',
      name: 'Ariana Grande',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Ariana_Grande_promoting_Wicked_%282024%29.jpg/330px-Ariana_Grande_promoting_Wicked_%282024%29.jpg',
      category: 'Music'
    },
    {
      id: 'justin-bieber',
      name: 'Justin Bieber',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Justin_Bieber_in_2015.jpg/330px-Justin_Bieber_in_2015.jpg',
      category: 'Music'
    },
    {
      id: 'beyonc',
      name: 'Beyoncé',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Beyonc%C3%A9_-_Tottenham_Hotspur_Stadium_-_1st_June_2023_%2810_of_118%29_%2852946364598%29_%28best_crop%29.jpg/330px-Beyonc%C3%A9_-_Tottenham_Hotspur_Stadium_-_1st_June_2023_%2810_of_118%29_%2852946364598%29_%28best_crop%29.jpg',
      category: 'Music'
    },
    {
      id: 'rihanna',
      name: 'Rihanna',
      image: 'https://upload.wikimedia.org/wikipedia/commons/1/16/Rihanna_visits_U.S._Embassy_in_Barbados_2024_%28cropped%29.jpg',
      category: 'Music'
    },
    {
      id: 'the-weeknd',
      name: 'The Weeknd',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/The_Weeknd_Cannes_2023.png/330px-The_Weeknd_Cannes_2023.png',
      category: 'Music'
    },
    {
      id: 'post-malone',
      name: 'Post Malone',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Post_Malone_July_2021_%28cropped%29.jpg/330px-Post_Malone_July_2021_%28cropped%29.jpg',
      category: 'Music'
    },
    {
      id: 'billie-eilish',
      name: 'Billie Eilish',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/BillieEilishO2160622_%2819_of_45%29_%2852153214339%29_%28cropped_3%29.jpg/330px-BillieEilishO2160622_%2819_of_45%29_%2852153214339%29_%28cropped_3%29.jpg',
      category: 'Music'
    },
    {
      id: 'dua-lipa',
      name: 'Dua Lipa',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/DuaLipa-byPhilipRomano.jpg/330px-DuaLipa-byPhilipRomano.jpg',
      category: 'Music'
    },
    {
      id: 'lady-gaga',
      name: 'Lady Gaga',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Lady_Gaga_at_Joe_Biden%27s_inauguration_%28cropped_5%29.jpg/330px-Lady_Gaga_at_Joe_Biden%27s_inauguration_%28cropped_5%29.jpg',
      category: 'Music'
    },
    {
      id: 'bruno-mars',
      name: 'Bruno Mars',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/BrunoMars24KMagicWorldTourLive_%28cropped%29.jpg/330px-BrunoMars24KMagicWorldTourLive_%28cropped%29.jpg',
      category: 'Music'
    },
    {
      id: 'adele',
      name: 'Adele',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Adele_2016.jpg/330px-Adele_2016.jpg',
      category: 'Music'
    },
    {
      id: 'kendrick-lamar',
      name: 'Kendrick Lamar',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Kendrick_Lamar_2018_Pulitzer_Prize_ceremony_%283x4_cropped%29.jpg/330px-Kendrick_Lamar_2018_Pulitzer_Prize_ceremony_%283x4_cropped%29.jpg',
      category: 'Music'
    },
    {
      id: 'travis-scott',
      name: 'Travis Scott',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/2025-0120_Cole_Gahagan_Michael_Rubin_Travis_Scott_%28cropped%29.jpg/330px-2025-0120_Cole_Gahagan_Michael_Rubin_Travis_Scott_%28cropped%29.jpg',
      category: 'Music'
    },
    {
      id: 'cardi-b',
      name: 'Cardi B',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Cardi_B_2021_02.jpg/330px-Cardi_B_2021_02.jpg',
      category: 'Music'
    },
    {
      id: 'nicki-minaj',
      name: 'Nicki Minaj',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Nicki_Minaj_MTV_VMAs_4.jpg/330px-Nicki_Minaj_MTV_VMAs_4.jpg',
      category: 'Music'
    },
    {
      id: 'doja-cat',
      name: 'Doja Cat',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Doja_Cat_x_Amazon1.1_%28cropped%29.jpg/330px-Doja_Cat_x_Amazon1.1_%28cropped%29.jpg',
      category: 'Music'
    },
    {
      id: 'olivia-rodrigo',
      name: 'Olivia Rodrigo',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Glasto2025-546_%28cropped%29.jpg/330px-Glasto2025-546_%28cropped%29.jpg',
      category: 'Music'
    },
    {
      id: 'lil-nas-x',
      name: 'Lil Nas X',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Lil_Nas_X_Talks_About_Gaining_His_Father%27s_Acceptance%2C_Growing_Up_in_Atlanta%2C_%26_FINDING_HIMSELF_7-32_screenshot_%28headshot%29.jpg/330px-Lil_Nas_X_Talks_About_Gaining_His_Father%27s_Acceptance%2C_Growing_Up_in_Atlanta%2C_%26_FINDING_HIMSELF_7-32_screenshot_%28headshot%29.jpg',
      category: 'Music'
    },
    {
      id: 'bad-bunny',
      name: 'Bad Bunny',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Bad_Bunny_2019_by_Glenn_Francis_%28cropped%29.jpg/330px-Bad_Bunny_2019_by_Glenn_Francis_%28cropped%29.jpg',
      category: 'Music'
    },
    {
      id: 'j-balvin',
      name: 'J Balvin',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/J_Balvin_BTTR_Tour_Photo_January_2025.jpg/330px-J_Balvin_BTTR_Tour_Photo_January_2025.jpg',
      category: 'Music'
    },
    {
      id: 'shakira',
      name: 'Shakira',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/2023-11-16_Gala_de_los_Latin_Grammy%2C_03_%28cropped%2902.jpg/330px-2023-11-16_Gala_de_los_Latin_Grammy%2C_03_%28cropped%2902.jpg',
      category: 'Music'
    },
    {
      id: 'maluma',
      name: 'Maluma',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/2023-11-16_Gala_de_los_Latin_Grammy%2C_20_%28Maluma%29.jpg/330px-2023-11-16_Gala_de_los_Latin_Grammy%2C_20_%28Maluma%29.jpg',
      category: 'Music'
    },
    {
      id: 'karol-g',
      name: 'Karol G',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/2023-11-16_Gala_de_los_Latin_Grammy%2C_15_%28cropped_2%29.jpg/330px-2023-11-16_Gala_de_los_Latin_Grammy%2C_15_%28cropped_2%29.jpg',
      category: 'Music'
    },
    {
      id: 'anitta',
      name: 'Anitta',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Anitta_2023.jpg/330px-Anitta_2023.jpg',
      category: 'Music'
    },

    {
      id: 'harry-styles',
      name: 'Harry Styles',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/HarryStylesWembley170623_%2865_of_93%29_%2852982678051%29_%28cropped_2%29.jpg/330px-HarryStylesWembley170623_%2865_of_93%29_%2852982678051%29_%28cropped_2%29.jpg',
      category: 'Music'
    },
    {
      id: 'zayn-malik',
      name: 'Zayn Malik',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Zayn_Wiki_%28cropped%29.jpg/330px-Zayn_Wiki_%28cropped%29.jpg',
      category: 'Music'
    },
    {
      id: 'niall-horan',
      name: 'Niall Horan',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Niall_Horan_on_iHeartRadio_Canada_in_2023_%281%29_%28cropped%29.png/330px-Niall_Horan_on_iHeartRadio_Canada_in_2023_%281%29_%28cropped%29.png',
      category: 'Music'
    },
    {
      id: 'liam-payne',
      name: 'Liam Payne',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/One_Direction_NRJ_2014_2.jpg/330px-One_Direction_NRJ_2014_2.jpg',
      category: 'Music'
    },
    {
      id: 'louis-tomlinson',
      name: 'Louis Tomlinson',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Louis_Tomlinson_in_2023_at_AOTV_premiere.png/330px-Louis_Tomlinson_in_2023_at_AOTV_premiere.png',
      category: 'Music'
    },
    {
      id: 'shawn-mendes',
      name: 'Shawn Mendes',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/191125_Shawn_Mendes_at_the_2019_American_Music_Awards.png/330px-191125_Shawn_Mendes_at_the_2019_American_Music_Awards.png',
      category: 'Music'
    },
    {
      id: 'leonardo-dicaprio',
      name: 'Leonardo DiCaprio',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Leonardo_Dicaprio_Cannes_2019.jpg/330px-Leonardo_Dicaprio_Cannes_2019.jpg',
      category: 'Sports'
    },
    {
      id: 'brad-pitt',
      name: 'Brad Pitt',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Brad_Pitt-69858.jpg/330px-Brad_Pitt-69858.jpg',
      category: 'Actors'
    },
    {
      id: 'angelina-jolie',
      name: 'Angelina Jolie',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Angelina_Jolie-643531_%28cropped%29.jpg/330px-Angelina_Jolie-643531_%28cropped%29.jpg',
      category: 'Actors'
    },
    {
      id: 'johnny-depp',
      name: 'Johnny Depp',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Johnny_Depp_2020.jpg/330px-Johnny_Depp_2020.jpg',
      category: 'Actors'
    },
    {
      id: 'jennifer-lawrence',
      name: 'Jennifer Lawrence',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Jennifer_Lawrence_in_2016.jpg/330px-Jennifer_Lawrence_in_2016.jpg',
      category: 'Actors'
    },
    {
      id: 'scarlett-johansson',
      name: 'Scarlett Johansson',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Scarlett_Johansson-8588.jpg/330px-Scarlett_Johansson-8588.jpg',
      category: 'Actors'
    },
    {
      id: 'margot-robbie',
      name: 'Margot Robbie',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/SYDNEY%2C_AUSTRALIA_-_JANUARY_23_Margot_Robbie_arrives_at_the_Australian_Premiere_of_%27I%2C_Tonya%27_on_January_23%2C_2018_in_Sydney%2C_Australia_%2828074883999%29_%28cropped_2%29.jpg/330px-thumbnail.jpg',
      category: 'Actors'
    },
    {
      id: 'gal-gadot',
      name: 'Gal Gadot',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Gal_Gadot_by_Gage_Skidmore_3.jpg/330px-Gal_Gadot_by_Gage_Skidmore_3.jpg',
      category: 'Actors'
    },
    {
      id: 'henry-cavill',
      name: 'Henry Cavill',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Henry_Cavill_%2848417913146%29_%28cropped%29.jpg/330px-Henry_Cavill_%2848417913146%29_%28cropped%29.jpg',
      category: 'Actors'
    },
    {
      id: 'ryan-reynolds',
      name: 'Ryan Reynolds',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Deadpool_2_Japan_Premiere_Red_Carpet_Ryan_Reynolds_%28cropped%29.jpg/330px-Deadpool_2_Japan_Premiere_Red_Carpet_Ryan_Reynolds_%28cropped%29.jpg',
      category: 'Actors'
    },
    {
      id: 'hugh-jackman',
      name: 'Hugh Jackman',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Hugh_Jackman_by_Gage_Skidmore_3.jpg/330px-Hugh_Jackman_by_Gage_Skidmore_3.jpg',
      category: 'Actors'
    },
    {
      id: 'robert-downey-jr',
      name: 'Robert Downey Jr.',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Robert_Downey_Jr._2014_Comic-Con.jpg/330px-Robert_Downey_Jr._2014_Comic-Con.jpg',
      category: 'Actors'
    },
    {
      id: 'chris-hemsworth',
      name: 'Chris Hemsworth',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Chris_Hemsworth_by_Gage_Skidmore_3.jpg/330px-Chris_Hemsworth_by_Gage_Skidmore_3.jpg',
      category: 'Actors'
    },
    {
      id: 'chris-evans',
      name: 'Chris Evans',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Chris_Evans_by_Gage_Skidmore_2.jpg/330px-Chris_Evans_by_Gage_Skidmore_2.jpg',
      category: 'Actors'
    },
    {
      id: 'mark-ruffalo',
      name: 'Mark Ruffalo',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Mark_Ruffalo_%2836201774756%29_%28cropped%29.jpg/330px-Mark_Ruffalo_%2836201774756%29_%28cropped%29.jpg',
      category: 'Actors'
    },
    {
      id: 'jeremy-renner',
      name: 'Jeremy Renner',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Jeremy_Renner_by_Gage_Skidmore.jpg/330px-Jeremy_Renner_by_Gage_Skidmore.jpg',
      category: 'Actors'
    },
    {
      id: 'tom-holland',
      name: 'Tom Holland',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Tom_Holland_by_Gage_Skidmore.jpg/330px-Tom_Holland_by_Gage_Skidmore.jpg',
      category: 'Actors'
    },
    {
      id: 'zendaya',
      name: 'Zendaya',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Zendaya_-_2019_by_Glenn_Francis.jpg/330px-Zendaya_-_2019_by_Glenn_Francis.jpg',
      category: 'Actors'
    },
    {
      id: 'timothe-chalamet',
      name: 'Timothée Chalamet',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Timoth%C3%A9e_Chalamet-63482_%28cropped%29.jpg/330px-Timoth%C3%A9e_Chalamet-63482_%28cropped%29.jpg',
      category: 'Actors'
    },
    {
      id: 'florence-pugh',
      name: 'Florence Pugh',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Florence_Pugh_at_the_2024_Toronto_International_Film_Festival_13_%28cropped_2_%E2%80%93_color_adjusted%29.jpg/330px-Florence_Pugh_at_the_2024_Toronto_International_Film_Festival_13_%28cropped_2_%E2%80%93_color_adjusted%29.jpg',
      category: 'Actors'
    },
    {
      id: 'sydney-sweeney',
      name: 'Sydney Sweeney',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Sydney_Sweeney_at_the_2024_Toronto_International_Film_Festival_%28cropped_2%29.jpg/330px-Sydney_Sweeney_at_the_2024_Toronto_International_Film_Festival_%28cropped_2%29.jpg',
      category: 'Actors'
    },
    {
      id: 'jenna-ortega',
      name: 'Jenna Ortega',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Jenna_Ortega-63792_%28cropped%29.jpg/330px-Jenna_Ortega-63792_%28cropped%29.jpg',
      category: 'Actors'
    },
    {
      id: 'millie-bobby-brown',
      name: 'Millie Bobby Brown',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Millie_Bobby_Brown_-_MBB_-_Portrait_1_-_SFM5_-_July_10%2C_2022_at_Stranger_Fan_Meet_5_People_Convention_%28cropped%29.jpg/330px-Millie_Bobby_Brown_-_MBB_-_Portrait_1_-_SFM5_-_July_10%2C_2022_at_Stranger_Fan_Meet_5_People_Convention_%28cropped%29.jpg',
      category: 'Actors'
    },
    {
      id: 'noah-schnapp',
      name: 'Noah Schnapp',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Noah_Schnapp_by_Gage_Skidmore.jpg/330px-Noah_Schnapp_by_Gage_Skidmore.jpg',
      category: 'Actors'
    },
    {
      id: 'finn-wolfhard',
      name: 'Finn Wolfhard',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Finn_Wolfhard_by_Gage_Skidmore_2.jpg/330px-Finn_Wolfhard_by_Gage_Skidmore_2.jpg',
      category: 'Actors'
    },
    {
      id: 'caleb-mclaughlin',
      name: 'Caleb McLaughlin',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Caleb_mclaughlin_2022_1.jpg/330px-Caleb_mclaughlin_2022_1.jpg',
      category: 'Actors'
    },
    {
      id: 'gaten-matarazzo',
      name: 'Gaten Matarazzo',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Gaten_Matarazzo.jpg/330px-Gaten_Matarazzo.jpg',
      category: 'Actors'
    },
    {
      id: 'sadie-sink',
      name: 'Sadie Sink',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Sadie_Sink_%2843914734441%29.jpg/330px-Sadie_Sink_%2843914734441%29.jpg',
      category: 'Actors'
    },
    {
      id: 'maya-hawke',
      name: 'Maya Hawke',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Maya_Hawke_at_Third_Man_Records_2024_-_taken_by_Kai_Leduff_%28kshowshots_on_Instagram%29.jpg/330px-Maya_Hawke_at_Third_Man_Records_2024_-_taken_by_Kai_Leduff_%28kshowshots_on_Instagram%29.jpg',
      category: 'Actors'
    },
    {
      id: 'natalia-dyer',
      name: 'Natalia Dyer',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Natalia_Dyer_in_2017.jpg/330px-Natalia_Dyer_in_2017.jpg',
      category: 'Actors'
    },
    {
      id: 'emma-stone',
      name: 'Emma Stone',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Emma_Stone_at_the_2025_Cannes_Film_Festival_03_%28cropped%29.jpg/330px-Emma_Stone_at_the_2025_Cannes_Film_Festival_03_%28cropped%29.jpg',
      category: 'Actors'
    },
    {
      id: 'ryan-gosling',
      name: 'Ryan Gosling',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/GoslingBFI081223_%2822_of_30%29_%2853388157347%29_%28cropped%29.jpg/330px-GoslingBFI081223_%2822_of_30%29_%2853388157347%29_%28cropped%29.jpg',
      category: 'Actors'
    },
    {
      id: 'emma-watson',
      name: 'Emma Watson',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Emma_Watson_2013.jpg/330px-Emma_Watson_2013.jpg',
      category: 'Actors'
    },
    {
      id: 'daniel-radcliffe',
      name: 'Daniel Radcliffe',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/DanielRadcliffe.jpg/330px-DanielRadcliffe.jpg',
      category: 'Actors'
    },
    {
      id: 'rupert-grint',
      name: 'Rupert Grint',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/RupertGrint2018.jpg/330px-RupertGrint2018.jpg',
      category: 'Actors'
    },
    {
      id: 'tom-hanks',
      name: 'Tom Hanks',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/TomHanksPrincEdw031223_%2811_of_41%29_%28cropped%29.jpg/330px-TomHanksPrincEdw031223_%2811_of_41%29_%28cropped%29.jpg',
      category: 'Actors'
    },
          {
      id: 'will-smith',
      name: 'Will Smith',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/TechCrunch_Disrupt_San_Francisco_2019_-_Day_1_%2848834070763%29_%28cropped%29.jpg/330px-TechCrunch_Disrupt_San_Francisco_2019_-_Day_1_%2848834070763%29_%28cropped%29.jpg',
      category: 'Actors'
    },
    {
      id: 'denzel-washington',
      name: 'Denzel Washington',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Denzel_Washington_at_the_2025_Cannes_Film_Festival.jpg/330px-Denzel_Washington_at_the_2025_Cannes_Film_Festival.jpg',
        category: 'Actors'
      },
      {
      id: 'morgan-freeman',
      name: 'Morgan Freeman',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Morgan_Freeman_at_The_Pentagon_on_2_August_2023_-_230802-D-PM193-3363_%28cropped%29.jpg/330px-Morgan_Freeman_at_The_Pentagon_on_2_August_2023_-_230802-D-PM193-3363_%28cropped%29.jpg',
        category: 'Actors'
      },
      {
      id: 'samuel-l-jackson',
      name: 'Samuel L. Jackson',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/SamuelLJackson.jpg/330px-SamuelLJackson.jpg',
        category: 'Actors'
      },
      {
      id: 'meryl-streep',
      name: 'Meryl Streep',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Meryl_Streep_December_2018_%28cropped%29.jpg/330px-Meryl_Streep_December_2018_%28cropped%29.jpg',
        category: 'Actors'
      },
      {
      id: 'sandra-bullock',
      name: 'Sandra Bullock',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Sandra_Bullock_in_July_2013.jpg/330px-Sandra_Bullock_in_July_2013.jpg',
      category: 'Actors'
    },
    {
      id: 'julia-roberts',
      name: 'Julia Roberts',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Julia_Roberts_Delivers_Remarks_at_the_2022_Kennedy_Center_Honors_Dinner_%2852542372884%29_%28cropped%29.jpg/330px-Julia_Roberts_Delivers_Remarks_at_the_2022_Kennedy_Center_Honors_Dinner_%2852542372884%29_%28cropped%29.jpg',
      category: 'Actors'
    },
    {
      id: 'nicole-kidman',
      name: 'Nicole Kidman',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Nicole_Kidman-66059_%28cropped%29.jpg/330px-Nicole_Kidman-66059_%28cropped%29.jpg',
      category: 'Actors'
    },
    {
      id: 'reese-witherspoon',
      name: 'Reese Witherspoon',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Reese_Witherspoon_at_TIFF_2014.jpg/330px-Reese_Witherspoon_at_TIFF_2014.jpg',
      category: 'Actors'
    },
    {
      id: 'charlize-theron',
      name: 'Charlize Theron',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Charlize-theron-IMG_6045.jpg/330px-Charlize-theron-IMG_6045.jpg',
      category: 'Actors'
    },
    {
      id: 'cate-blanchett',
      name: 'Cate Blanchett',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Cate_Blanchett-63298_%28cropped_2%29.jpg/330px-Cate_Blanchett-63298_%28cropped_2%29.jpg',
      category: 'Music'
    },
    {
      id: 'viola-davis',
      name: 'Viola Davis',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Viola_Davis_at_the_Air_Premiere_at_SXSW_%28cropped%29.jpg/330px-Viola_Davis_at_the_Air_Premiere_at_SXSW_%28cropped%29.jpg',
      category: 'Sports'
    },
    {
      id: 'octavia-spencer',
      name: 'Octavia Spencer',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/%22Hidden_Figures%22_Screening_at_the_White_House_%28NHQ201612150008%29_%28cropped%29.jpg/330px-%22Hidden_Figures%22_Screening_at_the_White_House_%28NHQ201612150008%29_%28cropped%29.jpg',
      category: 'Actors'
    },
    {
      id: 'lupita-nyongo',
      name: 'Lupita Nyong\'o',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Lupita_Nyong%27o_by_Gage_Skidmore_4.jpg/330px-Lupita_Nyong%27o_by_Gage_Skidmore_4.jpg',
      category: 'Actors'
    },
    {
      id: 'lionel-messi',
      name: 'Lionel Messi',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Lionel_Messi_NE_Revolution_Inter_Miami_7.9.25-055.jpg/330px-Lionel_Messi_NE_Revolution_Inter_Miami_7.9.25-055.jpg',
      category: 'Sports'
    },
    {
      id: 'cristiano-ronaldo',
        name: 'Cristiano Ronaldo',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Cristiano_Ronaldo_playing_for_Al_Nassr_FC_against_Persepolis%2C_September_2023_%28cropped%29.jpg/330px-Cristiano_Ronaldo_playing_for_Al_Nassr_FC_against_Persepolis%2C_September_2023_%28cropped%29.jpg',
        category: 'Sports'
      },
      {
      id: 'neymar',
      name: 'Neymar',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Neymar_Jr._with_Al_Hilal%2C_3_October_2023_-_01_%28cropped%29.jpg/330px-Neymar_Jr._with_Al_Hilal%2C_3_October_2023_-_01_%28cropped%29.jpg',
      category: 'Sports'
    },
    {
      id: 'kylian-mbapp',
        name: 'Kylian Mbappé',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Picture_with_Mbapp%C3%A9_%28cropped%29_%28cropped%29.jpg/330px-Picture_with_Mbapp%C3%A9_%28cropped%29_%28cropped%29.jpg',
        category: 'Sports'
      },
      {
      id: 'erling-haaland',
      name: 'Erling Haaland',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Norway_Italy_-_June_2025_E_07.jpg/330px-Norway_Italy_-_June_2025_E_07.jpg',
        category: 'Sports'
      },
      {
      id: 'mohamed-salah',
      name: 'Mohamed Salah',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Mohamed_Salah_2018.jpg/330px-Mohamed_Salah_2018.jpg',
      category: 'Sports'
    },
    {
      id: 'kevin-de-bruyne',
      name: 'Kevin De Bruyne',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Kevin_De_Bruyne_201807092.jpg/330px-Kevin_De_Bruyne_201807092.jpg',
      category: 'Sports'
    },
    {
      id: 'virgil-van-dijk',
      name: 'Virgil van Dijk',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/20160604_AUT_NED_8876_%28cropped%29.jpg/330px-20160604_AUT_NED_8876_%28cropped%29.jpg',
      category: 'Sports'
    },
    {
      id: 'sadio-man',
      name: 'Sadio Mané',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Sadio_Man%C3%A9_-_Persepolis_F.C._v_Al_Nassr_FC%2C_19_September_2023.jpg/330px-Sadio_Man%C3%A9_-_Persepolis_F.C._v_Al_Nassr_FC%2C_19_September_2023.jpg',
      category: 'Sports'
    },
    {
      id: 'robert-lewandowski',
      name: 'Robert Lewandowski',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/2019147183134_2019-05-27_Fussball_1.FC_Kaiserslautern_vs_FC_Bayern_M%C3%BCnchen_-_Sven_-_1D_X_MK_II_-_0228_-_B70I8527_%28cropped%29.jpg/330px-2019147183134_2019-05-27_Fussball_1.FC_Kaiserslautern_vs_FC_Bayern_M%C3%BCnchen_-_Sven_-_1D_X_MK_II_-_0228_-_B70I8527_%28cropped%29.jpg',
      category: 'Sports'
    },
    {
      id: 'karim-benzema',
      name: 'Karim Benzema',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Karim_Benzema_during_an_interview_in_2021_%282%29_%28cropped%29.jpg/330px-Karim_Benzema_during_an_interview_in_2021_%282%29_%28cropped%29.jpg',
      category: 'Sports'
    },
    {
      id: 'luka-modri',
      name: 'Luka Modrić',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Ofrenda_de_la_Liga_y_la_Champions-57-L.Mill%C3%A1n_%2852109310843%29_%28Luka_Modri%C4%87%29.jpg/330px-Ofrenda_de_la_Liga_y_la_Champions-57-L.Mill%C3%A1n_%2852109310843%29_%28Luka_Modri%C4%87%29.jpg',
      category: 'Sports'
    },
    {
      id: 'toni-kroos',
      name: 'Toni Kroos',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Toni_Kroos_Real_Madrid_2021.jpg/330px-Toni_Kroos_Real_Madrid_2021.jpg',
      category: 'Sports'
    },
    {
      id: 'sergio-ramos',
      name: 'Sergio Ramos',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Sergio_Ramos_Interview_2021_%28cropped%29.jpg/330px-Sergio_Ramos_Interview_2021_%28cropped%29.jpg',
      category: 'Sports'
    },
    {
      id: 'gerard-piqu',
      name: 'Gerard Piqué',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Gerard_Piqu%C3%A9_2017.jpg/330px-Gerard_Piqu%C3%A9_2017.jpg',
      category: 'Sports'
    },
    {
      id: 'andrs-iniesta',
      name: 'Andrés Iniesta',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Andr%C3%A9s_Iniesta_%28cropped%29.jpg/330px-Andr%C3%A9s_Iniesta_%28cropped%29.jpg',
      category: 'Sports'
    },
    {
      id: 'xavi-hernndez',
      name: 'Xavi Hernández',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Xavi_13981129001173637176665956870909.jpg/330px-Xavi_13981129001173637176665956870909.jpg',
      category: 'Sports'
    },
    {
      id: 'iker-casillas',
      name: 'Iker Casillas',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Iker-Casillas-SportsTrade-2021-cropped.jpg/330px-Iker-Casillas-SportsTrade-2021-cropped.jpg',
      category: 'Sports'
    },
    {
      id: 'carles-puyol',
      name: 'Carles Puyol',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Premios_Goya_2020_-_Carles_Pujol.jpg/330px-Premios_Goya_2020_-_Carles_Pujol.jpg',
      category: 'Sports'
    },
    {
      id: 'david-villa',
      name: 'David Villa',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Spain-Tahiti%2C_Confederations_Cup_2013_%2802%29_%28Villa_crop%29.jpg/330px-Spain-Tahiti%2C_Confederations_Cup_2013_%2802%29_%28Villa_crop%29.jpg',
      category: 'Sports'
    },
    {
      id: 'lebron-james',
      name: 'LeBron James',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/LeBron_James%2C_25_November_2023_02_%28cropped_2%29.jpg/330px-LeBron_James%2C_25_November_2023_02_%28cropped_2%29.jpg',
      category: 'Sports'
    },
    {
      id: 'stephen-curry',
      name: 'Stephen Curry',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Steph_Curry_P20230117AS-1347_%28cropped%29.jpg/330px-Steph_Curry_P20230117AS-1347_%28cropped%29.jpg',
      category: 'Sports'
    },
    {
      id: 'kevin-durant',
      name: 'Kevin Durant',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Kevin_Durant_Interview_in_2023_-_2.png/330px-Kevin_Durant_Interview_in_2023_-_2.png',
      category: 'Sports'
    },
    {
      id: 'giannis-antetokounmpo',
      name: 'Giannis Antetokounmpo',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Giannis_Antetokounmpo_%2851915153421%29_%28cropped%29.jpg/330px-Giannis_Antetokounmpo_%2851915153421%29_%28cropped%29.jpg',
      category: 'Sports'
    },
    {
      id: 'luka-doni',
      name: 'Luka Dončić',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Luka_Doncic_%2851914951721%29_%28cropped1%29.jpg/330px-Luka_Doncic_%2851914951721%29_%28cropped1%29.jpg',
      category: 'Sports'
    },
    {
      id: 'joel-embiid',
      name: 'Joel Embiid',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Joel_Embiid_2019.jpg/330px-Joel_Embiid_2019.jpg',
      category: 'Sports'
    },
    {
      id: 'nikola-joki',
      name: 'Nikola Jokić',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Nikola_Jokic_free_throw_%28cropped%29.jpg/330px-Nikola_Jokic_free_throw_%28cropped%29.jpg',
      category: 'Sports'
    },
    {
      id: 'damian-lillard',
      name: 'Damian Lillard',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Damian_Lillard_%282021%29_%28cropped%29.jpg/330px-Damian_Lillard_%282021%29_%28cropped%29.jpg',
      category: 'Sports'
    },
    {
      id: 'james-harden',
      name: 'James Harden',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Harden_dribbling_midcourt%2C_Cavaliers_vs_Nets_on_January_17%2C_2022_%28cropped%29.jpg/330px-Harden_dribbling_midcourt%2C_Cavaliers_vs_Nets_on_January_17%2C_2022_%28cropped%29.jpg',
      category: 'Sports'
    },
    {
      id: 'russell-westbrook',
      name: 'Russell Westbrook',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Russell_Westbrook_%28March_21%2C_2022%29_%28cropped%29.jpg/330px-Russell_Westbrook_%28March_21%2C_2022%29_%28cropped%29.jpg',
      category: 'Sports'
    },
    {
      id: 'anthony-davis',
      name: 'Anthony Davis',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Anthony_Davis_pre-game_%28cropped%29.jpg/330px-Anthony_Davis_pre-game_%28cropped%29.jpg',
      category: 'Sports'
    },
    {
      id: 'kawhi-leonard',
      name: 'Kawhi Leonard',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Kawhi_Leonard_%287440607%29_%28cropped%29.jpg/330px-Kawhi_Leonard_%287440607%29_%28cropped%29.jpg',
      category: 'Sports'
    },
    {
      id: 'paul-george',
      name: 'Paul George',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Paul_George_Pacers.jpg/330px-Paul_George_Pacers.jpg',
      category: 'Sports'
    },
    {
      id: 'jimmy-butler',
      name: 'Jimmy Butler',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Jimmy_Butler_%28cropped%29.jpg/330px-Jimmy_Butler_%28cropped%29.jpg',
      category: 'Sports'
    },
    {
      id: 'bam-adebayo',
      name: 'Bam Adebayo',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Bam_Adebayo_%28cropped%29.jpg/330px-Bam_Adebayo_%28cropped%29.jpg',
      category: 'Sports'
    },
    {
      id: 'serena-williams',
      name: 'Serena Williams',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Serena_Williams_at_2013_US_Open.jpg/330px-Serena_Williams_at_2013_US_Open.jpg',
      category: 'Sports'
    },
    {
      id: 'venus-williams',
      name: 'Venus Williams',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Williams_V._RG21_%2811%29_%2851376275968%29_%28cropped%29.jpg/330px-Williams_V._RG21_%2811%29_%2851376275968%29_%28cropped%29.jpg',
      category: 'Sports'
    },
    {
      id: 'roger-federer',
      name: 'Roger Federer',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Roger_Federer_2015_%28cropped%29.jpg/330px-Roger_Federer_2015_%28cropped%29.jpg',
      category: 'Sports'
    },
    {
      id: 'rafael-nadal',
      name: 'Rafael Nadal',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Rafael_Nadal_en_2024_%28cropped%29.jpg/330px-Rafael_Nadal_en_2024_%28cropped%29.jpg',
      category: 'Sports'
    },
    {
      id: 'novak-djokovic',
      name: 'Novak Djokovic',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Novak_Djokovic_2024_Paris_Olympics.jpg/330px-Novak_Djokovic_2024_Paris_Olympics.jpg',
      category: 'Sports'
    },
    {
      id: 'usain-bolt',
      name: 'Usain Bolt',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/25th_Laureus_World_Sports_Awards_-_Red_Carpet_-_Usain_Bolt_-_240422_190142_%28cropped%29.jpg/330px-25th_Laureus_World_Sports_Awards_-_Red_Carpet_-_Usain_Bolt_-_240422_190142_%28cropped%29.jpg',
      category: 'Sports'
    },
    {
      id: 'michael-phelps',
      name: 'Michael Phelps',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Michael_Phelps_Rio_Olympics_2016.jpg/330px-Michael_Phelps_Rio_Olympics_2016.jpg',
      category: 'Sports'
    },
    {
      id: 'simone-biles',
      name: 'Simone Biles',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Simone_Biles_National_Team_2024.jpg/330px-Simone_Biles_National_Team_2024.jpg',
      category: 'Sports'
    },
    {
      id: 'katie-ledecky',
      name: 'Katie Ledecky',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Katie_Ledecky_at_the_2023_Golden_Goggle_Awards_%28cropped%29.jpg/330px-Katie_Ledecky_at_the_2023_Golden_Goggle_Awards_%28cropped%29.jpg',
      category: 'Sports'
    },
    {
      id: 'caeleb-dressel',
      name: 'Caeleb Dressel',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Caeleb_Dressel_before_winning_100_fly_%2842769914221%29_%28cropped%29.jpg/330px-Caeleb_Dressel_before_winning_100_fly_%2842769914221%29_%28cropped%29.jpg',
      category: 'Sports'
    },
    {
      id: 'tiger-woods',
      name: 'Tiger Woods',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/President_Donald_Trump_hosts_a_reception_honoring_Black_History_Month_%2854341713089%29_%28cropped%29.jpg/330px-President_Donald_Trump_hosts_a_reception_honoring_Black_History_Month_%2854341713089%29_%28cropped%29.jpg',
      category: 'Sports'
    },
    {
      id: 'rory-mcilroy',
      name: 'Rory McIlroy',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Rory_McIlroy_Travelers-067_%28cropped%29.jpg/330px-Rory_McIlroy_Travelers-067_%28cropped%29.jpg',
      category: 'Sports'
    },
    {
      id: 'jon-rahm',
      name: 'Jon Rahm',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Jon_Rahm_%28cropped%29.png/330px-Jon_Rahm_%28cropped%29.png',
      category: 'Sports'
    },
    {
      id: 'dustin-johnson',
      name: 'Dustin Johnson',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Dustin_Johnson_-_2022.jpg/330px-Dustin_Johnson_-_2022.jpg',
      category: 'Sports'
    },
    {
      id: 'brooks-koepka',
      name: 'Brooks Koepka',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Brooks_Koepka_Portrait.jpg/330px-Brooks_Koepka_Portrait.jpg',
      category: 'Sports'
    },
    {
      id: 'elon-musk',
      name: 'Elon Musk',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/USAFA_Hosts_Elon_Musk_%28Image_1_of_17%29_%28cropped%29.jpg/330px-USAFA_Hosts_Elon_Musk_%28Image_1_of_17%29_%28cropped%29.jpg',
      category: 'Business'
      },
      {
        id: 'mark-zuckerberg',
        name: 'Mark Zuckerberg',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Zuckerberg-Jourov%C3%A1_meeting_%282020%29_%28cropped%29.jpg/330px-Zuckerberg-Jourov%C3%A1_meeting_%282020%29_%28cropped%29.jpg',
        category: 'Business'
      },
      {
      id: 'jeff-bezos',
      name: 'Jeff Bezos',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Jeff_Bezos_visits_LAAFB_SMC_%283908618%29_%28cropped%29.jpeg/330px-Jeff_Bezos_visits_LAAFB_SMC_%283908618%29_%28cropped%29.jpeg',
      category: 'Business'
    },
    {
      id: 'bill-gates',
      name: 'Bill Gates',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Bill_Gates_at_the_European_Commission_-_2025_-_P067383-987995_%28cropped%29.jpg/330px-Bill_Gates_at_the_European_Commission_-_2025_-_P067383-987995_%28cropped%29.jpg',
      category: 'Business'
    },
    {
      id: 'warren-buffett',
      name: 'Warren Buffett',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Warren_Buffett_at_the_2015_SelectUSA_Investment_Summit_%28cropped%29.jpg/330px-Warren_Buffett_at_the_2015_SelectUSA_Investment_Summit_%28cropped%29.jpg',
      category: 'Business'
    },
    {
      id: 'jack-ma',
      name: 'Jack Ma',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Enabling_eCommerce-_Small_Enterprises%2C_Global_Players_%2839008130265%29_%28cropped%29.jpg/330px-Enabling_eCommerce-_Small_Enterprises%2C_Global_Players_%2839008130265%29_%28cropped%29.jpg',
      category: 'Business'
    },
    {
      id: 'larry-page',
      name: 'Larry Page',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Larry_Page_in_the_European_Parliament%2C_17.06.2009_%28cropped%29.jpg/330px-Larry_Page_in_the_European_Parliament%2C_17.06.2009_%28cropped%29.jpg',
      category: 'Business'
    },
    {
      id: 'sergey-brin',
      name: 'Sergey Brin',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Sergey_Brin_Ted_2010_%28cropped%29.jpg/330px-Sergey_Brin_Ted_2010_%28cropped%29.jpg',
      category: 'Business'
    },
    {
      id: 'sundar-pichai',
      name: 'Sundar Pichai',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Sundar_Pichai_-_2023_%28cropped%29.jpg/330px-Sundar_Pichai_-_2023_%28cropped%29.jpg',
      category: 'Business'
    },
    {
      id: 'tim-cook',
      name: 'Tim Cook',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Visit_of_Tim_Cook_to_the_European_Commission_-_P061904-946789.jpg/330px-Visit_of_Tim_Cook_to_the_European_Commission_-_P061904-946789.jpg',
      category: 'Business'
    },
    {
      id: 'satya-nadella',
      name: 'Satya Nadella',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/MS-Exec-Nadella-Satya-2017-08-31-22_%28cropped%29.jpg/330px-MS-Exec-Nadella-Satya-2017-08-31-22_%28cropped%29.jpg',
      category: 'Business'
    },
    {
      id: 'jensen-huang',
      name: 'Jensen Huang',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Jensen_Huang_20231109_%28cropped2%29.jpg/330px-Jensen_Huang_20231109_%28cropped2%29.jpg',
      category: 'Business'
    },
    {
      id: 'sam-altman',
      name: 'Sam Altman',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Sam_Altman_TechCrunch_SF_2019_Day_2_Oct_3_%28cropped%29.jpg/330px-Sam_Altman_TechCrunch_SF_2019_Day_2_Oct_3_%28cropped%29.jpg',
      category: 'Business'
    },
    {
      id: 'larry-ellison',
      name: 'Larry Ellison',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Larry_Ellison_picture.png/330px-Larry_Ellison_picture.png',
      category: 'Business'
    },
    {
      id: 'michael-dell',
      name: 'Michael Dell',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Michael_Dell_%2852548152888%29_%28cropped%29.jpg/330px-Michael_Dell_%2852548152888%29_%28cropped%29.jpg',
      category: 'Business'
    },
    {
      id: 'steve-jobs',
      name: 'Steve Jobs',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Steve_Jobs_Headshot_2010-CROP_%28cropped_2%29.jpg/330px-Steve_Jobs_Headshot_2010-CROP_%28cropped_2%29.jpg',
      category: 'Business'
    },
    {
      id: 'paul-allen',
      name: 'Paul Allen',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Paul_G._Allen_%28cropped%29.jpg/330px-Paul_G._Allen_%28cropped%29.jpg',
      category: 'Business'
    },
    {
      id: 'steve-wozniak',
      name: 'Steve Wozniak',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Steve_Wozniak_by_Gage_Skidmore_3_%28cropped%29.jpg/330px-Steve_Wozniak_by_Gage_Skidmore_3_%28cropped%29.jpg',
      category: 'Business'
    },
    {
      id: 'reed-hastings',
      name: 'Reed Hastings',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Re_publica_2015_-_Tag_1_%2817381870955%29_%28cropped%29.jpg/330px-Re_publica_2015_-_Tag_1_%2817381870955%29_%28cropped%29.jpg',
      category: 'Business'
    },
    {
      id: 'marc-benioff',
      name: 'Marc Benioff',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Marc_Benioff.jpg/330px-Marc_Benioff.jpg',
        category: 'Business'
      },
      {
        id: 'joe-biden',
        name: 'Joe Biden',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Joe_Biden_presidential_portrait.jpg/330px-Joe_Biden_presidential_portrait.jpg',
        category: 'Politics'
      },
      {
      id: 'donald-trump',
      name: 'Donald Trump',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Official_Presidential_Portrait_of_President_Donald_J._Trump_%282025%29.jpg/330px-Official_Presidential_Portrait_of_President_Donald_J._Trump_%282025%29.jpg',
        category: 'Politics'
    },
    {
      id: 'barack-obama',
      name: 'Barack Obama',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/President_Barack_Obama.jpg/330px-President_Barack_Obama.jpg',
      category: 'Politics'
    },
    {
      id: 'hillary-clinton',
      name: 'Hillary Clinton',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Hillary_Clinton_by_Gage_Skidmore_4_%28cropped%29.jpg/330px-Hillary_Clinton_by_Gage_Skidmore_4_%28cropped%29.jpg',
      category: 'Politics'
    },
    {
      id: 'kamala-harris',
      name: 'Kamala Harris',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Kamala_Harris_Vice_Presidential_Portrait.jpg/330px-Kamala_Harris_Vice_Presidential_Portrait.jpg',
      category: 'Politics'
    },
    {
      id: 'vladimir-putin',
      name: 'Vladimir Putin',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/%D0%92%D0%BB%D0%B0%D0%B4%D0%B8%D0%BC%D0%B8%D1%80_%D0%9F%D1%83%D1%82%D0%B8%D0%BD_%2808-03-2024%29_%28cropped%29_%28higher_res%29.jpg/330px-%D0%92%D0%BB%D0%B0%D0%B4%D0%B8%D0%BC%D0%B8%D1%80_%D0%9F%D1%83%D1%82%D0%B8%D0%BD_%2808-03-2024%29_%28cropped%29_%28higher_res%29.jpg',
      category: 'Politics'
    },
    {
      id: 'xi-jinping',
      name: 'Xi Jinping',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Xi_Jinping_in_Beijing_on_May_13%2C_2025_%28cropped%29.jpg/330px-Xi_Jinping_in_Beijing_on_May_13%2C_2025_%28cropped%29.jpg',
      category: 'Politics'
    },
    {
      id: 'emmanuel-macron',
      name: 'Emmanuel Macron',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Emmanuel_Macron_-_June_2025_%283x4_cropped%29.jpg/330px-Emmanuel_Macron_-_June_2025_%283x4_cropped%29.jpg',
      category: 'Business'
    },
    {
      id: 'angela-merkel',
      name: 'Angela Merkel',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Angela_Merkel_2019_cropped.jpg/330px-Angela_Merkel_2019_cropped.jpg',
      category: 'Politics'
    },
    {
      id: 'justin-trudeau',
      name: 'Justin Trudeau',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Prime_Minister_Trudeau%27s_message_on_Christmas_2023_%280m29s%29_%28cropped%29.jpg/330px-Prime_Minister_Trudeau%27s_message_on_Christmas_2023_%280m29s%29_%28cropped%29.jpg',
      category: 'Politics'
    },
    {
      id: 'boris-johnson',
      name: 'Boris Johnson',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Boris_Johnson_official_portrait_%28cropped%29.jpg/330px-Boris_Johnson_official_portrait_%28cropped%29.jpg',
      category: 'Sports'
    },
    {
      id: 'narendra-modi',
      name: 'Narendra Modi',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Shri_Narendra_Modi%2C_Prime_Minister_of_India_%283x4_cropped%29.jpg/330px-Shri_Narendra_Modi%2C_Prime_Minister_of_India_%283x4_cropped%29.jpg',
      category: 'Politics'
    },
    {
      id: 'jair-bolsonaro',
      name: 'Jair Bolsonaro',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Jair_Bolsonaro_2019_Portrait_%283x4_cropped%29.jpg/330px-Jair_Bolsonaro_2019_Portrait_%283x4_cropped%29.jpg',
      category: 'Politics'
    },
    {
      id: 'andrs-manuel-lpez-obrador',
      name: 'Andrés Manuel López Obrador',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Andr%C3%A9s_Manuel_L%C3%B3pez_Obrador_junio_2024.jpg/330px-Andr%C3%A9s_Manuel_L%C3%B3pez_Obrador_junio_2024.jpg',
      category: 'Business'
    },
    {
      id: 'pedro-snchez',
      name: 'Pedro Sánchez',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Obisk_%C5%A1panskega_predsednika_vlade_v_Sloveniji_%2853658605930%29_%28cropped%29.jpg/330px-Obisk_%C5%A1panskega_predsednika_vlade_v_Sloveniji_%2853658605930%29_%28cropped%29.jpg',
      category: 'Politics'
    },
    {
      id: 'ninja',
      name: 'Ninja',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Hokusai-sketches---hokusai-manga-vol6-crop.jpg/330px-Hokusai-sketches---hokusai-manga-vol6-crop.jpg',
      category: 'Streamers'
    },
    {
      id: 'pewdiepie',
      name: 'PewDiePie',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Pewdiepie_head_shot.jpg/330px-Pewdiepie_head_shot.jpg',
      category: 'Streamers'
    },
    {
      id: 'mrbeast',
      name: 'MrBeast',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Mrbeast_in_2025_1.png/330px-Mrbeast_in_2025_1.png',
      category: 'Streamers'
    },
    {
      id: 'ishowspeed',
      name: 'IShowSpeed',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/IShowSpeed_at_Chinatown_%28Portrait%29_04.jpg/330px-IShowSpeed_at_Chinatown_%28Portrait%29_04.jpg',
      category: 'Streamers'
    },
    {
      id: 'dream',
      name: 'Dream',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/A_dream_%28BM_1868%2C0808.9057%29.jpg/330px-A_dream_%28BM_1868%2C0808.9057%29.jpg',
      category: 'Streamers'
    },
    {
      id: 'georgenotfound',
      name: 'GeorgeNotFound',
      image: 'https://upload.wikimedia.org/wikipedia/commons/c/cb/GeorgeNotFound.jpg',
      category: 'Sports'
    },
    {
      id: 'sapnap',
      name: 'Sapnap',
      image: 'https://upload.wikimedia.org/wikipedia/en/7/75/Sapnap_logo.jpg',
      category: 'Streamers'
    },
    {
      id: 'badboyhalo',
      name: 'BadBoyHalo',
      image: 'https://upload.wikimedia.org/wikipedia/en/thumb/6/64/Dream_SMP_cast.png/330px-Dream_SMP_cast.png',
      category: 'Streamers'
    },
    {
      id: 'technoblade',
      name: 'Technoblade',
      image: 'https://upload.wikimedia.org/wikipedia/en/a/a2/Technoblade_at_his_dad%27s_wedding.jpg',
      category: 'Streamers'
    },
    {
      id: 'tommyinnit',
      name: 'TommyInnit',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/HMX_3271_%2853332035431%29_%28cropped%29.jpg/330px-HMX_3271_%2853332035431%29_%28cropped%29.jpg',
      category: 'Streamers'
    },
    {
      id: 'tubbo',
      name: 'Tubbo',
      image: 'https://upload.wikimedia.org/wikipedia/commons/0/0a/Tubbo_in_2021.jpg',
      category: 'Streamers'
    },
    {
      id: 'ranboo',
      name: 'Ranboo',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Ranboo_%28cropped%29.png/330px-Ranboo_%28cropped%29.png',
      category: 'Streamers'
    },
    {
      id: 'quackity',
      name: 'Quackity',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Quackity_2.jpg/330px-Quackity_2.jpg',
      category: 'Streamers'
    },
    {
      id: 'karl-jacobs',
      name: 'Karl Jacobs',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Karl_Jacobs_2023.jpg/330px-Karl_Jacobs_2023.jpg',
      category: 'Streamers'
    },
    {
      id: 'albert-einstein',
      name: 'Albert Einstein',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Albert_Einstein_1947.jpg/330px-Albert_Einstein_1947.jpg',
      category: 'Historical'
    },
    {
      id: 'mahatma-gandhi',
      name: 'Mahatma Gandhi',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Mahatma-Gandhi%2C_studio%2C_1931.jpg/330px-Mahatma-Gandhi%2C_studio%2C_1931.jpg',
      category: 'Business'
    },
    {
      id: 'martin-luther-king-jr',
      name: 'Martin Luther King Jr.',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Martin_Luther_King%2C_Jr..jpg/330px-Martin_Luther_King%2C_Jr..jpg',
      category: 'Business'
    },
    {
      id: 'nelson-mandela',
      name: 'Nelson Mandela',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Nelson_Mandela_1994.jpg/330px-Nelson_Mandela_1994.jpg',
      category: 'Business'
    },
    {
      id: 'mother-teresa',
      name: 'Mother Teresa',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Mother_Teresa_1.jpg/330px-Mother_Teresa_1.jpg',
      category: 'Historical'
    },
    {
      id: 'princess-diana',
      name: 'Princess Diana',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Diana%2C_Princess_of_Wales_1997_%282%29.jpg/330px-Diana%2C_Princess_of_Wales_1997_%282%29.jpg',
      category: 'Historical'
    },
    {
      id: 'john-f-kennedy',
      name: 'John F. Kennedy',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/John_F._Kennedy%2C_White_House_color_photo_portrait.jpg/330px-John_F._Kennedy%2C_White_House_color_photo_portrait.jpg',
      category: 'Historical'
    },
    {
      id: 'abraham-lincoln',
      name: 'Abraham Lincoln',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Abraham_Lincoln_1863_Portrait_%283x4_cropped%29.jpg/330px-Abraham_Lincoln_1863_Portrait_%283x4_cropped%29.jpg',
      category: 'Historical'
    },
    {
      id: 'winston-churchill',
      name: 'Winston Churchill',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Sir_Winston_Churchill_-_19086236948.jpg/330px-Sir_Winston_Churchill_-_19086236948.jpg',
      category: 'Historical'
    },
    {
      id: 'queen-elizabeth-ii',
      name: 'Queen Elizabeth II',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Queen_Elizabeth_II_official_portrait_for_1959_tour_%28retouched%29_%28cropped%29_%283-to-4_aspect_ratio%29.jpg/330px-Queen_Elizabeth_II_official_portrait_for_1959_tour_%28retouched%29_%28cropped%29_%283-to-4_aspect_ratio%29.jpg',
      category: 'Historical'
    },

    // Models - Famous supermodels and Victoria's Secret models
    {
      id: 'gigi-hadid',
      name: 'Gigi Hadid',
      image: 'https://images.unsplash.com/photo-1589156280159-27698a70f29e?w=330&h=330&fit=crop&crop=face',
      category: 'Models'
    },
    {
      id: 'bella-hadid',
      name: 'Bella Hadid',
      image: 'https://images.unsplash.com/photo-1586287011575-a23134f797f9?w=330&h=330&fit=crop&crop=face',
      category: 'Models'
    },
    {
      id: 'kendall-jenner',
      name: 'Kendall Jenner',
      image: 'https://images.unsplash.com/photo-1494790108755-2616c273c8f4?w=330&h=330&fit=crop&crop=face',
      category: 'Models'
    },
    {
      id: 'cara-delevingne',
      name: 'Cara Delevingne',
      image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=330&h=330&fit=crop&crop=face',
      category: 'Models'
    },
    {
      id: 'adriana-lima',
      name: 'Adriana Lima',
      image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=330&h=330&fit=crop&crop=face',
      category: 'Models'
    },
    {
      id: 'gisele-bundchen',
      name: 'Gisele Bündchen',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=330&h=330&fit=crop&crop=face',
      category: 'Models'
    },
    {
      id: 'naomi-campbell',
      name: 'Naomi Campbell',
      image: 'https://images.unsplash.com/photo-1548086023-4324c03a0a34?w=330&h=330&fit=crop&crop=face',
      category: 'Models'
    },
    {
      id: 'tyra-banks',
      name: 'Tyra Banks',
      image: 'https://images.unsplash.com/photo-1521146764736-56c929d59c83?w=330&h=330&fit=crop&crop=face',
      category: 'Models'
    },
    {
      id: 'heidi-klum',
      name: 'Heidi Klum',
      image: 'https://images.unsplash.com/photo-1502323777036-f29e3972d82f?w=330&h=330&fit=crop&crop=face',
      category: 'Models'
    },
    {
      id: 'emily-ratajkowski',
      name: 'Emily Ratajkowski',
      image: 'https://images.unsplash.com/photo-1581403341630-a6e0b9d2d257?w=330&h=330&fit=crop&crop=face',
      category: 'Models'
    },
    {
      id: 'candice-swanepoel',
      name: 'Candice Swanepoel',
      image: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=330&h=330&fit=crop&crop=face',
      category: 'Models'
    },
    {
      id: 'miranda-kerr',
      name: 'Miranda Kerr',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=330&h=330&fit=crop&crop=face',
      category: 'Models'
    },
    {
      id: 'irina-shayk',
      name: 'Irina Shayk',
      image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=330&h=330&fit=crop&crop=face',
      category: 'Models'
    },
    {
      id: 'rosie-huntington-whiteley',
      name: 'Rosie Huntington-Whiteley',
      image: 'https://images.unsplash.com/photo-1545167622-3a6ac756afa4?w=330&h=330&fit=crop&crop=face',
      category: 'Models'
    },
    {
      id: 'chrissy-teigen',
      name: 'Chrissy Teigen',
      image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=330&h=330&fit=crop&crop=face',
      category: 'Models'
    },
  ];

  const categories = ['All', 'Actors', 'Models', 'Music', 'Politics', 'Business', 'Sports', 'Streamers', 'Historical', 'Trending'];

  // Trending celebrities (most popular/used ones)
  const trendingCelebrityIds = [
    'taylor-swift',
    'drake', 
    'tom-cruise',
    'angelina-jolie',
    'johnny-depp',
    'gigi-hadid',
    'kendall-jenner',
    'lionel-messi',
    'cristiano-ronaldo',
    'donald-trump',
    'elon-musk',
    'the-rock'
  ];

  // AI Editor Categories with professional icons from established icon libraries
  const aiEditorCategories = [
    {
      id: 'hair',
      name: 'Hair',
      icon: () => (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          {/* Lucide Scissors icon - used in professional photo editing */}
          <circle cx="6" cy="6" r="3"/>
          <circle cx="6" cy="18" r="3"/>
          <line x1="20" y1="4" x2="8.12" y2="15.88"/>
          <line x1="14.47" y1="14.48" x2="20" y2="20"/>
          <line x1="8.12" y1="8.12" x2="12" y2="12"/>
        </svg>
      ),
      description: 'Change hair color, style, and length'
    },
    {
      id: 'eyes',
      name: 'Eyes',
      icon: () => (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          {/* Lucide Eye icon - standard in photo editing apps */}
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
          <circle cx="12" cy="12" r="3"/>
        </svg>
      ),
      description: 'Change eye color and enhance eyes'
    },
    {
      id: 'skin',
      name: 'Skin',
      icon: () => (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          {/* Lucide Sparkles icon - represents beauty/skin enhancement */}
          <path d="M12 3l1.09 6.26L22 12l-8.91 2.74L12 21l-1.09-6.26L2 12l8.91-2.74L12 3z"/>
        </svg>
      ),
      description: 'Clear skin, add freckles, change tone'
    },
    {
      id: 'age',
      name: 'Age',
      icon: () => (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          {/* Lucide Clock icon - represents time/age */}
          <circle cx="12" cy="12" r="10"/>
          <polyline points="12,6 12,12 16,14"/>
        </svg>
      ),
      description: 'Make younger or older'
    },
    {
      id: 'race',
      name: 'Race',
      icon: () => (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          {/* Lucide Users icon - represents diversity */}
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="m22 21-2-2"/>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
      ),
      description: 'Change ethnic appearance'
    },
    {
      id: 'clothing',
      name: 'Clothing',
      icon: () => (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          {/* Lucide Shirt icon - represents clothing */}
          <path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46A2 2 0 0 0 2 5.34V18a2 2 0 0 0 1.62 1.88L8 21a4 4 0 0 0 8 0l4.38-1.88A2 2 0 0 0 22 18V5.34a2 2 0 0 0-1.62-1.88z"/>
        </svg>
      ),
      description: 'Change clothing style'
    },
    {
      id: 'accessories',
      name: 'Accessories',
      icon: () => (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          {/* Lucide Glasses icon - represents accessories */}
          <circle cx="12" cy="12" r="3"/>
          <path d="M12 1v6m0 6v6"/>
          <path d="M1 12h6m6 0h6"/>
        </svg>
      ),
      description: 'Add or remove accessories'
    },
    {
      id: 'expressions',
      name: 'Expressions',
      icon: () => (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          {/* Lucide Smile icon - represents expressions */}
          <circle cx="12" cy="12" r="10"/>
          <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
          <line x1="9" y1="9" x2="9.01" y2="9"/>
          <line x1="15" y1="9" x2="15.01" y2="9"/>
        </svg>
      ),
      description: 'Change facial expressions'
    }
  ];

  // AI Editor Features with subcategories and new categories
  const aiEditorFeatures = {
    'hair': {
      name: 'Hair',
      subcategories: {
        'color': {
          name: 'Color',
          edits: [
            { id: 'blonde', name: 'Blonde', prompt: 'Change the hair color to natural blonde while keeping the same facial features and identity' },
            { id: 'brunette', name: 'Brunette', prompt: 'Change the hair color to natural brown while keeping the same facial features and identity' },
            { id: 'red', name: 'Red', prompt: 'Change the hair color to natural red while keeping the same facial features and identity' },
            { id: 'black', name: 'Black', prompt: 'Change the hair color to natural black while keeping the same facial features and identity' },
            { id: 'auburn', name: 'Auburn', prompt: 'Change the hair color to auburn while keeping the same facial features and identity' },
            { id: 'platinum', name: 'Platinum', prompt: 'Change the hair color to platinum blonde while keeping the same facial features and identity' },
            { id: 'dirty-blonde', name: 'Dirty Blonde', prompt: 'Change the hair color to dirty blonde while keeping the same facial features and identity' },
            { id: 'light-brown', name: 'Light Brown', prompt: 'Change the hair color to light brown while keeping the same facial features and identity' },
            { id: 'dark-brown', name: 'Dark Brown', prompt: 'Change the hair color to dark brown while keeping the same facial features and identity' },
            { id: 'strawberry-blonde', name: 'Strawberry Blonde', prompt: 'Change the hair color to strawberry blonde while keeping the same facial features and identity' }
          ]
        },
        'length': {
          name: 'Length',
          edits: [
            { id: 'bald', name: 'Bald', prompt: 'Change the hair to completely bald while keeping the same facial features and identity' },
            { id: 'buzzcut', name: 'Buzzcut', prompt: 'Change the hair to a short buzzcut while keeping the same facial features and identity' },
            { id: 'short', name: 'Short', prompt: 'Change the hair length to short while keeping the same facial features and identity' },
            { id: 'medium', name: 'Medium', prompt: 'Change the hair length to medium while keeping the same facial features and identity' },
            { id: 'long', name: 'Long', prompt: 'Change the hair length to long while keeping the same facial features and identity' },
            { id: 'very-long', name: 'Very Long', prompt: 'Change the hair length to very long while keeping the same facial features and identity' },
            { id: 'pixie', name: 'Pixie Cut', prompt: 'Change the hair to a pixie cut while keeping the same facial features and identity' },
            { id: 'bob', name: 'Bob Cut', prompt: 'Change the hair to a bob cut while keeping the same facial features and identity' },
            { id: 'lob', name: 'Lob Cut', prompt: 'Change the hair to a lob cut while keeping the same facial features and identity' },
            { id: 'mullet', name: 'Mullet', prompt: 'Change the hair to a mullet style while keeping the same facial features and identity' }
          ]
        },
        'shape': {
          name: 'Shape',
          edits: [
            { id: 'straight', name: 'Straight', prompt: 'Change the hair texture to straight while keeping the same facial features and identity' },
            { id: 'curly', name: 'Curly', prompt: 'Change the hair texture to curly while keeping the same facial features and identity' },
            { id: 'wavy', name: 'Wavy', prompt: 'Change the hair texture to wavy while keeping the same facial features and identity' },
            { id: 'coily', name: 'Coily', prompt: 'Change the hair texture to coily while keeping the same facial features and identity' },
            { id: 'textured', name: 'Textured', prompt: 'Change the hair texture to textured while keeping the same facial features and identity' },
            { id: 'sleek', name: 'Sleek', prompt: 'Change the hair texture to sleek while keeping the same facial features and identity' },
            { id: 'voluminous', name: 'Voluminous', prompt: 'Change the hair texture to voluminous while keeping the same facial features and identity' },
            { id: 'layered', name: 'Layered', prompt: 'Change the hair to layered while keeping the same facial features and identity' },
            { id: 'shaggy', name: 'Shaggy', prompt: 'Change the hair texture to shaggy while keeping the same facial features and identity' },
            { id: 'messy', name: 'Messy', prompt: 'Change the hair texture to messy while keeping the same facial features and identity' }
          ]
        }
      }
    },
    'eyes': {
      name: 'Eyes',
      edits: [
        { id: 'blue', name: 'Blue', prompt: 'Change the eye color to blue while keeping the same facial features and identity' },
        { id: 'green', name: 'Green', prompt: 'Change the eye color to green while keeping the same facial features and identity' },
        { id: 'brown', name: 'Brown', prompt: 'Change the eye color to brown while keeping the same facial features and identity' },
        { id: 'hazel', name: 'Hazel', prompt: 'Change the eye color to hazel while keeping the same facial features and identity' },
        { id: 'gray', name: 'Gray', prompt: 'Change the eye color to gray while keeping the same facial features and identity' },
        { id: 'amber', name: 'Amber', prompt: 'Change the eye color to amber while keeping the same facial features and identity' },
        { id: 'violet', name: 'Violet', prompt: 'Change the eye color to violet while keeping the same facial features and identity' },
        { id: 'dark-brown', name: 'Dark Brown', prompt: 'Change the eye color to dark brown while keeping the same facial features and identity' },
        { id: 'light-blue', name: 'Light Blue', prompt: 'Change the eye color to light blue while keeping the same facial features and identity' },
        { id: 'emerald', name: 'Emerald', prompt: 'Change the eye color to emerald while keeping the same facial features and identity' },
        { id: 'bigger', name: 'Bigger Eyes', prompt: 'Make the eyes slightly larger while keeping the same facial features and identity' },
        { id: 'brighter', name: 'Brighter Eyes', prompt: 'Make the eyes brighter while keeping the same facial features and identity' },
        { id: 'deeper', name: 'Deeper Eyes', prompt: 'Make the eyes appear deeper while keeping the same facial features and identity' },
        { id: 'wider', name: 'Wider Eyes', prompt: 'Make the eyes wider while keeping the same facial features and identity' },
        { id: 'more-expressive', name: 'More Expressive', prompt: 'Make the eyes more expressive while keeping the same facial features and identity' }
      ]
    },
    'skin': {
      name: 'Skin',
      edits: [
        { id: 'clear', name: 'Clear Skin', prompt: 'Clear skin imperfections while keeping the same facial features and identity' },
        { id: 'freckles', name: 'Add Freckles', prompt: 'Add natural freckles while keeping the same facial features and identity' },
        { id: 'remove-freckles', name: 'Remove Freckles', prompt: 'Remove freckles while keeping the same facial features and identity' },
        { id: 'tan', name: 'Tan Skin', prompt: 'Add a natural tan while keeping the same facial features and identity' },
        { id: 'pale', name: 'Pale Skin', prompt: 'Make skin pale while keeping the same facial features and identity' },
        { id: 'smooth', name: 'Smooth Skin', prompt: 'Smooth skin texture while keeping the same facial features and identity' },
        { id: 'glowing', name: 'Glowing Skin', prompt: 'Add a natural glow to the skin while keeping the same facial features and identity' },
        { id: 'matte', name: 'Matte Skin', prompt: 'Make skin matte while keeping the same facial features and identity' },
        { id: 'dewy', name: 'Dewy Skin', prompt: 'Add a dewy finish to the skin while keeping the same facial features and identity' },
        { id: 'porcelain', name: 'Porcelain Skin', prompt: 'Make skin porcelain-like while keeping the same facial features and identity' },
        { id: 'olive', name: 'Olive Skin', prompt: 'Change skin tone to olive while keeping the same facial features and identity' },
        { id: 'golden', name: 'Golden Skin', prompt: 'Add a golden undertone while keeping the same facial features and identity' },
        { id: 'rosy', name: 'Rosy Skin', prompt: 'Add a rosy undertone while keeping the same facial features and identity' },
        { id: 'bronzed', name: 'Bronzed Skin', prompt: 'Add a bronzed look while keeping the same facial features and identity' },
        { id: 'natural', name: 'Natural Skin', prompt: 'Make skin look more natural while keeping the same facial features and identity' }
      ]
    },
    'age': {
      name: 'Age',
      type: 'slider',
      minAge: 5,
      maxAge: 80,
      defaultAge: 25
    },
    'race': {
      name: 'Race',
      edits: [
        { id: 'white', name: 'White', prompt: 'Change the person to appear white while keeping the same facial features and identity' },
        { id: 'black', name: 'Black', prompt: 'Change the person to appear black while keeping the same facial features and identity' },
        { id: 'asian', name: 'Asian', prompt: 'Change the person to appear Asian while keeping the same facial features and identity' },
        { id: 'hispanic', name: 'Hispanic', prompt: 'Change the person to appear Hispanic while keeping the same facial features and identity' },
        { id: 'middle-eastern', name: 'Middle Eastern', prompt: 'Change the person to appear Middle Eastern while keeping the same facial features and identity' },
        { id: 'indian', name: 'Indian', prompt: 'Change the person to appear Indian while keeping the same facial features and identity' },
        { id: 'mixed', name: 'Mixed Race', prompt: 'Change the person to appear mixed race while keeping the same facial features and identity' },
        { id: 'mediterranean', name: 'Mediterranean', prompt: 'Change the person to appear Mediterranean while keeping the same facial features and identity' },
        { id: 'nordic', name: 'Nordic', prompt: 'Change the person to appear Nordic while keeping the same facial features and identity' },
        { id: 'caribbean', name: 'Caribbean', prompt: 'Change the person to appear Caribbean while keeping the same facial features and identity' }
      ]
    },
    'clothing': {
      name: 'Clothing',
      edits: [
        { id: 'casual', name: 'Casual', prompt: 'Change the clothing to casual wear while keeping the same facial features and identity' },
        { id: 'formal', name: 'Formal', prompt: 'Change the clothing to formal wear while keeping the same facial features and identity' },
        { id: 'bohemian', name: 'Bohemian', prompt: 'Change the clothing to bohemian style while keeping the same facial features and identity' },
        { id: 'business', name: 'Business', prompt: 'Change the clothing to business attire while keeping the same facial features and identity' },
        { id: 'streetwear', name: 'Streetwear', prompt: 'Change the clothing to streetwear while keeping the same facial features and identity' },
        { id: 'vintage', name: 'Vintage', prompt: 'Change the clothing to vintage style while keeping the same facial features and identity' },
        { id: 'athletic', name: 'Athletic', prompt: 'Change the clothing to athletic wear while keeping the same facial features and identity' },
        { id: 'elegant', name: 'Elegant', prompt: 'Change the clothing to elegant attire while keeping the same facial features and identity' },
        { id: 'punk', name: 'Punk', prompt: 'Change the clothing to punk style while keeping the same facial features and identity' },
        { id: 'preppy', name: 'Preppy', prompt: 'Change the clothing to preppy style while keeping the same facial features and identity' },
        { id: 'gothic', name: 'Gothic', prompt: 'Change the clothing to gothic style while keeping the same facial features and identity' },
        { id: 'minimalist', name: 'Minimalist', prompt: 'Change the clothing to minimalist style while keeping the same facial features and identity' },
        { id: 'luxury', name: 'Luxury', prompt: 'Change the clothing to luxury attire while keeping the same facial features and identity' },
        { id: 'artistic', name: 'Artistic', prompt: 'Change the clothing to artistic style while keeping the same facial features and identity' },
        { id: 'sophisticated', name: 'Sophisticated', prompt: 'Change the clothing to sophisticated attire while keeping the same facial features and identity' }
      ]
    },
    'accessories': {
      name: 'Accessories',
      edits: [
        { id: 'glasses', name: 'Glasses', prompt: 'Add glasses while keeping the same facial features and identity' },
        { id: 'sunglasses', name: 'Sunglasses', prompt: 'Add sunglasses while keeping the same facial features and identity' },
        { id: 'earrings', name: 'Earrings', prompt: 'Add earrings while keeping the same facial features and identity' },
        { id: 'necklace', name: 'Necklace', prompt: 'Add a necklace while keeping the same facial features and identity' },
        { id: 'tattoo', name: 'Tattoo', prompt: 'Add a tattoo while keeping the same facial features and identity' },
        { id: 'piercing', name: 'Piercing', prompt: 'Add a piercing while keeping the same facial features and identity' },
        { id: 'hat', name: 'Hat', prompt: 'Add a hat while keeping the same facial features and identity' },
        { id: 'scarf', name: 'Scarf', prompt: 'Add a scarf while keeping the same facial features and identity' },
        { id: 'watch', name: 'Watch', prompt: 'Add a watch while keeping the same facial features and identity' },
        { id: 'bracelet', name: 'Bracelet', prompt: 'Add a bracelet while keeping the same facial features and identity' },
        { id: 'ring', name: 'Ring', prompt: 'Add a ring while keeping the same facial features and identity' },
        { id: 'tie', name: 'Tie', prompt: 'Add a tie while keeping the same facial features and identity' },
        { id: 'bow-tie', name: 'Bow Tie', prompt: 'Add a bow tie while keeping the same facial features and identity' },
        { id: 'bandana', name: 'Bandana', prompt: 'Add a bandana while keeping the same facial features and identity' },
        { id: 'mask', name: 'Mask', prompt: 'Add a mask while keeping the same facial features and identity' }
      ]
    },
    'expressions': {
      name: 'Expressions',
      edits: [
        { id: 'happy', name: 'Happy', prompt: 'Change the expression to happy while keeping the same facial features and identity' },
        { id: 'sad', name: 'Sad', prompt: 'Change the expression to sad while keeping the same facial features and identity' },
        { id: 'angry', name: 'Angry', prompt: 'Change the expression to angry while keeping the same facial features and identity' },
        { id: 'surprised', name: 'Surprised', prompt: 'Change the expression to surprised while keeping the same facial features and identity' },
        { id: 'scared', name: 'Scared', prompt: 'Change the expression to scared while keeping the same facial features and identity' },
        { id: 'confident', name: 'Confident', prompt: 'Change the expression to confident while keeping the same facial features and identity' },
        { id: 'mysterious', name: 'Mysterious', prompt: 'Change the expression to mysterious while keeping the same facial features and identity' },
        { id: 'serious', name: 'Serious', prompt: 'Change the expression to serious while keeping the same facial features and identity' },
        { id: 'playful', name: 'Playful', prompt: 'Change the expression to playful while keeping the same facial features and identity' },
        { id: 'determined', name: 'Determined', prompt: 'Change the expression to determined while keeping the same facial features and identity' },
        { id: 'thoughtful', name: 'Thoughtful', prompt: 'Change the expression to thoughtful while keeping the same facial features and identity' },
        { id: 'excited', name: 'Excited', prompt: 'Change the expression to excited while keeping the same facial features and identity' },
        { id: 'calm', name: 'Calm', prompt: 'Change the expression to calm while keeping the same facial features and identity' },
        { id: 'friendly', name: 'Friendly', prompt: 'Change the expression to friendly while keeping the same facial features and identity' },
        { id: 'professional', name: 'Professional', prompt: 'Change the expression to professional while keeping the same facial features and identity' }
      ]
    }
  };

  // Membership Plans
  const membershipPlans = [
    {
      id: 'free',
      name: 'Free',
      price: 0,
      priceText: '$0',
      period: '',
      generationsPerDay: 3,
      generationsPerMonth: 90,
      features: [
        '3 image generations per day',
        'Access to basic styles',
        'Try before you commit',
        'Watermarked images'
      ],
      description: 'Perfect for casual use & testing AI photo magic.',
      color: '#00ff88',
      popular: false,
      badge: '🟢'
    },
    {
      id: 'pro',
      name: 'Pro',
      price: 9.99,
      priceText: '$9.99',
      period: '/ month',
      generationsPerDay: 20,
      generationsPerMonth: 600,
      features: [
        '20 image generations per day',
        'No watermark',
        'High-quality resolution',
        'Access to all Pro styles',
        'No ads'
      ],
      description: 'Best value for creators, influencers & everyday use.',
      color: '#ffd700',
      popular: true,
      badge: '🟡'
    },
    {
      id: 'studio',
      name: 'Studio',
      price: 19.99,
      priceText: '$19.99',
      period: '/ month',
      quarterlyPrice: 49.99,
      generationsPerDay: 1000,
      generationsPerMonth: 1000,
      features: [
        '1000 image generations per month',
        'Exclusive styles & early feature access',
        'All Pro benefits included'
      ],
      description: 'Built for pros, content creators, and high-volume users.',
      color: '#ff6b35',
      popular: false,
      badge: '🔴'
    }
  ];

  // Extra Generations Package
  const extraGenerationsPackage = {
    id: 'extra-generations',
    name: 'Extra Generations',
    price: 4.99,
    priceText: '$4.99',
    generations: 20,
    description: 'Need more? Buy 20 extra generations anytime.',
    color: '#8B5CF6',
    badge: '💥'
  };

  // Quick generation ideas for each universe
  const universeQuickIdeas = {
    'avengers': [
      { id: 'iron-man-suit', text: 'Iron Man Suit', prompt: 'wearing Iron Man armor with glowing arc reactor' },
      { id: 'captain-america', text: 'Captain America', prompt: 'as Captain America with shield and star-spangled suit' },
      { id: 'thor', text: 'Thor', prompt: 'as Thor with Mjolnir and lightning powers' },
      { id: 'hulk', text: 'Hulk', prompt: 'transformed into the Incredible Hulk' },
      { id: 'black-widow', text: 'Black Widow', prompt: 'as Black Widow in tactical suit with weapons' }
    ],
    'lord-of-the-rings': [
      { id: 'aragorn', text: 'Aragorn', prompt: 'as Aragorn with sword and ranger gear' },
      { id: 'gandalf', text: 'Gandalf', prompt: 'as Gandalf with staff and wizard robes' },
      { id: 'legolas', text: 'Legolas', prompt: 'as Legolas with bow and elven armor' },
      { id: 'frodo', text: 'Frodo', prompt: 'as Frodo with the One Ring' },
      { id: 'gimli', text: 'Gimli', prompt: 'as Gimli with axe and dwarf armor' }
    ],
    'star-wars': [
      { id: 'jedi', text: 'Jedi', prompt: 'as a Jedi with lightsaber and robes' },
      { id: 'sith', text: 'Sith', prompt: 'as a Sith Lord with red lightsaber' },
      { id: 'mandalorian', text: 'Mandalorian', prompt: 'as a Mandalorian with beskar armor' },
      { id: 'bounty-hunter', text: 'Bounty Hunter', prompt: 'as a bounty hunter with weapons' },
      { id: 'stormtrooper', text: 'Stormtrooper', prompt: 'as a stormtrooper in white armor' }
    ],
    'harry-potter': [
      { id: 'gryffindor', text: 'Gryffindor', prompt: 'in Gryffindor robes with wand' },
      { id: 'slytherin', text: 'Slytherin', prompt: 'in Slytherin robes with wand' },
      { id: 'ravenclaw', text: 'Ravenclaw', prompt: 'in Ravenclaw robes with wand' },
      { id: 'hufflepuff', text: 'Hufflepuff', prompt: 'in Hufflepuff robes with wand' },
      { id: 'dumbledore', text: 'Dumbledore', prompt: 'as Dumbledore with long beard and robes' }
    ],
    'game-of-thrones': [
      { id: 'stark', text: 'House Stark', prompt: 'as a Stark with direwolf sigil' },
      { id: 'lannister', text: 'House Lannister', prompt: 'as a Lannister with lion sigil' },
      { id: 'targaryen', text: 'House Targaryen', prompt: 'as a Targaryen with dragon' },
      { id: 'night-watch', text: 'Night\'s Watch', prompt: 'as a member of the Night\'s Watch' },
      { id: 'white-walker', text: 'White Walker', prompt: 'as a White Walker with blue eyes' }
    ],
    'frozen': [
      { id: 'elsa', text: 'Elsa', prompt: 'as Elsa with ice powers and blue dress' },
      { id: 'anna', text: 'Anna', prompt: 'as Anna with red hair and green dress' },
      { id: 'olaf', text: 'Olaf', prompt: 'as Olaf the snowman' },
      { id: 'kristoff', text: 'Kristoff', prompt: 'as Kristoff with reindeer' },
      { id: 'ice-queen', text: 'Ice Queen', prompt: 'as an ice queen with magical powers' }
    ],
    'pulp-fiction': [
      { id: 'jules', text: 'Jules', prompt: 'as Jules Winnfield in black suit' },
      { id: 'vincent', text: 'Vincent', prompt: 'as Vincent Vega in black suit' },
      { id: 'mia', text: 'Mia', prompt: 'as Mia Wallace in white dress' },
      { id: 'butch', text: 'Butch', prompt: 'as Butch Coolidge in boxing gear' },
      { id: 'gangster', text: 'Gangster', prompt: 'as a 90s gangster with attitude' }
    ],
    'avatar': [
      { id: 'na-vi', text: 'Na\'vi', prompt: 'as a Na\'vi with blue skin and tail' },
      { id: 'avatar-body', text: 'Avatar Body', prompt: 'in an avatar body with blue skin' },
      { id: 'pandora', text: 'Pandora', prompt: 'on Pandora with bioluminescent plants' },
      { id: 'flying-creature', text: 'Flying Creature', prompt: 'riding a flying creature on Pandora' },
      { id: 'warrior', text: 'Warrior', prompt: 'as a Na\'vi warrior with weapons' }
    ],
    'dark-knight': [
      { id: 'batman', text: 'Batman', prompt: 'as Batman with cape and cowl' },
      { id: 'joker', text: 'Joker', prompt: 'as the Joker with green hair and makeup' },
      { id: 'harvey-dent', text: 'Harvey Dent', prompt: 'as Harvey Dent/Two-Face' },
      { id: 'gotham', text: 'Gotham', prompt: 'in Gotham City with dark atmosphere' },
      { id: 'vigilante', text: 'Vigilante', prompt: 'as a vigilante in the night' }
    ],
    'friends': [
      { id: 'central-perk', text: 'Central Perk', prompt: 'at Central Perk coffee shop' },
      { id: '90s-style', text: '90s Style', prompt: 'in 90s fashion and style' },
      { id: 'new-york', text: 'New York', prompt: 'in New York City atmosphere' },
      { id: 'apartment', text: 'Apartment', prompt: 'in the Friends apartment' },
      { id: 'casual', text: 'Casual', prompt: 'in casual 90s clothing' }
    ],
    'squid-game': [
      { id: 'player', text: 'Player', prompt: 'as a Squid Game player in green tracksuit' },
      { id: 'guard', text: 'Guard', prompt: 'as a Squid Game guard in pink suit' },
      { id: 'mask', text: 'Mask', prompt: 'wearing a Squid Game mask' },
      { id: 'game', text: 'Game', prompt: 'participating in a deadly game' },
      { id: 'survival', text: 'Survival', prompt: 'fighting for survival' }
    ],
    'stranger-things': [
      { id: 'hawkins', text: 'Hawkins', prompt: 'in Hawkins with 80s atmosphere' },
      { id: 'upside-down', text: 'Upside Down', prompt: 'in the Upside Down dimension' },
      { id: 'demogorgon', text: 'Demogorgon', prompt: 'with Demogorgon creature' },
      { id: '80s-style', text: '80s Style', prompt: 'in 80s fashion and style' },
      { id: 'supernatural', text: 'Supernatural', prompt: 'with supernatural elements' }
    ],
    'mandalorian': [
      { id: 'beskar-armor', text: 'Beskar Armor', prompt: 'in Mandalorian beskar armor' },
      { id: 'baby-yoda', text: 'Baby Yoda', prompt: 'with Grogu (Baby Yoda)' },
      { id: 'bounty-hunter', text: 'Bounty Hunter', prompt: 'as a bounty hunter' },
      { id: 'galaxy', text: 'Galaxy', prompt: 'in the Star Wars galaxy' },
      { id: 'weapons', text: 'Weapons', prompt: 'with Mandalorian weapons' }
    ],
    'simpsons': [
      { id: 'springfield', text: 'Springfield', prompt: 'in Springfield with yellow skin' },
      { id: 'cartoon', text: 'Cartoon', prompt: 'as a Simpsons character' },
      { id: 'family', text: 'Family', prompt: 'as part of the Simpsons family' },
      { id: 'nuclear-plant', text: 'Nuclear Plant', prompt: 'at the nuclear power plant' },
      { id: 'animated', text: 'Animated', prompt: 'in animated Simpsons style' }
    ],
    'walking-dead': [
      { id: 'zombie', text: 'Zombie', prompt: 'as a zombie apocalypse survivor' },
      { id: 'survivor', text: 'Survivor', prompt: 'as a survivor with weapons' },
      { id: 'apocalypse', text: 'Apocalypse', prompt: 'in post-apocalyptic world' },
      { id: 'group', text: 'Group', prompt: 'with survivor group' },
      { id: 'danger', text: 'Danger', prompt: 'in dangerous zombie world' }
    ],
    'vikings': [
      { id: 'warrior', text: 'Warrior', prompt: 'as a Viking warrior with axe' },
      { id: 'helmet', text: 'Helmet', prompt: 'wearing Viking helmet with horns' },
      { id: 'longship', text: 'Longship', prompt: 'on a Viking longship' },
      { id: 'battle', text: 'Battle', prompt: 'in Viking battle scene' },
      { id: 'norse', text: 'Norse', prompt: 'with Norse mythology elements' }
    ],
    'call-of-duty': [
      { id: 'soldier', text: 'Soldier', prompt: 'as a modern military soldier' },
      { id: 'combat', text: 'Combat', prompt: 'in intense combat situation' },
      { id: 'weapons', text: 'Weapons', prompt: 'with military weapons and gear' },
      { id: 'battlefield', text: 'Battlefield', prompt: 'on modern battlefield' },
      { id: 'tactical', text: 'Tactical', prompt: 'in tactical military gear' }
    ],
    'cyberpunk-2077': [
      { id: 'cyberware', text: 'Cyberware', prompt: 'with cybernetic implants' },
      { id: 'neon', text: 'Neon', prompt: 'in neon-lit cyberpunk city' },
      { id: 'hacker', text: 'Hacker', prompt: 'as a cyberpunk hacker' },
      { id: 'future', text: 'Future', prompt: 'in futuristic dystopian world' },
      { id: 'tech', text: 'Tech', prompt: 'with advanced technology' }
    ],
    'gta': [
      { id: 'gangster', text: 'Gangster', prompt: 'as a GTA gangster' },
      { id: 'criminal', text: 'Criminal', prompt: 'as a criminal in open world' },
      { id: 'city', text: 'City', prompt: 'in GTA city environment' },
      { id: 'action', text: 'Action', prompt: 'in action-packed scene' },
      { id: 'street', text: 'Street', prompt: 'on the streets of the city' }
    ],
    'league-of-legends': [
      { id: 'champion', text: 'Champion', prompt: 'as a League of Legends champion' },
      { id: 'battle', text: 'Battle', prompt: 'in epic battle scene' },
      { id: 'summoners-rift', text: 'Summoner\'s Rift', prompt: 'on Summoner\'s Rift' },
      { id: 'fantasy', text: 'Fantasy', prompt: 'in fantasy world' },
      { id: 'magic', text: 'Magic', prompt: 'with magical powers' }
    ],
    'red-dead-redemption': [
      { id: 'cowboy', text: 'Cowboy', prompt: 'as a Wild West cowboy' },
      { id: 'outlaw', text: 'Outlaw', prompt: 'as an outlaw in the West' },
      { id: 'western', text: 'Western', prompt: 'in Wild West setting' },
      { id: 'horse', text: 'Horse', prompt: 'riding a horse in the West' },
      { id: 'frontier', text: 'Frontier', prompt: 'on the American frontier' }
    ],
    'last-of-us': [
      { id: 'survivor', text: 'Survivor', prompt: 'as a post-apocalyptic survivor' },
      { id: 'zombie', text: 'Zombie', prompt: 'with infected creatures' },
      { id: 'apocalypse', text: 'Apocalypse', prompt: 'in post-apocalyptic world' },
      { id: 'nature', text: 'Nature', prompt: 'in overgrown nature' },
      { id: 'danger', text: 'Danger', prompt: 'in dangerous world' }
    ],
    'witcher': [
      { id: 'witcher', text: 'Witcher', prompt: 'as a Witcher with silver sword' },
      { id: 'monster-hunter', text: 'Monster Hunter', prompt: 'hunting monsters' },
      { id: 'medieval', text: 'Medieval', prompt: 'in medieval fantasy world' },
      { id: 'magic', text: 'Magic', prompt: 'with magical abilities' },
      { id: 'adventure', text: 'Adventure', prompt: 'on epic adventure' }
    ],
    'world-of-warcraft': [
      { id: 'alliance', text: 'Alliance', prompt: 'as Alliance character' },
      { id: 'horde', text: 'Horde', prompt: 'as Horde character' },
      { id: 'fantasy', text: 'Fantasy', prompt: 'in fantasy Azeroth world' },
      { id: 'adventure', text: 'Adventure', prompt: 'on epic quest' },
      { id: 'magic', text: 'Magic', prompt: 'with magical powers' }
    ]
  };

  // Default prompts for each universe
  const universeDefaultPrompts = {
    'avengers': 'Transform this person into a character from the Marvel Avengers universe, super realistic 4k, cinematic lighting, detailed costume, heroic pose',
    'lord-of-the-rings': 'Transform this person into a character from the Lord of the Rings universe, super realistic 4k, epic fantasy atmosphere, detailed costume',
    'star-wars': 'Transform this person into a character from the Star Wars universe, super realistic 4k, sci-fi atmosphere, detailed costume and props',
    'harry-potter': 'Transform this person into a character from the Harry Potter universe, super realistic 4k, magical atmosphere, detailed robes and wand',
    'game-of-thrones': 'Transform this person into a character from the Game of Thrones universe, super realistic 4k, medieval fantasy atmosphere, detailed costume',
    'frozen': 'Transform this person into a character from the Frozen universe, super realistic 4k, magical winter atmosphere, detailed costume',
    'pulp-fiction': 'Transform this person into a character from the Pulp Fiction universe, super realistic 4k, 90s atmosphere, detailed costume',
    'avatar': 'Transform this person into a character from the Avatar universe, super realistic 4k, sci-fi atmosphere, detailed costume',
    'dark-knight': 'Transform this person into a character from the Dark Knight universe, super realistic 4k, dark atmosphere, detailed costume',
    'friends': 'Transform this person into a character from the Friends universe, super realistic 4k, 90s atmosphere, detailed costume',
    'squid-game': 'Transform this person into a character from the Squid Game universe, super realistic 4k, intense atmosphere, detailed costume',
    'stranger-things': 'Transform this person into a character from the Stranger Things universe, super realistic 4k, 80s atmosphere, detailed costume',
    'mandalorian': 'Transform this person into a character from the Mandalorian universe, super realistic 4k, sci-fi atmosphere, detailed armor',
    'simpsons': 'Transform this person into a character from the Simpsons universe, super realistic 4k, animated style, detailed costume',
    'walking-dead': 'Transform this person into a character from the Walking Dead universe, super realistic 4k, post-apocalyptic atmosphere, detailed costume',
    'vikings': 'Transform this person into a character from the Vikings universe, super realistic 4k, medieval atmosphere, detailed costume',
    'call-of-duty': 'Transform this person into a character from the Call of Duty universe, super realistic 4k, military atmosphere, detailed gear',
    'cyberpunk-2077': 'Transform this person into a character from the Cyberpunk 2077 universe, super realistic 4k, futuristic atmosphere, detailed cyberware',
    'gta': 'Transform this person into a character from the GTA universe, super realistic 4k, urban atmosphere, detailed costume',
    'league-of-legends': 'Transform this person into a character from the League of Legends universe, super realistic 4k, fantasy atmosphere, detailed costume',
    'red-dead-redemption': 'Transform this person into a character from the Red Dead Redemption universe, super realistic 4k, western atmosphere, detailed costume',
    'last-of-us': 'Transform this person into a character from the Last of Us universe, super realistic 4k, post-apocalyptic atmosphere, detailed costume',
    'witcher': 'Transform this person into a character from the Witcher universe, super realistic 4k, medieval fantasy atmosphere, detailed costume',
    'world-of-warcraft': 'Transform this person into a character from the World of Warcraft universe, super realistic 4k, fantasy atmosphere, detailed costume'
  };

    // Default prompts for celebrities - authentic iPhone selfie style
  const celebrityDefaultPrompts = {
    // Keep only the 5 new Wikipedia celebrities
    'taylor-swift-wiki': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Taylor Swift stands next to him, both caught in a casual, imperfect moment. The background shows a lively Downtown LA at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'tom-cruise-wiki': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Tom Cruise stands next to him, both caught in a casual, imperfect moment. The background shows a lively Beverly Hills at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'angelina-jolie-wiki': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Angelina Jolie stands next to him, both caught in a casual, imperfect moment. The background shows a lively Venice Beach at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'johnny-depp-wiki': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Johnny Depp stands next to him, both caught in a casual, imperfect moment. The background shows a lively Downtown LA at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'jennifer-lawrence-wiki': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Jennifer Lawrence stands next to him, both caught in a casual, imperfect moment. The background shows a lively Downtown LA at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'drake': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Drake stands next to him, both caught in a casual, imperfect moment. The background shows a lively Long Beach at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'ed-sheeran': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Ed Sheeran stands next to him, both caught in a casual, imperfect moment. The background shows a lively Downtown LA at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'ariana-grande': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Ariana Grande stands next to him, both caught in a casual, imperfect moment. The background shows a lively Marina del Rey at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'justin-bieber': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Justin Bieber stands next to him, both caught in a casual, imperfect moment. The background shows a lively Manhattan Beach at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'beyonc': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Beyoncé stands next to him, both caught in a casual, imperfect moment. The background shows a lively Manhattan Beach at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'rihanna': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Rihanna stands next to him, both caught in a casual, imperfect moment. The background shows a lively Studio City at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'the-weeknd': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and The Weeknd stands next to him, both caught in a casual, imperfect moment. The background shows a lively Silver Lake at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'post-malone': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Post Malone stands next to him, both caught in a casual, imperfect moment. The background shows a lively Long Beach at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'billie-eilish': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Billie Eilish stands next to him, both caught in a casual, imperfect moment. The background shows a lively Los Feliz at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'dua-lipa': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Dua Lipa stands next to him, both caught in a casual, imperfect moment. The background shows a lively Glendale at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'lady-gaga': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Lady Gaga stands next to him, both caught in a casual, imperfect moment. The background shows a lively Echo Park at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'bruno-mars': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Bruno Mars stands next to him, both caught in a casual, imperfect moment. The background shows a lively Silver Lake at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'adele': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Adele stands next to him, both caught in a casual, imperfect moment. The background shows a lively Santa Monica Pier at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'kendrick-lamar': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Kendrick Lamar stands next to him, both caught in a casual, imperfect moment. The background shows a lively Studio City at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'travis-scott': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Travis Scott stands next to him, both caught in a casual, imperfect moment. The background shows a lively West Hollywood at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'cardi-b': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Cardi B stands next to him, both caught in a casual, imperfect moment. The background shows a lively Melrose Avenue at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'nicki-minaj': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Nicki Minaj stands next to him, both caught in a casual, imperfect moment. The background shows a lively Pasadena at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'doja-cat': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Doja Cat stands next to him, both caught in a casual, imperfect moment. The background shows a lively Burbank at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'olivia-rodrigo': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Olivia Rodrigo stands next to him, both caught in a casual, imperfect moment. The background shows a lively Pasadena at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'lil-nas-x': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Lil Nas X stands next to him, both caught in a casual, imperfect moment. The background shows a lively Pasadena at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'bad-bunny': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Bad Bunny stands next to him, both caught in a casual, imperfect moment. The background shows a lively Downtown LA at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'j-balvin': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and J Balvin stands next to him, both caught in a casual, imperfect moment. The background shows a lively Malibu at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'shakira': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Shakira stands next to him, both caught in a casual, imperfect moment. The background shows a lively West Hollywood at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'maluma': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Maluma stands next to him, both caught in a casual, imperfect moment. The background shows a lively Long Beach at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'karol-g': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Karol G stands next to him, both caught in a casual, imperfect moment. The background shows a lively Highland Park at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'anitta': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Anitta stands next to him, both caught in a casual, imperfect moment. The background shows a lively Highland Park at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'bts': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and BTS stands next to him, both caught in a casual, imperfect moment. The background shows a lively Hermosa Beach at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'blackpink': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Blackpink stands next to him, both caught in a casual, imperfect moment. The background shows a lively Manhattan Beach at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'twice': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Twice stands next to him, both caught in a casual, imperfect moment. The background shows a lively Burbank at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'red-velvet': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Red Velvet stands next to him, both caught in a casual, imperfect moment. The background shows a lively Downtown LA at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'coldplay': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Coldplay stands next to him, both caught in a casual, imperfect moment. The background shows a lively Downtown LA Arts District at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'imagine-dragons': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Imagine Dragons stands next to him, both caught in a casual, imperfect moment. The background shows a lively Venice Beach Boardwalk at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'maroon-5': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Maroon 5 stands next to him, both caught in a casual, imperfect moment. The background shows a lively Silver Lake at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'one-direction': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and One Direction stands next to him, both caught in a casual, imperfect moment. The background shows a lively Manhattan Beach at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'harry-styles': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Harry Styles stands next to him, both caught in a casual, imperfect moment. The background shows a lively Long Beach at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'zayn-malik': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Zayn Malik stands next to him, both caught in a casual, imperfect moment. The background shows a lively West Hollywood at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'niall-horan': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Niall Horan stands next to him, both caught in a casual, imperfect moment. The background shows a lively Glendale at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'liam-payne': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Liam Payne stands next to him, both caught in a casual, imperfect moment. The background shows a lively Redondo Beach at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'louis-tomlinson': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Louis Tomlinson stands next to him, both caught in a casual, imperfect moment. The background shows a lively Santa Monica at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'shawn-mendes': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Shawn Mendes stands next to him, both caught in a casual, imperfect moment. The background shows a lively Los Feliz at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'leonardo-dicaprio': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Leonardo DiCaprio stands next to him, both caught in a casual, imperfect moment. The background shows a lively Studio City at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'brad-pitt': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Brad Pitt stands next to him, both caught in a casual, imperfect moment. The background shows a lively Glendale at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'angelina-jolie': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Angelina Jolie stands next to him, both caught in a casual, imperfect moment. The background shows a lively Venice Beach Boardwalk at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'johnny-depp': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Johnny Depp stands next to him, both caught in a casual, imperfect moment. The background shows a lively Echo Park at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'jennifer-lawrence': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Jennifer Lawrence stands next to him, both caught in a casual, imperfect moment. The background shows a lively Glendale at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'scarlett-johansson': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Scarlett Johansson stands next to him, both caught in a casual, imperfect moment. The background shows a lively Santa Monica Pier at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'margot-robbie': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Margot Robbie stands next to him, both caught in a casual, imperfect moment. The background shows a lively Hermosa Beach at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'gal-gadot': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Gal Gadot stands next to him, both caught in a casual, imperfect moment. The background shows a lively Echo Park at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'henry-cavill': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Henry Cavill stands next to him, both caught in a casual, imperfect moment. The background shows a lively Marina del Rey at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'ryan-reynolds': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Ryan Reynolds stands next to him, both caught in a casual, imperfect moment. The background shows a lively Pasadena at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'hugh-jackman': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Hugh Jackman stands next to him, both caught in a casual, imperfect moment. The background shows a lively Studio City at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'robert-downey-jr': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Robert Downey Jr. stands next to him, both caught in a casual, imperfect moment. The background shows a lively Beverly Hills at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'chris-hemsworth': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Chris Hemsworth stands next to him, both caught in a casual, imperfect moment. The background shows a lively Studio City at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'chris-evans': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Chris Evans stands next to him, both caught in a casual, imperfect moment. The background shows a lively Highland Park at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'mark-ruffalo': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Mark Ruffalo stands next to him, both caught in a casual, imperfect moment. The background shows a lively Manhattan Beach at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'jeremy-renner': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Jeremy Renner stands next to him, both caught in a casual, imperfect moment. The background shows a lively Studio City at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'tom-holland': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Tom Holland stands next to him, both caught in a casual, imperfect moment. The background shows a lively Culver City at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'zendaya': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Zendaya stands next to him, both caught in a casual, imperfect moment. The background shows a lively Pasadena at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'timothe-chalamet': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Timothée Chalamet stands next to him, both caught in a casual, imperfect moment. The background shows a lively Hollywood Boulevard at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'florence-pugh': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Florence Pugh stands next to him, both caught in a casual, imperfect moment. The background shows a lively Glendale at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'sydney-sweeney': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Sydney Sweeney stands next to him, both caught in a casual, imperfect moment. The background shows a lively Los Feliz at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'jenna-ortega': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Jenna Ortega stands next to him, both caught in a casual, imperfect moment. The background shows a lively Studio City at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'millie-bobby-brown': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Millie Bobby Brown stands next to him, both caught in a casual, imperfect moment. The background shows a lively Venice Beach at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'noah-schnapp': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Noah Schnapp stands next to him, both caught in a casual, imperfect moment. The background shows a lively Beverly Hills at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'finn-wolfhard': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Finn Wolfhard stands next to him, both caught in a casual, imperfect moment. The background shows a lively Echo Park at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'caleb-mclaughlin': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Caleb McLaughlin stands next to him, both caught in a casual, imperfect moment. The background shows a lively Studio City at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'gaten-matarazzo': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Gaten Matarazzo stands next to him, both caught in a casual, imperfect moment. The background shows a lively West Hollywood at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'sadie-sink': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Sadie Sink stands next to him, both caught in a casual, imperfect moment. The background shows a lively Studio City at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'maya-hawke': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Maya Hawke stands next to him, both caught in a casual, imperfect moment. The background shows a lively Pasadena at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'natalia-dyer': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Natalia Dyer stands next to him, both caught in a casual, imperfect moment. The background shows a lively Pasadena at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'emma-stone': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Emma Stone stands next to him, both caught in a casual, imperfect moment. The background shows a lively Glendale at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'ryan-gosling': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Ryan Gosling stands next to him, both caught in a casual, imperfect moment. The background shows a lively Burbank at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'emma-watson': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Emma Watson stands next to him, both caught in a casual, imperfect moment. The background shows a lively Manhattan Beach at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'daniel-radcliffe': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Daniel Radcliffe stands next to him, both caught in a casual, imperfect moment. The background shows a lively Venice Beach Boardwalk at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'rupert-grint': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Rupert Grint stands next to him, both caught in a casual, imperfect moment. The background shows a lively Silver Lake at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'tom-hanks': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Tom Hanks stands next to him, both caught in a casual, imperfect moment. The background shows a lively Highland Park at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'will-smith': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Will Smith stands next to him, both caught in a casual, imperfect moment. The background shows a lively Highland Park at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'denzel-washington': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Denzel Washington stands next to him, both caught in a casual, imperfect moment. The background shows a lively Highland Park at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'morgan-freeman': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Morgan Freeman stands next to him, both caught in a casual, imperfect moment. The background shows a lively Studio City at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'samuel-l-jackson': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Samuel L. Jackson stands next to him, both caught in a casual, imperfect moment. The background shows a lively Santa Monica at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'meryl-streep': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Meryl Streep stands next to him, both caught in a casual, imperfect moment. The background shows a lively Downtown LA Arts District at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'sandra-bullock': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Sandra Bullock stands next to him, both caught in a casual, imperfect moment. The background shows a lively Los Feliz at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'julia-roberts': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Julia Roberts stands next to him, both caught in a casual, imperfect moment. The background shows a lively Pasadena at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'nicole-kidman': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Nicole Kidman stands next to him, both caught in a casual, imperfect moment. The background shows a lively Venice Beach Boardwalk at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'reese-witherspoon': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Reese Witherspoon stands next to him, both caught in a casual, imperfect moment. The background shows a lively Burbank at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'charlize-theron': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Charlize Theron stands next to him, both caught in a casual, imperfect moment. The background shows a lively Long Beach at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'cate-blanchett': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Cate Blanchett stands next to him, both caught in a casual, imperfect moment. The background shows a lively Los Feliz at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'viola-davis': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Viola Davis stands next to him, both caught in a casual, imperfect moment. The background shows a lively Burbank at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'octavia-spencer': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Octavia Spencer stands next to him, both caught in a casual, imperfect moment. The background shows a lively Melrose Avenue at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'lupita-nyongo': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Lupita Nyong\'o stands next to him, both caught in a casual, imperfect moment. The background shows a lively Burbank at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'lionel-messi': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Lionel Messi stands next to him, both caught in a casual, imperfect moment. The background shows a lively Long Beach at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'cristiano-ronaldo': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Cristiano Ronaldo stands next to him, both caught in a casual, imperfect moment. The background shows a lively Burbank at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'neymar': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Neymar stands next to him, both caught in a casual, imperfect moment. The background shows a lively Studio City at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'kylian-mbapp': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Kylian Mbapp\\u00e9 stands next to him, both caught in a casual, imperfect moment. The background shows a lively Venice Beach at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'erling-haaland': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Erling Haaland stands next to him, both caught in a casual, imperfect moment. The background shows a lively Downtown LA at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'mohamed-salah': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Mohamed Salah stands next to him, both caught in a casual, imperfect moment. The background shows a lively Marina del Rey at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'kevin-de-bruyne': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Kevin De Bruyne stands next to him, both caught in a casual, imperfect moment. The background shows a lively Manhattan Beach at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'virgil-van-dijk': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Virgil van Dijk stands next to him, both caught in a casual, imperfect moment. The background shows a lively Glendale at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'sadio-man': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Sadio Man\\u00e9 stands next to him, both caught in a casual, imperfect moment. The background shows a lively Santa Monica at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'robert-lewandowski': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Robert Lewandowski stands next to him, both caught in a casual, imperfect moment. The background shows a lively Pasadena at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'karim-benzema': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Karim Benzema stands next to him, both caught in a casual, imperfect moment. The background shows a lively Hollywood Boulevard at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'luka-modri': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Luka Modri\\u0107 stands next to him, both caught in a casual, imperfect moment. The background shows a lively Venice Beach Boardwalk at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'toni-kroos': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Toni Kroos stands next to him, both caught in a casual, imperfect moment. The background shows a lively Santa Monica Pier at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'sergio-ramos': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Sergio Ramos stands next to him, both caught in a casual, imperfect moment. The background shows a lively Studio City at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'gerard-piqu': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Gerard Piqu\\u00e9 stands next to him, both caught in a casual, imperfect moment. The background shows a lively Santa Monica at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'andrs-iniesta': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Andr\\u00e9s Iniesta stands next to him, both caught in a casual, imperfect moment. The background shows a lively Santa Monica Pier at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'xavi-hernndez': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Xavi Hern\\u00e1ndez stands next to him, both caught in a casual, imperfect moment. The background shows a lively Pasadena at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'iker-casillas': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Iker Casillas stands next to him, both caught in a casual, imperfect moment. The background shows a lively Downtown LA at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'carles-puyol': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Carles Puyol stands next to him, both caught in a casual, imperfect moment. The background shows a lively Burbank at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'david-villa': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and David Villa stands next to him, both caught in a casual, imperfect moment. The background shows a lively Culver City at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'lebron-james': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and LeBron James stands next to him, both caught in a casual, imperfect moment. The background shows a lively Los Feliz at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'stephen-curry': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Stephen Curry stands next to him, both caught in a casual, imperfect moment. The background shows a lively Highland Park at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'kevin-durant': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Kevin Durant stands next to him, both caught in a casual, imperfect moment. The background shows a lively Hollywood Boulevard at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'giannis-antetokounmpo': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Giannis Antetokounmpo stands next to him, both caught in a casual, imperfect moment. The background shows a lively Silver Lake at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'luka-doni': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Luka Don\\u010di\\u0107 stands next to him, both caught in a casual, imperfect moment. The background shows a lively Los Feliz at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'joel-embiid': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Joel Embiid stands next to him, both caught in a casual, imperfect moment. The background shows a lively Pasadena at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'nikola-joki': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Nikola Joki\\u0107 stands next to him, both caught in a casual, imperfect moment. The background shows a lively Pasadena at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'damian-lillard': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Damian Lillard stands next to him, both caught in a casual, imperfect moment. The background shows a lively Beverly Hills at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'james-harden': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and James Harden stands next to him, both caught in a casual, imperfect moment. The background shows a lively Echo Park at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'russell-westbrook': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Russell Westbrook stands next to him, both caught in a casual, imperfect moment. The background shows a lively Long Beach at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'anthony-davis': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Anthony Davis stands next to him, both caught in a casual, imperfect moment. The background shows a lively Burbank at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'kawhi-leonard': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Kawhi Leonard stands next to him, both caught in a casual, imperfect moment. The background shows a lively Culver City at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'paul-george': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Paul George stands next to him, both caught in a casual, imperfect moment. The background shows a lively West Hollywood at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'jimmy-butler': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Jimmy Butler stands next to him, both caught in a casual, imperfect moment. The background shows a lively Melrose Avenue at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'bam-adebayo': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Bam Adebayo stands next to him, both caught in a casual, imperfect moment. The background shows a lively Malibu at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'serena-williams': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Serena Williams stands next to him, both caught in a casual, imperfect moment. The background shows a lively Redondo Beach at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'venus-williams': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Venus Williams stands next to him, both caught in a casual, imperfect moment. The background shows a lively Los Feliz at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'roger-federer': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Roger Federer stands next to him, both caught in a casual, imperfect moment. The background shows a lively Malibu at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'rafael-nadal': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Rafael Nadal stands next to him, both caught in a casual, imperfect moment. The background shows a lively Downtown LA Arts District at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'novak-djokovic': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Novak Djokovic stands next to him, both caught in a casual, imperfect moment. The background shows a lively Silver Lake at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'usain-bolt': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Usain Bolt stands next to him, both caught in a casual, imperfect moment. The background shows a lively Downtown LA at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'michael-phelps': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Michael Phelps stands next to him, both caught in a casual, imperfect moment. The background shows a lively Malibu at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'simone-biles': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Simone Biles stands next to him, both caught in a casual, imperfect moment. The background shows a lively Highland Park at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'katie-ledecky': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Katie Ledecky stands next to him, both caught in a casual, imperfect moment. The background shows a lively Silver Lake at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'caeleb-dressel': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Caeleb Dressel stands next to him, both caught in a casual, imperfect moment. The background shows a lively Culver City at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'tiger-woods': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Tiger Woods stands next to him, both caught in a casual, imperfect moment. The background shows a lively Beverly Hills at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'rory-mcilroy': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Rory McIlroy stands next to him, both caught in a casual, imperfect moment. The background shows a lively Pasadena at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'jon-rahm': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Jon Rahm stands next to him, both caught in a casual, imperfect moment. The background shows a lively Glendale at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'dustin-johnson': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Dustin Johnson stands next to him, both caught in a casual, imperfect moment. The background shows a lively Burbank at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'brooks-koepka': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Brooks Koepka stands next to him, both caught in a casual, imperfect moment. The background shows a lively Redondo Beach at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'elon-musk': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Elon Musk stands next to him, both caught in a casual, imperfect moment. The background shows a lively Manhattan Beach at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'mark-zuckerberg': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Mark Zuckerberg stands next to him, both caught in a casual, imperfect moment. The background shows a lively Los Feliz at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'jeff-bezos': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Jeff Bezos stands next to him, both caught in a casual, imperfect moment. The background shows a lively Malibu at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'bill-gates': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Bill Gates stands next to him, both caught in a casual, imperfect moment. The background shows a lively Echo Park at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'warren-buffett': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Warren Buffett stands next to him, both caught in a casual, imperfect moment. The background shows a lively Venice Beach at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'jack-ma': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Jack Ma stands next to him, both caught in a casual, imperfect moment. The background shows a lively Melrose Avenue at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'larry-page': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Larry Page stands next to him, both caught in a casual, imperfect moment. The background shows a lively Studio City at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'sergey-brin': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Sergey Brin stands next to him, both caught in a casual, imperfect moment. The background shows a lively Los Feliz at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'sundar-pichai': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Sundar Pichai stands next to him, both caught in a casual, imperfect moment. The background shows a lively Studio City at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'tim-cook': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Tim Cook stands next to him, both caught in a casual, imperfect moment. The background shows a lively Downtown LA Arts District at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'satya-nadella': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Satya Nadella stands next to him, both caught in a casual, imperfect moment. The background shows a lively Santa Monica at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'jensen-huang': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Jensen Huang stands next to him, both caught in a casual, imperfect moment. The background shows a lively Studio City at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'sam-altman': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Sam Altman stands next to him, both caught in a casual, imperfect moment. The background shows a lively Beverly Hills at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'larry-ellison': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Larry Ellison stands next to him, both caught in a casual, imperfect moment. The background shows a lively Downtown LA Arts District at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'michael-dell': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Michael Dell stands next to him, both caught in a casual, imperfect moment. The background shows a lively Highland Park at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'steve-jobs': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Steve Jobs stands next to him, both caught in a casual, imperfect moment. The background shows a lively Culver City at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'paul-allen': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Paul Allen stands next to him, both caught in a casual, imperfect moment. The background shows a lively Beverly Hills at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'steve-wozniak': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Steve Wozniak stands next to him, both caught in a casual, imperfect moment. The background shows a lively Redondo Beach at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'reed-hastings': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Reed Hastings stands next to him, both caught in a casual, imperfect moment. The background shows a lively Melrose Avenue at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'marc-benioff': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Marc Benioff stands next to him, both caught in a casual, imperfect moment. The background shows a lively Hermosa Beach at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'joe-biden': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Joe Biden stands next to him, both caught in a casual, imperfect moment. The background shows a lively Glendale at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'donald-trump': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Donald Trump stands next to him, both caught in a casual, imperfect moment. The background shows a lively Manhattan Beach at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'barack-obama': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Barack Obama stands next to him, both caught in a casual, imperfect moment. The background shows a lively Venice Beach at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'hillary-clinton': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Hillary Clinton stands next to him, both caught in a casual, imperfect moment. The background shows a lively Los Feliz at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'kamala-harris': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Kamala Harris stands next to him, both caught in a casual, imperfect moment. The background shows a lively Echo Park at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'vladimir-putin': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Vladimir Putin stands next to him, both caught in a casual, imperfect moment. The background shows a lively Glendale at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'xi-jinping': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Xi Jinping stands next to him, both caught in a casual, imperfect moment. The background shows a lively Manhattan Beach at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'emmanuel-macron': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Emmanuel Macron stands next to him, both caught in a casual, imperfect moment. The background shows a lively Manhattan Beach at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'angela-merkel': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Angela Merkel stands next to him, both caught in a casual, imperfect moment. The background shows a lively Redondo Beach at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'justin-trudeau': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Justin Trudeau stands next to him, both caught in a casual, imperfect moment. The background shows a lively Pasadena at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'boris-johnson': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Boris Johnson stands next to him, both caught in a casual, imperfect moment. The background shows a lively Marina del Rey at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'narendra-modi': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Narendra Modi stands next to him, both caught in a casual, imperfect moment. The background shows a lively Downtown LA Arts District at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'jair-bolsonaro': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Jair Bolsonaro stands next to him, both caught in a casual, imperfect moment. The background shows a lively Pasadena at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'andrs-manuel-lpez-obrador': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Andrés Manuel López Obrador stands next to him, both caught in a casual, imperfect moment. The background shows a lively Downtown LA at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'pedro-snchez': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Pedro Sánchez stands next to him, both caught in a casual, imperfect moment. The background shows a lively Los Feliz at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'ninja': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Ninja stands next to him, both caught in a casual, imperfect moment. The background shows a lively Downtown LA Arts District at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'pewdiepie': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and PewDiePie stands next to him, both caught in a casual, imperfect moment. The background shows a lively Venice Beach at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'mrbeast': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and MrBeast stands next to him, both caught in a casual, imperfect moment. The background shows a lively West Hollywood at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'ishowspeed': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and IShowSpeed stands next to him, both caught in a casual, imperfect moment. The background shows a lively Echo Park at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'dream': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Dream stands next to him, both caught in a casual, imperfect moment. The background shows a lively Melrose Avenue at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'georgenotfound': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and GeorgeNotFound stands next to him, both caught in a casual, imperfect moment. The background shows a lively Silver Lake at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'sapnap': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Sapnap stands next to him, both caught in a casual, imperfect moment. The background shows a lively Burbank at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'badboyhalo': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and BadBoyHalo stands next to him, both caught in a casual, imperfect moment. The background shows a lively Highland Park at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'technoblade': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Technoblade stands next to him, both caught in a casual, imperfect moment. The background shows a lively Venice Beach Boardwalk at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'tommyinnit': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and TommyInnit stands next to him, both caught in a casual, imperfect moment. The background shows a lively Downtown LA Arts District at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'tubbo': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Tubbo stands next to him, both caught in a casual, imperfect moment. The background shows a lively Long Beach at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'ranboo': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Ranboo stands next to him, both caught in a casual, imperfect moment. The background shows a lively Los Feliz at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'quackity': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Quackity stands next to him, both caught in a casual, imperfect moment. The background shows a lively Pasadena at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'karl-jacobs': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Karl Jacobs stands next to him, both caught in a casual, imperfect moment. The background shows a lively Glendale at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'albert-einstein': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Albert Einstein stands next to him, both caught in a casual, imperfect moment. The background shows a lively Culver City at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'mahatma-gandhi': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Mahatma Gandhi stands next to him, both caught in a casual, imperfect moment. The background shows a lively Burbank at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'martin-luther-king-jr': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Martin Luther King Jr. stands next to him, both caught in a casual, imperfect moment. The background shows a lively Culver City at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'nelson-mandela': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Nelson Mandela stands next to him, both caught in a casual, imperfect moment. The background shows a lively Burbank at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'mother-teresa': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Mother Teresa stands next to him, both caught in a casual, imperfect moment. The background shows a lively Los Feliz at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'princess-diana': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Princess Diana stands next to him, both caught in a casual, imperfect moment. The background shows a lively Studio City at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'john-f-kennedy': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and John F. Kennedy stands next to him, both caught in a casual, imperfect moment. The background shows a lively Long Beach at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'abraham-lincoln': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Abraham Lincoln stands next to him, both caught in a casual, imperfect moment. The background shows a lively Malibu at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'winston-churchill': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Winston Churchill stands next to him, both caught in a casual, imperfect moment. The background shows a lively Studio City at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
    'queen-elizabeth-ii': 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and Queen Elizabeth II stands next to him, both caught in a casual, imperfect moment. The background shows a lively Studio City at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.',
  };

  // New Universe Data
  const universes = [
    // Movies
    {
      id: 'avengers',
      name: 'Avengers',
              image: '/images/Avengers.png',
      category: 'Movies',
      description: 'Join Earth\'s mightiest heroes in the Marvel Universe'
    },
    {
      id: 'casablanca',
      name: 'Casablanca',
              image: '/images/Casablanca.png',
      category: 'Movies',
      description: 'Experience the classic romance of 1940s Morocco'
    },
    {
      id: 'frozen',
      name: 'Frozen',
              image: '/images/Frozen.png',
      category: 'Movies',
      description: 'Enter the magical kingdom of Arendelle'
    },
    {
      id: 'harry-potter',
      name: 'Harry Potter',
              image: '/images/Harry Potter.png',
      category: 'Movies',
      description: 'Attend Hogwarts School of Witchcraft and Wizardry'
    },
    {
      id: 'lord-of-the-rings',
      name: 'Lord of the Rings',
              image: '/images/Lord of the Rings.png',
      category: 'Movies',
      description: 'Journey to Middle-earth as a legendary character'
    },
    {
      id: 'pulp-fiction',
      name: 'Pulp Fiction',
              image: '/images/Pulp Fiction.png',
      category: 'Movies',
      description: 'Enter the world of crime and redemption'
    },
    {
      id: 'star-wars',
      name: 'Star Wars',
              image: '/images/Star Wars.png',
      category: 'Movies',
      description: 'Join the epic battle between light and dark sides'
    },
    {
      id: 'avatar',
      name: 'The Avatar',
              image: '/images/The Avatar.png',
      category: 'Movies',
      description: 'Explore the mystical world of Pandora'
    },
    {
      id: 'dark-knight',
      name: 'The Dark Knight',
              image: '/images/The Dark Knight.png',
      category: 'Movies',
      description: 'Become Gotham\'s protector in the night'
    },
    {
      id: 'godfather',
      name: 'The Godfather',
              image: '/images/The Godfather.png',
      category: 'Movies',
      description: 'Enter the world of organized crime and family'
    },
    // TV Series
    {
      id: 'friends',
      name: 'Friends',
              image: '/images/Friends.png',
      category: 'TV Series',
      description: 'Join the iconic group of friends in New York'
    },
    {
      id: 'game-of-thrones',
      name: 'Game of Thrones',
              image: '/images/Game of Thrones.png',
      category: 'TV Series',
      description: 'Rule the Seven Kingdoms in Westeros'
    },
    {
      id: 'la-casa-de-papel',
      name: 'La Casa De Papel',
              image: '/images/La Casa De Papel.png',
      category: 'TV Series',
      description: 'Join the greatest heist in history'
    },
    {
      id: 'lost',
      name: 'Lost',
              image: '/images/Lost.png',
      category: 'TV Series',
      description: 'Survive the mysterious island adventure'
    },
    {
      id: 'squid-game',
      name: 'Squid Game',
              image: '/images/Squid Game.png',
      category: 'TV Series',
      description: 'Enter the deadly game of survival'
    },
    {
      id: 'stranger-things',
      name: 'Stranger Things',
              image: '/images/Stranger Things.png',
      category: 'TV Series',
      description: 'Explore the supernatural mysteries of Hawkins'
    },
    {
      id: 'mandalorian',
      name: 'The Mandalorian',
              image: '/images/The Mandalorian.png',
      category: 'TV Series',
      description: 'Journey through the Star Wars galaxy'
    },
    {
      id: 'simpsons',
      name: 'The Simpsons',
              image: '/images/The Simpsons.png',
      category: 'TV Series',
      description: 'Join Springfield\'s most famous family'
    },
    {
      id: 'walking-dead',
      name: 'The Walking Dead',
              image: '/images/The Walking Dead.png',
      category: 'TV Series',
      description: 'Survive the zombie apocalypse'
    },
    {
      id: 'vikings',
      name: 'Vikings',
              image: '/images/Vikings.png',
      category: 'TV Series',
      description: 'Raid and conquer as a legendary Viking'
    },
    // Games
    {
      id: 'call-of-duty',
      name: 'Call Of Duty',
              image: '/images/Call Of Duty.png',
      category: 'Games',
      description: 'Enter the intense world of modern warfare'
    },
    {
      id: 'cyberpunk-2077',
      name: 'Cyberpunk 2077',
              image: '/images/Cyberpunk 2077.png',
      category: 'Games',
      description: 'Experience the neon-lit dystopian future'
    },
    {
      id: 'gta',
      name: 'GTA',
              image: '/images/GTA.png',
      category: 'Games',
      description: 'Live the criminal life in the open world'
    },
    {
      id: 'league-of-legends',
      name: 'League of Legends',
              image: '/images/League of Legends.png',
      category: 'Games',
      description: 'Join the battle in the Summoner\'s Rift'
    },
    {
      id: 'minecraft',
      name: 'Minecraft',
              image: '/images/Minecraft.png',
      category: 'Games',
      description: 'Build and explore the blocky world'
    },
    {
      id: 'red-dead-redemption',
      name: 'Red Dead Redemption',
              image: '/images/Red Dead Redemption.png',
      category: 'Games',
      description: 'Ride through the Wild West as an outlaw'
    },
    {
      id: 'super-mario',
      name: 'Super Mario',
              image: '/images/Super Mario.png',
      category: 'Games',
      description: 'Jump into the colorful world of Nintendo'
    },
    {
      id: 'last-of-us',
      name: 'The Last of Us',
              image: '/images/The Last of Us.png',
      category: 'Games',
      description: 'Survive the post-apocalyptic world'
    },
    {
      id: 'witcher',
      name: 'The Witcher',
              image: '/images/The Witcher.png',
      category: 'Games',
      description: 'Become a monster hunter in a medieval world'
    },
    {
      id: 'world-of-warcraft',
      name: 'World of Warcraft',
              image: '/images/World of Warcraft.png',
      category: 'Games',
      description: 'Enter the epic fantasy world of Azeroth'
    }
  ];

  // New Style Data with Stock Images
  const styles = [
    {
      id: 'cyberpunk',
      name: 'Cyberpunk 2077',
      image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80',
      category: 'Futuristic',
      description: 'Neon-lit dystopian future with high-tech aesthetics',
      tags: ['neon', 'futuristic', 'dystopian', 'high-tech']
    },
    {
      id: 'retro-90s',
      name: 'Retro 90s',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
      category: 'Nostalgic',
      description: 'Vintage 90s aesthetic with bold colors and patterns',
      tags: ['vintage', '90s', 'bold', 'nostalgic']
    },
    {
      id: 'ghibli',
      name: 'Studio Ghibli',
      image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=400&q=80',
      category: 'Anime',
      description: 'Whimsical and magical anime-inspired art style',
      tags: ['anime', 'whimsical', 'magical', 'nature']
    },
    {
      id: 'pixel-art',
      name: 'Pixel Art',
      image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
      category: 'Gaming',
      description: 'Retro gaming aesthetic with pixelated graphics',
      tags: ['pixelated', 'retro', 'gaming', '8-bit']
    },
    {
      id: 'vintage-hollywood',
      name: 'Vintage Hollywood',
      image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
      category: 'Classic',
      description: 'Golden age of Hollywood glamour and elegance',
      tags: ['glamour', 'elegant', 'classic', 'hollywood']
    },
    {
      id: 'steampunk',
      name: 'Steampunk',
      image: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=400&q=80',
      category: 'Alternative',
      description: 'Victorian-era science fiction with brass and gears',
      tags: ['victorian', 'brass', 'gears', 'alternative']
    }
  ];

  const handleNormalGeneration = async () => {
    if (!customPrompt.trim()) {
      addNotification('❌ Please enter a prompt', 'error');
      return;
    }

    // Check authentication
    if (!isAuthenticated) {
      setShowAuthModal(true);
      setAuthMode('login');
      return;
    }
    
    setIsGenerating(true);
    setError(null);
    
    addNotification('🎨 Starting generation with FLUX Kontext...', 'info');
    
    try {
      let result;
      
      // Use FLUX Kontext API for all generations (except celebrities)
      if (userSelfie) {
        // For image-to-image, use FLUX with input image
        const enhancedPrompt = `Transform this person: ${customPrompt.trim()}, high quality, photorealistic, detailed transformation, keep facial features`;
        try {
          result = await callFluxKontextAPI(enhancedPrompt, userSelfie);
        } catch (fluxError) {
          console.error('FLUX API failed:', fluxError);
          throw new Error(`FLUX Kontext failed: ${fluxError.message}`);
        }
      } else {
        // FLUX requires input image, so we can't do text-to-image
        throw new Error('FLUX Kontext requires an input image. Please upload a photo first.');
      }
      
      console.log('OpenAI API Response:', result);
      
      if (result.error) {
        throw new Error(`OpenAI API Error: ${result.error}`);
      }
      
      // Extract image from the response
      const imageData = result.output?.find(output => output.type === "image_generation_call")?.result;
      
      if (!imageData) {
        throw new Error('No image data received from OpenAI API');
      }
      
      // Convert base64 to data URL
      const imageUrl = `data:image/png;base64,${imageData}`;
      
      // Set the generated image
      const newGeneration = {
        id: Date.now(),
        url: imageUrl,
        timestamp: new Date().toLocaleTimeString(),
        prompt: customPrompt.trim(),
        type: 'normal',
        isDemo: false
      };
      
      setGeneratedImage(newGeneration);
      setError(null);
      
      // Add to photo library
      savePhotoToLibrary(imageUrl, `Generated: ${customPrompt.trim()}`);
      
      // Show popup with generated image
      openGeneratedImagePopup(newGeneration);
      
      addNotification('✅ Generation completed successfully!', 'success', { image: newGeneration });
      
    } catch (error) {
      console.error('Generation error:', error);
      setError(error.message);
      addNotification(`❌ Generation failed: ${error.message}`, 'error');
    } finally {
      setIsGenerating(false);
    }
  };

  // Handle quick idea selection
  const handleQuickIdeaSelect = async (idea) => {
    console.log('🎯 Quick idea selected:', idea);
    console.log('🔍 Current state check:');
    console.log('  - userSelfie exists:', !!userSelfie);
    console.log('  - currentPage:', currentPage);
    console.log('  - selectedItem:', selectedItem);
    console.log('  - isAuthenticated:', isAuthenticated);
    
    setSelectedQuickIdea(idea);
    // Update custom prompt with the selected idea
    setCustomPrompt(idea.prompt);
    console.log('✅ Quick idea set, custom prompt updated to:', idea.prompt);
    
    // Automatically trigger generation when quick idea is selected
    if (userSelfie) {
      console.log('🚀 Auto-generating with selected quick idea...');
      try {
        await handleGenerate();
        console.log('✅ Generation completed successfully');
      } catch (error) {
        console.error('❌ Generation failed:', error);
      }
    } else {
      console.log('⚠️ No user selfie available for generation');
    }
  };

  // Get the appropriate default prompt based on current selection
  const getDefaultPrompt = () => {
    if (currentPage === 'main' && activeTab === 'gallery' && selectedCelebrity) {
      return celebrityDefaultPrompts[selectedCelebrity.id] || 'Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and celebrity stands next to him, both caught in a casual, imperfect moment. The background shows a lively los angeles street at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.';
    } else if (currentPage === 'universe' && selectedItem) {
      return universeDefaultPrompts[selectedItem.id] || 'Transform @user into a character from this universe, super realistic 4k, detailed costume';
    }
    return customPrompt;
  };

  // Get the final prompt combining default and quick idea
  const getFinalPrompt = () => {
    let basePrompt = getDefaultPrompt();
    console.log('🔍 Base prompt:', basePrompt);
    console.log('🔍 Selected quick idea:', selectedQuickIdea);
    
    if (selectedQuickIdea) {
      // For celebrities, add the quick idea to the base prompt
      if (currentPage === 'main' && activeTab === 'gallery' && selectedCelebrity) {
        const finalPrompt = `${basePrompt}, ${selectedQuickIdea.prompt}`;
        console.log('🎭 Final celebrity prompt:', finalPrompt);
        return finalPrompt;
      } else if (currentPage === 'universe' && selectedItem) {
        // For universes, replace the base prompt with the quick idea
        const finalPrompt = `Transform this person into a character from the ${selectedItem.name} universe, ${selectedQuickIdea.prompt}, super realistic 4k, detailed costume`;
        console.log('🌌 Final universe prompt:', finalPrompt);
        return finalPrompt;
      }
    }
    
    console.log('📝 Returning base prompt:', basePrompt);
    return basePrompt;
  };

  const getUniverseQuickIdeas = (universeId) => {
    const ideas = {
      'avengers': [
        { id: 'iron-man', title: 'Iron Man', description: 'With suit and arc reactor', prompt: 'as Iron Man with red and gold suit, arc reactor in chest, helmet with glowing eyes' },
        { id: 'captain-america', title: 'Captain America', description: 'With shield and uniform', prompt: 'as Captain America with blue uniform, red and white stripes, circular shield with star' },
        { id: 'spider-man', title: 'Spider-Man', description: 'With web suit and mask', prompt: 'as Spider-Man with red and blue suit, web pattern, mask with white eyes' },
        { id: 'thor', title: 'Thor', description: 'With hammer and armor', prompt: 'as Thor with silver armor, red cape, Mjolnir hammer, long blonde hair' },
        { id: 'black-widow', title: 'Black Widow', description: 'With tactical suit', prompt: 'as Black Widow with black tactical suit, red hair, utility belt, combat gear' }
      ],
              'star-wars': [
          { id: 'jedi', title: 'Jedi Knight', description: 'With lightsaber and robes', prompt: 'as a Jedi Knight with brown robes, lightsaber, hood, Force powers' },
          { id: 'sith', title: 'Sith Lord', description: 'With red lightsaber', prompt: 'as a Sith Lord with black robes, red lightsaber, dark side powers' },
          { id: 'mandalorian', title: 'Mandalorian', description: 'With armor and helmet', prompt: 'as a Mandalorian with beskar armor, helmet, jetpack, weapons' },
          { id: 'bounty-hunter', title: 'Bounty Hunter', description: 'With blaster and armor', prompt: 'as a Bounty Hunter with armor, blaster, helmet, weapons' },
          { id: 'rebel-pilot', title: 'Rebel Pilot', description: 'With flight suit', prompt: 'as a Rebel Pilot with orange flight suit, helmet, blaster, X-wing background' }
        ],
              'harry-potter': [
          { id: 'gryffindor', title: 'Gryffindor Student', description: 'With red and gold robes', prompt: 'as a Gryffindor student with red and gold robes, wand, Hogwarts background' },
          { id: 'slytherin', title: 'Slytherin Student', description: 'With green and silver robes', prompt: 'as a Slytherin student with green and silver robes, wand, dark magic' },
          { id: 'ravenclaw', title: 'Ravenclaw Student', description: 'With blue and bronze robes', prompt: 'as a Ravenclaw student with blue and bronze robes, wand, books' },
          { id: 'hufflepuff', title: 'Hufflepuff Student', description: 'With yellow and black robes', prompt: 'as a Hufflepuff student with yellow and black robes, wand, friendly' },
          { id: 'auror', title: 'Auror', description: 'With magical robes and wand', prompt: 'as an Auror with magical robes, wand, Ministry of Magic badge' }
        ],
      'game-of-thrones': [
        { id: 'stark', title: 'House Stark', description: 'With direwolf sigil', prompt: 'as a member of House Stark with direwolf sigil, northern clothing, sword' },
        { id: 'lannister', title: 'House Lannister', description: 'With lion sigil', prompt: 'as a member of House Lannister with lion sigil, golden armor, sword' },
        { id: 'targaryen', title: 'House Targaryen', description: 'With dragon sigil', prompt: 'as a member of House Targaryen with dragon sigil, silver hair, dragon' },
        { id: 'night-watch', title: 'Night\'s Watch', description: 'With black robes', prompt: 'as a member of the Night\'s Watch with black robes, sword, Castle Black' },
        { id: 'wildling', title: 'Wildling', description: 'With fur clothing', prompt: 'as a Wildling with fur clothing, beyond the Wall, survival gear' }
      ],
      'stranger-things': [
        { id: '80s-kid', title: '80s Kid', description: 'With retro clothing', prompt: 'as an 80s kid with retro clothing, walkie-talkie, bike, Hawkins' },
        { id: 'demogorgon', title: 'Demogorgon', description: 'With monster features', prompt: 'as a Demogorgon with monster features, Upside Down, terrifying' },
        { id: 'eleven', title: 'Eleven', description: 'With pink dress and powers', prompt: 'as Eleven with pink dress, shaved head, psychic powers, nosebleed' },
        { id: 'hawkins-lab', title: 'Hawkins Lab', description: 'With lab coat', prompt: 'as a Hawkins Lab scientist with lab coat, government facility' },
        { id: 'upside-down', title: 'Upside Down', description: 'With dark atmosphere', prompt: 'in the Upside Down with dark atmosphere, floating particles, danger' }
      ],
      'mandalorian': [
        { id: 'mandalorian-warrior', title: 'Mandalorian Warrior', description: 'With beskar armor', prompt: 'as a Mandalorian Warrior with beskar armor, helmet, jetpack, weapons' },
        { id: 'bounty-hunter', title: 'Bounty Hunter', description: 'With weapons and armor', prompt: 'as a Bounty Hunter with armor, weapons, helmet, tracking device' },
        { id: 'imperial', title: 'Imperial Officer', description: 'With uniform and rank', prompt: 'as an Imperial Officer with uniform, rank insignia, authority' },
        { id: 'rebel', title: 'Rebel Fighter', description: 'With rebel gear', prompt: 'as a Rebel Fighter with rebel gear, blaster, freedom fighter' },
        { id: 'jedi', title: 'Jedi', description: 'With lightsaber and robes', prompt: 'as a Jedi with robes, lightsaber, Force powers, peacekeeper' }
      ],
      'simpsons': [
        { id: 'homer', title: 'Homer Simpson', description: 'Yellow skin, blue pants', prompt: 'as Homer Simpson with yellow skin, blue pants, white shirt, bald head' },
        { id: 'marge', title: 'Marge Simpson', description: 'Blue hair, green dress', prompt: 'as Marge Simpson with blue hair, green dress, pearl necklace' },
        { id: 'bart', title: 'Bart Simpson', description: 'Spiky hair, orange shirt', prompt: 'as Bart Simpson with spiky hair, orange shirt, mischievous look' },
        { id: 'lisa', title: 'Lisa Simpson', description: 'Yellow skin, pearl necklace', prompt: 'as Lisa Simpson with yellow skin, pearl necklace, saxophone' },
        { id: 'springfield', title: 'Springfield Resident', description: 'Yellow skin, cartoon style', prompt: 'as a Springfield resident with yellow skin, cartoon style, Springfield background' }
      ],
      'lord-of-the-rings': [
        { id: 'gandalf', title: 'Gandalf', description: 'With staff and robes', prompt: 'as Gandalf with grey robes, staff, hat, wizard powers' },
        { id: 'aragorn', title: 'Aragorn', description: 'With sword and ranger gear', prompt: 'as Aragorn with sword, ranger gear, crown, leadership' },
        { id: 'legolas', title: 'Legolas', description: 'With bow and elven features', prompt: 'as Legolas with bow, elven features, blonde hair, archery' },
        { id: 'frodo', title: 'Frodo', description: 'With ring and hobbit features', prompt: 'as Frodo with ring, hobbit features, curly hair, adventure' },
        { id: 'gimli', title: 'Gimli', description: 'With axe and dwarf features', prompt: 'as Gimli with axe, dwarf features, beard, warrior' }
      ],
      'frozen': [
        { id: 'elsa', title: 'Elsa', description: 'With ice powers and dress', prompt: 'as Elsa with ice powers, blue dress, blonde hair, snow' },
        { id: 'anna', title: 'Anna', description: 'With green dress and freckles', prompt: 'as Anna with green dress, freckles, red hair, sister' },
        { id: 'olaf', title: 'Olaf', description: 'As snowman with carrot nose', prompt: 'as Olaf the snowman with carrot nose, stick arms, friendly' },
        { id: 'arendelle', title: 'Arendelle Citizen', description: 'With winter clothing', prompt: 'as an Arendelle citizen with winter clothing, Norwegian style' },
        { id: 'ice-queen', title: 'Ice Queen', description: 'With ice crown and powers', prompt: 'as an Ice Queen with ice crown, powers, majestic' }
      ],
      'pulp-fiction': [
        { id: 'jules', title: 'Jules Winnfield', description: 'With suit and briefcase', prompt: 'as Jules Winnfield with suit, briefcase, serious look, hitman' },
        { id: 'vincent', title: 'Vincent Vega', description: 'With suit and gun', prompt: 'as Vincent Vega with suit, gun, slick hair, cool' },
        { id: 'mia', title: 'Mia Wallace', description: 'With black dress and bob', prompt: 'as Mia Wallace with black dress, bob haircut, mysterious' },
        { id: 'butch', title: 'Butch Coolidge', description: 'With boxing gear', prompt: 'as Butch Coolidge with boxing gear, tough look, fighter' },
        { id: '90s-gangster', title: '90s Gangster', description: 'With 90s style', prompt: 'as a 90s gangster with 90s style, retro look, cool' }
      ],
      'avatar': [
        { id: 'na-vi', title: 'Na\'vi', description: 'With blue skin and tail', prompt: 'as a Na\'vi with blue skin, tail, braided hair, Pandora' },
        { id: 'avatar-driver', title: 'Avatar Driver', description: 'With human-Na\'vi hybrid', prompt: 'as an Avatar Driver with human-Na\'vi hybrid body, connection' },
        { id: 'pandora-citizen', title: 'Pandora Citizen', description: 'With alien features', prompt: 'as a Pandora citizen with alien features, nature connection' },
        { id: 'scientist', title: 'Scientist', description: 'With lab gear and tech', prompt: 'as a scientist with lab gear, technology, research' },
        { id: 'warrior', title: 'Warrior', description: 'With tribal gear and weapons', prompt: 'as a warrior with tribal gear, weapons, fierce' }
      ],
      'dark-knight': [
        { id: 'batman', title: 'Batman', description: 'With cape and cowl', prompt: 'as Batman with cape, cowl, utility belt, Gotham' },
        { id: 'joker', title: 'Joker', description: 'With green hair and makeup', prompt: 'as the Joker with green hair, makeup, purple suit, chaos' },
        { id: 'harvey-dent', title: 'Harvey Dent', description: 'With two-face makeup', prompt: 'as Harvey Dent with two-face makeup, coin, duality' },
        { id: 'gotham-citizen', title: 'Gotham Citizen', description: 'With dark atmosphere', prompt: 'as a Gotham citizen with dark atmosphere, urban' },
        { id: 'commissioner', title: 'Commissioner', description: 'With police uniform', prompt: 'as a Commissioner with police uniform, authority, justice' }
      ],
      'friends': [
        { id: 'rachel', title: 'Rachel Green', description: 'With 90s fashion', prompt: 'as Rachel Green with 90s fashion, Central Perk, stylish' },
        { id: 'monica', title: 'Monica Geller', description: 'With chef uniform', prompt: 'as Monica Geller with chef uniform, organized, clean' },
        { id: 'chandler', title: 'Chandler Bing', description: 'With sarcastic look', prompt: 'as Chandler Bing with sarcastic look, humor, sarcasm' },
        { id: 'joey', title: 'Joey Tribbiani', description: 'With actor charm', prompt: 'as Joey Tribbiani with actor charm, "How you doin\'?", cool' },
        { id: 'phoebe', title: 'Phoebe Buffay', description: 'With quirky style', prompt: 'as Phoebe Buffay with quirky style, guitar, eccentric' }
      ],
      'squid-game': [
        { id: 'player', title: 'Game Player', description: 'With green tracksuit', prompt: 'as a Squid Game player with green tracksuit, number, survival' },
        { id: 'guard', title: 'Pink Guard', description: 'With pink suit and mask', prompt: 'as a Pink Guard with pink suit, mask, authority, control' },
        { id: 'front-man', title: 'Front Man', description: 'With black mask', prompt: 'as the Front Man with black mask, authority, mysterious' },
        { id: 'contestant', title: 'Contestant', description: 'With game uniform', prompt: 'as a contestant with game uniform, competition, stakes' },
        { id: 'winner', title: 'Winner', description: 'With victory pose', prompt: 'as a winner with victory pose, success, achievement' }
      ],
      'walking-dead': [
        { id: 'survivor', title: 'Survivor', description: 'With survival gear', prompt: 'as a survivor with survival gear, post-apocalyptic, zombie world' },
        { id: 'walker', title: 'Walker', description: 'With zombie features', prompt: 'as a Walker with zombie features, undead, horror' },
        { id: 'leader', title: 'Group Leader', description: 'With leadership gear', prompt: 'as a group leader with leadership gear, authority, protection' },
        { id: 'scavenger', title: 'Scavenger', description: 'With scavenging gear', prompt: 'as a scavenger with scavenging gear, resourceful, survival' },
        { id: 'fighter', title: 'Fighter', description: 'With combat gear', prompt: 'as a fighter with combat gear, weapons, battle-ready' }
      ],
      'vikings': [
        { id: 'viking-warrior', title: 'Viking Warrior', description: 'With axe and helmet', prompt: 'as a Viking Warrior with axe, helmet, fur clothing, fierce' },
        { id: 'shield-maiden', title: 'Shield Maiden', description: 'With shield and armor', prompt: 'as a Shield Maiden with shield, armor, warrior woman' },
        { id: 'raider', title: 'Raider', description: 'With raiding gear', prompt: 'as a Raider with raiding gear, longship, conquest' },
        { id: 'chieftain', title: 'Chieftain', description: 'With leadership gear', prompt: 'as a Chieftain with leadership gear, authority, clan leader' },
        { id: 'berserker', title: 'Berserker', description: 'With battle rage', prompt: 'as a Berserker with battle rage, fierce fighting, wild' }
      ],
      'call-of-duty': [
        { id: 'soldier', title: 'Modern Soldier', description: 'With military gear', prompt: 'as a Modern Soldier with military gear, tactical equipment, combat' },
        { id: 'sniper', title: 'Sniper', description: 'With sniper rifle', prompt: 'as a Sniper with sniper rifle, camouflage, precision' },
        { id: 'commander', title: 'Commander', description: 'With command gear', prompt: 'as a Commander with command gear, authority, leadership' },
        { id: 'special-ops', title: 'Special Ops', description: 'With special gear', prompt: 'as Special Ops with special gear, elite training, covert' },
        { id: 'veteran', title: 'Veteran', description: 'With experience', prompt: 'as a Veteran with experience, battle-hardened, skilled' }
      ],
      'cyberpunk-2077': [
        { id: 'netrunner', title: 'Netrunner', description: 'With cyberware and tech', prompt: 'as a Netrunner with cyberware, technology, hacking, digital' },
        { id: 'street-kid', title: 'Street Kid', description: 'With street style', prompt: 'as a Street Kid with street style, urban, survival' },
        { id: 'corpo', title: 'Corpo', description: 'With corporate gear', prompt: 'as a Corpo with corporate gear, business, power' },
        { id: 'nomad', title: 'Nomad', description: 'With nomadic gear', prompt: 'as a Nomad with nomadic gear, freedom, travel' },
        { id: 'cyber-enhanced', title: 'Cyber Enhanced', description: 'With cybernetic parts', prompt: 'as Cyber Enhanced with cybernetic parts, technology, future' }
      ],
      'gta': [
        { id: 'gangster', title: 'Gangster', description: 'With street style', prompt: 'as a Gangster with street style, urban, criminal' },
        { id: 'businessman', title: 'Businessman', description: 'With suit and tie', prompt: 'as a Businessman with suit, tie, corporate, success' },
        { id: 'cop', title: 'Police Officer', description: 'With police uniform', prompt: 'as a Police Officer with uniform, authority, law enforcement' },
        { id: 'racer', title: 'Street Racer', description: 'With racing gear', prompt: 'as a Street Racer with racing gear, speed, competition' },
        { id: 'thug', title: 'Street Thug', description: 'With thug style', prompt: 'as a Street Thug with thug style, urban, tough' }
      ],
      'league-of-legends': [
        { id: 'champion', title: 'Champion', description: 'With fantasy gear', prompt: 'as a League Champion with fantasy gear, abilities, battle' },
        { id: 'mage', title: 'Mage', description: 'With magical powers', prompt: 'as a Mage with magical powers, spells, mystical' },
        { id: 'assassin', title: 'Assassin', description: 'With stealth gear', prompt: 'as an Assassin with stealth gear, shadow, deadly' },
        { id: 'tank', title: 'Tank', description: 'With heavy armor', prompt: 'as a Tank with heavy armor, protection, defense' },
        { id: 'marksman', title: 'Marksman', description: 'With ranged weapon', prompt: 'as a Marksman with ranged weapon, precision, accuracy' }
      ],
      'red-dead-redemption': [
        { id: 'cowboy', title: 'Cowboy', description: 'With hat and revolver', prompt: 'as a Cowboy with hat, revolver, western, frontier' },
        { id: 'outlaw', title: 'Outlaw', description: 'With bandana and guns', prompt: 'as an Outlaw with bandana, guns, criminal, wild west' },
        { id: 'sheriff', title: 'Sheriff', description: 'With badge and authority', prompt: 'as a Sheriff with badge, authority, law, justice' },
        { id: 'rancher', title: 'Rancher', description: 'With ranch gear', prompt: 'as a Rancher with ranch gear, rural, hardworking' },
        { id: 'gunslinger', title: 'Gunslinger', description: 'With quick draw', prompt: 'as a Gunslinger with quick draw, fast, deadly' }
      ],
      'last-of-us': [
        { id: 'survivor', title: 'Survivor', description: 'With survival gear', prompt: 'as a Survivor with survival gear, post-apocalyptic, fungus world' },
        { id: 'clicker', title: 'Clicker', description: 'With fungal infection', prompt: 'as a Clicker with fungal infection, zombie-like, horror' },
        { id: 'firefly', title: 'Firefly', description: 'With resistance gear', prompt: 'as a Firefly with resistance gear, rebellion, freedom' },
        { id: 'hunter', title: 'Hunter', description: 'With hunting gear', prompt: 'as a Hunter with hunting gear, survival, resourceful' },
        { id: 'scavenger', title: 'Scavenger', description: 'With scavenging gear', prompt: 'as a Scavenger with scavenging gear, resourceful, survival' }
      ],
      'witcher': [
        { id: 'witcher', title: 'Witcher', description: 'With silver sword and medallion', prompt: 'as a Witcher with silver sword, medallion, mutations, monster hunter' },
        { id: 'sorceress', title: 'Sorceress', description: 'With magical powers', prompt: 'as a Sorceress with magical powers, spells, mystical' },
        { id: 'monster', title: 'Monster', description: 'With monster features', prompt: 'as a Monster with monster features, terrifying, dangerous' },
        { id: 'knight', title: 'Knight', description: 'With armor and sword', prompt: 'as a Knight with armor, sword, chivalry, honor' },
        { id: 'peasant', title: 'Peasant', description: 'With simple clothing', prompt: 'as a Peasant with simple clothing, rural, hardworking' }
      ],
      'world-of-warcraft': [
        { id: 'paladin', title: 'Paladin', description: 'With holy armor', prompt: 'as a Paladin with holy armor, divine powers, justice' },
        { id: 'mage', title: 'Mage', description: 'With magical robes', prompt: 'as a Mage with magical robes, spells, mystical powers' },
        { id: 'warrior', title: 'Warrior', description: 'With battle armor', prompt: 'as a Warrior with battle armor, weapons, combat' },
        { id: 'hunter', title: 'Hunter', description: 'With bow and pet', prompt: 'as a Hunter with bow, pet companion, wilderness' },
        { id: 'rogue', title: 'Rogue', description: 'With stealth gear', prompt: 'as a Rogue with stealth gear, daggers, shadow' }
      ]
    };
    
    return ideas[universeId] || [];
  };

  // Handle celebrity generation automatically
  const handleCelebrityGeneration = async () => {
    if (!userSelfie || !selectedCelebrity) return;
    
    // Check authentication
    if (!isAuthenticated) {
      setShowAuthModal(true);
      setAuthMode('login');
      return;
    }
    
    setIsGenerating(true);
    setError(null);
    
    addNotification(`🎨 Starting celebrity generation with ${selectedCelebrity.name}...`, 'info');
    
    try {
      // Convert celebrity image to base64
      console.log('🖼️ Converting celebrity image:', selectedCelebrity.image);
      const celebrityImageBase64 = await convertImageToBase64(selectedCelebrity.image);
      
      if (!celebrityImageBase64) {
        throw new Error('Failed to load celebrity image');
      }
      
      console.log('✅ Celebrity image converted successfully');
      console.log('📏 User selfie length:', userSelfie.length);
      console.log('📏 Celebrity image length:', celebrityImageBase64.length);
          
      // Convert user selfie to base64 string (remove data URL prefix)
      const userSelfieBase64 = userSelfie.split(',')[1];
      
      // Compress user selfie if it's too large
      const userSelfieSizeMB = (userSelfieBase64.length * 0.75) / (1024 * 1024);
      console.log('📏 User selfie size in MB:', userSelfieSizeMB.toFixed(2));
      
      if (userSelfieSizeMB > 2) {
        console.log('⚠️ User selfie too large, compressing...');
        // For now, just log - we'll implement compression if needed
      }
      
      // Create proper reference images array with both user and celebrity images
      // According to Runway API docs, we should send data URIs with proper tags
      const referenceImages = [
        {
          uri: `data:image/jpeg;base64,${userSelfieBase64}`,
          tag: "user"
        },
        {
          uri: `data:image/jpeg;base64,${celebrityImageBase64}`,
          tag: "celebrity"
        }
      ];
      
      // Validate reference images before sending
      referenceImages.forEach((img, index) => {
        if (!img.uri || img.uri.length === 0) {
          throw new Error(`Reference image ${index + 1} (${img.tag}) is empty or invalid`);
        }
        
        const sizeMB = (img.uri.length / (1024 * 1024)).toFixed(2);
        console.log(`🔍 Reference image ${index + 1} (${img.tag}) size:`, sizeMB, 'MB');
        
        if (img.uri.length > 4 * 1024 * 1024) { // 4MB limit for safety
          console.error(`❌ Reference image ${index + 1} too large! Size: ${sizeMB}MB`);
          throw new Error(`Reference image ${index + 1} (${img.tag}) is too large (${sizeMB}MB). Please try with a smaller image.`);
        }
        
        if (!img.uri.startsWith('data:image/')) {
          throw new Error(`Reference image ${index + 1} (${img.tag}) has invalid format`);
        }
      });
      
      // Create a proper prompt that references both images
      // Get the base prompt and modify it to work with Runway's reference system
      const basePrompt = getFinalPrompt();
      const promptText = basePrompt;
      
      console.log('🔍 Reference images format check:');
      console.log('🔍 Number of reference images:', referenceImages.length);
      console.log('🔍 Reference images tags:', referenceImages.map(img => img.tag));
      console.log('🔍 Final prompt being sent:', promptText);
      console.log('🔍 Prompt contains @user:', promptText.includes('@user'));
      console.log('🔍 Prompt contains @celebrity:', promptText.includes('@celebrity'));
      
      // Check data URI sizes
      referenceImages.forEach((img, index) => {
        const sizeMB = (img.uri.length / (1024 * 1024)).toFixed(2);
        console.log(`🔍 Reference image ${index + 1} (${img.tag}) size:`, sizeMB, 'MB');
        if (img.uri.length > 5 * 1024 * 1024) {
          console.error(`❌ Reference image ${index + 1} too large! Runway requires under 5MB.`);
        }
      });
      
      // Use Runway API for celebrities through proxy
      const endpoint = process.env.NODE_ENV === 'development' ? 'http://localhost:3001/api/generate' : '/api/generate';
      const requestBody = {
        promptText: promptText,
        ratio: "1024:1024",
        seed: Math.floor(Math.random() * 4294967295),
        model: "gen4_image",
        referenceImages: referenceImages,  // Send both images
        contentModeration: {
          publicFigureThreshold: "low"
        }
      };
      
      console.log('🚀 Making Runway API call through proxy to:', endpoint);
      console.log('📦 Request body:', requestBody);
      console.log('🔍 Full request JSON:', JSON.stringify(requestBody, null, 2));
      console.log('🔍 Reference images in request:', requestBody.referenceImages);
      console.log('🔍 Reference images count:', requestBody.referenceImages.length);
      console.log('🔍 Reference images tags:', requestBody.referenceImages.map(img => img.tag));
      console.log('🖼️ Reference images being sent:', referenceImages.map(img => ({
        tag: img.tag,
        uriLength: img.uri.length,
        uriStart: img.uri.substring(0, 50) + '...'
      })));
      console.log('📏 Total request size:', JSON.stringify(requestBody).length, 'characters');
      console.log('📏 Request size in MB:', (JSON.stringify(requestBody).length / 1024 / 1024).toFixed(2), 'MB');
      
      // Check request size before sending
      const requestSize = JSON.stringify(requestBody).length;
      const requestSizeMB = (requestSize / (1024 * 1024)).toFixed(2);
      console.log('📏 Total request size:', requestSize, 'characters');
      console.log('📏 Request size in MB:', requestSizeMB, 'MB');
      
      if (requestSize > 4 * 1024 * 1024) { // 4MB limit for safety
        console.error('❌ Request too large! Size:', requestSizeMB, 'MB');
        throw new Error(`Request too large (${requestSizeMB}MB). Please try with smaller images.`);
      }
      
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });
      
      console.log('Response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Runway API Error response:', errorText);
        
        // Parse error response if it's JSON
        let errorData;
        try {
          errorData = JSON.parse(errorText);
        } catch (e) {
          errorData = { error: errorText };
        }
        
        // Provide specific error messages based on the error type
        if (errorData.error && errorData.error.includes('referenceImages')) {
          throw new Error('Reference images error: Please try with a different photo or celebrity');
        } else if (errorData.error && errorData.error.includes('Invalid asset aspect ratio')) {
          throw new Error('Image aspect ratio issue: Please try with a different photo or celebrity');
        } else if (errorData.error && errorData.error.includes('content moderation')) {
          throw new Error('Content moderation issue: Please try with a different celebrity');
        } else {
          throw new Error(`Runway API Error: ${errorData.error || errorText}`);
        }
      }

      const result = await response.json();
      console.log('Runway API Response:', result);
      
      // Check if the response contains an error
      if (result.error) {
        // Provide more specific error messages
        if (result.error.includes('Invalid asset aspect ratio')) {
          throw new Error('Image aspect ratio issue: Please try with a different photo or celebrity');
        } else if (result.error.includes('content moderation')) {
          throw new Error('Content moderation issue: Please try with a different celebrity');
        } else if (result.error.includes('referenceImages')) {
          throw new Error('Reference images error: Please try with a different photo or celebrity');
        } else {
        throw new Error(`Runway API Error: ${result.error}`);
        }
      }
      
      // The API returns a task ID, we need to poll for the result
      const taskId = result.id;
      
      if (!taskId) {
        throw new Error('No task ID received from Runway API');
      }
      
      // Poll for task completion
      let taskResult = null;
      let attempts = 0;
      const maxAttempts = 60; // 60 seconds max
      
      while (attempts < maxAttempts) {
        await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second
        
        const taskResponse = await fetch(process.env.NODE_ENV === 'development' ? `http://localhost:3001/api/task/${taskId}` : `/api/task/${taskId}`);
        
        taskResult = await taskResponse.json();
        console.log('Task status:', taskResult.status);
        
        if (taskResult.status === 'SUCCEEDED' || taskResult.status === 'COMPLETED') {
          break;
        } else if (taskResult.status === 'FAILED') {
          const failureReason = taskResult.failure || taskResult.error || 'Unknown error';
          if (failureReason.includes('content moderation')) {
            throw new Error('Content moderation failed: Please try with a different celebrity or photo');
          } else {
            throw new Error('Task failed: ' + failureReason);
          }
        }
        
        attempts++;
      }
      
      if (!taskResult || (taskResult.status !== 'SUCCEEDED' && taskResult.status !== 'COMPLETED')) {
        throw new Error('Task did not complete in time');
      }
      
      // Extract the generated image URL from the completed task
      console.log('🔍 Task result output structure:', taskResult.output);
      console.log('🔍 Task result output type:', typeof taskResult.output);
      console.log('🔍 Task result output length:', taskResult.output?.length);
      
      // Try different ways to extract the image
      let imageUrl = null;
      
      // Method 1: Look for image_generation_call type
      const imageGenerationCall = taskResult.output?.find(output => output.type === "image_generation_call");
      console.log('🔍 Image generation call found:', imageGenerationCall);
      
      if (imageGenerationCall) {
        imageUrl = imageGenerationCall.result;
        console.log('🔍 Image URL from image_generation_call:', imageUrl);
      }
      
      // Method 2: If output is an array of strings (URLs) - THIS IS THE CORRECT FORMAT
      if (!imageUrl && Array.isArray(taskResult.output) && taskResult.output.length > 0) {
        imageUrl = taskResult.output[0];
        console.log('🔍 Image URL from first output array item:', imageUrl);
      }
      
      // Method 3: If output is a direct string
      if (!imageUrl && typeof taskResult.output === 'string') {
        imageUrl = taskResult.output;
        console.log('🔍 Image URL from direct output string:', imageUrl);
      }
      
      if (!imageUrl) {
        console.error('❌ No image URL found in task result. Full task result:', taskResult);
        throw new Error('No image data received from Runway API');
      }
      
      console.log('✅ Found image URL:', imageUrl);
      
      // The API returns a URL, not base64 data, so we use it directly
      const imageDataUrl = imageUrl;
      
      // Set the generated image
      const newGeneration = {
        id: Date.now(),
        url: imageDataUrl,
        timestamp: new Date().toLocaleTimeString(),
        prompt: promptText,
        type: 'celebrity',
        celebrity: selectedCelebrity.name,
        isDemo: false
      };
      
      setGeneratedImage(newGeneration);
      setError(null);
      
      // Add to photo library
      savePhotoToLibrary(imageDataUrl, `Generated with ${selectedCelebrity.name}`);
      
      // Show popup with generated image
      openGeneratedImagePopup(newGeneration);
      
      setIsGenerating(false);
      
      // Add notification for successful generation
      addNotification(`✨ Your celebrity image is ready!`, 'success', { image: newGeneration });
      
    } catch (error) {
      console.error('Generation error:', error);
      setError(error.message);
      addNotification(`❌ Generation failed: ${error.message}`, 'error');
      setIsGenerating(false);
    }
  };

  const handleGenerate = async () => {
    console.log('🚀 handleGenerate called');
    console.log('🔍 handleGenerate state check:');
    console.log('  - userSelfie exists:', !!userSelfie);
    console.log('  - isAuthenticated:', isAuthenticated);
    console.log('  - currentPage:', currentPage);
    console.log('  - selectedItem:', selectedItem);
    console.log('  - selectedCelebrity:', selectedCelebrity);
    
    if (!userSelfie) {
      console.log('❌ No userSelfie, returning early');
      return;
    }
    
    // Check authentication
    if (!isAuthenticated) {
      console.log('❌ Not authenticated, showing auth modal');
      setShowAuthModal(true);
      setAuthMode('login');
      return;
    }
    
    // Check generation limit
    if (!checkGenerationLimit()) {
      console.log('❌ Generation limit exceeded');
      return;
    }
    
    console.log('✅ All checks passed, proceeding with generation');
    
    // Increment generation count
    incrementGeneration();
    
    // Check if we have a valid selection based on current page and selectedItem
    if (currentPage === 'main' && activeTab === 'gallery' && !selectedCelebrity) {
      console.log('❌ No selectedCelebrity for main/gallery');
      return;
    }
    if (currentPage === 'universe' && !selectedItem) {
      console.log('❌ No selectedItem for universe');
      return;
    }
    if (currentPage === 'style' && !selectedItem) {
      console.log('❌ No selectedItem for style');
      return;
    }
    
    // Handle normal mode (direct Runway API)
    if (currentPage === 'main' && activeTab === 'create' && generationMode === 'normal') {
      await handleNormalGeneration();
      return;
    }
    
    // Handle celebrity generation
    if (currentPage === 'main' && activeTab === 'gallery' && selectedCelebrity) {
      await handleCelebrityGeneration();
      return;
    }
    
    setIsGenerating(true);
    setError(null);
    
    // Add notification for generation start
    const generationTypeText = currentPage === 'main' ? 'celebrity' : currentPage;
    const apiProvider = 'Runway'; // Both celebrities and universes use Runway
    addNotification(`🎨 Starting ${generationTypeText} generation with ${apiProvider}...`, 'info');
    
    try {
      let promptText, result;
      
      if (currentPage === 'main' && activeTab === 'gallery') {
        // This should not be reached since handleCelebrityGeneration is called above
        console.log('Unexpected: Celebrity generation reached in handleGenerate');
        return;
      } else if (currentPage === 'universe') {
        // Use Runway for universe generations
        console.log('Starting universe generation for:', selectedItem.name);
        
        // Convert user selfie to base64 string (remove data URL prefix)
        const userSelfieBase64 = userSelfie.split(',')[1];
        
        // Compress user selfie if it's too large
        const userSelfieSizeMB = (userSelfieBase64.length * 0.75) / (1024 * 1024);
        console.log('📏 User selfie size in MB:', userSelfieSizeMB.toFixed(2));
        
        if (userSelfieSizeMB > 2) {
          console.log('⚠️ User selfie too large, compressing...');
        }
        
        // Create reference images with proper data URI format
        const referenceImages = [
          {
            uri: `data:image/jpeg;base64,${userSelfieBase64}`,
            tag: "user"
          }
        ];
        
        // Get the final prompt for universe generation
        const promptText = getFinalPrompt();
        console.log('🎯 Original prompt from getFinalPrompt:', promptText);
        
        // Simplify the prompt for better results
        const simplifiedPrompt = promptText.replace(/super realistic 4k|detailed costume|cinematic lighting|epic fantasy atmosphere|sci-fi atmosphere|magical atmosphere|medieval fantasy atmosphere|90s atmosphere|futuristic atmosphere|western atmosphere|post-apocalyptic atmosphere|fantasy atmosphere|urban atmosphere|intense atmosphere|80s atmosphere|animated style|magical winter atmosphere|dark atmosphere|heroic pose/gi, '').trim();
        const finalPrompt = `${simplifiedPrompt}, realistic photo`;
        
        console.log('🔍 Final universe prompt:', finalPrompt);
        console.log('🎯 Quick idea used in generation:', selectedQuickIdea);
        
        // Use Runway API for universe transformations
        const endpoint = process.env.NODE_ENV === 'development' ? 'http://localhost:3001/api/generate' : '/api/generate';
        const requestBody = {
          promptText: finalPrompt,
          ratio: "1024:1024",
          seed: Math.floor(Math.random() * 4294967295),
          model: "gen4_image",
          referenceImages: referenceImages,
          contentModeration: {
            publicFigureThreshold: "low"
          }
        };
        
        console.log('🚀 Making Runway API call for universe through proxy to:', endpoint);
        console.log('📦 Request body:', requestBody);
        console.log('🔍 Full request JSON:', JSON.stringify(requestBody, null, 2));
        console.log('🔍 Reference images in request:', requestBody.referenceImages);
        console.log('🔍 Reference images count:', requestBody.referenceImages.length);
        console.log('🔍 First reference image tag:', requestBody.referenceImages[0]?.tag);
        console.log('🔍 First reference image URI length:', requestBody.referenceImages[0]?.uri?.length);
        console.log('🔍 First reference image URI starts with:', requestBody.referenceImages[0]?.uri?.substring(0, 100));
        console.log('🖼️ Reference images being sent:', referenceImages.map(img => ({
          tag: img.tag,
          uriLength: img.uri.length,
          uriStart: img.uri.substring(0, 50) + '...'
        })));
        console.log('📏 Total request size:', JSON.stringify(requestBody).length, 'characters');
        console.log('📏 Request size in MB:', (JSON.stringify(requestBody).length / 1024 / 1024).toFixed(2), 'MB');
        
        // If request is too large, try with smaller images
        if (JSON.stringify(requestBody).length > 5 * 1024 * 1024) { // 5MB limit
          console.log('⚠️ Request too large (over 5MB), this might cause issues');
          console.log('📏 Request size limit exceeded by:', ((JSON.stringify(requestBody).length / (1024 * 1024)) - 5).toFixed(2), 'MB');
        }
        
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(requestBody)
        });
        
        console.log('Response status:', response.status);
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error('Runway API Error response:', errorText);
          throw new Error(`Runway API error: ${response.status} - ${errorText}`);
        }

        const result = await response.json();
        console.log('Runway API Response:', result);
        
        // Check if the response contains an error
        if (result.error) {
          throw new Error(`Runway API Error: ${result.error}`);
        }
        
        // The API returns a task ID, we need to poll for the result
        const taskId = result.id;
        
        if (!taskId) {
          throw new Error('No task ID received from Runway API');
        }
        
        // Poll for task completion
        let taskResult = null;
        let attempts = 0;
        const maxAttempts = 60; // 60 seconds max
        
        while (attempts < maxAttempts) {
          await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second
          
          const taskResponse = await fetch(process.env.NODE_ENV === 'development' ? `http://localhost:3001/api/task/${taskId}` : `/api/task/${taskId}`);
          
          taskResult = await taskResponse.json();
          console.log('Task status:', taskResult.status);
          
          if (taskResult.status === 'SUCCEEDED' || taskResult.status === 'COMPLETED') {
            break;
          } else if (taskResult.status === 'FAILED') {
            throw new Error('Task failed: ' + (taskResult.error || 'Unknown error'));
          }
          
          attempts++;
        }
        
        if (!taskResult || (taskResult.status !== 'SUCCEEDED' && taskResult.status !== 'COMPLETED')) {
          throw new Error('Task did not complete in time');
        }
        
        // Extract the generated image URL from the completed task
        console.log('🔍 Task result output structure:', taskResult.output);
        console.log('🔍 Task result output type:', typeof taskResult.output);
        console.log('🔍 Task result output length:', taskResult.output?.length);
        
        // Try different ways to extract the image
        let generatedImageUrl = null;
        
        // Method 1: Look for image_generation_call type
        const imageGenerationCall = taskResult.output?.find(output => output.type === "image_generation_call");
        console.log('🔍 Image generation call found:', imageGenerationCall);
        
        if (imageGenerationCall) {
          generatedImageUrl = imageGenerationCall.result;
          console.log('🔍 Image URL from image_generation_call:', generatedImageUrl);
        }
        
        // Method 2: If output is an array of strings (URLs) - THIS IS THE CORRECT FORMAT
        if (!generatedImageUrl && Array.isArray(taskResult.output) && taskResult.output.length > 0) {
          generatedImageUrl = taskResult.output[0];
          console.log('🔍 Image URL from first output array item:', generatedImageUrl);
        }
        
        if (!generatedImageUrl) {
          console.error('Could not find image URL in task result:', taskResult);
          throw new Error('No image URL found in task result');
        }
        
        const newGeneration = {
          id: Date.now(),
          url: generatedImageUrl,
          timestamp: new Date().toLocaleTimeString(),
          prompt: promptText,
          type: 'universe',
          universe: selectedItem.name,
          celebrity: null,
          style: null,
          isDemo: false
        };
        
        setGeneratedImage(newGeneration);
        setUserSelfie(generatedImageUrl);
        
        // Show popup with generated image
        openGeneratedImagePopup(newGeneration);
        
        setIsGenerating(false);
        addNotification(`✨ Your universe transformation is ready!`, 'success', { image: newGeneration });
        
      } else if (currentPage === 'style') {
        // Use OpenAI for style generations
        console.log('Starting style generation for:', selectedItem.name);
        
        const stylePrompts = {
          'cyberpunk': 'Transform this person into a cyberpunk character. Keep the face exactly the same but add neon lighting, futuristic city background, high-tech aesthetic, dystopian atmosphere, high quality, photorealistic',
          'retro-90s': 'Transform this person with 90s retro aesthetic. Keep the face exactly the same but add vintage clothing, bold colors, nostalgic background, retro filter style, high quality, photorealistic',
          'ghibli': 'Transform this person into Studio Ghibli anime style. Keep the face exactly the same but add whimsical background, soft lighting, magical atmosphere, anime art style, high quality',
          'pixel-art': 'Transform this person into pixel art style. Keep the face exactly the same but add 8-bit aesthetic, retro gaming background, pixelated appearance, vintage gaming style, high quality',
          'vintage-hollywood': 'Transform this person into vintage Hollywood glamour. Keep the face exactly the same but add elegant clothing, golden age aesthetic, classic film lighting, glamorous style, high quality, photorealistic',
          'steampunk': 'Transform this person into steampunk style. Keep the face exactly the same but add Victorian clothing with brass gears, industrial background, alternative history aesthetic, high quality, photorealistic'
        };
        
        promptText = customPrompt.trim() 
          ? `${stylePrompts[selectedItem.id]}, ${customPrompt.trim()}`
          : stylePrompts[selectedItem.id];
        
        // Use FLUX Kontext API for style transformations with input image
        let result;
        try {
          result = await callFluxKontextAPI(promptText, userSelfie);
        } catch (fluxError) {
          console.error('FLUX API failed:', fluxError);
          throw new Error(`FLUX Kontext failed: ${fluxError.message}`);
        }
        
        // Extract image from the response
        let imageUrl;
        if (result.data && result.data[0] && result.data[0].url) {
          // FLUX API response
          imageUrl = result.data[0].url;
        } else {
          // OpenAI Responses API response
          const imageData = result.output?.find(output => output.type === "image_generation_call")?.result;
          if (!imageData) {
            throw new Error('No image data received from API');
          }
          imageUrl = `data:image/png;base64,${imageData}`;
        }
        
        const newGeneration = {
          id: Date.now(),
          url: imageUrl,
          timestamp: new Date().toLocaleTimeString(),
          prompt: promptText,
          type: 'style',
          isDemo: false
        };
        
        setGeneratedImage(newGeneration);
        setUserSelfie(imageUrl);
        
        // Show popup with generated image
        openGeneratedImagePopup(newGeneration);
        
        setIsGenerating(false);
        addNotification(`✨ Your style transformation is ready!`, 'success', { image: newGeneration });
      }
      
    } catch (err) {
      console.error('Generation error:', err);
      setError(`Failed to generate image: ${err.message}`);
      setIsGenerating(false);
      
      // Add notification for error
      addNotification(`❌ Generation failed: ${err.message}`, 'error');
    }
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      let processedFile = file;
      
      // Check if it's a HEIC file and convert it
      if (file.type === 'image/heic' || file.type === 'image/heif' || 
          file.name.toLowerCase().endsWith('.heic') || file.name.toLowerCase().endsWith('.heif')) {
        try {
          console.log('🔄 Converting HEIC file to JPEG...');
          addNotification('🔄 Converting HEIC image...', 'info');
          
          const convertedBlob = await heic2any({
            blob: file,
            toType: 'image/jpeg',
            quality: 0.8
          });
          
          processedFile = new File([convertedBlob], file.name.replace(/\.heic$/i, '.jpg'), {
            type: 'image/jpeg'
          });
          
          console.log('✅ HEIC conversion successful');
          addNotification('✅ HEIC image converted successfully!', 'success');
        } catch (error) {
          console.error('❌ HEIC conversion failed:', error);
          addNotification('❌ Failed to convert HEIC image', 'error');
          return;
        }
      }
      
      const reader = new FileReader();
      reader.onload = (e) => {
        const photoData = e.target.result;
        setUserSelfie(photoData);
        
        // Check if this photo is already in the library
        const isAlreadySaved = savedPhotos.some(photo => photo.data === photoData);
        
        if (!isAlreadySaved) {
          // Show save photo modal
          setPhotoToSave(photoData);
          setShowSavePhotoModal(true);
        }
      };
      reader.readAsDataURL(processedFile);
    }
  };

  const handleEditorImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      let processedFile = file;
      
      // Check if it's a HEIC file and convert it
      if (file.type === 'image/heic' || file.type === 'image/heif' || 
          file.name.toLowerCase().endsWith('.heic') || file.name.toLowerCase().endsWith('.heif')) {
        try {
          console.log('🔄 Converting HEIC file to JPEG for editor...');
          addNotification('🔄 Converting HEIC image...', 'info');
          
          const convertedBlob = await heic2any({
            blob: file,
            toType: 'image/jpeg',
            quality: 0.8
          });
          
          processedFile = new File([convertedBlob], file.name.replace(/\.heic$/i, '.jpg'), {
            type: 'image/jpeg'
          });
          
          console.log('✅ HEIC conversion successful for editor');
          addNotification('✅ HEIC image converted successfully!', 'success');
        } catch (error) {
          console.error('❌ HEIC conversion failed:', error);
          addNotification('❌ Failed to convert HEIC image', 'error');
          return;
        }
      }
      
      const reader = new FileReader();
      reader.onload = (e) => {
        const photoData = e.target.result;
        setEditorPhoto(photoData);
        setEditedPhoto(null);
        setEditHistory([]);
        addNotification('📸 Photo uploaded successfully!', 'success');
      };
      reader.readAsDataURL(processedFile);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.currentTarget.classList.add('drag-over');
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.currentTarget.classList.remove('drag-over');
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.currentTarget.classList.remove('drag-over');
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const photoData = e.target.result;
          setEditorPhoto(photoData);
          setEditedPhoto(null);
          setEditHistory([]);
          addNotification('📸 Photo uploaded successfully!', 'success');
        };
        reader.readAsDataURL(file);
      } else {
        addNotification('❌ Please upload an image file', 'error');
      }
    }
  };

  const handleEditSelection = (edit) => {
    if (edit.type === 'slider') {
      // For age slider, show the slider interface
      setSelectedEdit(edit);
      addNotification(`Selected: ${edit.name} - Use the slider to choose age`, 'info');
    } else {
      // For regular edits, proceed as before
    setSelectedEdit(edit);
    addNotification(`Selected: ${edit.name}`, 'info');
    }
  };

      const generateAgePrompt = (targetAge) => {
    const corePreservation = `CRITICAL: DO NOT change the face shape, facial outlines, eye shape, eye size, nose shape, nose size, lip shape, chin shape, jawline, or cheekbone structure. Keep the exact same facial geometry and proportions. This is the SAME PERSON at a different age, not a different person.`;
    
    if (targetAge < 18) {
      return `Age this person to ${targetAge} years old: Keep the exact same face shape, eye shape, nose, lips, and facial structure. Only apply: completely smooth skin with no wrinkles, youthful skin texture, healthy skin tone. Add a small letter X in the top right corner of the image. ${corePreservation} Maintain all distinctive facial features and natural lighting.`;
    } else if (targetAge >= 18 && targetAge <= 30) {
      return `Age this person to ${targetAge} years old: Keep the exact same face shape, eye shape, nose, lips, and facial structure. Only apply: clear smooth skin, minimal skin texture, no wrinkles, healthy complexion. Keep existing facial hair style if present. Add a small letter X in the top right corner of the image. ${corePreservation} Natural lighting and photorealistic quality.`;
    } else if (targetAge >= 31 && targetAge <= 50) {
      return `Age this person to ${targetAge} years old: Keep the exact same face shape, eye shape, nose, lips, and facial structure. Only add aging effects: subtle crow's feet wrinkles around eyes, light forehead lines, beginning smile lines, skin texture with mild aging. If facial hair exists, keep same style but add 10-30% gray/white color. Add a small letter X in the top right corner of the image. ${corePreservation} Natural aging with realistic lighting.`;
    } else if (targetAge >= 51 && targetAge <= 70) {
      return `Keep the exact same facial features, face shape, eye shape, nose, and lips unchanged. Only add some wrinkles to the forehead, wrinkles around the side of the eyes (crow's feet), some sun damage spots and age marks on the skin. If facial hair exists, make it white/gray color. Do not change any facial structure. Add a small letter X in the top right corner of the image.`;
    } else {
      return `Keep the exact same facial features, face shape, eye shape, eye color, nose, and lips completely unchanged. Do not modify the eyes at all. Add extensive wrinkles to the forehead, deep crow's feet wrinkles around the side of the eyes, many sun damage spots and age marks scattered across the skin from years of sun exposure. Make the skin texture look aged and weathered with more wrinkles throughout the face. If hair exists, make it salt-and-pepper (white and black combined). If facial hair exists, make it salt-and-pepper beard (white and black combined). Do not change any facial structure at all. Add a small letter X in the top right corner of the image.`;
    }
  };

  const handleAIEdit = async (edit) => {
    if (!editorPhoto) {
      addNotification('❌ Please upload a photo first', 'error');
      return;
    }
    
    // Check authentication
    if (!isAuthenticated) {
      setShowAuthModal(true);
      setAuthMode('login');
      return;
    }
    
    // Check generation limit
    if (!checkGenerationLimit()) {
      return;
    }
    
    // Increment generation count
    incrementGeneration();
    
    setIsEditing(true);
    setSelectedEdit(edit);
    setEditedPhoto(null);
    setGenerationProgress(0);
    setShowOriginal(false);
    setShowGenerationOverlay(true);
    setGenerationStep(0);
    
    // Start generation steps animation
    const stepInterval = setInterval(() => {
      setGenerationStep(prev => {
        if (prev >= generationSteps.length - 1) {
          clearInterval(stepInterval);
          return prev;
        }
        return prev + 1;
      });
    }, 2000);
    
    // Start progress animation
    const progressInterval = setInterval(() => {
      setGenerationProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 2;
      });
    }, 100);
    
    addNotification(`🎨 Applying ${edit.name} with FLUX Kontext...`, 'info');
    
    try {
      // Generate prompt based on edit type
      let promptText;
      if (edit.type === 'age-slider') {
        promptText = generateAgePrompt(selectedAge);
      } else {
        promptText = edit.prompt;
      }

      // Use FLUX Kontext API for all edits (superior for identity preservation)
      let result;
              try {
                console.log('Attempting FLUX API call...');
        result = await callFluxKontextAPI(promptText, editorPhoto);
        console.log('FLUX API call successful:', result);
              } catch (fluxError) {
                console.error('FLUX API failed:', fluxError);
                throw new Error(`FLUX Kontext failed: ${fluxError.message}`);
      }
      
      console.log('OpenAI Response:', result);
      
      // Extract image from the response
      let imageUrl;
      if (result.output) {
        // FLUX API response - output is a direct URL
        imageUrl = result.output;
      } else if (result.data && result.data[0] && result.data[0].url) {
        // Image Edit API response
        imageUrl = result.data[0].url;
      } else {
        // Responses API response
        const imageData = result.output?.find(output => output.type === "image_generation_call")?.result;
        if (!imageData) {
          console.error('Response structure:', result);
          throw new Error('No image data received from API');
        }
        imageUrl = `data:image/png;base64,${imageData}`;
      }
      
      const newEdit = {
        id: Date.now(),
        url: imageUrl,
        timestamp: new Date().toLocaleTimeString(),
        edit: edit.name,
        prompt: promptText,
        isDemo: false
      };
      
      // Complete progress
      setGenerationProgress(100);
      setTimeout(() => {
        setEditedPhoto(newEdit);
        setEditHistory(prev => [...prev, newEdit]);
        
        // Image already shows in right panel via editedPhoto state
        
        setIsEditing(false);
        setGenerationProgress(0);
        setShowGenerationOverlay(false);
        setGenerationStep(0);
      }, 1000);
      
      addNotification(`✨ ${edit.name} applied successfully!`, 'success', { image: newEdit });
      
    } catch (err) {
      console.error('AI Edit error:', err);
      setError(`Failed to apply edit: ${err.message}`);
      setIsEditing(false);
      setGenerationProgress(0);
      
      addNotification(`❌ Edit failed: ${err.message}`, 'error');
      setShowGenerationOverlay(false);
      setGenerationStep(0);
    }
  };

  // Function to convert image URL to base64 with Runway-compatible aspect ratio
  const convertImageToBase64 = async (imageUrl, maxSizeMB = 1) => {
    try {
      console.log('🔍 Converting image to base64:', imageUrl);
      
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      
      console.log('📊 Image blob info:', {
        size: blob.size,
        type: blob.type,
        lastModified: blob.lastModified
      });
      
      // Create a temporary image to get dimensions
      const img = new Image();
      const objectUrl = URL.createObjectURL(blob);
      
      return new Promise((resolve, reject) => {
        img.onload = () => {
          const originalAspectRatio = img.width / img.height;
          console.log('📐 Original image dimensions:', {
            width: img.width,
            height: img.height,
            aspectRatio: originalAspectRatio.toFixed(3)
          });
          
          URL.revokeObjectURL(objectUrl);
          
          // Check if aspect ratio is within Runway's requirements (0.5 to 2.0)
          if (originalAspectRatio < 0.5 || originalAspectRatio > 2.0) {
            console.log('⚠️ Image aspect ratio outside Runway limits, resizing for compliance...');
            console.log('📐 Original aspect ratio:', originalAspectRatio.toFixed(3), '(must be between 0.5 and 2.0)');
          }
          
          // Check if image needs compression
          const sizeInMB = blob.size / (1024 * 1024);
          console.log('📏 Original image size:', sizeInMB.toFixed(2), 'MB');
          
          // For Runway API, we need to ensure images are properly sized and under 5MB
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            
          let newWidth, newHeight;
          const maxDimension = 1024; // Conservative max for API compatibility
          
          if (originalAspectRatio < 0.5) {
            // Image is too tall, make it wider
            newHeight = maxDimension;
            newWidth = maxDimension * 0.5; // Minimum aspect ratio
          } else if (originalAspectRatio > 2.0) {
            // Image is too wide, make it taller
            newWidth = maxDimension;
            newHeight = maxDimension * 0.5; // Minimum aspect ratio
          } else {
            // Aspect ratio is acceptable, resize for API compatibility
            if (img.width > maxDimension || img.height > maxDimension) {
              if (img.width > img.height) {
                newWidth = maxDimension;
                newHeight = (img.height * maxDimension) / img.width;
              } else {
                newHeight = maxDimension;
                newWidth = (img.width * maxDimension) / img.height;
              }
            } else {
              newWidth = img.width;
              newHeight = img.height;
            }
          }
          
          // Ensure final aspect ratio is within limits
          const finalAspectRatio = newWidth / newHeight;
          if (finalAspectRatio < 0.5) {
            newHeight = newWidth / 0.5;
          } else if (finalAspectRatio > 2.0) {
            newWidth = newHeight * 2.0;
            }
            
            canvas.width = newWidth;
            canvas.height = newHeight;
            
          console.log('📐 Final image dimensions:', {
            width: newWidth,
            height: newHeight,
            aspectRatio: (newWidth / newHeight).toFixed(3)
          });
          
          // Draw with high quality
            ctx.drawImage(img, 0, 0, newWidth, newHeight);
            
            canvas.toBlob((compressedBlob) => {
            console.log('📏 Final image size:', (compressedBlob.size / (1024 * 1024)).toFixed(2), 'MB');
              
        const reader = new FileReader();
              reader.onload = () => {
              console.log('✅ Optimized base64 conversion successful');
                const base64String = reader.result.split(',')[1];
              console.log('📏 Base64 string length:', base64String.length);
                resolve(base64String);
              };
              reader.onerror = reject;
              reader.readAsDataURL(compressedBlob);
          }, 'image/jpeg', 0.85); // Balanced quality for API compatibility
        };
        
        img.onerror = () => {
          console.error('❌ Failed to load image for dimension check');
          URL.revokeObjectURL(objectUrl);
          reject(new Error('Failed to load image'));
        };
        
        img.src = objectUrl;
      });
    } catch (error) {
      console.error('❌ Error converting image to base64:', error);
      return null;
    }
  };

  // Function to generate placeholder image for universes and styles
  const generatePlaceholderImage = (type, name) => {
    const canvas = document.createElement('canvas');
    canvas.width = 300;
    canvas.height = 300;
    const ctx = canvas.getContext('2d');
    
    // Create gradient background
    const gradient = ctx.createLinearGradient(0, 0, 300, 300);
    gradient.addColorStop(0, '#1a1a1a');
    gradient.addColorStop(1, '#2a2a2a');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 300, 300);
    
    // Add text
    ctx.fillStyle = '#ffd700';
    ctx.font = 'bold 24px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(name, 150, 150);
    
    // Add icon
    ctx.font = '48px Arial';
    ctx.fillText(type === 'universe' ? '🌌' : '🎨', 150, 200);
    
    return canvas.toDataURL();
  };

  const getEditIcon = (editId) => {
    const iconMap = {
      // Hair edits
      'blonde': () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
          <path d="M8 12c0-2.21 1.79-4 4-4s4 1.79 4 4"/>
          <path d="M12 8v8"/>
          <path d="M8 16h8"/>
        </svg>
      ),
      'brunette': () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
          <path d="M8 12c0-2.21 1.79-4 4-4s4 1.79 4 4"/>
          <path d="M12 8v8"/>
          <path d="M8 16h8"/>
        </svg>
      ),
      'red': () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
          <path d="M8 12c0-2.21 1.79-4 4-4s4 1.79 4 4"/>
          <path d="M12 8v8"/>
          <path d="M8 16h8"/>
        </svg>
      ),
      'black': () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
          <path d="M8 12c0-2.21 1.79-4 4-4s4 1.79 4 4"/>
          <path d="M12 8v8"/>
          <path d="M8 16h8"/>
        </svg>
      ),
      'curly': () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
          <path d="M8 12c0-2.21 1.79-4 4-4s4 1.79 4 4"/>
          <path d="M12 8c0 0-2 2-2 4s2 4 2 4"/>
        </svg>
      ),
      'straight': () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
          <path d="M8 12c0-2.21 1.79-4 4-4s4 1.79 4 4"/>
          <path d="M12 8v8"/>
        </svg>
      ),
      'long': () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
          <path d="M8 12c0-2.21 1.79-4 4-4s4 1.79 4 4"/>
          <path d="M12 8v12"/>
        </svg>
      ),
      'short': () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
          <path d="M8 12c0-2.21 1.79-4 4-4s4 1.79 4 4"/>
          <path d="M12 8v6"/>
        </svg>
      ),
      
      // Eye edits
      'blue': () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="3"/>
          <path d="M1 12s2-3 10-3 10 3 10 3-2 3-10 3-10-3-10-3z"/>
          <path d="M12 5v2"/>
          <path d="M12 17v2"/>
        </svg>
      ),
      'green': () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="3"/>
          <path d="M1 12s2-3 10-3 10 3 10 3-2 3-10 3-10-3-10-3z"/>
          <path d="M12 5v2"/>
          <path d="M12 17v2"/>
        </svg>
      ),
      'brown': () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="3"/>
          <path d="M1 12s2-3 10-3 10 3 10 3-2 3-10 3-10-3-10-3z"/>
          <path d="M12 5v2"/>
          <path d="M12 17v2"/>
        </svg>
      ),
      'hazel': () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="3"/>
          <path d="M1 12s2-3 10-3 10 3 10 3-2 3-10 3-10-3-10-3z"/>
          <path d="M12 5v2"/>
          <path d="M12 17v2"/>
        </svg>
      ),
      'bigger': () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="4"/>
          <path d="M1 12s2-3 10-3 10 3 10 3-2 3-10 3-10-3-10-3z"/>
        </svg>
      ),
      'brighter': () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="3"/>
          <path d="M1 12s2-3 10-3 10 3 10 3-2 3-10 3-10-3-10-3z"/>
          <path d="M12 2v2"/>
          <path d="M12 20v2"/>
          <path d="M2 12h2"/>
          <path d="M20 12h2"/>
        </svg>
      ),
      
      // Skin edits
      'clear': () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="10"/>
          <path d="M12 2v20"/>
          <path d="M2 12h20"/>
        </svg>
      ),
      'freckles': () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="10"/>
          <circle cx="8" cy="8" r="1"/>
          <circle cx="16" cy="8" r="1"/>
          <circle cx="8" cy="16" r="1"/>
          <circle cx="16" cy="16" r="1"/>
        </svg>
      ),
      'remove-freckles': () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="10"/>
          <path d="M8 8l8 8"/>
          <path d="M16 8l-8 8"/>
        </svg>
      ),
      'tan': () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="10"/>
          <path d="M12 2v20"/>
          <path d="M2 12h20"/>
        </svg>
      ),
      'pale': () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="10"/>
          <path d="M12 2v20"/>
          <path d="M2 12h20"/>
        </svg>
      ),
      'smooth': () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="10"/>
          <path d="M12 2v20"/>
          <path d="M2 12h20"/>
        </svg>
      ),
      
      // Age edits
      'younger': () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="10"/>
          <path d="M12 6v6l4 2"/>
        </svg>
      ),
      'older': () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="10"/>
          <path d="M12 6v6l4 2"/>
          <path d="M8 12h8"/>
        </svg>
      ),
      'baby-face': () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="10"/>
          <path d="M12 6v6l4 2"/>
        </svg>
      ),
      'mature': () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="10"/>
          <path d="M12 6v6l4 2"/>
          <path d="M8 12h8"/>
        </svg>
      ),
      
      // Style edits
      'makeup': () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="10"/>
          <path d="M8 12c0-2.21 1.79-4 4-4s4 1.79 4 4"/>
          <path d="M12 8v8"/>
        </svg>
      ),
      'no-makeup': () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="10"/>
          <path d="M8 12c0-2.21 1.79-4 4-4s4 1.79 4 4"/>
          <path d="M12 8v8"/>
          <path d="M8 8l8 8"/>
        </svg>
      ),
      'glasses': () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="8" cy="12" r="3"/>
          <circle cx="16" cy="12" r="3"/>
          <path d="M11 12h2"/>
        </svg>
      ),
      'no-glasses': () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="8" cy="12" r="3"/>
          <circle cx="16" cy="12" r="3"/>
          <path d="M11 12h2"/>
          <path d="M8 8l8 8"/>
        </svg>
      ),
      'beard': () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="10"/>
          <path d="M8 12c0-2.21 1.79-4 4-4s4 1.79 4 4"/>
          <path d="M12 8v8"/>
          <path d="M8 16h8"/>
          <path d="M10 18h4"/>
        </svg>
      ),
      'no-beard': () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="10"/>
          <path d="M8 12c0-2.21 1.79-4 4-4s4 1.79 4 4"/>
          <path d="M12 8v8"/>
          <path d="M8 16h8"/>
          <path d="M10 18h4"/>
          <path d="M8 8l8 8"/>
        </svg>
      )
    };
    
    return iconMap[editId] ? iconMap[editId]() : (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 2v20"/>
        <path d="M2 12h20"/>
      </svg>
    );
  };

  const filteredCelebrities = activeTab === 'gallery' 
    ? (selectedCategory === 'All' 
        ? celebrities 
        : selectedCategory === 'Trending'
        ? celebrities.filter(celebrity => trendingCelebrityIds.includes(celebrity.id))
        : celebrities.filter(celebrity => celebrity.category === selectedCategory))
    : celebrities;

  // Function to detect face landmarks and generate masks


  return (
    <div className="App">
      <div className="app-container">
        {/* Sidebar */}
        <aside className="sidebar">
          <div className="sidebar-header">
            <div className="logo">
              <div className="logo-icon">
                <img 
                  src="/images/FameApp.png" 
                  alt="FameApp Logo" 
                  onLoad={() => console.log('Logo image loaded successfully')}
                />
              </div>
            </div>
            
            {/* User Membership Display - Removed */}
          </div>
          
          <nav className="sidebar-nav">
            <div className="nav-section">
              <div className="nav-section-title">Create</div>
              <div 
                className={`nav-item ${activeTab === 'universes' ? 'active' : ''}`}
                onClick={() => setActiveTab('universes')}
              >
                <span className="nav-item-icon">
                  <Icons.universes />
                </span>
                <span>Universes</span>
              </div>
              <div 
                className={`nav-item ${activeTab === 'ai-editor' ? 'active' : ''}`}
                onClick={() => setActiveTab('ai-editor')}
              >
                <span className="nav-item-icon">
                  <Icons.wand />
                </span>
                <span>AI Editor</span>
              </div>
              <div 
                className={`nav-item ${activeTab === 'celebrities' ? 'active' : ''}`}
                onClick={() => setActiveTab('celebrities')}
              >
                <span className="nav-item-icon">
                  <Icons.celebrity />
                </span>
                <span>Celebrities</span>
              </div>
            </div>
            
            <div className="nav-section">
              <div className="nav-section-title">Settings</div>
              <div 
                className={`nav-item ${activeTab === 'pricing' ? 'active' : ''}`}
                onClick={() => setActiveTab('pricing')}
              >
                <span className="nav-item-icon">
                  <Icons.creditCard />
                </span>
                <span>Pricing</span>
              </div>
              <div 
                className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`}
                onClick={() => setActiveTab('profile')}
              >
                <span className="nav-item-icon">
                  <Icons.user />
                </span>
                <span>Profile</span>
              </div>
              <div 
                className={`nav-item ${activeTab === 'usage' ? 'active' : ''}`}
                onClick={() => setActiveTab('usage')}
              >
                <span className="nav-item-icon">
                  <Icons.coins />
                </span>
                <span>Usage</span>
              </div>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="main-content">
          {/* Notifications Icon */}
          <div className="notifications-container">
            <div 
              className="notifications-icon"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <Icons.notification />
              {notifications.filter(n => !n.read).length > 0 && (
                <span className="notification-badge">
                  {notifications.filter(n => !n.read).length}
                </span>
              )}
            </div>
            
            {/* Settings Dropdown */}
            <div className="settings-container">
              <div 
                className="settings-icon"
                onClick={() => setShowSettingsDropdown(!showSettingsDropdown)}
              >
                <Icons.settings />
              </div>
              
              {showSettingsDropdown && (
                <div className="settings-dropdown">
                  {isAuthenticated ? (
                    <>
                      <div className="dropdown-item" onClick={() => { setActiveTab('profile'); setShowSettingsDropdown(false); }}>
                        <Icons.user />
                        <span>Profile</span>
                      </div>
                      <div className="dropdown-item" onClick={() => { setActiveTab('usage'); setShowSettingsDropdown(false); }}>
                        <Icons.coins />
                        <span>Usage</span>
                      </div>
                      <div className="dropdown-item" onClick={() => { handleLogout(); setShowSettingsDropdown(false); }}>
                        <Icons.logout />
                        <span>Logout</span>
                      </div>
                    </>
                  ) : (
                    <div className="dropdown-item" onClick={() => { setShowAuthModal(true); setShowSettingsDropdown(false); }}>
                      <Icons.user />
                      <span>Login</span>
                    </div>
                  )}
                </div>
              )}
            </div>
            
            {showNotifications && (
              <div className="notifications-panel">
                <div className="notifications-header">
                  <h3>Notifications</h3>
                  <button onClick={clearNotifications}>Clear All</button>
                </div>
                <div className="notifications-list">
                  {notifications.length === 0 ? (
                    <p className="no-notifications">No notifications</p>
                  ) : (
                    notifications.map(notification => (
                      <div 
                        key={notification.id}
                        className={`notification-item ${notification.read ? 'read' : 'unread'} ${notification.type}`}
                        onClick={() => handleNotificationClick(notification)}
                      >
                        <div className="notification-content">
                          <p>{notification.message}</p>
                          <span className="notification-time">{notification.timestamp}</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Main Page Content */}
          {currentPage === 'main' && (
            <>
              {activeTab === 'create' && (
            <div className="create-view">
              {generationMode === 'normal' ? (
                // Normal Mode - Direct Runway API
                <div className="normal-mode-view">
                  <div className="section-header">
                    <h2>Normal <span>Generation</span></h2>
                    <p>Upload an image and describe what you want to create - powered by Runway</p>
                  </div>
                  
                  <div className="normal-generation-container">
                    {/* Image Upload Section (Optional) */}
                    <div className="upload-section-normal">
                      <div className="upload-area-normal">
                        <h3>Upload Your Image (Optional)</h3>
                        <p className="upload-description">Add a reference image to guide the generation, or leave empty to create from scratch</p>
                        <div className="upload-box-normal">
                          {userSelfie ? (
                            <div className="image-preview-normal">
                              <img src={userSelfie} alt="Your image" />
                              <div className="preview-actions-normal">
                                <button 
                                  className="change-btn-normal"
                                  onClick={() => document.getElementById('normal-upload').click()}
                                >
                                  Change Image
                                </button>
                                <button 
                                  className="remove-btn-normal"
                                  onClick={() => setUserSelfie(null)}
                                >
                                  Remove Image
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div className="upload-placeholder-normal">
                              <div className="upload-icon-normal">
                                <Icons.camera />
                              </div>
                              <p>Click to upload a reference image (optional)</p>
                              <button 
                                className="upload-btn-normal"
                                onClick={() => document.getElementById('normal-upload').click()}
                              >
                                Choose File
                              </button>
                            </div>
                          )}
                          <input
                            id="normal-upload"
                            type="file"
                            accept="image/*,.heic,.HEIC"
                            onChange={handleImageUpload}
                            style={{ display: 'none' }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Prompt Section */}
                    <div className="prompt-section-normal">
                      <h3>Describe What You Want to Create</h3>
                      <div className="prompt-input-container-normal">
                        <textarea
                          className="prompt-input-normal"
                          placeholder="e.g., a beautiful sunset over mountains, a cyberpunk city street, a magical forest with glowing mushrooms, a futuristic robot portrait..."
                          value={customPrompt}
                          onChange={(e) => setCustomPrompt(e.target.value)}
                          rows={4}
                        />
                        <div className="prompt-tips-normal">
                          <p><strong>💡 Tips:</strong></p>
                          <ul>
                            <li>Be specific about what you want to create - scenes, objects, characters, etc.</li>
                            <li>Examples: "a beautiful sunset over mountains", "a cyberpunk city street", "a magical forest"</li>
                            <li>Describe colors, lighting, style, mood, or artistic techniques</li>
                            <li>If you uploaded an image, describe how you want to transform it</li>
                            <li>If no image uploaded, describe the complete scene you want to generate</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Generate Button */}
                    <div className="generate-section-normal">
                      <button 
                        className={`generate-btn-normal ${!customPrompt.trim() ? 'disabled' : ''}`}
                        onClick={handleGenerate}
                        disabled={!customPrompt.trim() || isGenerating}
                      >
                        {isGenerating ? (
                          <>
                            <div className="btn-icon">
                              <Icons.loading />
                            </div>
                            <span>Creating with Runway...</span>
                            <div className="spinner"></div>
                          </>
                        ) : (
                          <>
                            <div className="btn-icon">
                              <Icons.generate />
                            </div>
                            <span>Generate with Runway</span>
                          </>
                        )}
                      </button>
                      
                      {error && <div className="error-message-normal">{error}</div>}
                    </div>

                    {/* Result Display */}
                    {generatedImage && (
                      <div className="result-section-normal">
                        <div className="result-header-normal">
                          <h3>✨ Your Generation is Ready!</h3>
                        </div>
                        
                        <div className="result-image-normal">
                          <img src={generatedImage.url} alt="Generated result" />
                        </div>
                        
                        <div className="result-actions-normal">
                          <button className="action-btn-normal primary" onClick={() => window.open(generatedImage.url, '_blank')}>
                            <Icons.download />
                            <span>Download</span>
                          </button>
                          <button className="action-btn-normal" onClick={() => alert('Share feature coming soon!')}>
                            <Icons.share />
                            <span>Share</span>
                          </button>
                          <button className="action-btn-normal" onClick={handleGenerate}>
                            <Icons.regenerate />
                            <span>Create Another</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                // Mode Selection
                <div className="mode-selection-view">
                  <div className="section-header">
                    <h2>Choose Your <span>Creation</span> Mode</h2>
                    <p>Select how you want to transform your image</p>
                  </div>
                  
                  <div className="creation-modes">
                    <div 
                      className={`mode-card ${generationMode === 'normal' ? 'active' : ''}`}
                      onClick={() => setGenerationMode('normal')}
                    >
                      <div className="mode-icon">
                        <Icons.generate />
                      </div>
                      <h3>Normal Generation</h3>
                      <p>Direct Runway API - upload image and describe what you want</p>
                      <div className="mode-badge">Recommended</div>
                    </div>
                    
                    <div 
                      className={`mode-card ${generationMode === 'celebrity' ? 'active' : ''}`}
                      onClick={() => setGenerationMode('celebrity')}
                    >
                      <div className="mode-icon">
                        <Icons.celebrity />
                      </div>
                      <h3>Celebrity Selfie</h3>
                      <p>Create realistic photos with your favorite celebrities</p>
                      <div className="mode-badge">Most Popular</div>
                    </div>
                    
                    <div 
                      className={`mode-card ${generationMode === 'universe' ? 'active' : ''}`}
                      onClick={() => setGenerationMode('universe')}
                    >
                      <div className="mode-icon">
                        <Icons.universe />
                      </div>
                      <h3>Universe Character</h3>
                      <p>Transform into characters from your favorite movies and shows</p>
                      <div className="mode-badge">New</div>
                    </div>
                    
                    <div 
                      className={`mode-card ${generationMode === 'style' ? 'active' : ''}`}
                      onClick={() => setGenerationMode('style')}
                    >
                      <div className="mode-icon">
                        <Icons.style />
                      </div>
                      <h3>Art Style</h3>
                      <p>Apply stunning artistic styles to your photos</p>
                      <div className="mode-badge">Trending</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
          
          {activeTab === 'universes' && (
            <div className="universes-view">
              <div className="section-header">
                <h2>Choose Your <span>Universe</span></h2>
                <p>Transform into characters from legendary worlds</p>
              </div>
              
              <div className="universe-grid">
                {universes.map((universe) => (
                  <div 
                    key={universe.id}
                    className="universe-card"
                    onClick={() => {
                    setSelectedItem(universe);
                    setCurrentPage('universe');
                    setGenerationMode('universe');
                  }}
                  >
                    <div className="universe-image">
                      <img 
                        src={universe.image} 
                        alt={universe.name}
                        onError={(e) => {
                          console.error('Failed to load image:', universe.image);
                          e.target.style.display = 'none';
                        }}
                        onLoad={() => console.log('Successfully loaded:', universe.image)}
                      />
                      <div className="universe-overlay">
                        <div className="universe-content">
                          <h3>{universe.name}</h3>
                          <p>{universe.description}</p>
                        </div>
                      </div>
                    </div>
                    <div className="universe-info">
                      <h4>{universe.name}</h4>
                      <span className="universe-category">{universe.category}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {activeTab === 'styles' && (
            <div className="styles-view">
              <div className="section-header">
                <h2>Choose Your <span>Style</span></h2>
                <p>Transform your photos with stunning artistic styles</p>
              </div>
              
              <div className="style-grid">
                {styles.map((style) => (
                  <div 
                    key={style.id}
                    className="style-card"
                    onClick={() => {
                    setSelectedItem(style);
                    setCurrentPage('style');
                    setGenerationMode('style');
                  }}
                  >
                    <div className="style-image">
                      <img 
                        src={style.image.startsWith('/images/') ? generatePlaceholderImage('style', style.name) : style.image} 
                        alt={style.name} 
                      />
                      <div className="style-overlay">
                        <div className="style-content">
                          <h3>{style.name}</h3>
                          <p>{style.description}</p>
                          <div className="style-tags">
                            {style.tags.slice(0, 3).map((tag, index) => (
                              <span key={index} className="style-tag">{tag}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="style-info">
                      <h4>{style.name}</h4>
                      <span className="style-category">{style.category}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {activeTab === 'celebrities' && !selectedCelebrity ? (
            // Celebrity Gallery View (renamed from gallery)
            <div className="gallery-view">
              <div className="section-header">
                <h2>Create Your <span>Viral</span> Image</h2>
                <p>Choose from celebrities, influencers, or create custom scenarios</p>
              </div>

              {/* Category Filter */}
              <div className="category-filter">
                {categories.map((category) => (
                  <button 
                    key={category}
                    className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {/* Celebrity Grid */}
              <div className="celebrity-grid">
                {filteredCelebrities.map((celebrity) => (
                  <div 
                    key={celebrity.id}
                    className="celebrity-card"
                    onClick={() => {
                    setSelectedCelebrity(celebrity);
                    setGenerationMode('celebrity');
                  }}
                  >
                    <div className="celebrity-image">
                      <img src={celebrity.image} alt={celebrity.name} />
                    </div>
                    <div className="celebrity-info">
                      <h3>{celebrity.name}</h3>
                      <span className="category-tag">{celebrity.category}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
                      ) : activeTab === 'ai-editor' ? (
              // Professional AI Editor - Redesigned with Zero Mistakes
              <div className="ai-editor-professional">
                {/* Header Section */}
                <div className="editor-header">
                  <div className="header-content">
                    <div className="header-left">
                      <h1 className="editor-title">AI Photo Editor</h1>
                      <p className="editor-subtitle">Transform your photos with advanced AI technology</p>
                    </div>
                    <div className="header-right">
                      <div className="header-actions">
                        <button className="header-btn help-btn" title="Help">
                          <Icons.help />
                        </button>
                        <button className="header-btn share-btn" title="Share">
                          <Icons.share />
                        </button>
                        <div className="credits-display-header">
                          <Icons.coins />
                          <span className="credits-text">{user?.credits || 0} Credits</span>
                        </div>
                        <button className="upgrade-btn-header">
                          <Icons.creditCard />
                          <span>Upgrade</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Main Editor Layout */}
                <div className="editor-layout">
                  {/* Left Panel - Controls */}
                  <div className="editor-controls-panel">
                    {/* Edit Categories Section */}
                    <div className="quick-edit-section">
                        {!selectedEditorCategory ? (
                          // Show Categories
                          <>
                            <div className="section-header">
                              <h3>Choose Edit Category</h3>
                              <p>Select a category to apply quick edits to your photo</p>
                            </div>
                            
                            <div className="edit-categories-grid">
                              {aiEditorCategories.map((category) => (
                                <div 
                                  key={category.id} 
                                  className="edit-category-card"
                                  onClick={() => setSelectedEditorCategory(category.id)}
                                >
                                  <div className="category-icon">
                                    {category.icon()}
                                  </div>
                                  <div className="category-info">
                                    <h4>{category.name}</h4>
                                    <p>{category.description}</p>
                                  </div>
                                  <div className="category-arrow">
                                    <Icons.arrow />
                                  </div>
                                </div>
                              ))}
                            </div>
                          </>
                        ) : (
                          // Show Edit Types for Selected Category
                          <>
                            <div className="section-header">
                              <button 
                                className="back-btn-professional"
                                onClick={() => setSelectedEditorCategory(null)}
                              >
                                <Icons.back />
                                <span>Back to Categories</span>
                              </button>
                              <h3>{aiEditorCategories.find(cat => cat.id === selectedEditorCategory)?.name} Edits</h3>
                              <p>Choose a specific edit to apply to your photo</p>
                            </div>
                            
                            <div className="edit-types-grid">
                              {selectedEditorCategory === 'age' ? (
                                // Age Slider Interface
                                <div className="age-slider-container">
                                  <div className="age-slider-header">
                                    <h4>Age Transformation</h4>
                                    <p>Slide to choose your target age (5-80 years)</p>
                                  </div>
                                  
                                  <div className="age-slider-wrapper">
                                    <div className="age-display">
                                      <span className="age-number">{selectedAge}</span>
                                      <span className="age-label">years old</span>
                                    </div>
                                    
                                    <div className="slider-container">
                                      <input
                                        type="range"
                                        min="5"
                                        max="80"
                                        value={selectedAge}
                                        onChange={(e) => setSelectedAge(parseInt(e.target.value))}
                                        className="age-slider"
                                      />
                                      <div className="slider-labels">
                                        <span>5</span>
                                        <span>25</span>
                                        <span>50</span>
                                        <span>80</span>
                                      </div>
                                    </div>
                                    
                                    <div className="age-description">
                                      {selectedAge <= 15 && 'Child/Teen appearance'}
                                      {selectedAge > 15 && selectedAge <= 30 && 'Young adult appearance'}
                                      {selectedAge > 30 && selectedAge <= 50 && 'Adult appearance'}
                                      {selectedAge > 50 && selectedAge <= 70 && 'Mature appearance'}
                                      {selectedAge > 70 && 'Elderly appearance'}
                                    </div>
                                  </div>
                                  
                                  <div className="age-action-buttons">
                                    <button 
                                      className="age-generate-btn"
                                      onClick={() => {
                                        const ageEdit = {
                                          id: 'age-slider',
                                          name: `Age ${selectedAge}`,
                                          type: 'age-slider'
                                        };
                                        handleAIEdit(ageEdit);
                                      }}
                                    >
                                      <span>Generate Age {selectedAge}</span>
                                      <span className="cost-badge">2 credits</span>
                                    </button>
                                  </div>
                                </div>
                              ) : selectedEditorCategory === 'hair' ? (
                                // Hair Subcategories
                                !selectedSubcategory ? (
                                  // Show subcategories
                                  Object.entries(aiEditorFeatures[selectedEditorCategory]?.subcategories || {}).map(([subKey, subcategory]) => (
                                    <div 
                                      key={subKey} 
                                      className="edit-type-card"
                                      onClick={() => setSelectedSubcategory(subKey)}
                                    >
                                      <div className="edit-type-icon">
                                        {getEditIcon(subKey)}
                                      </div>
                                      <div className="edit-type-info">
                                        <h4>{subcategory.name}</h4>
                                        <p>Choose from {subcategory.edits.length} {subcategory.name.toLowerCase()} options</p>
                                      </div>
                                      <div className="edit-type-action">
                                        <div className="edit-arrow">
                                          <Icons.arrow />
                                        </div>
                                      </div>
                                    </div>
                                  ))
                                ) : (
                                  // Show edits for selected subcategory
                                  <>
                                    <div className="subcategory-header">
                                      <button 
                                        className="back-btn"
                                        onClick={() => setSelectedSubcategory(null)}
                                      >
                                        <Icons.back />
                                        <span>Back to Hair Categories</span>
                                      </button>
                                      <h4>{aiEditorFeatures[selectedEditorCategory]?.subcategories[selectedSubcategory]?.name} Options</h4>
                                    </div>
                                    {aiEditorFeatures[selectedEditorCategory]?.subcategories[selectedSubcategory]?.edits.map((edit) => (
                                      <div 
                                        key={edit.id} 
                                        className={`edit-type-card ${selectedEdit?.id === edit.id ? 'active' : ''}`}
                                        onClick={() => handleEditSelection(edit)}
                                      >
                                        <div className="edit-type-icon">
                                          {getEditIcon(edit.id)}
                                        </div>
                                        <div className="edit-type-info">
                                          <h4>{edit.name}</h4>
                                          <p>Apply this edit</p>
                                        </div>
                                        <div className="edit-type-action">
                                          <span className="edit-cost">2 credits</span>
                                          <div className="edit-arrow">
                                            <Icons.arrow />
                                          </div>
                                        </div>
                                      </div>
                                    ))}
                                  </>
                                )
                              ) : (
                                // Regular Edit Types (for categories without subcategories)
                                aiEditorFeatures[selectedEditorCategory]?.edits?.map((edit) => (
                                  <div 
                                    key={edit.id} 
                                    className={`edit-type-card ${selectedEdit?.id === edit.id ? 'active' : ''}`}
                                    onClick={() => handleEditSelection(edit)}
                                  >
                                    <div className="edit-type-icon">
                                      {getEditIcon(edit.id)}
                                    </div>
                                    <div className="edit-type-info">
                                      <h4>{edit.name}</h4>
                                      <p>
                                        {edit.id.includes('add') ? 'Add this effect' : 
                                         edit.id.includes('remove') ? 'Remove this effect' :
                                         edit.id.includes('younger') ? 'Make you look younger' :
                                         edit.id.includes('older') ? 'Make you look older' :
                                         edit.id.includes('clear') ? 'Clear skin imperfections' :
                                         edit.id.includes('freckles') ? 'Add natural freckles' :
                                         edit.id.includes('tan') ? 'Add natural tan' :
                                         edit.id.includes('pale') ? 'Make skin pale' :
                                         edit.id.includes('smooth') ? 'Smooth skin texture' :
                                         'Apply this edit'}
                                      </p>
                                    </div>
                                    <div className="edit-type-action">
                                      <span className="edit-cost">2 credits</span>
                                      <div className="edit-arrow">
                                        <Icons.arrow />
                                      </div>
                                    </div>
                                  </div>
                                ))
                              )}
                            </div>
                          </>
                        )}
                      </div>
                    )





                    {/* Generate Button */}
                    <div className="generate-section-professional">
                      <button 
                        className={`generate-btn-professional ${!editorPhoto || !selectedEdit ? 'disabled' : ''}`}
                        disabled={!editorPhoto || !selectedEdit}
                        onClick={() => {
                          if (!editorPhoto) {
                            addNotification('❌ Please upload a photo first', 'error');
                            return;
                          }
                          
                          if (selectedEdit) {
                            handleAIEdit(selectedEdit);
                          } else {
                            addNotification('❌ Please select an edit first', 'error');
                          }
                        }}
                      >
                        {isEditing ? (
                          <>
                            <div className="btn-icon">
                              <Icons.loading />
                            </div>
                            <span>Processing...</span>
                            <div className="progress-indicator">
                              <div className="progress-bar-professional">
                                <div 
                                  className="progress-fill-professional" 
                                  style={{ width: `${generationProgress}%` }}
                                ></div>
                              </div>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="btn-icon">
                              <Icons.generate />
                            </div>
                            <span>
                              {!editorPhoto ? 'Upload Photo to Generate' : 
                               !selectedEdit ? 'Select an Edit' :
                               'Generate Edit'}
                            </span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Right Panel - Upload & Preview */}
                  <div className="editor-preview-panel">
                    <div className="upload-section-professional">
                      <div className="upload-content-professional">
                        <div className="upload-header">
                          <div className="upload-icon-large">
                            <Icons.camera />
                            <div className="upload-pulse-professional"></div>
                          </div>
                          <h2 className="upload-title">Upload Your Photo</h2>
                          <p className="upload-description">Drag and drop your image here or click to browse</p>
                        </div>
                        
                        <div 
                          className="upload-area-professional"
                          onDragOver={handleDragOver}
                          onDragLeave={handleDragLeave}
                          onDrop={handleDrop}
                        >
                          {editorPhoto ? (
                            <div className="uploaded-preview-professional">
                              <img src={editedPhoto ? editedPhoto.url : editorPhoto} alt={editedPhoto ? "Edited photo" : "Uploaded photo"} />
                              <div className="upload-overlay-professional">
                                <button 
                                  className="change-photo-btn-professional"
                                  onClick={() => document.getElementById('ai-upload-professional').click()}
                                >
                                  <Icons.camera />
                                  <span>Change Photo</span>
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div 
                              className="upload-placeholder-professional"
                              onClick={() => document.getElementById('ai-upload-professional').click()}
                            >
                              <div className="upload-dropzone-professional">
                                <Icons.camera />
                                <span className="drop-text">Drop your photo here</span>
                                <span className="drop-hint">or click to select</span>
                              </div>
                            </div>
                          )}
                          
                          <input
                            id="ai-upload-professional"
                            type="file"
                            accept="image/*,.heic,.HEIC"
                            onChange={handleEditorImageUpload}
                            style={{ display: 'none' }}
                          />
                        </div>
                        
                        {/* Action buttons for edited image */}
                        {editedPhoto && (
                          <div className="editor-image-actions">
                            <button 
                              className="editor-action-btn primary"
                              onClick={() => downloadGeneratedImage(editedPhoto.url)}
                            >
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                                <polyline points="7,10 12,15 17,10"/>
                                <line x1="12" y1="15" x2="12" y2="3"/>
                              </svg>
                              Download
                            </button>
                            <button 
                              className="editor-action-btn secondary"
                              onClick={() => shareGeneratedImage(editedPhoto.url)}
                            >
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="18" cy="5" r="3"/>
                                <circle cx="6" cy="12" r="3"/>
                                <circle cx="18" cy="19" r="3"/>
                                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
                                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
                              </svg>
                              Share
                            </button>
                          </div>
                        )}
                        
                        <div className="upload-tips-professional">
                          <div className="tip-item-professional">
                            <Icons.star />
                            <span>High quality images work best</span>
                          </div>
                          <div className="tip-item-professional">
                            <Icons.wand />
                            <span>AI will enhance your photos</span>
                          </div>
                          <div className="tip-item-professional">
                            <Icons.shield />
                            <span>Your photos are secure</span>
                          </div>
                          <div className="tip-item-professional">
                            <Icons.info />
                            <span>Make sure proxy server is running (npm run proxy)</span>
                          </div>
                        </div>
                      </div>
                    </div>


                  </div>
                                </div>
                
                {/* Generation Overlay */}
                {showGenerationOverlay && (
                  <div className="generation-overlay">
                    <div className="generation-modal">
                      <div className="generation-header">
                        <div className="generation-icon">
                          <Icons.wand />
                        </div>
                        <h2>Creating Your Edit</h2>
                        <p>Our AI is working on your photo...</p>
                      </div>
                      
                      <div className="generation-progress-container">
                        <div className="progress-steps">
                          {generationSteps.map((step, index) => (
                            <div 
                              key={index}
                              className={`progress-step ${index <= generationStep ? 'active' : ''} ${index === generationStep ? 'current' : ''}`}
                            >
                              <div className="step-icon">
                                {index < generationStep ? (
                                  <Icons.star />
                                ) : index === generationStep ? (
                                  <div className="loading-spinner"></div>
                                ) : (
                                  <div className="step-number">{index + 1}</div>
                                )}
                              </div>
                              <div className="step-content">
                                <span className="step-text">{step}</span>
                                {index === generationStep && (
                                  <div className="step-progress">
                                    <div className="step-progress-bar">
                                      <div className="step-progress-fill"></div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="generation-tips">
                        <div className="tip-item">
                          <Icons.sparkle />
                          <span>High-quality results take time</span>
                        </div>
                        <div className="tip-item">
                          <Icons.shield />
                          <span>Your photo is secure</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : activeTab === 'discover' ? (
            // Discover Page
            <div className="discover-view">
              <div className="section-header">
                <h2>Discover <span>Amazing</span> Creations</h2>
                <p>Explore trending AI-generated content from our community</p>
              </div>

              <div className="discover-content">
                {/* Featured Section */}
                <div className="featured-section">
                  <h3>🔥 Trending Now</h3>
                  <div className="featured-grid">
                    <div className="featured-card large">
                      <img src="/images/Messi.jpg" alt="Featured creation" />
                      <div className="card-overlay">
                        <div className="card-info">
                          <h4>Messi Selfie</h4>
                          <p>Viral celebrity selfie</p>
                          <span className="trending-badge">🔥 Trending</span>
                        </div>
                      </div>
                    </div>
                    <div className="featured-card">
                      <img src="/images/Elon Musk.jpg" alt="Featured creation" />
                      <div className="card-overlay">
                        <div className="card-info">
                          <h4>Elon Musk</h4>
                          <p>Business selfie</p>
                        </div>
                      </div>
                    </div>
                    <div className="featured-card">
                      <img src="/images/Angelina Jolie.jpg" alt="Featured creation" />
                      <div className="card-overlay">
                        <div className="card-info">
                          <h4>Angelina Jolie</h4>
                          <p>Celebrity selfie</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Categories Section */}
                <div className="categories-section">
                  <h3>🎭 Categories</h3>
                  <div className="categories-grid">
                    <div className="category-card">
                      <div className="category-icon">👑</div>
                      <h4>Celebrities</h4>
                      <p>Celebrity selfies and collaborations</p>
                      <span className="count">1.2k creations</span>
                    </div>
                    <div className="category-card">
                      <div className="category-icon">🎬</div>
                      <h4>Movies</h4>
                      <p>Character transformations and movie scenes</p>
                      <span className="count">856 creations</span>
                    </div>
                    <div className="category-card">
                      <div className="category-icon">🎨</div>
                      <h4>Art Styles</h4>
                      <p>Artistic transformations and filters</p>
                      <span className="count">643 creations</span>
                    </div>
                    <div className="category-card">
                      <div className="category-icon">✨</div>
                      <h4>AI Edits</h4>
                      <p>AI-powered photo enhancements</p>
                      <span className="count">432 creations</span>
                    </div>
                  </div>
                </div>

                {/* Recent Creations */}
                <div className="recent-section">
                  <h3>📸 Recent Creations</h3>
                  <div className="recent-grid">
                    {celebrities.slice(0, 6).map((celebrity) => (
                      <div key={celebrity.id} className="recent-card">
                        <img src={celebrity.image} alt={celebrity.name} />
                        <div className="card-overlay">
                          <div className="card-info">
                            <h4>{celebrity.name}</h4>
                            <p>{celebrity.category}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : activeTab === 'gallery' && !selectedCelebrity ? (
            // Legacy Gallery View (for backward compatibility)
            <div className="gallery-view">
              <div className="section-header">
                <h2>Create Your <span>Viral</span> Image</h2>
                <p>Choose from celebrities, influencers, or create custom scenarios</p>
              </div>

              {/* Category Filter */}
              <div className="category-filter">
                {categories.map((category) => (
                  <button 
                    key={category}
                    className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {/* Celebrity Grid */}
              <div className="celebrity-grid">
                {filteredCelebrities.map((celebrity) => (
                  <div 
                    key={celebrity.id}
                    className="celebrity-card"
                    onClick={() => {
                    setSelectedCelebrity(celebrity);
                    setGenerationMode('celebrity');
                  }}
                  >
                    <div className="celebrity-image">
                      <img src={celebrity.image} alt={celebrity.name} />
                    </div>
                    <div className="celebrity-info">
                      <h3>{celebrity.name}</h3>
                      <span className="category-tag">{celebrity.category}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : activeTab === 'gallery' && selectedCelebrity ? (
            // Celebrity Generation View
            <div className="celebrity-generation-view">
              <div className="breadcrumb">
                <button 
                  className="back-btn"
                  onClick={() => {
                    setSelectedCelebrity(null);
                    setSelectedQuickIdea(null);
                  }}
                >
                  <Icons.back /> Back to Celebrities
                </button>
                <span> / {selectedCelebrity.name}</span>
              </div>

              <div className="section-header">
                <h2>Create with <span>{selectedCelebrity.name}</span></h2>
                <p>Upload your photo and generate a realistic image with {selectedCelebrity.name}</p>
              </div>

              <div className="generation-container">
                <div className="upload-section">
                  <div className="upload-area">
                    {!userSelfie && <h3>Your Selfie</h3>}
                    <div className="upload-box">
                      {userSelfie ? (
                        <div className="image-preview">
                          <img src={userSelfie} alt="Your selfie" />
                          <div className="preview-actions">
                            <button 
                              className="change-btn"
                              onClick={() => document.getElementById('selfie-upload').click()}
                            >
                              Change Photo
                            </button>
                            {savedPhotos.length > 0 && (
                              <button 
                                className="library-btn"
                                onClick={() => setShowPhotoLibrary(true)}
                              >
                                Photo Library
                              </button>
                            )}
                          </div>
                        </div>
                      ) : (
                        <div className="upload-placeholder">
                          <div className="upload-icon">
                            <Icons.camera />
                          </div>
                          <p>Click to upload your selfie</p>
                          <div className="upload-actions">
                            <button 
                              className="upload-btn"
                              onClick={() => document.getElementById('selfie-upload').click()}
                            >
                              Choose File
                            </button>
                            {savedPhotos.length > 0 && (
                              <button 
                                className="library-btn"
                                onClick={() => setShowPhotoLibrary(true)}
                              >
                                Photo Library
                              </button>
                            )}
                          </div>
                        </div>
                      )}
                      <input
                        id="selfie-upload"
                        type="file"
                        accept="image/*,.heic,.HEIC"
                        onChange={handleImageUpload}
                        style={{ display: 'none' }}
                      />
                    </div>
                  </div>

                  <div className="selection-preview">
                    <h3>Selected Celebrity</h3>
                    <div className="selection-preview-card">
                      <img src={selectedCelebrity.image} alt={selectedCelebrity.name} />
                      <h4>{selectedCelebrity.name}</h4>
                      <p className="selection-category">{selectedCelebrity.category}</p>
                    </div>
                  </div>
                </div>

                {/* Generate Button */}
                <div className="generate-section">
                  <button 
                    className={`generate-btn ${!userSelfie ? 'disabled' : ''}`}
                    onClick={handleGenerate}
                    disabled={!userSelfie || isGenerating}
                  >
                    {isGenerating ? (
                      <>
                        <div className="btn-icon">
                          <Icons.loading />
                        </div>
                        <span>Creating your image...</span>
                        <div className="spinner"></div>
                      </>
                    ) : (
                      <>
                        <div className="btn-icon">
                          <Icons.generate />
                        </div>
                        <span>Generate with {selectedCelebrity.name}</span>
                      </>
                    )}
                  </button>
                  
                  {error && <div className="error-message">{error}</div>}
                </div>
              </div>
            </div>
          ) : null}
        </>
      )}

              {/* Universe Page - AI Editor Style */}
        {currentPage === 'universe' && selectedItem && (
          <div className="ai-editor-professional">
            {/* Header Section */}
            <div className="editor-header">
              <div className="header-content">
                <div className="header-left">
                  <button 
                    className="back-btn-professional"
                    onClick={() => {
                      setCurrentPage('main');
                      setSelectedItem(null);
                    }}
                  >
                    <Icons.back />
                    <span>Back to Universes</span>
                  </button>
                  <h1 className="editor-title">{selectedItem.name} Universe</h1>
                  <p className="editor-subtitle">Transform yourself into a character from {selectedItem.name}</p>
                </div>
                <div className="header-right">
                  <div className="header-actions">
                    <button className="header-btn help-btn" title="Help">
                      <Icons.help />
                    </button>
                    <button className="header-btn share-btn" title="Share">
                      <Icons.share />
                    </button>
                    <div className="credits-display-header">
                      <Icons.coins />
                      <span className="credits-text">{user?.credits || 0} Credits</span>
                    </div>
                    <button className="upgrade-btn-header">
                      <Icons.creditCard />
                      <span>Upgrade</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Editor Layout */}
            <div className="editor-layout">
              {/* Left Panel - Controls */}
              <div className="editor-controls-panel">
                {/* Input Tabs */}
                <div className="input-tabs">
                  <button 
                    className={`input-tab ${editorMode === 'quick-edit' ? 'active' : ''}`}
                    onClick={() => setEditorMode('quick-edit')}
                  >
                    <Icons.wand />
                    <span>Quick Generation</span>
                  </button>
                  <button 
                    className={`input-tab ${editorMode === 'edit-with-prompt' ? 'active' : ''}`}
                    onClick={() => setEditorMode('edit-with-prompt')}
                  >
                    <Icons.camera />
                    <span>Custom Prompt</span>
                  </button>
                </div>

                {/* Conditional Content Based on Editor Mode */}
                {editorMode === 'quick-edit' ? (
                  // Quick Generation Mode - Show Universe-Specific Quick Ideas
                  <div className="quick-edit-section">
                    <div className="section-header">
                      <h3>Quick Generation Tips</h3>
                      <p>Select a quick idea to transform your photo into a {selectedItem.name} character</p>
                    </div>
                    
                    <div className="edit-categories-grid">
                      {getUniverseQuickIdeas(selectedItem.id).map((idea) => (
                        <div 
                          key={idea.id} 
                          className={`edit-category-card ${selectedQuickIdea?.id === idea.id ? 'active' : ''}`}
                          onClick={() => handleQuickIdeaSelect(idea)}
                        >
                          <div className="category-icon">
                            <Icons.quick />
                          </div>
                          <div className="category-info">
                            <h4>{idea.title}</h4>
                            <p>{idea.description}</p>
                          </div>
                          <div className="category-arrow">
                            <Icons.arrow />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  // Custom Prompt Mode
                  <div className="prompt-section-professional">
                    <div className="prompt-header">
                      <h3>Custom Character Prompt</h3>
                      <p>Describe your desired character transformation</p>
                    </div>

                    <div className="prompt-input-container">
                      <textarea
                        className="prompt-input-professional"
                        placeholder={`e.g., as a Jedi Knight with lightsaber, wearing Hogwarts robes, as Iron Man with suit...`}
                        value={customPrompt}
                        onChange={(e) => setCustomPrompt(e.target.value)}
                        rows={4}
                      />
                    </div>
                    
                    <div className="prompt-suggestions">
                      <h4>
                        <Icons.sparkle /> Quick Ideas for {selectedItem.name}:
                      </h4>
                      <div className="suggestion-chips">
                        {getUniverseQuickIdeas(selectedItem.id).map((idea) => (
                          <button 
                            key={idea.id}
                            className={`suggestion-chip ${selectedQuickIdea?.id === idea.id ? 'active' : ''}`}
                            onClick={() => handleQuickIdeaSelect(idea)}
                          >
                            {idea.title}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Right Panel - Upload & Preview */}
              <div className="editor-preview-panel">
                <div className="upload-section-professional">
                  <div className="upload-content-professional">
                    <div className="upload-header">
                      <div className="upload-icon-large">
                        <Icons.camera />
                        <div className="upload-pulse-professional"></div>
                      </div>
                      <h2 className="upload-title">Upload Your Photo</h2>
                      <p className="upload-description">Drag and drop your image here or click to browse</p>
                    </div>
                    
                    <div 
                      className="upload-area-professional"
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                    >
                      {userSelfie ? (
                        <div className="uploaded-preview-professional">
                          <img src={userSelfie} alt="Uploaded photo" />
                          <div className="upload-overlay-professional">
                            <button 
                              className="change-photo-btn-professional"
                              onClick={() => document.getElementById('universe-upload-professional').click()}
                            >
                              <Icons.camera />
                              <span>Change Photo</span>
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div 
                          className="upload-placeholder-professional"
                          onClick={() => document.getElementById('universe-upload-professional').click()}
                        >
                          <div className="upload-dropzone-professional">
                            <Icons.camera />
                            <span className="drop-text">Drop your photo here</span>
                            <span className="drop-hint">or click to select</span>
                          </div>
                        </div>
                      )}
                      
                      <input
                        id="universe-upload-professional"
                        type="file"
                        accept="image/*,.heic,.HEIC"
                        onChange={handleImageUpload}
                        style={{ display: 'none' }}
                      />
                    </div>
                    
                    <div className="upload-tips-professional">
                      <div className="tip-item-professional">
                        <Icons.star />
                        <span>High quality images work best</span>
                      </div>
                      <div className="tip-item-professional">
                        <Icons.wand />
                        <span>AI will enhance your photos</span>
                      </div>
                      <div className="tip-item-professional">
                        <Icons.shield />
                        <span>Your photos are secure</span>
                      </div>
                      <div className="tip-item-professional">
                        <Icons.info />
                        <span>Make sure proxy server is running (npm run proxy)</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Generate Button */}
                <div className="generate-section-professional">
                  <button 
                    className={`generate-btn-professional ${!userSelfie ? 'disabled' : ''}`}
                    onClick={handleGenerate}
                    disabled={!userSelfie || isGenerating}
                  >
                    {isGenerating ? (
                      <>
                        <div className="btn-icon">
                          <Icons.loading />
                        </div>
                        <span>Creating your transformation...</span>
                        <div className="spinner"></div>
                      </>
                    ) : (
                      <>
                        <div className="btn-icon">
                          <Icons.generate />
                        </div>
                        <span>Transform into Character</span>
                      </>
                    )}
                  </button>
                  
                  {error && <div className="error-message-professional">{error}</div>}
                </div>

                {/* Results Section */}
                {generatedImage && (
                  <div className="results-section-professional">
                    <div className="results-header">
                      <h3>✨ Your Transformation is Ready!</h3>
                    </div>
                    
                    <div className="results-comparison-professional">
                      <div className="comparison-item">
                        <h4>Original</h4>
                        <div className="comparison-image">
                          <img src={userSelfie} alt="Original" />
                        </div>
                      </div>
                      <div className="comparison-item">
                        <h4>Transformed</h4>
                        <div className="comparison-image">
                          <img src={generatedImage.url} alt="Generated result" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="results-actions-professional">
                      <button className="action-btn-professional secondary" onClick={() => window.open(generatedImage.url, '_blank')}>
                        <Icons.download />
                        <span>Download</span>
                      </button>
                      <button className="action-btn-professional secondary" onClick={() => alert('Share feature coming soon!')}>
                        <Icons.share />
                        <span>Share</span>
                      </button>
                      <button className="action-btn-professional primary" onClick={handleGenerate}>
                        <Icons.regenerate />
                        <span>Create Another</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

          {/* Style Page */}
          {currentPage === 'style' && selectedItem && (
            <div className="style-page">
              <div className="breadcrumb">
                <button 
                  className="back-btn"
                  onClick={() => {
                    setCurrentPage('main');
                    setSelectedItem(null);
                  }}
                >
                  <Icons.back /> Back to Styles
                </button>
                <span> / {selectedItem.name}</span>
              </div>

              <div className="section-header">
                <h2>Create with <span>{selectedItem.name}</span></h2>
                <p>Upload your photo and apply this artistic style</p>
              </div>

              <div className="generation-container">
                <div className="upload-section">
                  <div className="upload-area">
                    {!userSelfie && <h3>Your Selfie</h3>}
                    <div className="upload-box">
                      {userSelfie ? (
                        <div className="image-preview">
                          <img src={userSelfie} alt="Your selfie" />
                          <div className="preview-actions">
                            <button 
                              className="change-btn"
                              onClick={() => document.getElementById('selfie-upload').click()}
                            >
                              Change Photo
                            </button>
                            {savedPhotos.length > 0 && (
                              <button 
                                className="library-btn"
                                onClick={() => setShowPhotoLibrary(true)}
                              >
                                Photo Library
                              </button>
                            )}
                          </div>
                        </div>
                      ) : (
                        <div className="upload-placeholder">
                          <div className="upload-icon">
                            <Icons.camera />
                          </div>
                          <p>Click to upload your selfie</p>
                          <div className="upload-actions">
                            <button 
                              className="upload-btn"
                              onClick={() => document.getElementById('selfie-upload').click()}
                            >
                              Choose File
                            </button>
                            {savedPhotos.length > 0 && (
                              <button 
                                className="library-btn"
                                onClick={() => setShowPhotoLibrary(true)}
                              >
                                Photo Library
                              </button>
                            )}
                          </div>
                        </div>
                      )}
                      <input
                        id="selfie-upload"
                        type="file"
                        accept="image/*,.heic,.HEIC"
                        onChange={handleImageUpload}
                        style={{ display: 'none' }}
                      />
                    </div>
                  </div>

                  <div className="selection-preview">
                    <h3>Selected Style</h3>
                    <div className="selection-preview-card">
                      <img 
                        src={selectedItem.image.startsWith('/images/') ? generatePlaceholderImage('style', selectedItem.name) : selectedItem.image} 
                        alt={selectedItem.name} 
                      />
                      <h4>{selectedItem.name}</h4>
                      <p className="selection-category">{selectedItem.category}</p>
                      <p className="selection-description">{selectedItem.description}</p>
                    </div>
                  </div>
                </div>

                <div className="prompt-section">
                  <h3>Custom Prompt (Optional)</h3>
                  <div className="prompt-input-container">
                    <textarea
                      className="prompt-input"
                      placeholder="neon city background, vintage car, magical forest, etc."
                      value={customPrompt}
                      onChange={(e) => setCustomPrompt(e.target.value)}
                      rows={3}
                    />
                    <div className="prompt-tips">
                      <p><strong>Tips:</strong></p>
                      <ul>
                        <li>Describe additional style elements or background</li>
                        <li>Examples: "neon city background", "vintage car", "magical forest"</li>
                        <li>Leave empty for a basic style transformation</li>
                        <li>Your face will be preserved while applying the artistic style</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="generate-section">
                  <button 
                    className={`generate-btn ${!userSelfie ? 'disabled' : ''}`}
                    onClick={handleGenerate}
                    disabled={!userSelfie || isGenerating}
                  >
                    {isGenerating ? (
                      <>
                        <div className="btn-icon">
                          <Icons.loading />
                        </div>
                        <span>Creating Your Viral Image...</span>
                        <div className="spinner"></div>
                      </>
                    ) : (
                      <>
                        <div className="btn-icon">
                          <Icons.generate />
                        </div>
                        <span>Apply Artistic Style</span>
                      </>
                    )}
                  </button>
                  
                  {error && <div className="error-message">{error}</div>}
                </div>

                {generatedImage ? (
                  <div className="completion-view">
                    {/* Success Header */}
                    <div className="completion-header">
                      <div className="success-indicator">
                        <div className="success-icon">✓</div>
                        <h2>Generation Complete</h2>
                        <p>Your artistic style has been successfully applied</p>
                      </div>
                    </div>

                    {/* Main Result Display */}
                    <div className="result-showcase">
                      <div className="result-container">
                        <img src={generatedImage.url} alt="Generated result" className="result-image-main" />
                        
                        {/* Floating Action Bar */}
                        <div className="floating-actions">
                          <button className="primary-action" onClick={() => window.open(generatedImage.url, '_blank')}>
                            <Icons.download />
                            <span>Download</span>
                          </button>
                          <div className="secondary-actions">
                            <button className="action-btn" onClick={() => alert('Share feature coming soon!')} title="Share">
                              <Icons.share />
                            </button>
                            <button className="action-btn" onClick={() => alert('Save to gallery feature coming soon!')} title="Save">
                              <Icons.save />
                            </button>
                            <button className="action-btn" onClick={handleGenerate} title="Create Another">
                              <Icons.regenerate />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Next Steps */}
                    <div className="next-steps">
                      <h3>What would you like to do next?</h3>
                      <div className="next-actions">
                        <button className="next-action-btn primary" onClick={() => {
                          setGeneratedImage(null);
                          setUserSelfie(null);
                        }}>
                          <Icons.camera />
                          <span>Start New Creation</span>
                        </button>
                        <button className="next-action-btn secondary" onClick={() => setCurrentPage('main')}>
                          <Icons.gallery />
                          <span>Browse Gallery</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="generation-form">
                    {/* Quick Tips */}
                    <div className="quick-tips">
                      <h4>💡 Pro Tips for Artistic Styles:</h4>
                      <ul>
                        <li>🎨 Style elements: "neon lighting", "vintage filter", "anime effects"</li>
                        <li>🌆 Backgrounds: "cyberpunk city", "retro diner", "magical forest"</li>
                        <li>💫 Artistic touches: "pixelated", "watercolor", "oil painting"</li>
                        <li>🌟 Mood: "dystopian", "nostalgic", "whimsical", "glamorous"</li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Result Page */}
          {currentPage === 'result' && generatedImage && (
            <div className="result-page">
              <div className="breadcrumb">
                <button 
                  className="back-btn"
                  onClick={() => {
                    setCurrentPage('main');
                    setGeneratedImage(null);
                  }}
                >
                  <Icons.back /> Back to Main
                </button>
                <span> / Generated Image</span>
              </div>

              <div className="completion-view">
                {/* Success Header */}
                <div className="completion-header">
                  <div className="success-indicator">
                    <div className="success-icon">✓</div>
                    <h2>Generation Complete</h2>
                    <p>Your image has been successfully created</p>
                  </div>
                </div>

                {/* Main Result Display */}
                <div className="result-showcase">
                  <div className="result-container">
                    <img src={generatedImage.url} alt="Generated result" className="result-image-main" />
                    
                    {/* Floating Action Bar */}
                    <div className="floating-actions">
                      <button className="primary-action" onClick={() => window.open(generatedImage.url, '_blank')}>
                        <Icons.download />
                        <span>Download</span>
                      </button>
                      <div className="secondary-actions">
                        <button className="action-btn" onClick={() => alert('Share feature coming soon!')} title="Share">
                          <Icons.share />
                        </button>
                        <button className="action-btn" onClick={() => alert('Save to gallery feature coming soon!')} title="Save">
                          <Icons.save />
                        </button>
                        <button className="action-btn" onClick={() => {
                          setCurrentPage('main');
                          setGeneratedImage(null);
                        }} title="Create Another">
                          <Icons.regenerate />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Next Steps */}
                <div className="next-steps">
                  <h3>What would you like to do next?</h3>
                  <div className="next-actions">
                    <button className="next-action-btn primary" onClick={() => {
                      setCurrentPage('main');
                      setGeneratedImage(null);
                    }}>
                      <Icons.camera />
                      <span>Start New Creation</span>
                    </button>
                    <button className="next-action-btn secondary" onClick={() => setCurrentPage('main')}>
                      <Icons.gallery />
                      <span>Browse Gallery</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Pricing Page */}
          {activeTab === 'pricing' && (
            <div className="pricing-page-new">
              <div className="pricing-hero">
                <div className="hero-content">
                  <h2>Subscription Plans</h2>
                  <p>Choose the perfect plan for your creative journey</p>
              </div>
                <div className="hero-decoration">
                  <div className="floating-orb orb-1"></div>
                  <div className="floating-orb orb-2"></div>
                  <div className="floating-orb orb-3"></div>
                    </div>
                </div>

              <div className="pricing-container-new">
                <div className="plans-grid">
                  {membershipPlans.map((plan) => (
                    <div key={plan.id} className={`plan-card ${plan.popular ? 'popular' : ''} ${plan.id === 'free' ? 'free-plan' : ''}`}>
                      {plan.popular && (
                        <div className="popular-badge-new">
                          <span>🌟 Most Popular</span>
                        </div>
                      )}
                      
                      <div className="plan-header-new">
                        <div className="plan-badge-new" style={{ backgroundColor: plan.color }}>
                          {plan.badge}
                        </div>
                        <h3>{plan.name}</h3>
                        <div className="plan-price-new">
                          <span className="price-new">{plan.priceText}</span>
                          <span className="period-new">{plan.period}</span>
                        </div>
                        {plan.quarterlyPrice && (
                          <div className="quarterly-option">
                            <span>or ${plan.quarterlyPrice} / quarter</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="plan-description-new">
                        <p>{plan.description}</p>
                      </div>
                      
                      <div className="plan-features-new">
                        {plan.features.map((feature, index) => (
                          <div key={index} className="feature-new">
                            <div className="feature-icon">
                              <Icons.check />
                        </div>
                            <span>{feature}</span>
                        </div>
                        ))}
                      </div>
                      
                      <button 
                        className={`plan-btn-new ${plan.id === 'free' ? 'free-btn' : 'upgrade-btn'}`}
                        onClick={() => handleMembershipUpgrade(plan.id)}
                      >
                        {plan.id === 'free' ? 'Current Plan' : `Get ${plan.name}`}
                      </button>
                    </div>
                  ))}
                </div>

                {/* Extra Generations Section */}
                <div className="extra-generations-section">
                  <div className="extra-generations-card">
                    <div className="extra-header-new">
                      <div className="extra-badge-new">
                        {extraGenerationsPackage.badge}
                    </div>
                      <h3>{extraGenerationsPackage.name}</h3>
                      <div className="extra-price-new">
                        <span className="price-new">{extraGenerationsPackage.priceText}</span>
                    </div>
                    </div>
                    
                    <div className="extra-description-new">
                      <p>{extraGenerationsPackage.description}</p>
                    </div>
                    
                    <div className="extra-features-new">
                      {[
                        `${extraGenerationsPackage.generations} additional generations`,
                        'No expiration date',
                        'Works with any plan',
                        'Instant activation'
                      ].map((feature, index) => (
                        <div key={index} className="feature-new">
                          <div className="feature-icon">
                            <Icons.check />
                  </div>
                          <span>{feature}</span>
                        </div>
                      ))}
                </div>

                    <button 
                      className="extra-btn-new"
                      onClick={() => handleExtraGenerationsPurchase()}
                    >
                      Buy Extra Generations
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Profile Page */}
          {currentPage === 'profile' && (
            <div className="profile-page">
              <div className="breadcrumb">
                <button 
                  className="back-btn"
                  onClick={() => setCurrentPage('main')}
                >
                  <Icons.back /> Back to Main
                </button>
                <span> / Profile</span>
              </div>

              <div className="profile-container">
                <div className="profile-header">
                  <div className="profile-avatar">
                    <Icons.user />
                  </div>
                  <div className="profile-info">
                    <h2>{user?.name || 'User'}</h2>
                    <p>{user?.email || 'user@fameapp.com'}</p>
                    <div className="profile-stats">
                      <div className="stat">
                        <Icons.crown />
                        <span>{user?.membership === 'free' ? 'Free' : user?.membership === 'pro' ? 'Pro' : 'Studio'} Plan</span>
                      </div>
                      <div className="stat">
                        <Icons.generate />
                        <span>{user?.generationsUsed || 0} generations used today</span>
                      </div>
                      <div className="stat">
                        <Icons.calendar />
                        <span>Member since {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Today'}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="profile-actions">
                  <button 
                      className="action-btn primary"
                      onClick={() => setCurrentPage('pricing')}
                  >
                      <Icons.creditCard /> Manage Membership
                  </button>
                  <button 
                    className="action-btn"
                    onClick={() => alert('Settings coming soon!')}
                  >
                    <Icons.save /> Settings
                  </button>
                </div>

                {user?.paymentHistory && user.paymentHistory.length > 0 && (
                  <div className="payment-history">
                    <h3>Payment History</h3>
                    <div className="history-list">
                      {user.paymentHistory.map((payment) => (
                        <div key={payment.id} className="history-item">
                          <div className="history-info">
                              <span className="amount">${payment.price || payment.amount}</span>
                              <span className="payment-type">
                                {payment.type === 'membership_upgrade' ? payment.planName : 
                                 payment.type === 'extra_generations' ? `${payment.generations} Extra Generations` : 
                                 'Credit Purchase'}
                              </span>
                          </div>
                          <div className="history-date">
                              {new Date(payment.timestamp || payment.date).toLocaleDateString()}
                          </div>
                          <div className="history-status">
                              <span className="status completed">
                                Completed
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Authentication Modal */}
      {showAuthModal && (
        <div className="auth-modal-overlay">
          <div className="auth-modal">
            <div className="auth-header">
              <button 
                className="close-btn"
                onClick={() => setShowAuthModal(false)}
              >
                ×
              </button>
              <h2>{authMode === 'login' ? 'Welcome Back' : 'Join FameApp'}</h2>
              <p>{authMode === 'login' ? 'Sign in to continue creating' : 'Start creating viral images today'}</p>
            </div>

            <div className="auth-content">
              {authMode === 'login' ? (
                <div className="login-form">
                  <div className="form-group">
                    <label>Email</label>
                    <input 
                      type="email" 
                      placeholder="Enter your email"
                      defaultValue="test@fameapp.com"
                    />
                  </div>
                  <div className="form-group">
                    <label>Password</label>
                    <input 
                      type="password" 
                      placeholder="Enter your password"
                      defaultValue="test123"
                    />
                  </div>
                  <button 
                    className="auth-btn primary"
                    onClick={handleTestLogin}
                  >
                    <Icons.user />
                    Sign In
                  </button>
                  
                  <div className="auth-divider">
                    <span>or</span>
                  </div>
                  
                  <button 
                    className="auth-btn test-login"
                    onClick={handleTestLogin}
                  >
                    <Icons.zap />
                    Quick Test Login (10 Credits)
                  </button>
                  
                  <div className="auth-footer">
                    <p>Don't have an account? 
                      <button 
                        className="link-btn"
                        onClick={() => setAuthMode('signup')}
                      >
                        Sign up
                      </button>
                    </p>
                  </div>
                </div>
              ) : (
                <div className="signup-form">
                  <div className="form-group">
                    <label>Full Name</label>
                    <input 
                      type="text" 
                      placeholder="Enter your full name"
                      defaultValue="Test User"
                    />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input 
                      type="email" 
                      placeholder="Enter your email"
                      defaultValue="test@fameapp.com"
                    />
                  </div>
                  <div className="form-group">
                    <label>Password</label>
                    <input 
                      type="password" 
                      placeholder="Create a password"
                      defaultValue="test123"
                    />
                  </div>
                  <button 
                    className="auth-btn primary"
                    onClick={handleTestLogin}
                  >
                    <Icons.user />
                    Create Account
                  </button>
                  
                  <div className="auth-divider">
                    <span>or</span>
                  </div>
                  
                  <button 
                    className="auth-btn test-login"
                    onClick={handleTestLogin}
                  >
                    <Icons.zap />
                    Quick Test Login (10 Credits)
                  </button>
                  
                  <div className="auth-footer">
                    <p>Already have an account? 
                      <button 
                        className="link-btn"
                        onClick={() => setAuthMode('login')}
                      >
                        Sign in
                      </button>
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="auth-benefits">
              <h4>🎉 What you get with FameApp:</h4>
              <div className="benefits-list">
                <div className="benefit">
                  <Icons.generate />
                  <span>AI-powered image generation</span>
                </div>
                <div className="benefit">
                  <Icons.celebrity />
                  <span>Celebrity selfies & transformations</span>
                </div>
                <div className="benefit">
                  <Icons.universe />
                  <span>Universe & style transformations</span>
                </div>
                <div className="benefit">
                  <Icons.share />
                  <span>Viral-ready social sharing</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Save Photo Modal */}
      {showSavePhotoModal && photoToSave && (
        <div className="modal-overlay">
          <div className="save-photo-modal">
            <div className="modal-header">
              <button 
                className="close-btn"
                onClick={() => {
                  setShowSavePhotoModal(false);
                  setPhotoToSave(null);
                }}
              >
                ×
              </button>
              <h2>Save Photo to Library?</h2>
              <p>Save this photo for quick access in future creations</p>
            </div>

            <div className="modal-content">
              <div className="photo-preview-save">
                <img src={photoToSave} alt="Photo to save" />
              </div>
              
              <div className="save-options">
                <div className="form-group">
                  <label>Photo Name (Optional)</label>
                  <input 
                    type="text" 
                    placeholder="e.g., My Best Selfie, Professional Headshot"
                    defaultValue="My Photo"
                    id="photo-name-input"
                  />
                </div>
                
                <div className="save-benefits">
                  <h4>✨ Benefits of saving:</h4>
                  <ul>
                    <li>🚀 Quick access for future generations</li>
                    <li>💾 No need to re-upload the same photo</li>
                    <li>⭐ Set as default for automatic use</li>
                    <li>📱 Works across all creation modes</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="modal-actions">
              <button 
                className="btn-secondary"
                onClick={() => {
                  setShowSavePhotoModal(false);
                  setPhotoToSave(null);
                }}
              >
                Skip for Now
              </button>
              <button 
                className="btn-primary"
                onClick={() => {
                  const nameInput = document.getElementById('photo-name-input');
                  const photoName = nameInput ? nameInput.value : 'My Photo';
                  savePhotoToLibrary(photoToSave, photoName);
                }}
              >
                <Icons.save /> Save to Library
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Photo Library Modal */}
      {showPhotoLibrary && (
        <div className="modal-overlay">
          <div className="photo-library-modal">
            <div className="modal-header">
              <button 
                className="close-btn"
                onClick={() => setShowPhotoLibrary(false)}
              >
                ×
              </button>
              <h2>Your Photo Library</h2>
              <p>Select a photo to use for generation</p>
            </div>

            <div className="modal-content">
              {savedPhotos.length === 0 ? (
                <div className="empty-library">
                  <Icons.gallery />
                  <h3>No saved photos yet</h3>
                  <p>Upload a photo and save it to your library for quick access</p>
                </div>
              ) : (
                <div className="photo-grid">
                  {savedPhotos.map((photo) => (
                    <div 
                      key={photo.id}
                      className={`photo-item ${selectedSavedPhoto?.id === photo.id ? 'selected' : ''}`}
                      onClick={() => selectPhotoFromLibrary(photo)}
                    >
                      <div className="photo-image">
                        <img src={photo.data} alt={photo.name} />
                        {photo.isDefault && (
                          <div className="default-badge">⭐ Default</div>
                        )}
                      </div>
                      <div className="photo-info">
                        <h4>{photo.name}</h4>
                        <p>{new Date(photo.createdAt).toLocaleDateString()}</p>
                      </div>
                      <div className="photo-actions">
                        <button 
                          className="action-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            setDefaultPhoto(photo.id);
                          }}
                          title="Set as default"
                        >
                          <Icons.star />
                        </button>
                        <button 
                          className="action-btn delete"
                          onClick={(e) => {
                            e.stopPropagation();
                            removePhotoFromLibrary(photo.id);
                          }}
                          title="Delete photo"
                        >
                          <Icons.save />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="modal-actions">
              <button 
                className="btn-secondary"
                onClick={() => setShowPhotoLibrary(false)}
              >
                Cancel
              </button>
              {savedPhotos.length > 0 && (
                <button 
                  className="btn-primary"
                  onClick={() => {
                    if (selectedSavedPhoto) {
                      selectPhotoFromLibrary(selectedSavedPhoto);
                    }
                  }}
                  disabled={!selectedSavedPhoto}
                >
                  <Icons.generate /> Use Selected Photo
                </button>
              )}
            </div>
          </div>
        </div>
      )}



          {/* Profile Page */}
          {activeTab === 'profile' && (
            <>
              {!isAuthenticated ? (
                <div className="profile-page">
                  <div className="profile-container">
                    <div className="profile-header">
                      <div className="profile-avatar">
                        <Icons.user />
                      </div>
                      <div className="profile-info">
                        <h2>Please Login</h2>
                        <p>You need to be logged in to view your profile</p>
                      </div>
                    </div>
                    <div className="profile-actions">
                      <button className="action-btn" onClick={() => setShowAuthModal(true)}>
                        <Icons.user />
                        <span>Login</span>
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="profile-page">
                  <div className="profile-container">
                    <div className="profile-header">
                      <div className="profile-avatar">
                        <Icons.user />
                      </div>
                      <div className="profile-info">
                        <h2>{user?.name || 'User Profile'}</h2>
                        <p>{user?.email || 'user@fameapp.com'}</p>
                      </div>
                    </div>

                    <div className="profile-stats">
                      <div className="stat">
                        <Icons.gallery />
                        <div>
                          <h3>{savedPhotos.length}</h3>
                          <p>Generated Images</p>
                        </div>
                      </div>
                      <div className="stat">
                        <Icons.coins />
                        <div>
                          <h3>{user?.generationsUsed || 0}</h3>
                          <p>Generations Used</p>
                        </div>
                      </div>
                      <div className="stat">
                        <Icons.crown />
                        <div>
                          <h3>{user?.membership || 'Free'}</h3>
                          <p>Current Plan</p>
                        </div>
                      </div>
                    </div>

                    <div className="profile-actions">
                      <button className="action-btn" onClick={() => setActiveTab('usage')}>
                        <Icons.coins />
                        <span>View Usage</span>
                      </button>
                      <button className="action-btn" onClick={() => setActiveTab('pricing')}>
                        <Icons.creditCard />
                        <span>Upgrade Plan</span>
                      </button>
                      <button className="action-btn" onClick={handleLogout}>
                        <Icons.logout />
                        <span>Logout</span>
                      </button>
                    </div>

                    <div className="recent-generations">
                      <h3>Recent Generations</h3>
                      <div className="generations-grid">
                        {savedPhotos.slice(0, 6).map((photo) => (
                          <div key={photo.id} className="generation-item">
                            <img src={photo.data} alt={photo.name} />
                            <div className="generation-info">
                              <h4>{photo.name}</h4>
                              <p>{new Date(photo.createdAt).toLocaleDateString()}</p>
                            </div>
                          </div>
                        ))}
                        {savedPhotos.length === 0 && (
                          <div className="empty-generations">
                            <Icons.gallery />
                            <p>No generations yet. Start creating!</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
                    )}

          {/* Usage Page */}
          {activeTab === 'usage' && (
            <>
              {!isAuthenticated ? (
                <div className="profile-page">
                  <div className="profile-container">
                    <div className="profile-header">
                      <div className="profile-avatar">
                        <Icons.coins />
                      </div>
                      <div className="profile-info">
                        <h2>Please Login</h2>
                        <p>You need to be logged in to view your usage</p>
                      </div>
                    </div>
                    <div className="profile-actions">
                      <button className="action-btn" onClick={() => setShowAuthModal(true)}>
                        <Icons.user />
                        <span>Login</span>
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="profile-page">
                  <div className="profile-container">
                    <div className="profile-header">
                      <div className="profile-avatar">
                        <Icons.coins />
                      </div>
                      <div className="profile-info">
                        <h2>Usage & Billing</h2>
                        <p>Track your generations and billing history</p>
                      </div>
                    </div>

                    <div className="profile-stats">
                      <div className="stat">
                        <Icons.coins />
                        <div>
                          <h3>{user?.generationsUsed || 0}</h3>
                          <p>Generations Used</p>
                        </div>
                      </div>
                      <div className="stat">
                        <Icons.crown />
                        <div>
                          <h3>{user?.membership || 'Free'}</h3>
                          <p>Current Plan</p>
                        </div>
                      </div>
                      <div className="stat">
                        <Icons.creditCard />
                        <div>
                          <h3>{user?.paymentHistory?.length || 0}</h3>
                          <p>Payment History</p>
                        </div>
                      </div>
                    </div>

                    <div className="profile-actions">
                      <button className="action-btn" onClick={() => setActiveTab('pricing')}>
                        <Icons.creditCard />
                        <span>Upgrade Plan</span>
                      </button>
                      <button className="action-btn" onClick={() => setActiveTab('profile')}>
                        <Icons.user />
                        <span>Back to Profile</span>
                      </button>
                    </div>

                    {user?.paymentHistory && user.paymentHistory.length > 0 && (
                      <div className="recent-generations">
                        <h3>Payment History</h3>
                        <div className="generations-grid">
                          {user.paymentHistory.slice(0, 6).map((payment) => (
                            <div key={payment.id} className="generation-item">
                              <div className="generation-info">
                                <h4>{payment.planName || payment.type}</h4>
                                <p>${payment.price} - {new Date(payment.timestamp).toLocaleDateString()}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </>
          )}
      </div>
    );
}

export default App;
