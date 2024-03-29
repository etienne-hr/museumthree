//fake loader import
// import gifLoaderSource from './images/gifload.gif'

// const gifLoader = new Image()
// gifLoader.src = gifLoaderSource
// document.querySelector('.loader-js').appendChild(gifLoader)

import './style/main.styl'
import * as THREE from 'three'
import { TweenLite } from 'gsap/all'

// JS Classes import
import Preloader from './javascript/Preloader.js'
import Louvre from './javascript/Louvre.js'
import Orsay from './javascript/Orsay.js'
import Pompidou from './javascript/Pompidou.js'
import Palais from './javascript/Palais.js'
import Display from './javascript/Display.js'

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

// textures import
import goldColorSource from './images/gold/goldcolormap.jpg'

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

let camera,scene,renderer

/**
 * Models
 */

// Louvre
const louvre = new Louvre()
// Orsay
const orsay = new Orsay()
// Pompidou
const pompidou = new Pompidou()
// Palais
const palais = new Palais()
// particles
const particulesGroup = new THREE.Group()

/**
 * Preloader
 */

const options = {
    assets:[
    ],
    oncomplete: () => {
        init()

    }
}
const assetsLoad = () => {
    const models = [ louvre.model, orsay.model , pompidou.model, palais.model]
    models.forEach( model => options.assets.push(model))

}
assetsLoad()

const preloader = new Preloader(options)

