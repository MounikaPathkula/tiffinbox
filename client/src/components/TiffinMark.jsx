import React from 'react';

// Signature mark: a stacked tiffin (dabba) — the visual identity of TiffinBox.
// Used as the logo, and its rings double as a loading motif.
export default function TiffinMark({ size = 32, spin = false }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={spin ? 'tiffin-mark tiffin-mark--spin' : 'tiffin-mark'}
      aria-hidden="true"
    >
      <rect x="6" y="30" width="36" height="10" rx="3" fill="var(--chili)" />
      <rect x="7" y="20" width="34" height="10" rx="2.5" fill="var(--turmeric)" />
      <rect x="8" y="11" width="32" height="9.5" rx="2" fill="var(--leaf)" />
      <path d="M18 11 V6.5 a6 6 0 0 1 12 0 V11" stroke="var(--ink)" strokeWidth="2.4" fill="none" strokeLinecap="round" />
    </svg>
  );
}
