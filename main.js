import * as THREE from 'three'

// Get canvas element
const canvas = document.querySelector('canvas.webgl')

// Create the Scene
const scene = new THREE.Scene()

// Create the Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.z = 5

// Create a Cube
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const cube = new THREE.Mesh(geometry, material)

scene.add(cube)

// Create the Renderer
const renderer = new THREE.WebGLRenderer({ canvas: canvas})

// Render the Scene
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.render(scene, camera)


