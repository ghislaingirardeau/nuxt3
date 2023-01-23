<template>
  <div></div>
</template>

<script>
import * as THREE from "three";

import { OrbitControls } from "three/addons/controls/OrbitControls.js";

import nebula from "@/assets/image/nebula.jpg";
import stars from "@/assets/image/stars.jpg";
import menu from "@/assets/image/beToFeelMenu.jpg";
import share from "@/assets/image/beToFeelShare.jpg";
import sign from "@/assets/image/beToFeelSign.jpg";
import user from "@/assets/image/beToFeelUser.jpg";

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
    mainGroup.position.y = 0.5;
    scene.add(mainGroup);

    // RENDER THE SCENE
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    document.body.appendChild(renderer.domElement);

    // TO ADD EVENT TO THE OBJECT
    const { $InteractionManager } = useNuxtApp();
    const interactionManager = new $InteractionManager(
      renderer,
      camera,
      renderer.domElement
    );

    // SET UP THE GROUND IF NEEDED
    const groundGeometry = new THREE.PlaneGeometry(8, 8);
    const groundMaterial = new THREE.MeshStandardMaterial({
      color: 0xfafafa,
      side: THREE.DoubleSide,
    });
    const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
    groundMesh.receiveShadow = true;
    groundMesh.position.y = -2;
    groundMesh.rotation.x = -0.5 * Math.PI;
    mainGroup.add(groundMesh);

    // TO ADD OPACITY OPTION WHEN FOCUS OUT
    scene.fog = new THREE.Fog(0xffffff, 0, 30);

    // ADD TEXTURE TO THE BACKGOURN OR TO ON THE OBJECT
    const textureLoader = new THREE.TextureLoader();
    scene.background = textureLoader.load(stars);

    // SET UP A CUBE FOR EXEMPLE
    const mutliTexture = [
      new THREE.MeshBasicMaterial({
        color: 0x00ff00,
      }),
      new THREE.MeshBasicMaterial({
        color: 0x00ff00,
      }),
      new THREE.MeshBasicMaterial({
        color: 0x00ff00,
      }),

      new THREE.MeshBasicMaterial({
        color: 0x00ff00,
      }),
      new THREE.MeshStandardMaterial({
        map: textureLoader.load(user),
      }),
      new THREE.MeshStandardMaterial({
        map: textureLoader.load(user),
      }),
    ];
    const cubeGeometry = new THREE.BoxGeometry(2, 2, 2);
    /* const cubeMaterial = new THREE.MeshPhongMaterial({
      map: textureLoader.load(nebula),
    }); */
    const cube = new THREE.Mesh(cubeGeometry, mutliTexture);
    cube.position.x = 1;
    cube.position.z = -1;
    cube.castShadow = true;
    // EVENT TO THE CUBE
    interactionManager.add(cube);
    cube.addEventListener("click", (event) => {
      cube.addEventListener("mousemove", (e) => {
        console.log(e.originalEvent.offsetX / 10);
        cube.rotation.x = Math.PI / (e.originalEvent.offsetX / 100);
      });
    });
    mainGroup.add(cube);
    // folder for gui menu
    const cubeFolder = gui.addFolder("Cube");
    cubeFolder.add(cube.rotation, "x", 0, Math.PI * 2).name("RotateX");
    cubeFolder.add(cube.rotation, "y", 0, Math.PI * 2).name("RotateY");
    cubeFolder.add(cube.rotation, "z", 0, Math.PI * 2).name("RotateZ");

    const panelGeometry = new THREE.BoxGeometry(4, 3, 0.2);
    const panelMaterial = new THREE.MeshStandardMaterial({
      color: 0x00ff00,
    });
    const panelMesh = new THREE.Mesh(panelGeometry, mutliTexture);
    panelMesh.position.z = 2;
    panelMesh.position.x = -2;
    panelMesh.rotation.y = Math.PI / 5;
    mainGroup.add(panelMesh);

    const material = new THREE.LineBasicMaterial({
      color: 0x0000ff,
    });

    const points = [];
    points.push(new THREE.Vector3(-1, 0, 2));
    points.push(new THREE.Vector3(0, 1, 2));
    points.push(new THREE.Vector3(0.5, 0.5, 1));
    points.push(new THREE.Vector3(1, 0, 1));

    const geometry = new THREE.BufferGeometry().setFromPoints(points);

    const line = new THREE.Line(geometry, material);
    mainGroup.add(line);

    // SET AN AMBIENT LIGHT
    const light = new THREE.AmbientLight(0xf7f2f2, 0.25); // soft white light
    light.visible = true;
    mainGroup.add(light);
    // folder for gui menu
    const AmbientLight = gui.addFolder("AmbientLight");
    AmbientLight.add(light, "visible");
    AmbientLight.add(light, "intensity", 0, 1, 0.25);

    // SET DIRECTIONAL LIGHT
    const directionalLight = new THREE.DirectionalLight(0xfa3434, 0.5);
    directionalLight.position.set(-1, 2, 0.5);
    directionalLight.castShadow = true;
    directionalLight.visible = false;
    /* const directionalLightHelper = new THREE.DirectionalLightHelper(
      directionalLight,
      3
    ); */
    mainGroup.add(directionalLight);
    // folder for gui menu
    const dlFolder = gui.addFolder("dlFolder");
    dlFolder.add(directionalLight, "visible");
    dlFolder.add(directionalLight, "castShadow");
    dlFolder.add(directionalLight, "intensity", 0, 1, 0.25);

    // set up spot light + helper

    const sl = new THREE.SpotLight(0xffffff, 1, 0, Math.PI / 16);
    sl.position.set(-24, 28, 0);
    sl.castShadow = true;
    /* sl.target.position.set(0, 0, 0); */
    const slHelper = new THREE.SpotLightHelper(sl);
    mainGroup.add(sl, slHelper);

    // set up spot light gui
    const slSettings = {
      visible: true,
    };
    const slFolder = gui.addFolder("spot light");
    slFolder.add(slSettings, "visible").onChange((value) => {
      sl.visible = value;
      slHelper.visible = value;
    });
    slFolder.add(sl, "intensity", 0, 4, 0.5);
    slFolder.add(sl, "angle", Math.PI / 16, Math.PI / 2, Math.PI / 16);
    slFolder.add(sl, "castShadow");
    slFolder.add(sl.position, "x", -40, 0, 0.5).name("posX");
    slFolder.add(sl.position, "y", 0, 40, 0.5).name("posY");
    slFolder.add(sl.position, "z", 0, 20, 0.5).name("posZ");

    // SET THE CAMERA ANGLE XYZ
    camera.position.set(0, 2, 8);

    // TO CONTROL THE OBJECT
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.update();

    function animate(time) {
      // TO ANIMATE
      //cube.rotation.x += 0.01;

      renderer.render(scene, camera);
    }
    renderer.setAnimationLoop(animate);

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
