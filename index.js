import * as THREE from "three";
import { OrbitControls } from "jsm/controls/OrbitControls.js";
import { GLTFLoader } from 'jsm/loaders/GLTFLoader.js';

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.setClearColor(0x000000);
renderer.setPixelRatio(window.devicePixelRatio);
const container = document.getElementById('viewer');
const width = container.clientWidth;
const height = container.clientHeight;

renderer.setSize(width, height);
container.appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);

camera.position.set(4, 5, 11);
//camera.lookAt(0, 0, 0);
const scene = new THREE.Scene();

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enablePan = false;
controls.minDistance = 0;
controls.maxDistance = 60;
controls.minPolarAngle = 0.5;
controls.maxPolarAngle = 1.5;
controls.autoRotate = false;
controls.target = new THREE.Vector3(0, 0, 0);
controls.update();

const groundGeometry = new THREE.PlaneGeometry(20, 20, 32, 32);
groundGeometry.rotateX(-Math.PI / 2);
const groundMaterial = new THREE.MeshStandardMaterial({
  color: 0x555555,
  side: THREE.DoubleSide
});
const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
//groundMesh.castShadow = false;
//groundMesh.receiveShadow = true;
scene.add(groundMesh);


const spotLight = new THREE.SpotLight(0xffffff, 3000, 100, 0.22, 1);
spotLight.position.set(0, 25, 0);
spotLight.castShadow = true;
//spotLight.shadow.bias = -0.0001;
scene.add(spotLight);

const loader = new GLTFLoader().setPath('models/');
loader.load('Scene.gltf', (gltf) => {
    const mesh = gltf.scene;
    mesh.position.set(0, 1.05, 2.5);
    scene.add(mesh);
})

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

animate();