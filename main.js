import * as THREE from 'three'
import Stats from 'three/examples/jsm/libs/stats.module.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'


// Canvas
const canvas = document.querySelector('canvas.webgl')

// Sizes
const sizes = {
  height: window.innerHeight,
  width: window.innerWidth
}

// Create a scene
const scene = new THREE.Scene()

// Create a camera
const camera = new THREE.PerspectiveCamera(  50,  sizes.width / sizes.height,  0.1,  1000)
camera.position.z = 5
scene.add(camera)

// Orbit controls
const controls = new OrbitControls(camera, canvas)

// Create a cube
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({
  color: 0x000000,
  wireframe: true })
const cube = new THREE.Mesh(geometry, material)
scene.add(cube)

// Create a light
const light = new THREE.PointLight(0xffffff, 1, 100)
light.position.set(10, 10, 10)
scene.add(light)

// Renderer and clock 
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
  alpha: true,
  preserveDrawingBuffer: true,
  premultipliedAlpha: true
  
 })

renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setClearColor(0x101010, 0)
renderer.render(scene, camera)

// Initialize the main loop
const clock = new THREE.Clock()
let lastElapsedTime = 0
let FPS = 0

// Stats
const stats = new Stats()
stats.showPanel(0)
document.body.appendChild(stats.dom)

// Create the main loop invoking the tick function// Animate
const tick = () =>
{
  const elapsedTime = clock.getElapsedTime()
  const deltaTime = elapsedTime - lastElapsedTime
  lastElapsedTime = elapsedTime

  //FPS
  FPS = Math.round(1/deltaTime)
  
  // Update controls
  controls.update()
  
  // Update stats
  stats.update()

  // Render
  renderer.render(scene, camera)    

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}

tick()


// Manage the resize of the window
window.addEventListener('resize', () => {  
  
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.render(scene, camera)
  
})