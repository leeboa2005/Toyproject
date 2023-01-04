// three js
import * as THREE from 'three'
import { Color } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'
import { WEBGL } from './webgl'

if (WEBGL.isWebGLAvailable()) {
    var canvas
    var scene, camera
    var renderer
    var controls

    var cam_width_devide_value = 120
    var cam_height_devide_value = 300

    init_threejs()
    
    function init_threejs() {
        canvas = document.getElementById("spacePlanet")
        /* skybox texture apply on Scene */
        // loader = new THREE.CubeTextureLoader()
        // skybox = loader.load([
        //     '../static/images/texture/skybox/space_ft.png',
        //     '../static/images/texture/skybox/space_bk.png',
        //     '../static/images/texture/skybox/space_up.png',
        //     '../static/images/texture/skybox/space_dn.png',
        //     '../static/images/texture/skybox/space_rt.png',
        //     '../static/images/texture/skybox/space_lf.png'
        // ])
        scene = new THREE.Scene()
        // scene.background = skybox
        camera = new THREE.PerspectiveCamera(
            75, window.innerWidth / window.innerHeight, 0.01, 10000
        )
        camera.position.set(0, 0, 28)
        camera.lookAt(window.innerWidth / cam_width_devide_value, window.innerHeight / cam_height_devide_value, 0)
        // camera.lookAt(new THREE.Vector3(0, 0, 0))
        renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
        renderer.setSize(window.innerWidth, window.innerHeight)
        // controls = new OrbitControls(camera, renderer.domElement)
        // controls.minDistance = 25
        // controls.maxDistance = 50
        // controls.enablePan = false

        const ambi_light = new THREE.AmbientLight(0xffffff, 0.8)
        scene.add(ambi_light)

        const point_light = new THREE.PointLight(0xeeeeff, 1)
        const point_light_guide = new THREE.PointLightHelper(point_light, 1, 0x1111ff)
        point_light.position.set(5, -3, 15)
        scene.add(point_light)
        // scene.add(point_light_guide)

        const bloomPass = new UnrealBloomPass(
            new THREE.Vector2(window.innerWidth, window.innerHeight),
            1.5,
            0.4,
            0.05
        )
        bloomPass.threshold = 0.2
        bloomPass.strength = 0.6
        bloomPass.radius = 1
        const bloomComposer = new EffectComposer(renderer)
        const renderScene = new RenderPass(scene, camera)
        bloomComposer.setSize(window.innerWidth, window.innerHeight)
        bloomComposer.renderToScreen = true
        // bloomComposer.addPass(renderScene)
        // bloomComposer.addPass(bloomPass)

        const skybox_geo = new THREE.BoxGeometry(2048, 2048, 2048)
        const loader = new THREE.TextureLoader()
        const skyboxft = loader.load('../static/images/texture/skybox/space_ft.png'),
              skyboxbk = loader.load('../static/images/texture/skybox/space_bk.png'),
              skyboxup = loader.load('../static/images/texture/skybox/space_up.png'),
              skyboxdn = loader.load('../static/images/texture/skybox/space_dn.png'),
              skyboxrt = loader.load('../static/images/texture/skybox/space_rt.png'),
              skyboxlf = loader.load('../static/images/texture/skybox/space_lf.png')
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

        const planet_geo = new THREE.SphereGeometry(10, 128, 128)
        const planet_tex = loader.load('../static/images/texture/planet/4096_orbobjEpsilonEri2.jpg')
        const planet_nrm = loader.load('../static/images/texture/planet/planet_normalmap.jpg')
        const planet_mat = new THREE.MeshStandardMaterial({
            map: planet_tex,
            color: 0xaaccff,
            fog: true,
            normalMap: planet_nrm
        })
        const planet = new THREE.Mesh(planet_geo, planet_mat)
        scene.add(planet)

        const star_texture = loader.load('../static/images/texture/particle/star.png')
        var distance = 33
        var count_value = (Math.random() * (1999 - 1333)) + 1333
        var count = count_value
        var geometry = new THREE.Geometry()

        for (var i = 0; i < count; i++) {
            var vertex = new THREE.Vector3(0, 0, 0)

            var theta = THREE.Math.randFloatSpread(360)
            var phi = THREE.Math.randFloatSpread(360)

            vertex.x = distance * Math.sin(theta) * Math.cos(phi)
            vertex.y = distance * Math.sin(theta) * Math.sin(phi)
            vertex.z = distance * Math.cos(theta)

            geometry.vertices.push(vertex)
        }
        var particles = new THREE.PointCloud(geometry, new THREE.PointCloudMaterial({
            map: star_texture,
            color: 0x91968d,
            size: 2.5,
            sizeAttenuation: true,
            alphaTest: 0.75,
            transparent: true,
            blending: THREE.AdditiveBlending
        }));
        particles.boundingSphere = 50
        scene.add(particles);

        function onWindowResize() {
            camera.lookAt(window.innerWidth / cam_width_devide_value, window.innerHeight / cam_height_devide_value, 0)
            camera.aspect = window.innerWidth / window.innerHeight
            camera.updateProjectionMatrix()
            renderer.setSize(window.innerWidth, window.innerHeight)
            bloomComposer.setSize(window.innerWidth, window.innerHeight)
        }
        window.addEventListener("resize", onWindowResize)

        function animate() {
            requestAnimationFrame(animate)
            skybox.rotation.x += 0.00025
            skybox.rotation.y += 0.00025
            particles.rotation.y -= 0.0003
            planet.rotation.y += 0.0005
            planet.rotation.x -= 0.0007
            renderer.render(scene, camera)
            bloomComposer.render()
        }
        animate()
    }
} else {
    var warning = WEBGL.getWebGLErrorMessage()
    document.body.appendChild(warning)
}

// three js end

// gsap



// gsap end