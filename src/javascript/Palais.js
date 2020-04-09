import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import palaisSource from '../models/Palais.glb'

export default class Palais {
    constructor() {
        this.group = new THREE.Group()
        this.model = palaisSource
        const dracoLoader = new DRACOLoader()
        dracoLoader.setDecoderPath('/draco/')

        const gltfLoader = new GLTFLoader()
        gltfLoader.setDRACOLoader(dracoLoader)

        gltfLoader.load(
            this.model,
            (_gltf) => {
                this.palais = _gltf.scene.children[0]
                this.palais.position.x = -10
                this.palais.position.y = -1.8
                this.palais.position.z = 3
                this.palais.scale.set(0.03, 0.03, 0.03)
                this.group.add(this.palais)
            },
        )
    }
}