import * as THREE from 'https://unpkg.com/three@latest?module'
import { OrbitControls } from 'https://unpkg.com/three@0.130.0/examples/jsm/controls/OrbitControls.js?module'
import { FBXLoader } from 'https://unpkg.com/three@0.130.0/examples/jsm/loaders/FBXLoader.js?module'
import Stats from 'https://unpkg.com/three@0.130.0/examples/jsm/libs/stats.module.js?module'

const scene = new THREE.Scene()
scene.add(new THREE.AxesHelper(5))

const light = new THREE.PointLight()
light.position.set(0.8, 1.4, 1.0)
scene.add(light)

const ambientLight = new THREE.AmbientLight()
scene.add(ambientLight)

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.set(0.8, 1.4, 1.0)

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true
controls.target.set(0, 1, 0)

const material = new THREE.MeshNormalMaterial()

const fbxLoader = new FBXLoader()
fbxLoader.load(
    'models/demo_room.fbx',
    (object) => {
        object.traverse(function (child) {
            if (child.isMesh) {
                child.material = material
                if (child.material) {
                    child.material.transparent = false
                }
            }
        })
        object.scale.set(0.01, 0.01, 0.01)
        scene.add(object)
        progressBar.style.display = 'none'
    },
    (xhr) => {
        if (xhr.lengthComputable) {
            var percentComplete = (xhr.loaded / xhr.total) * 100
            progressBar.value = percentComplete
            progressBar.style.display = 'block'
        }
    },
    (error) => {
        console.log(error)
    }
)

window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}

const stats = Stats()
document.body.appendChild(stats.dom)

function animate() {
    requestAnimationFrame(animate)

    controls.update()

    render()

    stats.update()
}

function render() {
    renderer.render(scene, camera)
}

animate()