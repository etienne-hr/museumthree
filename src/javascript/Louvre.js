import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import louvreSource from '../models/Louvre.glb'

export default class Louvre {
    constructor() {
        this.group = new THREE.Group()

        const dracoLoader = new DRACOLoader()
        dracoLoader.setDecoderPath('/draco/')

        const gltfLoader = new GLTFLoader()
        gltfLoader.setDRACOLoader(dracoLoader)

        gltfLoader.load(
            louvreSource,
            (_gltf) => {
                this.louvre = _gltf.scene.children[0]
                this.louvre.position.x = 40
                this.louvre.scale.set(0.03, 0.03, 0.03)
                this.group.add(this.louvre)
            }
        )
    }
}

