import { projectStore } from '../state/projectStore.js';

export function setupRenderControls(container, sceneManager) {
  const render = () => {
    const currentMode = projectStore.viewMode;
    const showSymmetry = projectStore.showSymmetry;
    const currentPhase = projectStore.activePhase;

    container.innerHTML = `
      <div class="render-controls-panel">
        <div class="panel-section">
          <div class="panel-title">VIEW STYLE</div>
          <div class="button-group">
            <button class="btn-mode ${currentMode === 'realistic' ? 'active' : ''}" data-mode="realistic" id="btn-mode-realistic">
              <span class="mode-icon">💎</span>
              <span>Photoreal</span>
            </button>
            <button class="btn-mode ${currentMode === 'clay' ? 'active' : ''}" data-mode="clay" id="btn-mode-clay">
              <span class="mode-icon">🏺</span>
              <span>Clay Form</span>
            </button>
            <button class="btn-mode ${currentMode === 'wireframe' ? 'active' : ''}" data-mode="wireframe" id="btn-mode-wireframe">
              <span class="mode-icon">📐</span>
              <span>Wireframe</span>
            </button>
          </div>
        </div>

        <div class="panel-section">
          <div class="panel-title">CAMERA ANGLES</div>
          <div class="camera-grid">
            ${(() => {
              const activeProj = projectStore.getActiveProject();
              const isKedarnath = activeProj.id === 'kedarnath-01' || activeProj.archetype === 'kedarnath';
              const isBadrinath = activeProj.id === 'badrinath-02' || activeProj.archetype === 'badrinath';
              const isMahakaleshwar = activeProj.id === 'mahakaleshwar-03' || activeProj.archetype === 'mahakaleshwar';
              const isKashi = activeProj.id === 'kashi-vishwanath-04' || activeProj.archetype === 'kashi-vishwanath';
              const isKhajuraho = activeProj.id === 'khajuraho-01' || activeProj.archetype === 'nagara-temple';
              const isHampi = activeProj.id === 'hampi-02' || activeProj.archetype === 'hampi-ruins';
              const isAjanta = activeProj.id === 'ajanta-ellora-03' || activeProj.archetype === 'rock-cut-cave';
              const isTaj = activeProj.id === 'taj-mahal-01' || activeProj.archetype === 'taj-mahal';
              const isRed = activeProj.id === 'red-fort-02' || activeProj.archetype === 'red-fort';
              const isHawa = activeProj.id === 'hawa-mahal-03' || activeProj.archetype === 'hawa-mahal';
              const isSJ = activeProj.id === 'salar-jung-museum-03' || activeProj.archetype === 'colonial';
              const isNM = activeProj.id === 'national-museum-delhi-02' || activeProj.archetype === 'national-museum';

              if (isKedarnath) {
                return `
                  <button class="btn-cam" data-cam="templeFront" title="Grand front approach of Kedarnath Temple">
                    <span class="cam-icon">🛕</span>
                    <span>Temple Front</span>
                  </button>
                  <button class="btn-cam" data-cam="hero" title="Dynamic 3/4 perspective of stone temple & shikhara">
                    <span class="cam-icon">📸</span>
                    <span>Hero 3/4</span>
                  </button>
                  <button class="btn-cam" data-cam="nandiFocus" title="Monolithic Stone Nandi bull statue facing entrance">
                    <span class="cam-icon">🐂</span>
                    <span>Nandi Statue</span>
                  </button>
                  <button class="btn-cam" data-cam="shikharaRoof" title="Sloping stone slab roof and ribbed shikhara spire">
                    <span class="cam-icon">🏔️</span>
                    <span>Stone Roof</span>
                  </button>
                  <button class="btn-cam" data-cam="himalayanPeaks" title="Majestic snow-covered Kedarnath mountain peaks backdrop">
                    <span class="cam-icon">❄️</span>
                    <span>Snow Peaks</span>
                  </button>
                  <button class="btn-cam" data-cam="aerial" title="Aerial view of Kedarnath valley & moraine pathway">
                    <span class="cam-icon">🚁</span>
                    <span>Aerial Valley</span>
                  </button>
                `;
              } else if (isBadrinath) {
                return `
                  <button class="btn-cam" data-cam="colorfulFacade" title="Vibrant painted Singhdwara entrance facade">
                    <span class="cam-icon">🌈</span>
                    <span>Painted Facade</span>
                  </button>
                  <button class="btn-cam" data-cam="hero" title="Dynamic 3/4 perspective of colorful Himalayan temple">
                    <span class="cam-icon">📸</span>
                    <span>Hero 3/4</span>
                  </button>
                  <button class="btn-cam" data-cam="taptKund" title="Sacred Tapt Kund natural thermal bath pool">
                    <span class="cam-icon">♨️</span>
                    <span>Tapt Kund</span>
                  </button>
                  <button class="btn-cam" data-cam="conicalRoof" title="Conical gilded canopy roof & gold finial">
                    <span class="cam-icon">✨</span>
                    <span>Conical Spire</span>
                  </button>
                  <button class="btn-cam" data-cam="narNarayanValley" title="Nar and Narayan mountain valley and Alaknanda river">
                    <span class="cam-icon">🏞️</span>
                    <span>Alaknanda Valley</span>
                  </button>
                  <button class="btn-cam" data-cam="aerial" title="Aerial view of Badrinath temple complex">
                    <span class="cam-icon">🚁</span>
                    <span>Aerial Complex</span>
                  </button>
                `;
              } else if (isMahakaleshwar) {
                return `
                  <button class="btn-cam" data-cam="templeFront" title="Grand approach of Mahakaleshwar Jyotirlinga temple">
                    <span class="cam-icon">🛕</span>
                    <span>Temple Front</span>
                  </button>
                  <button class="btn-cam" data-cam="hero" title="Dynamic 3/4 perspective of multi-tiered Nagara temple">
                    <span class="cam-icon">📸</span>
                    <span>Hero 3/4</span>
                  </button>
                  <button class="btn-cam" data-cam="nandiMandapa" title="Dedicated open Nandi pavilion near entrance">
                    <span class="cam-icon">🐂</span>
                    <span>Nandi Mandapa</span>
                  </button>
                  <button class="btn-cam" data-cam="layeredShikhara" title="Towering multi-tier shikhara spire with golden Trishul">
                    <span class="cam-icon">🔱</span>
                    <span>Mahakal Shikhara</span>
                  </button>
                  <button class="btn-cam" data-cam="koteshwarKund" title="Sacred Koteshwar Kund temple water reservoir">
                    <span class="cam-icon">🌊</span>
                    <span>Koteshwar Kund</span>
                  </button>
                  <button class="btn-cam" data-cam="aerial" title="Aerial view of Ujjain temple complex courtyards">
                    <span class="cam-icon">🚁</span>
                    <span>Aerial Courtyard</span>
                  </button>
                `;
              } else if (isKashi) {
                return `
                  <button class="btn-cam" data-cam="goldenSpire" title="Monumental 24K Golden Dome & Swarna Shikhara spire">
                    <span class="cam-icon">👑</span>
                    <span>Golden Spire</span>
                  </button>
                  <button class="btn-cam" data-cam="hero" title="Dynamic 3/4 perspective of Kashi Vishwanath temple">
                    <span class="cam-icon">📸</span>
                    <span>Hero 3/4</span>
                  </button>
                  <button class="btn-cam" data-cam="templeFront" title="Main entrance gate and sacred Nandi shrine">
                    <span class="cam-icon">🛕</span>
                    <span>Temple Portal</span>
                  </button>
                  <button class="btn-cam" data-cam="corridorArcades" title="Varanasi heritage corridor pavilions and chhatris">
                    <span class="cam-icon">🏛️</span>
                    <span>Heritage Corridor</span>
                  </button>
                  <button class="btn-cam" data-cam="morningGlow" title="Warm morning sunlight reflecting off golden domes">
                    <span class="cam-icon">🌅</span>
                    <span>Morning Glow</span>
                  </button>
                  <button class="btn-cam" data-cam="aerial" title="Aerial view of Kashi Vishwanath complex">
                    <span class="cam-icon">🚁</span>
                    <span>Aerial Kashi</span>
                  </button>
                `;
              } else if (isKhajuraho) {
                return `
                  <button class="btn-cam" data-cam="templeFront" title="Grand front approach of Nagara temple">
                    <span class="cam-icon">🛕</span>
                    <span>Temple Front</span>
                  </button>
                  <button class="btn-cam" data-cam="hero" title="Dynamic 3/4 perspective of curvilinear shikhara">
                    <span class="cam-icon">📸</span>
                    <span>Hero 3/4</span>
                  </button>
                  <button class="btn-cam" data-cam="shikharaSpire" title="Curvilinear shikhara & stacked urushringa mini spires">
                    <span class="cam-icon">✨</span>
                    <span>Shikhara Spire</span>
                  </button>
                  <button class="btn-cam" data-cam="mandapaEntrance" title="Pillared ardha-mandapa entrance porch">
                    <span class="cam-icon">🏛️</span>
                    <span>Mandapa Porch</span>
                  </button>
                  <button class="btn-cam" data-cam="reliefCarvings" title="Carved sculptural relief friezes of deities & apsaras">
                    <span class="cam-icon">🗿</span>
                    <span>Relief Carvings</span>
                  </button>
                  <button class="btn-cam" data-cam="aerialLawn" title="Aerial view of temple on landscaped lawns">
                    <span class="cam-icon">🚁</span>
                    <span>Aerial Lawn</span>
                  </button>
                `;
              } else if (isHampi) {
                return `
                  <button class="btn-cam" data-cam="stoneChariot" title="Monolithic Stone Chariot (Garuda Shrine) & wheels">
                    <span class="cam-icon">🛞</span>
                    <span>Stone Chariot</span>
                  </button>
                  <button class="btn-cam" data-cam="hero" title="Dynamic 3/4 perspective of ruined temple complex">
                    <span class="cam-icon">📸</span>
                    <span>Hero 3/4</span>
                  </button>
                  <button class="btn-cam" data-cam="pillaredHall" title="Multi-column mandapa hall with Yali pillars">
                    <span class="cam-icon">🏛️</span>
                    <span>Pillared Hall</span>
                  </button>
                  <button class="btn-cam" data-cam="brokenPillars" title="Weathered and fractured columns with ruin details">
                    <span class="cam-icon">🏚️</span>
                    <span>Ruin Pillars</span>
                  </button>
                  <button class="btn-cam" data-cam="goldenHour" title="Golden evening sunset light with long shadows">
                    <span class="cam-icon">🌅</span>
                    <span>Golden Sunset</span>
                  </button>
                  <button class="btn-cam" data-cam="boulderHills" title="Granite boulder-strewn hills & dry grass landscape">
                    <span class="cam-icon">⛰️</span>
                    <span>Boulder Hills</span>
                  </button>
                `;
              } else if (isAjanta) {
                return `
                  <button class="btn-cam" data-cam="chaityaWindow" title="Iconic horseshoe-shaped chaitya sun-window arch">
                    <span class="cam-icon">🪟</span>
                    <span>Chaitya Arch</span>
                  </button>
                  <button class="btn-cam" data-cam="hero" title="Dynamic 3/4 perspective of volcanic cliff face">
                    <span class="cam-icon">📸</span>
                    <span>Hero 3/4</span>
                  </button>
                  <button class="btn-cam" data-cam="verandaPillars" title="Rock-cut pillared veranda & cushion capitals">
                    <span class="cam-icon">🏛️</span>
                    <span>Rock Veranda</span>
                  </button>
                  <button class="btn-cam" data-cam="buddhaNiches" title="Seated Buddha sculpture niches flanking doorway">
                    <span class="cam-icon">🧘</span>
                    <span>Buddha Niches</span>
                  </button>
                  <button class="btn-cam" data-cam="interiorTorchlight" title="Ancient fresco murals under warm torchlight glow">
                    <span class="cam-icon">🔥</span>
                    <span>Fresco Murals</span>
                  </button>
                  <button class="btn-cam" data-cam="gorgeValley" title="Waghora river canyon gorge valley below cliff">
                    <span class="cam-icon">🏞️</span>
                    <span>Canyon Valley</span>
                  </button>
                `;
              } else if (isTaj) {
                return `
                  <button class="btn-cam" data-cam="charbaghFront" title="Classic Charbagh canal reflecting shot">
                    <span class="cam-icon">🕌</span>
                    <span>Charbagh Pool</span>
                  </button>
                  <button class="btn-cam" data-cam="hero" title="Dynamic 3/4 perspective of marble mausoleum">
                    <span class="cam-icon">📸</span>
                    <span>Hero 3/4</span>
                  </button>
                  <button class="btn-cam" data-cam="pietraDura" title="Close-up of Pishtaq iwan & Pietra Dura floral inlays">
                    <span class="cam-icon">🌸</span>
                    <span>Pietra Dura</span>
                  </button>
                  <button class="btn-cam" data-cam="minaretFocus" title="Focus on 3-tier corner minarets">
                    <span class="cam-icon">🗼</span>
                    <span>Minarets</span>
                  </button>
                  <button class="btn-cam" data-cam="domeClose" title="Lotus finial & marble onion dome close-up">
                    <span class="cam-icon">✨</span>
                    <span>Onion Dome</span>
                  </button>
                  <button class="btn-cam" data-cam="sunriseLow" title="Low angle sunrise glow reflection">
                    <span class="cam-icon">🌅</span>
                    <span>Sunrise Glow</span>
                  </button>
                  <button class="btn-cam" data-cam="aerial" title="Top-down four-fold symmetry view">
                    <span class="cam-icon">🚁</span>
                    <span>Aerial Symmetry</span>
                  </button>
                `;
              } else if (isRed) {
                return `
                  <button class="btn-cam" data-cam="lahoriGate" title="Monumental Lahori Gate main portal">
                    <span class="cam-icon">🏰</span>
                    <span>Lahori Gate</span>
                  </button>
                  <button class="btn-cam" data-cam="hero" title="Dynamic 3/4 perspective of fort ramparts">
                    <span class="cam-icon">📸</span>
                    <span>Hero 3/4</span>
                  </button>
                  <button class="btn-cam" data-cam="indianFlag" title="Indian Flag mast flying on central dome">
                    <span class="cam-icon">🇮🇳</span>
                    <span>Indian Flag</span>
                  </button>
                  <button class="btn-cam" data-cam="bastions" title="Octagonal defensive bastions & jharokhas">
                    <span class="cam-icon">🛡️</span>
                    <span>Bastions</span>
                  </button>
                  <button class="btn-cam" data-cam="moat" title="Moat & garden embankment view">
                    <span class="cam-icon">🌿</span>
                    <span>Moat Garden</span>
                  </button>
                  <button class="btn-cam" data-cam="bazaar" title="Busy Meena Bazaar entrance & street scene">
                    <span class="cam-icon">🎪</span>
                    <span>Bazaar Scene</span>
                  </button>
                  <button class="btn-cam" data-cam="aerial" title="Aerial view of ramparts and moat">
                    <span class="cam-icon">🚁</span>
                    <span>Aerial Fort</span>
                  </button>
                `;
              } else if (isHawa) {
                return `
                  <button class="btn-cam" data-cam="honeycomb" title="Honeycomb facade & 953 jharokha windows">
                    <span class="cam-icon">🪟</span>
                    <span>Honeycomb Front</span>
                  </button>
                  <button class="btn-cam" data-cam="hero" title="Dynamic 3/4 perspective of 5-tier pyramid facade">
                    <span class="cam-icon">📸</span>
                    <span>Hero 3/4</span>
                  </button>
                  <button class="btn-cam" data-cam="rooftopChhatris" title="Crowning chhatris & fluted domes along rooftop">
                    <span class="cam-icon">👑</span>
                    <span>Crown Chhatris</span>
                  </button>
                  <button class="btn-cam" data-cam="jaipurStreet" title="Busy Jaipur street with auto-rickshaws and vendors">
                    <span class="cam-icon">🛺</span>
                    <span>Jaipur Street</span>
                  </button>
                  <button class="btn-cam" data-cam="afternoonGlow" title="Warm afternoon sunlight highlighting pink sandstone">
                    <span class="cam-icon">☀️</span>
                    <span>Afternoon Glow</span>
                  </button>
                  <button class="btn-cam" data-cam="aerial" title="Aerial view of facade and Pink City buildings">
                    <span class="cam-icon">🚁</span>
                    <span>Aerial City</span>
                  </button>
                `;
              } else if (isSJ) {
                return `
                  <button class="btn-cam" data-cam="duskStreet" title="Heritage street avenue & museum facade at dusk">
                    <span class="cam-icon">🌆</span>
                    <span>Dusk Street</span>
                  </button>
                  <button class="btn-cam" data-cam="clockTower" title="Clock Tower & Aged Brass Dial close-up">
                    <span class="cam-icon">🕰️</span>
                    <span>Clock Tower</span>
                  </button>
                  <button class="btn-cam" data-cam="hero" title="Dynamic 3/4 perspective of colonial facade">
                    <span class="cam-icon">📸</span>
                    <span>Hero 3/4</span>
                  </button>
                  <button class="btn-cam" data-cam="colonnade" title="Arched colonnade loggia & balustrade">
                    <span class="cam-icon">🏛️</span>
                    <span>Colonnade</span>
                  </button>
                  <button class="btn-cam" data-cam="staircase" title="Monumental Grand Entrance Stairs">
                    <span class="cam-icon">🪜</span>
                    <span>Grand Stairs</span>
                  </button>
                  <button class="btn-cam" data-cam="aerial" title="Aerial view of museum wings & street">
                    <span class="cam-icon">🚁</span>
                    <span>Aerial Street</span>
                  </button>
                `;
              } else if (isNM) {
                return `
                  <button class="btn-cam" data-cam="plazaFront" title="Plaza & Fountain grand front view">
                    <span class="cam-icon">🏛️</span>
                    <span>Plaza Front</span>
                  </button>
                  <button class="btn-cam" data-cam="hero" title="Dynamic 3/4 museum rotunda & wings perspective">
                    <span class="cam-icon">📸</span>
                    <span>Hero 3/4</span>
                  </button>
                  <button class="btn-cam" data-cam="staircase" title="Monumental Grand Entrance Stairs">
                    <span class="cam-icon">🪜</span>
                    <span>Grand Stairs</span>
                  </button>
                  <button class="btn-cam" data-cam="skylight" title="Dome Oculus & Skylights Close-up">
                    <span class="cam-icon">☀️</span>
                    <span>Dome Skylight</span>
                  </button>
                  <button class="btn-cam" data-cam="aerial" title="Aerial view of museum wings & plaza">
                    <span class="cam-icon">🚁</span>
                    <span>Aerial Plaza</span>
                  </button>
                `;
              } else {
                return `
                  <button class="btn-cam" data-cam="charbaghFront" title="Classic Charbagh axial view over reflecting pool">
                    <span class="cam-icon">🏛️</span>
                    <span>Charbagh Front</span>
                  </button>
                  <button class="btn-cam" data-cam="hero" title="Dynamic 3/4 perspective">
                    <span class="cam-icon">📸</span>
                    <span>Hero 3/4</span>
                  </button>
                  <button class="btn-cam" data-cam="sunsetLow" title="Low angle golden-hour reflecting shot">
                    <span class="cam-icon">🌅</span>
                    <span>Golden Sunset</span>
                  </button>
                  <button class="btn-cam" data-cam="aerial" title="Top-down four-fold symmetry view">
                    <span class="cam-icon">🚁</span>
                    <span>Aerial Symmetry</span>
                  </button>
                  <button class="btn-cam" data-cam="portalClose" title="Close-up on the Pishtaq & Calligraphy">
                    <span class="cam-icon">🔍</span>
                    <span>Portal & Inlays</span>
                  </button>
                `;
              }
            })()}
          </div>
        </div>

        <div class="panel-section">
          <div class="panel-title">INSPECTION TOOLS</div>
          <div class="toggle-row">
            <label class="toggle-label">
              <input type="checkbox" id="chk-symmetry" ${showSymmetry ? 'checked' : ''} />
              <span class="custom-toggle"></span>
              <span class="label-text">Show Symmetry Axis Guides</span>
            </label>
          </div>
        </div>

        <div class="panel-section panel-bottom">
          <button id="btn-capture-render" class="btn-capture" title="Export high resolution 4K render as PNG">
            <span class="capture-icon">📷</span>
            <span class="capture-text">Render Snapshot (PNG)</span>
          </button>
        </div>
      </div>
    `;

    // View Style Mode events
    container.querySelectorAll('.button-group button[data-mode]').forEach(btn => {
      btn.addEventListener('click', () => {
        projectStore.setViewMode(btn.dataset.mode);
      });
    });

    // Camera preset events
    container.querySelectorAll('.btn-cam').forEach(btn => {
      btn.addEventListener('click', () => {
        sceneManager.setCameraPreset(btn.dataset.cam);
      });
    });

    // Symmetry toggle
    const symCheck = container.querySelector('#chk-symmetry');
    if (symCheck) {
      symCheck.addEventListener('change', () => {
        projectStore.toggleSymmetry();
      });
    }

    // Capture render
    const captureBtn = container.querySelector('#btn-capture-render');
    if (captureBtn) {
      captureBtn.addEventListener('click', () => {
        sceneManager.captureSnapshot();
      });
    }
  };

  // Keep render updated on store updates
  projectStore.subscribe(() => render());
  render();
}

