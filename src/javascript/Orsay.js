import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import orsaySource from '../models/Orsay.glb'

export default class Orsay {
    constructor() {
        this.group = new THREE.Group()
        this.model =  orsaySource
        const dracoLoader = new DRACOLoader()
        dracoLoader.setDecoderPath('/draco/')

        const gltfLoader = new GLTFLoader()
        gltfLoader.setDRACOLoader(dracoLoader)

        gltfLoader.load(
            this.model,
            (_gltf) => {
                this.orsay = _gltf.scene.children[0]
                this.orsay.position.x = 60
                this.orsay.position.y = -1.8
                this.orsay.position.z = 3
                this.orsay.scale.set(0.0007, 0.0007, 0.0007)
                this.group.add(this.orsay)
            },
        )
    }
}