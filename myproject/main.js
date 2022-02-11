import './style.css'

import * as THREE from 'three';
import { TetrahedronGeometry } from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Three.js Documentation: https://threejs.org/
// You will always need three objects: scene, camera, renderer

const scene = new THREE.Scene();

// First parameter is field of view, Second parameter is aspect ratio, Third and Fourth parameters are View Frustrum
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({canvas: document.querySelector('#bg'),});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

// Render = DRAW scene
renderer.render(scene, camera); 

// When creating an object you need:
// geometry, material, mesh = geometry + material (one to be add on scene)
// TorusKnot: https://threejs.org/docs/index.html#api/en/geometries/TorusKnotGeometry
const geometry = new THREE.TorusGeometry(20, 4, 16, 100);
const material = new THREE.MeshStandardMaterial({color: 0x031635});
const outerRing = new THREE.Mesh(geometry, material);

const geometry2 = new THREE.TorusGeometry(11, 4, 16, 100);
const material2 = new THREE.MeshStandardMaterial({color: 0x073e97});
const innerRing = new THREE.Mesh(geometry2, material2);

scene.add(innerRing, outerRing);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(20,20,5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// Helper
const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(200, 50)

scene.add(lightHelper, gridHelper)

const controls = new OrbitControls(camera, renderer.domElement);

// Function: Adding stars
function addStar()
{
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({color: 0xffffff});
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star)
}

// Adding Star in Scene
Array(500).fill().forEach(addStar)

// Background
const spaceTexture = new THREE.TextureLoader().load('galaxy.jpg')
scene.background = spaceTexture;

// Avatar
//const spencerTexture = 

// Animate through Recursion
function animate()
{
  requestAnimationFrame(animate);
  // Torus Rotations
  outerRing.rotation.x += 0.005;
  outerRing.rotation.y -= 0.005;
  outerRing.rotation.z += 0.01;

  innerRing.rotation.x -= 0.003;
  innerRing.rotation.y += 0.009;
  innerRing.rotation.z -= 0.04;

  controls.update();

  renderer.render(scene, camera);
}

animate()