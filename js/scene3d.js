/* Budget3D — three.js tower scene (three r147, global THREE + THREE.OrbitControls) */
window.Budget3D = (function () {
  let renderer, scene, camera, controls, root, floor, grid, particles;
  let container, labelLayer, towers = [], raycaster, pointer;
  let hovered = null, selected = null, running = false, visible = true;
  let onHover = () => {}, onSelect = () => {};
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const clock = { t0: performance.now() };
  const HOME = { pos: [0, 6.2, 14.5], target: [0, 2.4, 0] };
  const MAX_H = 6.5;
  // CSS hex is sRGB; r147 materials expect linear when outputEncoding is sRGB
  const lin = (hex) => new THREE.Color(hex).convertSRGBToLinear();

  function supported() {
    try {
      const c = document.createElement("canvas");
      return !!(window.WebGLRenderingContext && (c.getContext("webgl2") || c.getContext("webgl")));
    } catch (e) { return false; }
  }

  function init(el, labels, handlers) {
    if (!window.THREE || !supported()) return false;
    container = el; labelLayer = labels;
    onHover = handlers.onHover || onHover;
    onSelect = handlers.onSelect || onSelect;

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(40, 1, 0.1, 200);
    camera.position.set(...HOME.pos);

    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.target.set(...HOME.target);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.enablePan = false;
    controls.minDistance = 7;
    controls.maxDistance = 26;
    controls.minPolarAngle = 0.25;
    controls.maxPolarAngle = Math.PI / 2.05;
    controls.autoRotate = false;
    controls.addEventListener("start", () => { userMoved = true; });

    scene.add(new THREE.HemisphereLight(0xffffff, 0x444466, 0.75));
    const sun = new THREE.DirectionalLight(0xffffff, 0.9);
    sun.position.set(6, 14, 8);
    sun.castShadow = true;
    sun.shadow.mapSize.set(1024, 1024);
    Object.assign(sun.shadow.camera, { left: -12, right: 12, top: 12, bottom: -12 });
    scene.add(sun);
    const rim = new THREE.DirectionalLight(0x99bbff, 0.35);
    rim.position.set(-8, 6, -10);
    scene.add(rim);

    root = new THREE.Group();
    scene.add(root);

    // Floor disc + grid
    floor = new THREE.Mesh(
      new THREE.CylinderGeometry(11, 11.4, 0.4, 72),
      new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.9, metalness: 0 })
    );
    floor.position.y = -0.2;
    floor.receiveShadow = true;
    scene.add(floor);
    grid = new THREE.PolarGridHelper(10.6, 12, 6, 72, 0x888888, 0x888888);
    grid.material.transparent = true;
    grid.material.opacity = 0.22;
    grid.position.y = 0.01;
    scene.add(grid);

    // Floating "coin" particles
    const N = 160, pos = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      const r = 3 + Math.random() * 9, a = Math.random() * Math.PI * 2;
      pos[i * 3] = Math.cos(a) * r;
      pos[i * 3 + 1] = Math.random() * 9;
      pos[i * 3 + 2] = Math.sin(a) * r;
    }
    const pg = new THREE.BufferGeometry();
    pg.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    particles = new THREE.Points(pg, new THREE.PointsMaterial({ size: 0.07, transparent: true, opacity: 0.55, depthWrite: false }));
    scene.add(particles);

    raycaster = new THREE.Raycaster();
    pointer = new THREE.Vector2(-9, -9);
    const cv = renderer.domElement;
    cv.addEventListener("pointermove", (e) => {
      const r = cv.getBoundingClientRect();
      pointer.x = ((e.clientX - r.left) / r.width) * 2 - 1;
      pointer.y = -((e.clientY - r.top) / r.height) * 2 + 1;
      pointer.clientX = e.clientX; pointer.clientY = e.clientY;
    });
    cv.addEventListener("pointerleave", () => { pointer.set(-9, -9); setHover(null); });
    let downAt = null;
    cv.addEventListener("pointerdown", (e) => { downAt = [e.clientX, e.clientY]; });
    cv.addEventListener("pointerup", (e) => {
      if (!downAt) return;
      const moved = Math.hypot(e.clientX - downAt[0], e.clientY - downAt[1]);
      downAt = null;
      if (moved > 6) return;
      const hit = pick();
      select(hit ? hit.userData.id : null);
    });

    new ResizeObserver(resize).observe(container);
    new IntersectionObserver((ents) => { visible = ents[0].isIntersecting; if (visible) start(); }).observe(container);
    resize();
    start();
    return true;
  }

  function resize() {
    if (!renderer) return;
    const w = container.clientWidth, h = container.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    // Pull the camera back on narrow screens so all towers fit
    camera.fov = 40;
    camera.updateProjectionMatrix();
    // Move the camera back far enough that the full row of towers fits horizontally
    const hfov = 2 * Math.atan(Math.tan((camera.fov * Math.PI) / 360) * camera.aspect);
    const need = (camera.aspect < 1 ? 9.6 : 8.2) / Math.tan(hfov / 2);
    const home = new THREE.Vector3(...HOME.pos).sub(new THREE.Vector3(...HOME.target));
    fitScale = Math.max(1, need / home.length());
    controls.maxDistance = Math.max(26, home.length() * fitScale + 4);
    if (!userMoved) placeHome();
  }

  function clearTowers() {
    towers.forEach((t) => {
      root.remove(t.group);
      t.group.traverse((o) => { if (o.geometry) o.geometry.dispose(); if (o.material) o.material.dispose(); });
      t.label.remove();
    });
    towers = [];
  }

  /* items: [{id, value, color, label, valueText}] */
  function setData(items) {
    if (!renderer) return;
    clearTowers();
    hovered = selected = null;
    const max = Math.max(...items.map((d) => d.value));
    const n = items.length;
    // Arrange on a shallow arc facing the camera
    const span = Math.min(14, n * 1.7);
    items.forEach((d, i) => {
      const f = n === 1 ? 0.5 : i / (n - 1);
      const x = (f - 0.5) * span;
      const z = -Math.pow((f - 0.5) * 2, 2) * 2.2 + 1;
      const h = Math.max(0.15, (d.value / max) * MAX_H);
      const color = lin(d.color);

      const group = new THREE.Group();
      group.position.set(x, 0, z);

      const geo = new THREE.BoxGeometry(1, 1, 1);
      geo.translate(0, 0.5, 0);
      const mat = new THREE.MeshStandardMaterial({ color, roughness: 0.35, metalness: 0.15, emissive: color, emissiveIntensity: 0.08 });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.scale.set(1, reduceMotion ? h : 0.001, 1);
      mesh.castShadow = true; mesh.receiveShadow = true;
      mesh.userData.id = d.id;
      group.add(mesh);

      const edges = new THREE.LineSegments(
        new THREE.EdgesGeometry(geo),
        new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.35 })
      );
      edges.scale.copy(mesh.scale);
      group.add(edges);

      // Glowing base ring
      const ring = new THREE.Mesh(
        new THREE.RingGeometry(0.78, 0.98, 48),
        new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.45, side: THREE.DoubleSide, depthWrite: false })
      );
      ring.rotation.x = -Math.PI / 2;
      ring.position.y = 0.02;
      group.add(ring);

      root.add(group);

      const label = document.createElement("div");
      label.className = "tower-label";
      label.innerHTML = `<span class="tl-value">${d.valueText}</span><span class="tl-name">${d.label}</span>`;
      labelLayer.appendChild(label);

      towers.push({ id: d.id, data: d, group, mesh, edges, ring, label, h, delay: i * 0.07, born: performance.now() });
    });
  }

  function setTheme(t) {
    if (!renderer) return;
    floor.material.color.copy(lin(t.floor));
    grid.material.color.copy(lin(t.grid));
    particles.material.color.copy(lin(t.particle));
  }

  function updateColors(colorById) {
    towers.forEach((t) => {
      const c = colorById[t.id];
      if (!c) return;
      const lc = lin(c);
      t.mesh.material.color.copy(lc);
      t.mesh.material.emissive.copy(lc);
      t.ring.material.color.copy(lc);
    });
  }

  function pick() {
    if (pointer.x < -1.5) return null;
    raycaster.setFromCamera(pointer, camera);
    const hits = raycaster.intersectObjects(towers.map((t) => t.mesh), false);
    return hits.length ? hits[0].object : null;
  }

  function setHover(id) {
    if (hovered === id) return;
    hovered = id;
    container.style.cursor = id ? "pointer" : "grab";
    onHover(id, pointer.clientX, pointer.clientY);
  }

  function select(id) {
    selected = id;
    onSelect(id);
  }

  function highlight(id) { selected = id; }

  let fitScale = 1, userMoved = false;
  function placeHome() {
    const tgt = new THREE.Vector3(...HOME.target);
    const off = new THREE.Vector3(...HOME.pos).sub(tgt).multiplyScalar(fitScale);
    camera.position.copy(tgt).add(off);
    controls.target.copy(tgt);
    controls.update();
  }
  function resetView() {
    if (!camera) return;
    userMoved = false;
    placeHome();
  }

  const ease = (x) => 1 - Math.pow(1 - x, 3);
  const v = new (window.THREE ? THREE.Vector3 : Object)();

  function start() { if (!running && renderer) { running = true; requestAnimationFrame(loop); } }

  function loop(now) {
    if (!visible || document.hidden) { running = false; return; }
    const t = (now - clock.t0) / 1000;

    // Gentle idle sway of the whole set
    if (!reduceMotion) root.rotation.y = Math.sin(t * 0.25) * 0.08;

    if (!reduceMotion) {
      const p = particles.geometry.attributes.position;
      for (let i = 0; i < p.count; i++) {
        let y = p.getY(i) + 0.006;
        if (y > 9) y = 0;
        p.setY(i, y);
      }
      p.needsUpdate = true;
    }

    const hit = pick();
    setHover(hit ? hit.userData.id : null);

    const W = container.clientWidth, H = container.clientHeight;
    towers.forEach((tw) => {
      const age = (now - tw.born) / 1000 - tw.delay;
      const g = reduceMotion ? 1 : ease(Math.min(1, Math.max(0, age / 1.1)));
      const active = tw.id === hovered || tw.id === selected;
      const dim = selected && tw.id !== selected;
      const sy = tw.h * g;
      const sxz = active ? 1.12 : 1;
      tw.mesh.scale.set(sxz, Math.max(0.001, sy), sxz);
      tw.edges.scale.copy(tw.mesh.scale);
      tw.mesh.material.emissiveIntensity += ((active ? 0.45 : 0.08) - tw.mesh.material.emissiveIntensity) * 0.15;
      tw.mesh.material.transparent = !!dim;
      tw.mesh.material.opacity += ((dim ? 0.35 : 1) - tw.mesh.material.opacity) * 0.15;
      tw.ring.material.opacity = active ? 0.9 : 0.45;
      if (!reduceMotion && active) tw.ring.rotation.z += 0.02;

      // Project label anchor (top of tower) to screen
      tw.group.updateWorldMatrix(true, false);
      v.set(0, sy + 0.35, 0).applyMatrix4(tw.group.matrixWorld).project(camera);
      const x = (v.x * 0.5 + 0.5) * W, y = (-v.y * 0.5 + 0.5) * H;
      tw.label.style.transform = `translate(-50%, -100%) translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)`;
      tw.label.style.opacity = g < 0.6 ? 0 : (dim ? 0.35 : 1);
      tw.label.classList.toggle("active", active);
    });

    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(loop);
  }

  document.addEventListener("visibilitychange", () => { if (!document.hidden) start(); });

  return { init, setData, setTheme, updateColors, highlight, resetView, select: (id) => select(id) };
})();
