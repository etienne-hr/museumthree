import * as THREE from 'three'

export default class River {
    constructor(sizes) {
        this.sizes = sizes
        this.init()
    }
    init() {
        this.group = new THREE.Group()


        const shape = new THREE.Shape()

        shape.moveTo(-12, -7) // bottom left point
        shape.bezierCurveTo(-8, 3, 0, 3, 10, -7) // curve to bottom right
        shape.bezierCurveTo(9, -7, 9, -7, 9, -7) // line to bottom right
        shape.bezierCurveTo(-1, 2, -7, 2, -11, -7) // curve back to bottom left

        const geometry = new THREE.ShapeGeometry(shape, 32)
        const material = new THREE.MeshBasicMaterial({ color: 0x99E1E5 })
        const mesh = new THREE.Mesh(geometry, material)

        this.group.add(mesh)
    }
}

