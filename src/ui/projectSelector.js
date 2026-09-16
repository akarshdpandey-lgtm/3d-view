import { projectStore } from '../state/projectStore.js';

/**
 * Handles Project Separation, Project Selection, and Adding New Prompts.
 * Satisfies the core requirement:
 * "sepration add krte rhnaa kyuki iske bad mai dusra prompt dunga dusra phir select kr sku aru phla save rhe usi me"
 */
export function setupProjectSelector(container) {
  const render = () => {
    const projects = projectStore.projects;
    const activeId = projectStore.activeProjectId;
    const activeProject = projectStore.getActiveProject();

    container.innerHTML = `
      <div class="project-selector-container">
        <div class="project-selector-left">
          <div class="brand-badge">
            <span class="brand-icon">🏛️</span>
            <div class="brand-text">
              <span class="brand-title">MUGHAL 3D STUDIO</span>
              <span class="brand-sub">Architectural Synthesizer</span>
            </div>
          </div>

          <div class="project-dropdown-wrapper">
            <label class="field-label">Active Project / Prompt Set:</label>
            <div class="select-box">
              <select id="project-select-input" class="project-select">
                ${(() => {
                  const categories = {};
                  projects.forEach(p => {
                    const cat = p.category || '🏛️ Other Architectural Projects';
                    if (!categories[cat]) categories[cat] = [];
                    categories[cat].push(p);
                  });
                  return Object.entries(categories).map(([catName, projList]) => `
                    <optgroup label="${catName}">
                      ${projList.map(p => `
                        <option value="${p.id}" ${p.id === activeId ? 'selected' : ''}>
                          ${p.name}
                        </option>
                      `).join('')}
                    </optgroup>
                  `).join('');
                })()}
              </select>
            </div>
          </div>
        </div>

        <div class="project-selector-right">
          <button id="btn-toggle-hud" class="btn-secondary" title="Toggle UI overlays for an unobstructed 3D view">
            <span class="btn-icon">👁️</span>
            <span class="btn-text" id="hud-toggle-text">Full 3D View</span>
          </button>
          <button id="btn-new-prompt" class="btn-primary-gold" title="Create a new model from your next prompt">
            <span class="btn-icon">✨</span>
            <span class="btn-text">+ New Project</span>
          </button>
        </div>
      </div>

      <!-- New Prompt Modal -->
      <div id="new-prompt-modal" class="modal-backdrop hidden">
        <div class="modal-card">
          <div class="modal-header">
            <div class="modal-title-group">
              <span class="modal-icon">📜</span>
              <div>
                <h3 class="modal-title">New Prompt & Architectural Project</h3>
                <p class="modal-desc">Add your next prompt. It will be saved as a separate project so you can switch back to the Mughal Museum anytime.</p>
              </div>
            </div>
            <button id="btn-close-modal" class="btn-close">&times;</button>
          </div>

          <form id="new-prompt-form" class="modal-form">
            <div class="form-group">
              <label for="input-project-name">Project / Monument Name</label>
              <input 
                type="text" 
                id="input-project-name" 
                class="form-input" 
                placeholder="e.g. Diwan-i-Khas Pavilion, Amber Fort Gateway..." 
                required 
              />
            </div>

            <div class="form-group">
              <label for="input-project-prompt">Your Next Prompt</label>
              <textarea 
                id="input-project-prompt" 
                class="form-textarea" 
                rows="4" 
                placeholder="Enter your next architecture or model prompt here (e.g. Phase 1 — Fortress base walls, octagonal bastions...)"
                required
              ></textarea>
            </div>

            <div class="form-group">
              <label for="select-archetype">Architectural Style / Archetype</label>
              <select id="select-archetype" class="form-input">
                <option value="mughal">Imperial Mughal (Symmetrical, Marble & Pietra Dura)</option>
                <option value="indo-islamic">Indo-Islamic Sultanate (Red Sandstone & Geometric Iwans)</option>
                <option value="rajput">Rajputana Heritage (Intricate Jharokhas & Stepped Plinths)</option>
                <option value="persian">Safavid / Persian Garden Pavilion</option>
              </select>
            </div>

            <div class="modal-actions">
              <button type="button" id="btn-cancel-modal" class="btn-secondary">Cancel</button>
              <button type="submit" class="btn-primary-gold">Save Project & Synthesize 3D</button>
            </div>
          </form>
        </div>
      </div>
    `;

    // Dropdown change
    const selectElem = container.querySelector('#project-select-input');
    selectElem.addEventListener('change', (e) => {
      projectStore.selectProject(e.target.value);
    });

    // Modal triggers
    const modal = container.querySelector('#new-prompt-modal');
    const openBtn = container.querySelector('#btn-new-prompt');
    const closeBtn = container.querySelector('#btn-close-modal');
    const cancelBtn = container.querySelector('#btn-cancel-modal');
    const form = container.querySelector('#new-prompt-form');

    const openModal = () => {
      modal.classList.remove('hidden');
      container.querySelector('#input-project-name').focus();
    };
    const closeModal = () => modal.classList.add('hidden');

    openBtn.addEventListener('click', openModal);
    closeBtn.addEventListener('click', closeModal);
    cancelBtn.addEventListener('click', closeModal);

    // Toggle HUD / Cinema Mode
    const hudBtn = container.querySelector('#btn-toggle-hud');
    const hudText = container.querySelector('#hud-toggle-text');
    let isCinemaMode = false;
    if (hudBtn) {
      hudBtn.addEventListener('click', () => {
        isCinemaMode = !isCinemaMode;
        const overlay = document.getElementById('main-ui-overlay');
        if (overlay) {
          overlay.classList.toggle('cinema-mode', isCinemaMode);
        }
        hudText.textContent = isCinemaMode ? 'Show Controls' : 'Full 3D View';
      });
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = container.querySelector('#input-project-name').value;
      const prompt = container.querySelector('#input-project-prompt').value;
      const archetype = container.querySelector('#select-archetype').value;

      projectStore.createNewProject(name, prompt, archetype);
      closeModal();
    });
  };

  projectStore.subscribe(() => render());
  render();
}
