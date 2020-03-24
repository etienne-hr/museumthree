import './style/main.styl'
import * as THREE from 'three'
// import River from './javascript/River.js'
import Louvre from './javascript/Louvre.js'
import Orsay from './javascript/Orsay.js'
import Pompidou from './javascript/Pompidou.js'
import Palais from './javascript/Palais.js'
import { TweenLite } from 'gsap/all'

/**
 * Sizes
 */
const sizes = {}
sizes.width = window.innerWidth
sizes.height = window.innerHeight

/**
 * Cursor
 */
const cursor = {}
cursor.x = 0
cursor.y = 0

window.addEventListener('mousemove', (_event) => {
    cursor.x = _event.clientX / sizes.width - 0.5
    cursor.y = _event.clientY / sizes.height - 0.5
})

/**
 * raycaster
 */
const raycaster = new THREE.Raycaster()
/**
 * Images
 */
// ici instancier les photos de chaque musée

/**
 * Scene
 */
const scene = new THREE.Scene()

/**
 * Lights
 */

const ambientLight = new THREE.AmbientLight(0xffffff, 0.2)
scene.add(ambientLight)

/**
 * Objects
 */

// River

// Louvre
const louvre = new Louvre()
scene.add(louvre.group)

// Orsay
const orsay = new Orsay()
scene.add(orsay.group)

// Pompidou
const pompidou = new Pompidou()
scene.add(pompidou.group)

// Palais
const palais = new Palais()
scene.add(palais.group)

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(100, sizes.width / sizes.height, 0.1, 20)
camera.position.z = 8
camera.position.x = 10
scene.add(camera)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer()
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(window.devicePixelRatio)
document.body.appendChild(renderer.domElement)

/**
 * Resize
 */
window.addEventListener('resize', () => {
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    renderer.setSize(sizes.width, sizes.height)
})

/**
 * Zoom
 */
// mettre ici le zoom au clic sur un musée

/**
 * animation
 */

document.addEventListener('click', () =>
{
    if(hoverLouvre)
    {
        console.log('click sur le musée')

        TweenLite.to(
            camera.position,
            1,
            {
                // x: camera.position.x - 5,
                z: camera.position.z = 3,
                ease: 'Power3.easeInOut',
                // onComplete: () =>
                // {
                //     console.log('terminé')

                //     TweenLite.to(
                //         camera.position,
                //         1,
                //         {
                //             y: camera.position.y + 1,
                //             x: camera.position.x + 1,
                //         }
                //     )
                // }
            }
        )
    }
})

/**
 * Loop
 */
let hoverLouvre = false
const loop = () =>
{
    window.requestAnimationFrame(loop)

    // Camera
    camera.lookAt(scene.position)

    // Cursor raycasting
    const raycasterCursor = new THREE.Vector2(cursor.x * 2, - cursor.y * 2)
    raycaster.setFromCamera(raycasterCursor, camera)

    const intersects = raycaster.intersectObject(louvre.group, true)
    if(intersects.length)
    {
        hoverLouvre = true
    }
    else
    {
        hoverLouvre = false
    }

    // Render
    renderer.render(scene, camera)
}

loop()