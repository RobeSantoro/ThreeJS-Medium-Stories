# Vite Three.js Template

![alt text](./SocialImage.jpg)

# Vite App

### Init a Vite project with with npm 
```bash
npm init vite
```

- Give the Project a name and Vanilla JS as Framework and variant

- √ Project name: ... vite-test

- √ Select a framework: » vanilla

- √ Select a variant: » vanilla

Enter the directory
```bash
cd vite-test
```

- Install dependencies
```bash
npm install
```

- Create a vite.config.js file 
```bash
touch vite.config.js
```

- Set the public folder and include custom file extension
```bash
echo "export default { assetsInclude: ['**/*.glb', '**/*.gltf', '**/*.wasm'], publicDir: ['public'] }" > vite.config.js
```

- Create a /public folder accordingly
```bash
mkdir ./public
```

- Run code and check the files and folder created
```bash
code .
```

### vite.config.js
```js
export default {
	assetsInclude: ['**/*.glb', '**/*.gltf', '**/*.wasm'],
	publicDir: ['public']
	}
```
___
# index.html
Add the link to the css file:
```html
<link rel="stylesheet" href="./style.css">
```

Add a canvas element to the body tag of index.html file.
```html
<canvas class="webgl">
  <p>Your browser doesn't support WebGL</p>
</canvas>
```

Add script tag to the body tag of index.html file.
```html
<script type="module" src="./main.js"></script>
```
___
# style.css
Add the following styles to style.css file.
```css
* {
  margin: 0;
  padding: 0;
}

html, body {
  background: transparent;
  overflow: hidden;
}

.webgl {
  position: fixed;
  top: 0;
  left: 0;
  outline: none;
}
```
___
#### Install Three-JS
```bash
npm install three
```
___
# main.js
#### Import Three-JS
```js
import * as THREE from 'three'
```

#### Get the canvas element from the DOM
```js
// Get the canvas
const canvas = document.querySelector('canvas.webgl')
```

#### Create Scene
```js
// Scene
const scene = new THREE.Scene()
```

#### Create Camera ,set its Position, and add it to the scene
```js
// Camera
const camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.set(-5, 3, 5)
camera.lookAt(new THREE.Vector3(0, 0, 0))

scene.add(camera)
```

#### Create a Cube and add it to the scene
```js
// Create a Cube
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 })
const cube = new THREE.Mesh(geometry, material)  

scene.add(cube)
```

### Create a Light
```js
// Add a light
const light = new THREE.DirectionalLight(0xffffff, 1)
light.position.set(-1, 3, 4)

scene.add(light)
```

#### Create Renderer, set its size, and launch the render
```js
// Create the Renderer
const renderer = new THREE.WebGLRenderer( { canvas : canvas } )
// Render the Scene
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.render(scene, camer
```

### addEventListener to window resize event
```js
// Add an event listener to the window resize
window.addEventListener('resize', function() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setSize(window.innerWidth, window.innerHeight)
  //renderer.render(scene, camera)
})
```
Uncomment the `renderer.render(scene, camera)` line and resize the window to see the difference.

### Create the animation loop
```js
function animate() {
  renderer.render(scene, camera)
  requestAnimationFrame(animate)
}
```
Call the animate function
```js
animate()
```
### Add the Orbit Controls

Import Orbit Controls
```js
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
```

Add the Orbit Controls and set a continous rotation
```js
// Add OrbitControls
const controls = new OrbitControls(camera, canvas)
controls.autoRotate = true
```

The Orbit Controls is working, but is not updated in the main loop, so the camera does not orbit around the cube. 

Add the Update method of the Orbit Controls to the animate function
```js
function animate() {
 renderer.render(scene, camera)  

 controls.update() // Here

 requestAnimationFrame(animate)
}

animate()
```
The camera is now orbiting around the cube.




