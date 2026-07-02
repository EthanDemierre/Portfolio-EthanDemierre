<template>
  <page-nav />

  <main class="grid-container">

    <div class="projects-scroll-container">
      <div class="projects-list" :style="{ transform: getLoopedTransform() }">
        <div v-for="(project, index) in projects" :key="index" class="project-item">
          <div class="project-image-wrapper" @mouseenter="pauseScrollAndHover(index)" @mouseleave="resumeScrollAndUnhover">
            <img :src="project.image" :alt="project.title" class="project-image" :class="{ blurred: hoveredIndex === index }" />
            <div v-if="hoveredIndex === index" class="project-info">
              <div class="project-info-content">
                <p class="project-date">{{ project.date }}</p>
                <p class="project-description">{{ project.description }}</p>
                <p class="project-medium">{{ project.medium }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  async setup() {
    const { data: projects } = await useFetch('/api/projects');
    return { projects };
  },
  data() {
    return {
      scrollPosition: 0,
      isScrolling: true,
      scrollSpeed: 3,
      hoveredIndex: -1
    };
  },
  methods: {
    pauseScrollAndHover(index) {
      this.isScrolling = false;
      this.hoveredIndex = index;
    },
    resumeScrollAndUnhover() {
      this.isScrolling = true;
      this.hoveredIndex = -1;
    },
    animateScroll() {
      if (this.isScrolling) {
        this.scrollPosition -= this.scrollSpeed;
      }
      requestAnimationFrame(this.animateScroll);
    },
    getLoopedTransform() {
      if (!this.projects || this.projects.length === 0) {
        return `translateY(0px)`;
      }
      const itemHeight = 620;
      const totalHeight = this.projects.length * itemHeight;
      const position = ((this.scrollPosition % totalHeight) + totalHeight) % totalHeight;
      return `translateY(${-position}px)`;
    }
  },
  mounted() {
    this.animateScroll();
  }
};
</script>

<style scoped>
.grid-container {
  box-sizing: border-box;
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  padding: 2rem;
  border: 1rem solid var(--blue);
  background-color: white;
  overflow: hidden;
}

@media (max-width: 1440px) {
  .grid-container {
    padding: 1.75rem;
    border-width: 0.9rem;
  }
}

@media (max-width: 1024px) {
  .grid-container {
    padding: 1.5rem;
    border-width: 0.75rem;
  }
}

@media (max-width: 768px) {
  .grid-container {
    padding: 1rem;
    border-width: 0.5rem;
  }
}

@media (max-width: 480px) {
  .grid-container {
    padding: 0.75rem;
    border-width: 0.35rem;
  }
}

.projects-scroll-container {
  grid-column: 1 / -1;
  grid-row: 1 / -1;
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  z-index: 5;
}

.projects-list {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 1rem;
  will-change: transform;
}

@media (max-width: 768px) {
  .projects-list {
    gap: 1rem;
    padding: 0.5rem;
  }
}

@media (max-width: 480px) {
  .projects-list {
    gap: 0.75rem;
    padding: 0.25rem;
  }
}

.project-item {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 600px;
}

@media (max-width: 1024px) {
  .project-item {
    min-height: 400px;
  }
}

@media (max-width: 768px) {
  .project-item {
    min-height: 280px;
  }
}

@media (max-width: 480px) {
  .project-item {
    min-height: 180px;
  }
}

.project-image-wrapper {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  height: fit-content;
  margin: 0 auto;
}

.project-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  border: 1px solid var(--black);
  transition: filter 0.3s ease, transform 0.3s ease;
  cursor: pointer;
}

.project-image:hover {
  transform: scale(1.02);
}

.project-image.blurred {
  filter: blur(8px);
}

.project-info {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.95);
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.project-info-content {
  text-align: center;
  padding: 2rem;
  width: 100%;
}

.project-date {
  font-family: 'Mono-light', sans-serif;
  font-size: 0.875rem;
  color: var(--black);
  margin-bottom: 1rem;
  letter-spacing: 0.0175rem;
}

.project-description {
  font-family: 'Mono-med', sans-serif;
  font-size: 1rem;
  color: var(--black);
  margin-bottom: 1.5rem;
  line-height: 1.5;
  font-weight: 300;
}

.project-medium {
  font-family: 'Mono-light-ita', sans-serif;
  font-size: 0.875rem;
  color: var(--black);
  font-style: italic;
  letter-spacing: 0.0175rem;
}

@media (max-width: 768px) {
  .project-info-content {
    padding: 1.25rem;
  }

  .project-date {
    font-size: 0.75rem;
  }

  .project-description {
    font-size: 0.85rem;
    margin-bottom: 0.75rem;
  }

  .project-medium {
    font-size: 0.75rem;
  }
}

@media (max-width: 480px) {
  .project-info-content {
    padding: 0.75rem;
  }

  .project-date {
    font-size: 0.65rem;
  }

  .project-description {
    font-size: 0.75rem;
    margin-bottom: 0.5rem;
  }

  .project-medium {
    font-size: 0.65rem;
  }
}
</style>
