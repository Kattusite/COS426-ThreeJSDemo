import * as THREE from "../lib/build/three.module.js";

function setupSceneAndAnimate() {

  // Init scene
  const scene = new THREE.Scene();

  // Init camera
  const [width, height] = [window.innerWidth, window.innerHeight];
  const fov = 75;
  const aspect = width/height;
  const near = 0.1;
  const far = 1000;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  // camera.position.z = 50;

  // Init renderer; attach to HTML canvas
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(width, height);
  document.body.appendChild(renderer.domElement);

  // Init light
  // Many lighting solutions in ThreeJS
  // point lights, directional lights, etc.
  const light = new THREE.HemisphereLight(
    0xffffbb,   // sky color
    0x080820, 	// ground color
    1 			    // intensity
  );
  scene.add(light);

  // width, height, depth
  const cubeGeo = new THREE.BoxGeometry(1,1,1);
  const redMat = new THREE.MeshPhongMaterial({color: 0xdd2244});

  const c1 = new THREE.Mesh(cubeGeo, redMat);
  c1.position.set(-2, 0, -5);
  scene.add(c1);

  // geometries and meshes can be reused
  const c2 = new THREE.Mesh(cubeGeo, redMat)
  c2.position.set(+2, 0, -5);
  scene.add(c2);

  const cubes = [c1, c2];

  // Animation Attempt #4 (Correct)
  const renderLoop = (timeMs) => {
  	const time = timeMs * 0.0001;
  	requestAnimationFrame(renderLoop);

  	cubes.forEach((cube, index) => {
       	const speed = 1 + index * 0.1;
        	const rot = time * speed;
        	cube.rotation.x = rot;
        	cube.rotation.y = rot;
    });
    renderer.render(scene, camera);
  };

  // Set callback to begin animation
  requestAnimationFrame(renderLoop);
}

setupSceneAndAnimate();
