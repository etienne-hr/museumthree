import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import pompidouSource from '../models/Pompidou.glb';

export default class Pompidou {
    constructor() {
        this.group = new THREE.Group()

        const dracoLoader = new DRACOLoader()
        dracoLoader.setDecoderPath('/draco/')

        const gltfLoader = new GLTFLoader()
        gltfLoader.setDRACOLoader(dracoLoader)

        gltfLoader.load(
            pompidouSource,
            (_gltf) => {
                this.pompidou = _gltf.scene.children[0]
                this.pompidou.scale.set(0.03, 0.03, 0.03)
                this.pompidou.position.x = 60
                this.pompidou.position.y = -2
                this.pompidou.position.z = 2
                this.group.add(this.pompidou)
                const loader = document.querySelector('.loader-js')
                loader.className += ' hidden'
            },
        )
    }
}