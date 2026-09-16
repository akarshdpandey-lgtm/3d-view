import { projectStore } from '../state/projectStore.js';

let isSideDockMinimized = false;

export function setupPhaseTimeline(container, sceneManager) {
  const render = () => {
    const proj = projectStore.getActiveProject();
    const currentPhase = projectStore.activePhase;
    const isNationalMuseum = proj.id === 'national-museum-delhi-02' || proj.archetype === 'national-museum';

    if (isSideDockMinimized) {
      // Minimized slim floating sidebar pill
      container.innerHTML = `
        <div class="phase-side-dock minimized" id="phase-side-dock">
          <div class="minimized-pill-header">
            <button id="btn-toggle-dock" class="btn-dock-toggle" title="Expand Phase Panel">
              <span class="dock-arrow">▶</span>
              <span class="dock-label-min">PHASE ${currentPhase}</span>
            </button>
          </div>
          <div class="minimized-nodes">
            ${[1, 2, 3, 4].map(p => `
              <button 
                class="min-phase-node ${currentPhase === p ? 'active' : ''} ${currentPhase >= p ? 'completed' : ''}" 
                data-phase="${p}"
                title="Phase ${p}: ${proj.phases?.[p]?.title || ''}"
              >
                ${p}
              </button>
            `).join('')}
          </div>
        </div>
      `;
    } else {
      // Full floating side dock (Placed on the left side, completely clearing the 3D center view)
      container.innerHTML = `
        <div class="phase-side-dock" id="phase-side-dock">
          <div class="dock-header">
            <div class="dock-title-group">
              <span class="dock-badge">ARCHITECTURAL PHASES</span>
              <span class="dock-phase-indicator">Phase ${currentPhase} of 4</span>
            </div>
            <button id="btn-toggle-dock" class="btn-dock-toggle" title="Minimize Side Panel (Unobstructed 3D View)">
              ◀
            </button>
          </div>

          <div class="phase-steps-vertical">
            ${[1, 2, 3, 4].map(p => {
              const phaseData = proj.phases?.[p] || {};
              const isActive = currentPhase === p;
              const isCompleted = currentPhase >= p;

              const shortTitle = p === 1 ? 'Base Structure' : p === 2 ? 'Detailing' : p === 3 ? 'Materials & Textures' : 'Plaza & Environment';

              return `
                <button 
                  class="phase-node-v ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}" 
                  data-phase="${p}"
                  title="${phaseData.title || `Phase ${p}`}"
                  id="phase-btn-${p}"
                >
                  <div class="node-circle-v">
                    <span class="node-num-v">${p}</span>
                    ${isActive ? '<span class="node-pulse-v"></span>' : ''}
                  </div>
                  <div class="node-content-v">
                    <span class="node-tag-v">PHASE 0${p}</span>
                    <span class="node-name-v">${shortTitle}</span>
                  </div>
                  ${isActive ? '<span class="node-active-marker">●</span>' : ''}
                </button>
              `;
            }).join('')}
          </div>

          <div class="active-phase-card-v">
            <div class="card-v-top">
              <h3 class="phase-v-title">${proj.phases?.[currentPhase]?.title || `Phase ${currentPhase}`}</h3>
              <span class="phase-v-pill">${(() => {
                const isSJ = proj.id === 'salar-jung-museum-03' || proj.archetype === 'colonial';
                if (isSJ) {
                  return currentPhase === 1 ? 'Colonial Clay Massing' : currentPhase === 2 ? 'Colonnades & Clock Tower' : currentPhase === 3 ? 'Cream Stucco & Brass' : 'Heritage Street at Dusk';
                } else if (isNationalMuseum) {
                  return currentPhase === 1 ? 'Clay Geometry' : currentPhase === 2 ? 'Stairs & Glass Facade' : currentPhase === 3 ? 'Sandstone & Artifacts' : 'Daylight Plaza Render';
                } else {
                  return currentPhase === 1 ? 'Geometry Only' : currentPhase === 2 ? 'Iwans & Chhatris' : currentPhase === 3 ? 'Pietra Dura & Marble' : 'Photoreal Environment';
                }
              })()}</span>
            </div>
            <p class="phase-v-prompt">"${proj.phases?.[currentPhase]?.prompt || ''}"</p>
            <div class="phase-v-chips">
              ${(proj.phases?.[currentPhase]?.features || []).map(f => `
                <span class="feature-chip-v"><span class="chip-dot-v"></span>${f}</span>
              `).join('')}
            </div>
          </div>
        </div>
      `;
    }

    // Toggle minimize/expand handler
    const toggleBtn = container.querySelector('#btn-toggle-dock');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        isSideDockMinimized = !isSideDockMinimized;
        render();
      });
    }

    // Phase selection events (full & minimized)
    container.querySelectorAll('[data-phase]').forEach(btn => {
      btn.addEventListener('click', () => {
        const phase = parseInt(btn.dataset.phase, 10);
        projectStore.setPhase(phase);

        const isSJ = proj.id === 'salar-jung-museum-03' || proj.archetype === 'colonial';

        // Transition camera smoothly according to phase & project
        if (phase === 4) {
          sceneManager.setCameraPreset(isSJ ? 'duskStreet' : (isNationalMuseum ? 'plazaFront' : 'charbaghFront'));
        } else if (phase === 3) {
          sceneManager.setCameraPreset(isSJ ? 'clockTower' : 'hero');
        } else if (phase === 2) {
          sceneManager.setCameraPreset(isSJ ? 'colonnade' : (isNationalMuseum ? 'staircase' : 'hero'));
        } else {
          sceneManager.setCameraPreset('hero');
        }
      });
    });
  };

  projectStore.subscribe(() => render());
  render();
}
