<template>
  <section class="logo">
    <div class="container">
      <button class="logo-wrapper">
        <canvas ref="canvas"></canvas>
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const canvas = ref<HTMLCanvasElement | null>(null);

onMounted(() => {
  if (!canvas.value) return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(53.5, 1, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas.value,
    alpha: true,
  });
  renderer.setSize(270, 270);

  const textureLoader = new THREE.TextureLoader();
  const earthTexture = textureLoader.load(
    new URL("../assets/images/earth.jpg", import.meta.url).href,
    (texture) => {
      texture.generateMipmaps = false;
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
    }
  );

  const geometry = new THREE.SphereGeometry(2, 100, 100);

  const material = new THREE.MeshStandardMaterial({
    map: earthTexture,
  });

  const sphere = new THREE.Mesh(geometry, material);
  scene.add(sphere);

  const light = new THREE.DirectionalLight(0xffffff, 1.5);
  light.position.set(5, 3, 12).normalize();
  scene.add(light);

  camera.position.y = 2;
  camera.position.z = 4;

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.enableZoom = false;
  controls.autoRotate = false;
  controls.autoRotateSpeed = 1;
  controls.autoRotate = true;
  controls.rotateSpeed = 0.2;

  function updateLightPosition() {
    light.position.copy(camera.position);
    light.lookAt(scene.position);
  }

  function animate() {
    requestAnimationFrame(animate);

    controls.update();
    updateLightPosition();

    renderer.render(scene, camera);
  }
  animate();
});
</script>

<style scoped lang="sass">
.logo
  margin-top: 60px
  display: flex
  justify-content: center
  align-items: center
  height: 250px
  cursor: pointer
  margin-bottom: 60px

canvas
  height: 100%
  width: 100%
</style>
