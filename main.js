
import * as THREE from 'three'
import Stats from 'three/examples/jsm/libs/stats.module.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
// Import GLTF and DRACO loader
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'

/****************************************************************************************/
/*********************************************************************** THREE.JS SETUP */
/****************************************************************************************/

// Create a scene
const scene = new THREE.Scene()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Window. Sizes
const sizes = {
  height: window.innerHeight,
  width: window.innerWidth
}

// Create a camera
const camera = new THREE.PerspectiveCamera(25, sizes.width / sizes.height, 0.1, 1000)
camera.position.set(0, 2, 5)
scene.add(camera)

// Orbit controls
const controls = new OrbitControls(camera, canvas)
// Set the lookat of the OrbitControls
controls.target.set(0, 0, 0)
controls.dampingFactor = 0.25
controls.autoRotate = true

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
  alpha: false,
  preserveDrawingBuffer: false,
  premultipliedAlpha: false
})

renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(devicePixelRatio, 2))
renderer.setClearColor(0x101010, 0)
renderer.render(scene, camera)
renderer.outputEncoding = THREE.sRGBEncoding

/*****************************************************************************************/
/********************************************************************* ENVIRONMENT SETUP */
/*****************************************************************************************/

// Load the environment texture
const textureLoader = new THREE.TextureLoader()
const envMap = textureLoader.load('./textures/envMap.jpg')
envMap.mapping = THREE.EquirectangularReflectionMapping
envMap.encoding = THREE.sRGBEncoding

// Create a ground plane
const geometry = new THREE.BoxBufferGeometry(1, 1, 1)
const material = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  envMap: envMap,
  metalness: 1,
  roughness: 0.05,
  envMapIntensity: 1,
  side: THREE.DoubleSide
})
const cube = new THREE.Mesh(geometry, material)
scene.add(cube)


/*****************************************************************************************/
/************************************************************************* TEXTURE SETUP */
/*****************************************************************************************/




/*****************************************************************************************/
/*************************************************************************** LIGHTS ******/
/*****************************************************************************************/

// Create a light
const light = new THREE.PointLight(0xffffff, 1, 100)
light.position.set(10, 10, 10)
scene.add(light)

/*****************************************************************************************/
/************************************************************* CLOCK TICK AND STATS ******/
/*****************************************************************************************/

// Initialize the main loop
const clock = new THREE.Clock()
let lastElapsedTime = 0
let FPS = 0

// Stats
const stats = new Stats()
stats.showPanel(0)
document.body.appendChild(stats.dom)

// Create the main loop invoking the tick function
const tick = () => {
  const elapsedTime = clock.getElapsedTime()
  const deltaTime = elapsedTime - lastElapsedTime
  lastElapsedTime = elapsedTime

  //FPS
  FPS = Math.round(1 / deltaTime)

  // Update controls
  controls.update()

  // Update stats
  stats.update()

  // Render
  renderer.render(scene, camera)

  // Call tick again on the next frame
  requestAnimationFrame(tick)
}

tick()

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