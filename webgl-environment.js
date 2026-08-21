(() => {
  'use strict';

  const hero = document.querySelector('[data-hero-camera]');
  const canvas = document.querySelector('[data-hero-webgl]');
  const THREE = window.THREE;
  if (!hero || !canvas || !THREE) return;

  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const compact = matchMedia('(max-width: 760px)').matches;
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false, powerPreference: 'high-performance' });
  } catch (_) {
    return;
  }

  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 1));
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x0b0c0f, 0.052);
  const camera = new THREE.PerspectiveCamera(46, 1, 0.1, 50);
  camera.position.set(0, 0, 10);

  const world = new THREE.Group();
  world.position.x = compact ? 1.6 : 2.85;
  scene.add(world);

  scene.add(new THREE.HemisphereLight(0xb986d8, 0x09070d, 0.68));
  const magentaLight = new THREE.PointLight(0xe052cf, 2.8, 16, 2);
  magentaLight.position.set(2.5, 1, 4);
  world.add(magentaLight);
  const coralLight = new THREE.PointLight(0xf08d6c, 1.65, 12, 2);
  coralLight.position.set(-2.4, 2.4, 1.5);
  world.add(coralLight);

  const planes = [
    { z: -5.4, alpha: 0.14, scale: 1.35 },
    { z: -2.8, alpha: 0.22, scale: 1.05 },
    { z: -0.8, alpha: 0.3, scale: 0.78 },
    { z: 1.25, alpha: 0.2, scale: 0.52 }
  ];
  const geometryCount = compact ? 8 : 18;
  const shardGeometry = new THREE.IcosahedronGeometry(0.48, 0);
  const shardMaterial = new THREE.MeshStandardMaterial({
    color: 0x642979, emissive: 0x210827, emissiveIntensity: 0.45,
    metalness: 0.72, roughness: 0.24, transparent: true, opacity: 0.34,
    flatShading: true, side: THREE.DoubleSide
  });
  const shards = new THREE.InstancedMesh(shardGeometry, shardMaterial, geometryCount);
  const dummy = new THREE.Object3D();
  const shardData = [];
  for (let i = 0; i < geometryCount; i += 1) {
    const plane = planes[i % planes.length];
    const side = i % 2 ? 1 : -1;
    const x = side * (1.55 + Math.random() * 4.7);
    const y = -3.7 + Math.random() * 7.4;
    const z = plane.z + (Math.random() - 0.5) * 1.2;
    const scale = plane.scale * (0.35 + Math.random() * 1.2);
    shardData.push({ x, y, z, rx: Math.random() * 3, ry: Math.random() * 3, scale, drift: 0.25 + Math.random() * 0.45 });
    dummy.position.set(x, y, z);
    dummy.rotation.set(shardData[i].rx, shardData[i].ry, i * 0.31);
    dummy.scale.set(scale * (0.6 + Math.random()), scale, scale * (0.38 + Math.random() * 0.5));
    dummy.updateMatrix();
    shards.setMatrixAt(i, dummy.matrix);
  }
  shards.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  world.add(shards);

  const edgeGroup = new THREE.Group();
  for (let i = 0; i < (compact ? 3 : 8); i += 1) {
    const edges = new THREE.LineSegments(
      new THREE.EdgesGeometry(new THREE.OctahedronGeometry(0.65 + i * 0.035, 0)),
      new THREE.LineBasicMaterial({ color: i % 3 === 0 ? 0xf08d6c : 0xba67d2, transparent: true, opacity: 0.16 })
    );
    edges.position.set((i % 2 ? 1 : -1) * (2.2 + (i % 4) * 1.25), -2.8 + (i * 1.07) % 5.8, -3.5 + (i % 3) * 1.9);
    edges.rotation.set(i * 0.42, i * 0.27, i * 0.18);
    edgeGroup.add(edges);
  }
  world.add(edgeGroup);

  const particleCount = compact ? 180 : 480;
  const positions = new Float32Array(particleCount * 3);
  const phases = new Float32Array(particleCount);
  const mixes = new Float32Array(particleCount);
  for (let i = 0; i < particleCount; i += 1) {
    const t = Math.random() * Math.PI * 2;
    const radius = 1.1 + Math.random() * 2.5;
    positions[i * 3] = Math.cos(t) * radius + (Math.random() - 0.5) * 0.55;
    positions[i * 3 + 1] = Math.sin(t * 1.35) * (0.55 + radius * 0.42) + (Math.random() - 0.5) * 0.5;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 5.6;
    phases[i] = Math.random() * 6.283;
    mixes[i] = Math.random();
  }
  const particleGeometry = new THREE.BufferGeometry();
  particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  particleGeometry.setAttribute('aPhase', new THREE.BufferAttribute(phases, 1));
  particleGeometry.setAttribute('aMix', new THREE.BufferAttribute(mixes, 1));
  const particleMaterial = new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    uniforms: { uTime: { value: 0 }, uMotion: { value: reducedMotion ? 0 : 1 }, uPurple: { value: new THREE.Color(0xc747ba) }, uCoral: { value: new THREE.Color(0xf08d6c) } },
    vertexShader: `
      attribute float aPhase; attribute float aMix; uniform float uTime; uniform float uMotion; varying float vMix; varying float vAlpha;
      void main(){ vec3 p=position; float flow=uTime*.5+aPhase; float angle=flow*.13*uMotion; mat2 turn=mat2(cos(angle),-sin(angle),sin(angle),cos(angle)); p.xy=turn*p.xy; p.x+=sin(flow+p.z*.7)*.22*uMotion; p.y+=sin(p.x*1.35+flow)*.2*uMotion; p.z+=cos(p.y*1.8+flow*.72)*.16*uMotion; vec4 mv=modelViewMatrix*vec4(p,1.0); gl_Position=projectionMatrix*mv; gl_PointSize=(2.25+aMix*2.8)*(10.0/-mv.z); vMix=aMix; vAlpha=.3+aMix*.62; }
    `,
    fragmentShader: `
      uniform vec3 uPurple; uniform vec3 uCoral; varying float vMix; varying float vAlpha;
      void main(){ float d=distance(gl_PointCoord,vec2(.5)); if(d>.5) discard; float glow=smoothstep(.5,0.02,d); vec3 color=mix(uPurple,uCoral,smoothstep(.84,1.0,vMix)); gl_FragColor=vec4(color,glow*vAlpha); }
    `
  });
  const particles = new THREE.Points(particleGeometry, particleMaterial);
  particles.rotation.set(-0.2, 0.28, -0.17);
  world.add(particles);

  const grid = new THREE.GridHelper(18, 24, 0x7a357f, 0x44204c);
  grid.material.transparent = true;
  grid.material.opacity = 0.09;
  grid.position.set(0, -3.35, -4.8);
  grid.rotation.z = -0.08;
  world.add(grid);

  const pointer = { x: 0, y: 0, tx: 0, ty: 0, active: 0, targetActive: 0 };
  hero.addEventListener('pointermove', (event) => {
    const rect = hero.getBoundingClientRect();
    pointer.tx = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    pointer.ty = -((event.clientY - rect.top) / rect.height - 0.5) * 2;
    pointer.targetActive = 1;
  }, { passive: true });
  hero.addEventListener('pointerleave', () => { pointer.tx = 0; pointer.ty = 0; pointer.targetActive = 0; }, { passive: true });

  const resize = () => {
    const width = Math.max(1, hero.clientWidth);
    const height = Math.max(1, hero.clientHeight);
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  };
  new ResizeObserver(resize).observe(hero);
  resize();

  let visible = true;
  new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; }, { threshold: 0.02 }).observe(hero);
  const clock = new THREE.Clock();
  const render = () => {
    requestAnimationFrame(render);
    if (!visible || document.hidden) return;
    const delta = Math.min(clock.getDelta(), 0.05);
    const elapsed = clock.elapsedTime;
    pointer.x += (pointer.tx - pointer.x) * (reducedMotion ? 0 : 0.045);
    pointer.y += (pointer.ty - pointer.y) * (reducedMotion ? 0 : 0.045);
    pointer.active += (pointer.targetActive - pointer.active) * 0.055;
    camera.position.x += (pointer.x * 0.55 - camera.position.x) * 0.045;
    camera.position.y += (pointer.y * 0.34 - camera.position.y) * 0.045;
    camera.lookAt(0.4 + pointer.x * 0.1, pointer.y * 0.08, 0);
    world.rotation.y += ((pointer.x * 0.075) - world.rotation.y) * 0.035;
    world.rotation.x += ((-pointer.y * 0.045) - world.rotation.x) * 0.035;
    particleMaterial.uniforms.uTime.value = elapsed;
    particles.rotation.z += reducedMotion ? 0 : delta * 0.052;
    magentaLight.position.x = 2.5 + pointer.x * 1.3;
    magentaLight.position.y = 1 + pointer.y * 0.8;
    if (!reducedMotion) {
      shardData.forEach((item, i) => {
        dummy.position.set(item.x + pointer.x * item.drift, item.y + pointer.y * item.drift * 0.55 + Math.sin(elapsed * .38 + i) * .07, item.z + Math.sin(elapsed * 0.42 + i) * 0.13);
        dummy.rotation.set(item.rx + elapsed * 0.052, item.ry - elapsed * 0.036, i * 0.31 + elapsed * .018);
        dummy.scale.set(item.scale * 0.72, item.scale, item.scale * 0.48);
        dummy.updateMatrix();
        shards.setMatrixAt(i, dummy.matrix);
      });
      shards.instanceMatrix.needsUpdate = true;
      edgeGroup.rotation.y = elapsed * -0.012;
    }
    renderer.render(scene, camera);
  };
  hero.classList.add('has-webgl-environment');
  render();
})();
