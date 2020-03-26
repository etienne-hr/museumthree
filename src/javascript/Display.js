import * as THREE from 'three'

export default class Display {
    constructor() {
        this.group = new THREE.Group()
        const displayGeometry = new THREE.BoxGeometry(12, 10, 7)
        const displayMaterial = new THREE.MeshStandardMaterial({ color: 0x101110 })
        const display = new THREE.Mesh(displayGeometry, displayMaterial)
        display.position.y = -7
        display.position.x = -3
        this.group.add(display)
    }
}
