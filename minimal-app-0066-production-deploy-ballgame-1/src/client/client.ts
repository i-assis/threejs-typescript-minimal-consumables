import * as THREE from '/build/three.module.js'
import Stats from '/jsm/libs/stats.module'
import TheBallGame from './theBallGame.js'

const socket: SocketIOClient.Socket = io()

const scene: THREE.Scene = new THREE.Scene()

const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

const theBallGame: TheBallGame = new TheBallGame(socket, scene, renderer, camera)

window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
}

const stats = Stats()
document.body.appendChild(stats.dom)

const animate = function () {
    requestAnimationFrame(animate)

    theBallGame.update()

    renderer.render(scene, camera)

    stats.update()

};

animate();
