import './style/main.styl'
import * as THREE from 'three'
import { TweenLite } from 'gsap/all'
// JS Classes import
import River from './javascript/River.js'
import Louvre from './javascript/Louvre.js'
import Orsay from './javascript/Orsay.js'
import Pompidou from './javascript/Pompidou.js'
import Palais from './javascript/Palais.js'
// Images import
import imageLouvre1Source from './images/louvre1.jpg'
import imageLouvre2Source from './images/louvre2.jpg'
import imageLouvre3Source from './images/louvre3.jpg'
import imageOrsay1Source from './images/orsay1.jpg'
import imageOrsay2Source from './images/orsay2.jpg'
import imageOrsay3Source from './images/orsay3.jpg'
import imagePompidou1Source from './images/pompidou1.jpg'
import imagePompidou2Source from './images/pompidou2.jpg'
import imagePompidou3Source from './images/pompidou3.jpg'
import imagePalais1Source from './images/palais1.jpg'
import imagePalais2Source from './images/palais2.jpg'
import imagePalais3Source from './images/palais3.jpg'

/**
 * Images
 */

// Louvre
const imageLouvre1 = new Image()
imageLouvre1.src = imageLouvre1Source
document.querySelector('.js-louvre-pictures').appendChild(imageLouvre1)

const imageLouvre2 = new Image()
imageLouvre2.src = imageLouvre2Source
document.querySelector('.js-louvre-pictures').appendChild(imageLouvre2)

const imageLouvre3 = new Image()
imageLouvre3.src = imageLouvre3Source
document.querySelector('.js-louvre-pictures').appendChild(imageLouvre3)

// Orsay
const imageOrsay1 = new Image()
imageOrsay1.src = imageOrsay1Source
document.querySelector('.js-orsay-pictures').appendChild(imageOrsay1)

const imageOrsay2 = new Image()
imageOrsay2.src = imageOrsay2Source
document.querySelector('.js-orsay-pictures').appendChild(imageOrsay2)

const imageOrsay3 = new Image()
imageOrsay3.src = imageOrsay3Source
document.querySelector('.js-orsay-pictures').appendChild(imageOrsay3)

// Pompidou
const imagePompidou1 = new Image()
imagePompidou1.src = imagePompidou1Source
document.querySelector('.js-pompidou-pictures').appendChild(imagePompidou1)

const imagePompidou2 = new Image()
imagePompidou2.src = imagePompidou2Source
document.querySelector('.js-pompidou-pictures').appendChild(imagePompidou2)

const imagePompidou3 = new Image()
imagePompidou3.src = imagePompidou3Source
document.querySelector('.js-pompidou-pictures').appendChild(imagePompidou3)

// Grand Palais
const imagePalais1 = new Image()
imagePalais1.src = imagePalais1Source
document.querySelector('.js-palais-pictures').appendChild(imagePalais1)

const imagePalais2 = new Image()
imagePalais2.src = imagePalais2Source
document.querySelector('.js-palais-pictures').appendChild(imagePalais2)

const imagePalais3 = new Image()
imagePalais3.src = imagePalais3Source
document.querySelector('.js-palais-pictures').appendChild(imagePalais3)


/***********************************************************************************
 ************************************** Three JS
 ***********************************************************************************/

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
 * Scene
 */
const scene = new THREE.Scene()
scene.background = new THREE.Color(0xffffff)

/**
 * Lights
 */

const ambientLight = new THREE.AmbientLight(0xffffff, 0.2)
scene.add(ambientLight)

/**
 * Objects
 */

// River
const river = new River(sizes)
scene.add(river.group)

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

document.addEventListener('click', () => {
    if (hoverLouvre) {
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
const loop = () => {
    window.requestAnimationFrame(loop)

    // Camera
    camera.lookAt(scene.position)

    // Cursor raycasting
    const raycasterCursor = new THREE.Vector2(cursor.x * 2, - cursor.y * 2)
    raycaster.setFromCamera(raycasterCursor, camera)

    const intersects = raycaster.intersectObject(louvre.group, true)
    if (intersects.length) {
        hoverLouvre = true
    }
    else {
        hoverLouvre = false
    }

    // Render
    renderer.render(scene, camera)
}

loop()