import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'

export default class Palais {
    constructor() {
        this.group = new THREE.Group()

        const dracoLoader = new DRACOLoader()
        dracoLoader.setDecoderPath('/draco/')

        const gltfLoader = new GLTFLoader()
        gltfLoader.setDRACOLoader(dracoLoader)

        gltfLoader.load(
            '/models/Palais.gltf',
            (_gltf) => {
                this.palais = _gltf.scene.children[0]
                this.palais.position.x = 0
                this.group.add(this.palais)
            }
        )
    }
}