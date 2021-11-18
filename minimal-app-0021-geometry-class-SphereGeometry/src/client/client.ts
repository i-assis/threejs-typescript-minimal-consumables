import * as THREE from "/build/three.module.js";
import { OrbitControls } from "/jsm/controls/OrbitControls";
import Stats from "/jsm/libs/stats.module";
import { GUI } from "/jsm/libs/dat.gui.module";

const scene: THREE.Scene = new THREE.Scene();

let axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.addEventListener("change", render);

const geometry: THREE.BoxGeometry = new THREE.BoxGeometry();
console.dir(geometry) //! 1- print to console after creation

const material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({
  color: 0x00ff00,
  wireframe: true,
});

const cube: THREE.Mesh = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 2;

window.addEventListener("resize", onWindowResize, false);
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  render();
}

const stats = Stats();
document.body.appendChild(stats.dom);

const gui = new GUI();
const cubeFolder = gui.addFolder("Cube");
cubeFolder.open();
cubeFolder.add(cube, "visible", true);
const cubeRotationFolder = cubeFolder.addFolder("Rotation");
cubeRotationFolder.add(cube.rotation, "x", 0, Math.PI * 2, 0.01)
cubeRotationFolder.add(cube.rotation, "y", 0, Math.PI * 2, 0.01)
cubeRotationFolder.add(cube.rotation, "z", 0, Math.PI * 2, 0.01)
cubeRotationFolder.open()
const cubePositionFolder = cubeFolder.addFolder("Position")
cubePositionFolder.add(cube.position, "x", -10, 10)
cubePositionFolder.add(cube.position, "y", -10, 10)
cubePositionFolder.add(cube.position, "z", -10, 10)
cubePositionFolder.open()
const cubeScaleFolder = cubeFolder.addFolder("Scale") //! scaling doesn't change coordinates, the scaling matrix stretches "within object matrix"
cubeScaleFolder.add(cube.scale, "x", -5, 5, 0.1).onFinishChange( ()=> console.dir(cube.geometry) ) //! 2- print to console after scaling
cubeScaleFolder.add(cube.scale, "y", -5, 5, 0.1)
cubeScaleFolder.add(cube.scale, "z", -5, 5, 0.1)
cubeScaleFolder.open()

//! 'cubeData' inputs change coordinates
var cubeData = {
    width: 1,
    height: 1,
    depth: 1,
    widthSegments: 1,
    heightSegments: 1,
    depthSegments: 1
};
const cubePropertiesFolder = cubeFolder.addFolder("Properties")
cubePropertiesFolder.add(cubeData, 'width', 1, 30).onChange(regenerateBoxGeometry).onFinishChange(()=> console.dir(cube.geometry)) //! 3- print to console after regenerating
cubePropertiesFolder.add(cubeData, 'height', 1, 30).onChange(regenerateBoxGeometry);
cubePropertiesFolder.add(cubeData, 'depth', 1, 30).onChange(regenerateBoxGeometry);
cubePropertiesFolder.add(cubeData, 'widthSegments', 1, 30).onChange(regenerateBoxGeometry);
cubePropertiesFolder.add(cubeData, 'heightSegments', 1, 30).onChange(regenerateBoxGeometry);
cubePropertiesFolder.add(cubeData, 'depthSegments', 1, 30).onChange(regenerateBoxGeometry);

function regenerateBoxGeometry() {
    let newGeometry = new THREE.BoxGeometry(
        cubeData.width, cubeData.height, cubeData.depth, cubeData.widthSegments, cubeData.heightSegments, cubeData.depthSegments
    )
    cube.geometry.dispose() //! good practice to get rid of old geometry
    cube.geometry = newGeometry
}


let animate = function () {
  requestAnimationFrame(animate);

  // cube.rotation.x += 0.01;
  // cube.rotation.y += 0.01;

  render();

  //! printing the cube matrix to the screen:
  (document.getElementById("debug1") as HTMLDivElement).innerText = "Scaling Matrix (4x4?)\n" + cube.matrix.elements.toString().replace(/,/g, "\n",)

  stats.update();
};

//! this function may allow faster update
function render() {
  //stats.begin()//! these don't work alongside GUI
  renderer.render(scene, camera);
  //stats.end()
}

//render()

animate();
