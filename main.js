import './style.css'

import * as THREE from 'three'
import Stats from 'three/examples/jsm/libs/stats.module.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

// Window. Sizes
const sizes = {
  height: window.innerHeight,
  width: window.innerWidth
}

// Create a scene
const scene = new THREE.Scene()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Create a camera
const camera = new THREE.PerspectiveCamera(  25,  sizes.width / sizes.height,  0.1,  1000)
camera.position.z = 5
scene.add(camera)

// Orbit controls
const controls = new OrbitControls(camera, canvas)
controls.dampingFactor = 0.25
controls.enableDamping = true
controls.enableZoom = true
controls.enablePan = true
controls.enableRotate = true
controls.autoRotate = true
controls.autoRotateSpeed = 10

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
  alpha: false,
  preserveDrawingBuffer: false,
  premultipliedAlpha: false })
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(devicePixelRatio, 2))
renderer.setClearColor(0x101010, 0)
renderer.render(scene, camera)


// Load the environment texture
const textureLoader = new THREE.TextureLoader()
const envTexture = textureLoader.load('./assets/garage_1k.jpg')
envTexture.mapping = THREE.EquirectangularReflectionMapping

// Create a cube
const geometry = new THREE.BoxBufferGeometry(1, 1, 1)
const material = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  envMap: envTexture,
  metalness: 1,
  roughness: 0.02,
  envMapIntensity: 1,
  side: THREE.DoubleSide })
const cube = new THREE.Mesh(geometry, material)
scene.add(cube)

// Create a light
const light = new THREE.PointLight(0xffffff, 1, 100)
light.position.set(10, 10, 10)
scene.add(light)


// Initialize the main loop
const clock = new THREE.Clock()
let lastElapsedTime = 0
let FPS = 0

// Stats
const stats = new Stats()
stats.showPanel(0)
document.body.appendChild(stats.dom)

// Create the main loop invoking the animate function
const animate = () =>
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

  // Call animate again on the next frame
  requestAnimationFrame(animate)
}

animate()


// Manage the resize of the window
addEventListener('resize', () => {  
  
  sizes.width = innerWidth
  sizes.height = innerHeight
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2))
  renderer.render(scene, camera)
  
})