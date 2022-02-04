import * as THREE from 'three'

// Get canvas element
const canvas = document.querySelector('canvas.webgl')

// Create the Scene
const scene = new THREE.Scene()

// Camera
const camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.set(-5, 3, 5)
camera.lookAt(new THREE.Vector3(0, 0, 0))

scene.add(camera)

// Create a Cube
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 })
const cube = new THREE.Mesh(geometry, material)

scene.add(cube)

// Add a light
const light = new THREE.DirectionalLight(0xffffff, 1)
light.position.set(-1, 3, 4)

scene.add(light)

// Create the Renderer
const renderer = new THREE.WebGLRenderer( { canvas : canvas } )
// Render the Scene
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.render(scene, camera)


