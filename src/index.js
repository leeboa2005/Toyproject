import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'
import { WEBGL } from './webgl'

if (WEBGL.isWebGLAvailable()) {
    var canvas
    var loader, skybox
    var scene, camera
    var renderer
    var controls

    init_threejs()
    
    function init_threejs() {
        canvas = document.getElementById("mCanvas")
        /* skybox texture apply on Scene */
        // loader = new THREE.CubeTextureLoader()
        // skybox = loader.load([
        //     '../static/images/textures/skybox/space_ft.png',
        //     '../static/images/textures/skybox/space_bk.png',
        //     '../static/images/textures/skybox/space_up.png',
        //     '../static/images/textures/skybox/space_dn.png',
        //     '../static/images/textures/skybox/space_rt.png',
        //     '../static/images/textures/skybox/space_lf.png'
        // ])
        scene = new THREE.Scene()
        // scene.background = skybox
        camera = new THREE.PerspectiveCamera(
            80, window.innerWidth / window.innerHeight, 0.01, 10000
        )
        camera.position.set(20, 10, 20)
        camera.lookAt(new THREE.Vector3(0, 0, 0))
        renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
        renderer.setSize(window.innerWidth, window.innerHeight)
        controls = new OrbitControls(camera, renderer.domElement)
        controls.minDistance = 25
        controls.maxDistance = 50
        controls.enablePan = false

        const ambi_light = new THREE.AmbientLight(0xffffff, 0.8)
        scene.add(ambi_light)

        const bloomPass = new UnrealBloomPass(
            new THREE.Vector2(window.innerWidth, window.innerHeight),
            1.5,
            0.4,
            0.05
        )
        bloomPass.threshold = 0.2
        bloomPass.strength = 0.25
        bloomPass.radius = 1
        const bloomComposer = new EffectComposer(renderer)
        const renderScene = new RenderPass(scene, camera)
        bloomComposer.setSize(window.innerWidth, window.innerHeight)
        bloomComposer.renderToScreen = true
        bloomComposer.addPass(renderScene)
        bloomComposer.addPass(bloomPass)

        const skybox_geo = new THREE.BoxGeometry(2048, 2048, 2048)
        const loader = new THREE.TextureLoader()
        const skyboxft = loader.load('../static/images/textures/skybox/space_ft.png'),
              skyboxbk = loader.load('../static/images/textures/skybox/space_bk.png'),
              skyboxup = loader.load('../static/images/textures/skybox/space_up.png'),
              skyboxdn = loader.load('../static/images/textures/skybox/space_dn.png'),
              skyboxrt = loader.load('../static/images/textures/skybox/space_rt.png'),
              skyboxlf = loader.load('../static/images/textures/skybox/space_lf.png')
        const skybox_mat_arr = [skyboxft, skyboxbk, skyboxup, skyboxdn, skyboxrt, skyboxlf]
        const skybox_mats = []
        for(let i = 0; i < skybox_mat_arr.length; i++) {
            skybox_mats.push(
                new THREE.MeshStandardMaterial({
                    map: skybox_mat_arr[i]
                })
            )
        }
        for(let i = 0; i < skybox_mats.length; i++) {
            skybox_mats[i].side = THREE.BackSide
        }
        const skybox = new THREE.Mesh(skybox_geo, skybox_mats)
        scene.add(skybox)

        const planet_geo = new THREE.SphereGeometry(12, 64, 64)
        const planet_mat = new THREE.MeshLambertMaterial({
            color: 0xaaccff,
            emissivem: 0x6699ff
        })
        const planet = new THREE.Mesh(planet_geo, planet_mat)
        scene.add(planet)

        // add some particle (stars)
        const particle_geo = new THREE.BufferGeometry
        const particle_cnt = 150
        const posArr = new Float32Array(particle_cnt * 3) // xyz xyz xyz xyz
        for(let i = 0; i < particle_cnt * 3; i++) {
            posArr[i] = (Math.random() - 0.5) * 100
        }
        particle_geo.setAttribute('position', new THREE.BufferAttribute(posArr, 3))
        const particle_mat = new THREE.PointsMaterial({
            size: 0.1,
            transparent: true,
            color: 0xbbddff,
            blending: THREE.AdditiveBlending
        })
        const particle_mesh = new THREE.Points(particle_geo, particle_mat)
        scene.add(particle_mesh)

        function onWindowResize() {
            camera.aspect = window.innerWidth / window.innerHeight
            camera.updateProjectionMatrix()
            renderer.setSize(window.innerWidth, window.innerHeight)
            bloomComposer.setSize(window.innerWidth, window.innerHeight)
        }
        window.addEventListener("resize", onWindowResize)

        function animate() {
            requestAnimationFrame(animate)
            skybox.rotation.x += 0.00015
            skybox.rotation.y += 0.00015
            camera.position.z += 0.0025
            controls.update()
            renderer.render(scene, camera)
            bloomComposer.render()
        }
        animate()
    }
} else {
    var warning = WEBGL.getWebGLErrorMessage()
    document.body.appendChild(warning)
}
