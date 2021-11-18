import * as THREE from '/build/three.module.js';
import { OrbitControls } from "/jsm/controls/OrbitControls";

const scene: THREE.Scene = new THREE.Scene()

//scene.background = new THREE.Color(0xFF0000)

//const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
const camera1: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(75, 1, 0.1, 10)
const camera2: THREE.OrthographicCamera = new THREE.OrthographicCamera(-1,1,1,-1,0.1,10)
const camera3: THREE.OrthographicCamera = new THREE.OrthographicCamera(-1,1,1,-1,0.1,10)
const camera4: THREE.OrthographicCamera = new THREE.OrthographicCamera(-1,1,1,-1,0.1,10)

const canvas1: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("c1")
const canvas2: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("c2")
const canvas3: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("c3")
const canvas4: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("c4")
const renderer1: THREE.WebGLRenderer = new THREE.WebGLRenderer({canvas: canvas1})
renderer1.setSize(200,200)
const renderer2: THREE.WebGLRenderer = new THREE.WebGLRenderer({canvas: canvas2})
renderer2.setSize(200,200)
const renderer3: THREE.WebGLRenderer = new THREE.WebGLRenderer({canvas: canvas3})
renderer3.setSize(200,200)
const renderer4: THREE.WebGLRenderer = new THREE.WebGLRenderer({canvas: canvas4})
renderer4.setSize(200,200)
//renderer.setSize(window.innerWidth, window.innerHeight)
//canvas. //! see methods
//document.body.appendChild(renderer.domElement)

const controls1 = new OrbitControls(camera1, renderer1.domElement);
const controls2 = new OrbitControls(camera2, renderer2.domElement);

const geometry: THREE.BoxGeometry = new THREE.BoxGeometry()
const material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({ color: 0xff03ce, wireframe: true })

const cube: THREE.Mesh = new THREE.Mesh(geometry, material)


scene.add(cube)

//console.dir(scene)
//! 'y' is UP
camera1.position.z = 2

camera2.position.y = 2
camera2.lookAt(new THREE.Vector3(0,0,0) )

camera3.position.z = 2

camera4.position.x = 2
camera4.lookAt(new THREE.Vector3(0,0,0) )

var animate = function () {

    requestAnimationFrame(animate)

    cube.rotation.x += 0.01;
    //cube.rotation.y += 0.004;

    controls1.update();
    controls2.update();

    renderer1.render(scene, camera1)
    renderer2.render(scene, camera2)
    renderer3.render(scene, camera3)
    renderer4.render(scene, camera4)

}; 

animate(); 