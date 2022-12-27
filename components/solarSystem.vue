<template>
  <div></div>
</template>

<script>
import * as THREE from "three";

import { OrbitControls } from "three/addons/controls/OrbitControls.js";

import stars from "@/assets/image/stars.jpg";
import earth from "@/assets/image/earth.jpg";
import sunTexture from "@/assets/image/sun.jpg";
import marsTexture from "@/assets/image/mars.jpg";
export default {
  data() {
    return {};
  },
  mounted() {
    //DISPLAY THE BOARD MENU TO CONTROL THE OBJECT
    const { $dat } = useNuxtApp();
    const gui = new $dat.GUI();

    // SET THE SCENE AND CAMERA
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    // TO GROUP OBJECT INSIDE THE SAME SCENE
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // RENDER THE SCENE
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // TO ADD EVENT TO THE OBJECT
    const { $InteractionManager } = useNuxtApp();
    const interactionManager = new $InteractionManager(
      renderer,
      camera,
      renderer.domElement
    );

    // ADD TEXTURE TO THE BACKGOURN OR TO ON THE OBJECT

    const cubeTextureLoader = new THREE.CubeTextureLoader();
    scene.background = cubeTextureLoader.load([
      stars,
      stars,
      stars,
      stars,
      stars,
      stars,
    ]);
    const textureLoader = new THREE.TextureLoader();

    const createPlanet = (size, texture, position) => {
      const geometry = new THREE.SphereGeometry(size, 30, 30);
      const material = new THREE.MeshStandardMaterial({
        map: textureLoader.load(texture),
      });
      const mesh = new THREE.Mesh(geometry, material);
      const obj = new THREE.Object3D();
      mesh.position.set(0, 0, position);
      obj.add(mesh);
      mainGroup.add(obj);
      return { mesh, obj };
    };

    // SET UP AN OTHER OBJECT
    const geometrySun = new THREE.SphereGeometry(2, 30, 30);
    const materialSun = new THREE.MeshBasicMaterial({
      map: textureLoader.load(sunTexture),
    });
    const sun = new THREE.Mesh(geometrySun, materialSun);
    mainGroup.add(sun);

    const mercury = createPlanet(0.3, earth, 7);

    const mars = createPlanet(0.6, marsTexture, 10);

    /* const sphereFolder = gui.addFolder("sun");
    sphereFolder.add(sun.rotation, "x", 0, Math.PI * 2).name("RotateX");
    sphereFolder.add(sun.rotation, "y", 0, Math.PI * 2).name("RotateY");
    sphereFolder.add(sun.rotation, "z", 0, Math.PI * 2).name("RotateZ"); */

    // SET AN AMBIENT LIGHT
    const light = new THREE.AmbientLight(0x333333); // soft white light
    mainGroup.add(light);
    // folder for gui menu
    const AmbientLight = gui.addFolder("AmbientLight");
    AmbientLight.add(light, "visible");
    AmbientLight.add(light, "intensity", 0, 1, 0.25);

    const pointLight = new THREE.PointLight(0xffffff, 2, 300);
    mainGroup.add(pointLight);

    /*    const sphereSize = 10;
    const pointLightHelper = new THREE.PointLightHelper(pointLight, sphereSize);
    mainGroup.add(pointLightHelper); */

    // SET THE CAMERA ANGLE XYZ
    camera.position.set(0, 8, 15);

    // TO CONTROL THE OBJECT
    const controls = new OrbitControls(camera, renderer.domElement);
    //TO ORBIT CONTROL
    controls.update();

    function animate(time) {
      requestAnimationFrame(animate);
      // TO ANIMATE
      /* cube.rotation.x += 0.01;
      cube.rotation.y += 0.01; */

      sun.rotateY(0.01);
      mercury.mesh.rotateY(-0.04);
      mercury.obj.rotateY(0.02);
      mars.mesh.rotateY(-0.07);
      mars.obj.rotateY(0.006);

      renderer.render(scene, camera);
    }
    animate();

    window.addEventListener("resize", () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });
  },
};
</script>

<style lang="scss">
.dg.a {
  margin-top: 100px;
}
#info {
  position: absolute;
  top: 200px;
  width: 100%;
  text-align: center;
  z-index: 100;
  display: block;
  color: wheat;
}
</style>
