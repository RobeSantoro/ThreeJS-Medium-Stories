import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js'

// Get the canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Camera
const camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.set(-5, 3, 5)
camera.lookAt(new THREE.Vector3(0, 0, 0))
scene.add(camera)

// Load the glb model
const loader = new GLTFLoader()
let mixer

loader.load('./models/Avatar_Dance.glb', // updated glb model

  function (gltf) {

    const model = gltf.scene
    const animations = gltf.animations

    mixer = new THREE.AnimationMixer(model)
    mixer.clipAction(animations[0]).play() // play the first animation

    scene.add(model)
  })

// Add a grid helper
const gridHelper = new THREE.GridHelper(10, 10)
scene.add(gridHelper)

// Add a light
const light = new THREE.DirectionalLight(0xffffff, 1)
light.position.set(-1, 3, 4)
scene.add(light)

// Create the Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true
})

renderer.setSize(window.innerWidth, window.innerHeight)
renderer.outputEncoding = THREE.sRGBEncoding;

// Add OrbitControls
const controls = new OrbitControls(camera, canvas)
controls.autoRotate = false

// Initialize the main loop
const clock = new THREE.Clock()
let lastElapsedTime = 0

// Animate Loop
function animate() {
  // Render the Scene
  renderer.render(scene, camera)

  // Update the controls
  controls.update()

  const elapsedTime = clock.getElapsedTime()
  const deltaTime = elapsedTime - lastElapsedTime
  lastElapsedTime = elapsedTime

  // Mixer update
  if (mixer != undefined) {
    mixer.update(deltaTime)
  }

  // Call the animate function again on the next frame
  requestAnimationFrame(animate)
}
animate()

// Add an event listener to the window resize
window.addEventListener('resize', function () {
  renderer.setSize(window.innerWidth, window.innerHeight)
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
})