const init = () => {
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
     * Scene
     */
    scene = new THREE.Scene()
    scene.background = new THREE.Color(0x000000)

    /**
     * Lights
     */
    const ambientLight = new THREE.AmbientLight(0xcccccc, 0.4)
    scene.add(ambientLight)

    const pointLight = new THREE.PointLight(0xffffff, 0.8)
    pointLight.position.y = 7
    scene.add(pointLight)

    const directionalLight = new THREE.DirectionalLight(0x00fffc, 0.3)
    directionalLight.position.x = - 2
    directionalLight.position.y = 3
    directionalLight.position.z = 4
    scene.add(directionalLight)

    /**
     * Objects
     */

    // Louvre
    scene.add(louvre.group)
    // Orsay
    scene.add(orsay.group)
    // Pompidou
    scene.add(pompidou.group)
    // Palais
    scene.add(palais.group)
    // display
    const display = new Display()
    scene.add(display.group)


    /**
     * Particules
     */

    const particlesGeometry = new THREE.SphereGeometry(4, 8, 8)

    const textureLoader = new THREE.TextureLoader()
    const goldColorTexture = textureLoader.load(goldColorSource)

    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.02,
        map: goldColorTexture
    })

    // generating 50 particules
    for (let i = 0; i < 50; i++) {
        const particles = new THREE.Points(particlesGeometry, particlesMaterial)

        particles.position.x = (Math.random() - 0.5) * 30
        particles.position.y = (Math.random() - 0.5) * 30
        particles.position.z = (Math.random() - 0.5) * 30

        particles.rotation.x = Math.random() * Math.PI
        particles.rotation.y = Math.random() * Math.PI

        particulesGroup.add(particles)
    }

    scene.add(particulesGroup)
  
    /**
     * Camera
     */
    camera = new THREE.PerspectiveCamera(100, sizes.width / sizes.height, 2.5, 20)
    camera.position.z = 8
    scene.add(camera)

    /**
     * Renderer
     */
    renderer = new THREE.WebGLRenderer()
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
     * slider
     */
    /** The slider work with 6 buttons every time we click on
     * on a button an another disappear
     * There is two types of button : the button next, and
     * the button previous
     * We switch class by using classList : add or remove
     */
    const buttonPalais = document.querySelector('.button-palais')
    const buttonOrsay = document.querySelector('.button-orsay')
    const buttonLouvre = document.querySelector('.button-louvre')
    const buttonPompidou = document.querySelector('.button-pompidou')
    const backOrsay = document.querySelector('.back-orsay')
    const backLouvre = document.querySelector('.back-louvre')

    backLouvre.classList.add('is-unactiv')
    backOrsay.classList.add('is-unactiv')
    buttonPalais.classList.add('is-unactiv')
    buttonLouvre.classList.add('is-unactiv')
    buttonPompidou.classList.add('is-unactiv')

    const $louvrePopup = document.querySelector('.js-louvre')
    const $orsayPopup = document.querySelector('.js-orsay')
    const $pompidouPopup = document.querySelector('.js-pompidou')
    const $palaisPopup = document.querySelector('.js-palais')
    const popups = [$louvrePopup, $orsayPopup, $pompidouPopup, $palaisPopup]


    //palais
    buttonPalais.addEventListener('click', () => {

        for (const _element of popups) {
            if (_element.classList.contains('focused')) {
                _element.classList.remove('focused')
            }
        }
        $palaisPopup.classList.add('focused')

        buttonPalais.classList.add('is-unactiv')
        buttonLouvre.classList.add('is-unactiv')
        buttonPompidou.classList.add('is-unactiv')
        buttonOrsay.classList.remove('is-unactiv')
        buttonOrsay.classList.add('button-orsay')
        buttonOrsay.classList.remove('is-back')

        TweenLite.to(
            palais.palais.position,
            1,
            {
                x: palais.position = -10,
                ease: 'Power3.easeInOut',
            }
        )
        TweenLite.to(
            orsay.orsay.position,
            1,
            {
                x: orsay.position = 50,
                ease: 'Power3.easeInOut',
            }
        )
    })

    //orsay

    buttonOrsay.addEventListener('click', () => {

        for (const _element of popups) {
            if (_element.classList.contains('focused')) {
                _element.classList.remove('focused')
            }
        }
        $orsayPopup.classList.add('focused')

        buttonPalais.classList.remove('is-unactiv')
        buttonOrsay.classList.add('is-unactiv')
        buttonOrsay.classList.add('button-louvre')
        buttonLouvre.classList.remove('is-unactiv')
        buttonLouvre.classList.remove('is-back')
        buttonLouvre.classList.add('button-louvre')
        buttonPompidou.classList.add('is-unactiv')

        TweenLite.to(
            palais.palais.position,
            1,
            {
                x: palais.position = -50,
                ease: 'Power3.easeInOut',
            }
        )
        TweenLite.to(
            orsay.orsay.position,
            1,
            {
                x: orsay.position = -3,
                ease: 'Power3.easeInOut',
            }
        )
        TweenLite.to(
            louvre.louvre.position,
            1,
            {
                x: louvre.position = 50,
                ease: 'Power3.easeInOut',
            }
        )
    })

    //backorsay
    backOrsay.addEventListener('click', () => {

        for (const _element of popups) {
            if (_element.classList.contains('focused')) {
                _element.classList.remove('focused')
            }
        }
        $orsayPopup.classList.add('focused')

        buttonPalais.classList.remove('is-unactiv')
        backOrsay.classList.add('is-unactiv')
        backOrsay.classList.add('button-louvre')
        buttonLouvre.classList.remove('is-unactiv')
        buttonLouvre.classList.remove('is-back')
        buttonLouvre.classList.add('button-louvre')
        buttonPompidou.classList.add('is-unactiv')

        TweenLite.to(
            palais.palais.position,
            1,
            {
                x: palais.position = -50,
                ease: 'Power3.easeInOut',
            }
        )
        TweenLite.to(
            orsay.orsay.position,
            1,
            {
                x: orsay.position = -3,
                ease: 'Power3.easeInOut',
            }
        )
        TweenLite.to(
            louvre.louvre.position,
            1,
            {
                x: louvre.position = 50,
                ease: 'Power3.easeInOut',
            }
        )
    })

    //louvre
    buttonLouvre.addEventListener('click', () => {

        for (const _element of popups) {
            if (_element.classList.contains('focused')) {
                _element.classList.remove('focused')
            }
        }
        $louvrePopup.classList.add('focused')

        backOrsay.classList.remove('is-unactiv')
        backOrsay.classList.remove('button-orsay')
        backOrsay.classList.remove('button-louvre')
        backOrsay.classList.add('is-back')
        buttonLouvre.classList.add('is-unactiv')
        buttonPompidou.classList.remove('is-unactiv')
        buttonPalais.classList.add('is-unactiv')

        TweenLite.to(
            orsay.orsay.position,
            1,
            {
                x: orsay.position = -50,
                ease: 'Power3.easeInOut',
            }
        )
        TweenLite.to(
            louvre.louvre.position,
            1,
            {
                x: louvre.position = -3,
                ease: 'Power3.easeInOut',
            }
        )
        TweenLite.to(
            pompidou.pompidou.position,
            1,
            {
                x: pompidou.position = 50,
                ease: 'Power3.easeInOut',
            }
        )
    })

    //backLouvre
    backLouvre.addEventListener('click', () => {

        for (const _element of popups) {
            if (_element.classList.contains('focused')) {
                _element.classList.remove('focused')
            }
        }
        $louvrePopup.classList.add('focused')

        backOrsay.classList.remove('is-unactiv')
        backOrsay.classList.remove('button-orsay')
        backOrsay.classList.remove('button-louvre')
        backOrsay.classList.add('is-back')
        backLouvre.classList.add('is-unactiv')
        buttonPompidou.classList.remove('is-unactiv')
        buttonPalais.classList.add('is-unactiv')

        TweenLite.to(
            orsay.orsay.position,
            1,
            {
                x: orsay.position = -50,
                ease: 'Power3.easeInOut',
            }
        )
        TweenLite.to(
            louvre.louvre.position,
            1,
            {
                x: louvre.position = -3,
                ease: 'Power3.easeInOut',
            }
        )
        TweenLite.to(
            pompidou.pompidou.position,
            1,
            {
                x: pompidou.position = 50,
                ease: 'Power3.easeInOut',
            }
        )
    })

    //pompidou
    buttonPompidou.addEventListener('click', () => {

        for (const _element of popups) {
            if (_element.classList.contains('focused')) {
                _element.classList.remove('focused')
            }
        }
        $pompidouPopup.classList.add('focused')

        backOrsay.classList.add('is-unactiv')
        backLouvre.classList.remove('button-louvre')
        backLouvre.classList.add('is-back')
        backLouvre.classList.remove('is-unactiv')
        buttonPompidou.classList.add('is-unactiv')
        buttonPalais.classList.add('is-unactiv')

        TweenLite.to(
            louvre.louvre.position,
            1,
            {
                x: louvre.position = -50,
                ease: 'Power3.easeInOut',
            }
        )
        TweenLite.to(
            pompidou.pompidou.position,
            1,
            {
                x: pompidou.position = -4,
                ease: 'Power3.easeInOut',
            }
        )
    })

    loop()
}
/**
 * Loop
 */

const loop = () => {
    window.requestAnimationFrame(loop)

    // particules
    particulesGroup.rotation.y += 0.002

    // Camera
    camera.lookAt(scene.position)

    // Render
    renderer.render(scene, camera)
}

//fixing online problem