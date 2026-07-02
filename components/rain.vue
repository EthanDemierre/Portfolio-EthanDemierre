<template>
  <div class="rain-container" ref="container">
    <div
      v-for="(img, index) in images"
      :key="index"
      class="rain-image"
      :class="{ paused: img.isPaused }"
      :style="{
        left: img.left + 'px',
        animationDuration: img.speed + 's',
        animationDelay: img.delay + 's',
        width: img.size + 'px',
        top: '-' + img.size + 'px',
        '--img-height': img.size + 'px'
      }"
      @mouseenter="pauseAnimation(index)"
      @mouseleave="resumeAnimation(index)"
    >
      <img :src="img.src" :alt="'Projet image ' + (index + 1)" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      images: [],
      containerWidth: 0,
      projetImages: [
        '/img/projet/projet1.png',
        '/img/projet/projet1.png',
        '/img/projet/projet1.png',
        '/img/projet/projet1.png',
        '/img/projet/projet1.png',
        '/img/projet/projet1.png',
        '/img/projet/projet1.png',
        '/img/projet/projet1.png',
        '/img/projet/projet1.png',
        '/img/projet/projet1.png',
      ],
      resizeTimeout: null
    };
  },
  mounted() {
    this.containerWidth = this.$refs.container.clientWidth;
    this.generateImages();
    window.addEventListener('resize', this.onResize);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.onResize);
    if (this.resizeTimeout) clearTimeout(this.resizeTimeout);
  },
  methods: {
    onResize() {
      if (this.resizeTimeout) clearTimeout(this.resizeTimeout);
      this.resizeTimeout = setTimeout(() => {
        this.containerWidth = this.$refs.container.clientWidth;
        this.generateImages();
      }, 300);
    },
    generateImages() {
      const projectCount = Math.floor(Math.random() * 5) + 3; // 3 à 5 images visibles
      const images = [];
      const occupiedZones = [];

      for (let i = 0; i < projectCount; i++) {
        const size = Math.floor(Math.random() * (500 - 100 + 1)) + 150; // 150 à 600 px

        let left;
        let tries = 0;
        do {
          left = Math.random() * (this.containerWidth - size);
          tries++;
          const overlapping = occupiedZones.some(zone => {
            return !(left + size < zone.start || left > zone.end);
          });
          if (!overlapping) break;
        } while (tries < 100);

        occupiedZones.push({ start: left, end: left + size });

        const speed = Math.random() * 4 + 5; // 4 à 8 secondes

        const delay = -Math.random() * speed; // delay négatif aléatoire entre 0 et -speed

        const src = this.projetImages[Math.floor(Math.random() * this.projetImages.length)];

        images.push({
          src,
          left,
          size,
          speed,
          delay,
          isPaused: false
        });
      }

      this.images = images;
    },
    pauseAnimation(index) {
      this.images[index].isPaused = true;
    },
    resumeAnimation(index) {
      this.images[index].isPaused = false;
    }
  }
};
</script>

<style scoped>
.rain-container {
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 80vw;
  max-width: 1200px;
  height: 100vh;
  overflow: hidden;
  pointer-events: none;
  z-index: 0;
  box-sizing: border-box;
}

.rain-image {
  position: absolute;
  animation-name: floatDown;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  animation-play-state: running;
  pointer-events: auto;
}

.rain-image.paused {
  animation-play-state: paused !important;
}

.rain-image img {
  display: block;
  width: 100%;
  height: auto;
  object-fit: cover;
  pointer-events: none;
  border-radius: 0;
  box-shadow: none;
}

@keyframes floatDown {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(calc(100vh + var(--img-height, 0px)));
  }
}
</style>
