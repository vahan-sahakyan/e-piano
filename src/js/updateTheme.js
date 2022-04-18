// DARK MODE
const updateTheme = () => {
  const isLight = window.matchMedia('(prefers-color-scheme: light)').matches;
  document.getElementById('dark-css').disabled = isLight;
};

updateTheme();

window
  .matchMedia('(prefers-color-scheme: light)')
  .addEventListener('change', updateTheme);
