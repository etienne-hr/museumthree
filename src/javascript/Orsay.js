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
            '/models/Orsay.gltf',
            (_gltf) => {
                this.orsay = _gltf.scene.children[0]
                this.orsay.position.x = 20
                this.orsay.scale.set(0.001, 0.001, 0.001)
                this.group.add(this.orsay)
            }
        )
    }
}