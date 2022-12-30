/**
 * For bg, fg: Default is l1, and d, l are the abbr of dark, light
 * For other colors: Default is neutral, and b, f are the abbr of bright, faded
 */
const gruvboxColors = {
  bg: {
    lh: '#f9f5d7',
    DEFAULT: '#fbf1c7',
    ls: '#f2e5bc',
    l1: '#ebdbb2',
    l2: '#d5c4a1',
    l3: '#bdae93',
    l4: '#a89984',
    dh: '#1d2021',
    d: '#282828',
    ds: '#32302f',
    d1: '#3c3836',
    d2: '#504945',
    d3: '#665c54',
    d4: '#7c6f64',
  },
  fg: {
    l0: '#282828',
    DEFAULT: '#3c3836',
    l2: '#504945',
    l3: '#665c54',
    l4: '#7c6f64',
    d0: '#fbf1c7',
    d: '#ebdbb2',
    d2: '#d5c4a1',
    d3: '#bdae93',
    d4: '#a89984',
  },
  gray: '#928374',
  red: {
    DEFAULT: '#cc241d',
    b: '#fb4934',
    f: '#9d0006',
  },
  green: {
    DEFAULT: '#98971a',
    b: '#b8bb26',
    f: '#79740e',
  },
  yellow: {
    DEFAULT: '#d79921',
    b: '#fabd2f',
    f: '#b57614',
  },
  blue: {
    DEFAULT: '#458588',
    b: '#83a598',
    f: '#076678',
  },
  purple: {
    DEFAULT: '#b16286',
    b: '#d3869b',
    f: '#8f3f71',
  },
  aqua: {
    DEFAULT: '#689d6a',
    b: '#8ec07c',
    f: '#427b58',
  },
  orange: {
    DEFAULT: '#d65d0e',
    b: '#fe8019',
    f: '#af3a03',
  },
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['app/**/*.{js,mjs,jsx,ts,tsx}'],
  theme: {
    colors: gruvboxColors,
    extend: {
      fontFamily: {
        sans: ['var(--font-open-sans)'],
        // This causes Hans texts to use Latin punctuations, but it is not so harmful and can be tolerated.
        serif: ['var(--font-roboto-serif)', 'var(--font-noto-serif-sc)'],
        mono: ['var(--font-dm-mono)'],
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}
