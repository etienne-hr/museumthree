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
                this.louvre.position.y = -1.8
                this.louvre.position.z = 3
                this.louvre.scale.set(0.01, 0.01, 0.01)
                this.group.add(this.louvre)
            },
        )
    }
}

