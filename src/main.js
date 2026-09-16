import './style.css';
import { SceneManager } from './engine/sceneManager.js';
import { setupProjectSelector } from './ui/projectSelector.js';
import { setupPhaseTimeline } from './ui/phaseTimeline.js';
import { setupRenderControls } from './ui/renderControls.js';

function initApp() {
  try {
    const canvasContainer = document.getElementById('canvas-container');
    const projectSelectorContainer = document.getElementById('top-nav-slot');
    const phaseTimelineContainer = document.getElementById('phase-timeline-slot');
    const renderControlsContainer = document.getElementById('render-controls-slot');

    if (!canvasContainer || !projectSelectorContainer || !phaseTimelineContainer || !renderControlsContainer) {
      throw new Error('Required DOM container elements not found.');
    }

    // Initialize UI components first so the user sees the interface immediately
    setupProjectSelector(projectSelectorContainer);

    // Initialize 3D Engine & Scene Manager
    const sceneManager = new SceneManager(canvasContainer);

    // Setup interactive phase timeline & render controls with sceneManager reference
    setupPhaseTimeline(phaseTimelineContainer, sceneManager);
    setupRenderControls(renderControlsContainer, sceneManager);

    console.log('🏛️ Mughal 3D Architecture Studio initialized successfully.');
  } catch (err) {
    console.error('Fatal initialization error in Mughal 3D Studio:', err);
    const errBanner = document.createElement('div');
    errBanner.style.cssText = 'position:fixed;top:30px;left:50%;transform:translateX(-50%);max-width:600px;width:90%;padding:16px 20px;background:#7f1d1d;color:#fecaca;border:1px solid #ef4444;border-radius:10px;z-index:999999;font-family:sans-serif;font-size:13px;line-height:1.5;box-shadow:0 20px 40px rgba(0,0,0,0.8);';
    errBanner.innerHTML = `<strong>⚠️ Initialization Warning:</strong><br/>${err.message}<br/><pre style="font-size:11px;overflow:auto;margin-top:8px;opacity:0.85;">${err.stack || ''}</pre>`;
    document.body.appendChild(errBanner);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  // DOM is already ready (standard for ES modules)
  initApp();
}
