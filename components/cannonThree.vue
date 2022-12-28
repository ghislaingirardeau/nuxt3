<template>
  <div ref="scenePhysic"></div>
</template>

<script>
import * as THREE from "three";

import { OrbitControls } from "three/addons/controls/OrbitControls.js";

export default {
  data() {
    return {};
  },
  mounted() {
    const canvas = this.$refs.scenePhysic;
    const { $CANNON, $gsap, $InteractionManager } = useNuxtApp();

    //CANNON
    // set the world animation
    const world = new $CANNON.World({
      gravity: new $CANNON.Vec3(0, -9.81, 0),
      // to set the gravity which is 9.81 on earth
    });
    // need a time to move
    const timeStep = 1 / 60;

    // THREE JS
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    canvas.appendChild(renderer.domElement);

    const interactionManager = new $InteractionManager(
      renderer,
      camera,
      renderer.domElement
    );

    const controls = new OrbitControls(camera, renderer.domElement);
    camera.position.set(0, 5, -40);
    controls.update();

    // THREE JS RENDER GROUND
    const groundGeometry = new THREE.PlaneGeometry(30, 30);
    const groundMaterial = new THREE.MeshBasicMaterial({
      color: 0xfafafa,
      side: THREE.DoubleSide,
      wireframe: true,
    });
    const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
    scene.add(groundMesh);

    // WORLD BODY OBJECT = to render the physics 3d
    // SET THE BODY FOR THE GROUND IS THE BODY OF WORLD WHICH IS GONNA BE AFFATECTED BY THE GRAVITY

    const groundPhyMaterial = new $CANNON.Material();
    // CANNON JS RENDER GROUND
    const groundBody = new $CANNON.Body({
      /* shape: new $CANNON.Plane(), */
      // the plane has no limit
      shape: new $CANNON.Box(new $CANNON.Vec3(15, 15, 0.1)),
      // to set a limit at the ground, if the object drop again
      type: $CANNON.Body.STATIC, // we dont want it to move
      material: groundPhyMaterial,
    });
    world.addBody(groundBody);
    groundBody.quaternion.setFromEuler(Math.PI / 2, 0, 0);

    // THREE JS RENDER CUBE

    const cubeMaterial = new THREE.MeshBasicMaterial({
      color: 0x00ff00,
      wireframe: true,
    });
    const cubeGeometry = new THREE.BoxGeometry(2, 2, 2);
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    interactionManager.add(cube);
    cube.addEventListener("click", (event) => {
      $gsap.to(cubeBody.position, {
        x: cubeBody.position.x - Math.random() * 10,
        z: cubeBody.position.z + Math.random() * 10,
        duration: 1,
      });
      $gsap.to(cubeBody.quaternion, {
        x: 0.8,
        duration: 1,
      });
    });
    scene.add(cube);
    // CANNON JS RENDER CUBE
    const cubPhyMaterial = new $CANNON.Material();
    const cubeBody = new $CANNON.Body({
      shape: new $CANNON.Box(new $CANNON.Vec3(1, 1, 1)), // shape has to be equal to the three js mesh dimension
      mass: 4,
      position: new $CANNON.Vec3(1, 30, -1), // equal to the three mesh
      material: cubPhyMaterial,
    });
    world.addBody(cubeBody);
    cubeBody.angularVelocity.set(2, 2, 0); // to set a rotation
    cubeBody.angularDamping = 0.5; // how the mass affect the object

    // THREE JS RENDER SPHERE
    const sphereMaterial = new THREE.MeshBasicMaterial({
      color: 0xff0000,
      wireframe: true,
    });
    const sphereGeometry = new THREE.SphereGeometry(2);
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    interactionManager.add(sphere);
    sphere.addEventListener("click", (event) => {
      console.log(sphereBody);
      $gsap.to(sphereBody.position, {
        y: Math.random() * 40,
        duration: 1,
      });
    });
    scene.add(sphere);
    // CANNON JS RENDER SPHERE
    const spherePhyMaterial = new $CANNON.Material();
    const sphereBody = new $CANNON.Body({
      shape: new $CANNON.Sphere(2),
      mass: 10,
      position: new $CANNON.Vec3(0, 15, 0),
      material: spherePhyMaterial,
    });
    world.addBody(sphereBody);

    sphereBody.linearDamping = 0.51; // the sphere will stop

    // TO SET THE CONTACT REACTION BETWEEN 2 OBJECTS : here ground and box
    const groundSphereContactMat = new $CANNON.ContactMaterial(
      groundPhyMaterial,
      spherePhyMaterial,
      { restitution: 1 }
    );
    world.addContactMaterial(groundSphereContactMat);
    const groundBoxContactMat = new $CANNON.ContactMaterial(
      groundPhyMaterial,
      cubPhyMaterial,
      { friction: 0.03 }
    );
    world.addContactMaterial(groundBoxContactMat);

    //GSAP
    // CAMERA ANIMATION AUTO
    const tl = $gsap.timeline();
    window.addEventListener("keyup", (event) => {
      tl.to(camera.position, {
        z: -50,
        duration: 1,
        onUpdate: () => {
          camera.lookAt(0, 0, 0);
        },
      }).to(camera.position, {
        y: 0,
        z: -10,
        x: 45,

        duration: 1,
        onUpdate: () => {
          camera.lookAt(0, 0, 0);
        },
      });
      /* .to(groundBody.quaternion, {
          duration: 0.2,
          x: 0.6,
        }); */
    });

    let id;
    function animate(time) {
      /* id = requestAnimationFrame(animate); */
      requestAnimationFrame(animate);
      world.step(timeStep);

      // COPY THE POSITION OF WORLD BODY (cannon) TO THE OBJECT BODY (three)
      groundMesh.position.copy(groundBody.position);
      groundMesh.quaternion.copy(groundBody.quaternion);

      cube.position.copy(cubeBody.position);
      cube.quaternion.copy(cubeBody.quaternion);

      sphere.position.copy(sphereBody.position);
      sphere.quaternion.copy(sphereBody.quaternion);

      renderer.render(scene, camera);

      /* if (time > 10000) {
        cancelAnimationFrame(id);
      } */
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
