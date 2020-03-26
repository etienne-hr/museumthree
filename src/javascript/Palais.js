import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import palaisSource from '../models/Palais.glb'

export default class Palais {
    constructor() {
        this.group = new THREE.Group()

        const dracoLoader = new DRACOLoader()
        dracoLoader.setDecoderPath('/draco/')

        const gltfLoader = new GLTFLoader()
        gltfLoader.setDRACOLoader(dracoLoader)

        gltfLoader.load(
            palaisSource,
            (_gltf) => {
                this.palais = _gltf.scene.children[0]
                this.palais.position.x = -3
                this.palais.position.z = 3
                this.palais.scale.set(0.02, 0.02, 0.02)
                this.palais.material = new THREE.MeshToonMaterial({
                    color: 0x60F323
                    })
                this.group.add(this.palais)
            }
        )
    }
}