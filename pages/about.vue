<template>
  <page-nav />

  <main class="grid-container">

    <div class="carre-wrapper">
      <div class="carre">
        <svg xmlns="http://www.w3.org/2000/svg" width="68" height="68" viewBox="0 0 68 68" fill="none">
          <rect width="68" height="68" fill="#2600FF"/>
        </svg>
        <div class="photo-container" @click="showPhotoModal = true" role="button" tabindex="0" @keydown.enter="showPhotoModal = true">
          <img src="https://cdn.builder.io/api/v1/image/assets%2F08dd6309d008452ca33868c5e5cb97f5%2F3e0f522322254b0fbf96302741bf21dc" alt="Ethan Demierre" class="profile-photo">
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" width="68" height="68" viewBox="0 0 68 68" fill="none">
          <rect width="68" height="68" fill="#FF0000"/>
        </svg>
      </div>
    </div>

    <section class="content">
      <div class="aboutme">
        <p>
          J'ai 22 ans titulaire d'un CFC <b> D'interactive média designer.</b>  Passionné par la création sous toutes ses formes,
          j'aime imaginer, construire, transformer des idées en expériences visuelles et interactives. Le mixmedia est pour moi un super moyen d'expression.
        </p>
        <div class="pdf-links">
          <a href="/portfolio.pdf" download class="pdf-link">📄 Portfolio</a>
          <a href="/cv.pdf" download class="pdf-link">📄 CV</a>
        </div>
      </div>
    </section>

    <div v-if="showPhotoModal" class="photo-modal" @click="showPhotoModal = false">
      <div class="photo-modal-content" @click.stop>
        <button class="close-btn" @click="showPhotoModal = false">✕</button>
        <img src="https://cdn.builder.io/api/v1/image/assets%2F08dd6309d008452ca33868c5e5cb97f5%2F3e0f522322254b0fbf96302741bf21dc" alt="Ethan Demierre" class="modal-photo">
      </div>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      showPhotoModal: false
    };
  },
  methods: {
    handleEscape(e) {
      if (e.key === 'Escape') {
        this.showPhotoModal = false;
      }
    }
  },
  watch: {
    showPhotoModal(newVal) {
      if (newVal) {
        document.addEventListener('keydown', this.handleEscape);
        document.body.style.overflow = 'hidden';
      } else {
        document.removeEventListener('keydown', this.handleEscape);
        document.body.style.overflow = 'auto';
      }
    }
  },
  beforeUnmount() {
    document.removeEventListener('keydown', this.handleEscape);
    document.body.style.overflow = 'auto';
  }
};
</script>

<style scoped>
.grid-container {
  box-sizing: border-box;
  width: 100vw;
  height: 100vh;
  padding: 2rem;
  border: 1rem solid var(--blue);
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: white;
}

.carre-wrapper {
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.carre {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 200px;
}

@media (max-width: 1440px) {
  .carre {
    gap: 180px;
  }
}

@media (max-width: 1024px) {
  .carre {
    gap: 150px;
  }
}

@media (max-width: 768px) {
  .carre {
    gap: 100px;
  }
}

@media (max-width: 768px) {
  .carre {
    gap: 80px;
  }
}

@media (max-width: 480px) {
  .carre {
    gap: 50px;
  }
}

.carre svg {
  width: 68px;
  height: 68px;
}

@media (max-width: 1024px) {
  .carre svg {
    width: 55px;
    height: 55px;
  }
}

@media (max-width: 768px) {
  .carre svg {
    width: 45px;
    height: 45px;
  }
}

@media (max-width: 768px) {
  .carre svg {
    width: 50px;
    height: 50px;
  }
}

@media (max-width: 480px) {
  .carre svg {
    width: 35px;
    height: 35px;
  }
}

.photo-container {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.photo-container:hover {
  transform: scale(1.05);
}

.photo-container:focus {
  outline: 2px solid var(--blue);
  outline-offset: 2px;
}

.profile-photo {
  width: 200px;
  height: 200px;
  object-fit: cover;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  user-select: none;
}

@media (max-width: 1024px) {
  .profile-photo {
    width: 150px;
    height: 150px;
  }
}

@media (max-width: 768px) {
  .profile-photo {
    width: 120px;
    height: 120px;
  }
}

@media (max-width: 768px) {
  .profile-photo {
    width: 140px;
    height: 140px;
  }
}

@media (max-width: 480px) {
  .profile-photo {
    width: 110px;
    height: 110px;
  }
}

.content {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 0;
}

.aboutme {
  max-width: 800px;
  width: 100%;
  text-align: left;
  font-family: monospace;
  font-size: 14px;
  line-height: 1.6;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0;
  box-sizing: border-box;
}

.aboutme p {
  margin-bottom: 1.5rem;
  width: 100%;
  padding: 0 2rem;
  box-sizing: border-box;
  max-width: 100%;
}

@media (max-width: 768px) {
  .aboutme {
    max-width: 100%;
    font-size: 12px;
    padding: 0;
  }

  .aboutme p {
    padding: 0 1.5rem;
  }

  .pdf-links {
    gap: 1rem;
    margin-top: 1.5rem;
    padding: 0 1.5rem;
  }

  .pdf-link {
    padding: 0.65rem 1.25rem;
    font-size: 12px;
  }
}

@media (max-width: 480px) {
  .aboutme {
    max-width: 100%;
    font-size: 11px;
    margin-bottom: 1rem;
    padding: 0;
  }

  .aboutme p {
    margin-bottom: 1rem;
    padding: 0 1rem;
  }

  .pdf-links {
    flex-direction: column;
    gap: 0.75rem;
    margin-top: 1.25rem;
    padding: 0 1rem;
  }

  .pdf-link {
    width: 100%;
    padding: 0.6rem 1rem;
    font-size: 11px;
    justify-content: center;
  }
}

.red-text {
  color: red;
}

.blue-text {
  color: #2600FF;
}

.pdf-links {
  display: flex;
  gap: 1.5rem;
  margin-top: 2rem;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  padding: 0 2rem;
  box-sizing: border-box;
}

.pdf-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border: 2px solid var(--blue);
  border-radius: 4px;
  color: var(--blue);
  text-decoration: none;
  font-weight: 600;
  font-size: 14px;
  font-family: monospace;
  transition: all 0.3s ease;
}

.pdf-link:hover {
  background-color: var(--blue);
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(38, 0, 255, 0.2);
}

.photo-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  animation: fadeIn 0.3s ease;
}

.photo-modal-content {
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-photo {
  max-width: 90vw;
  max-height: 85vh;
  object-fit: contain;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  border-radius: 4px;
}

.close-btn {
  position: absolute;
  top: -2.5rem;
  right: 0;
  background: white;
  border: 2px solid white;
  color: var(--black);
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  font-size: 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  font-weight: bold;
}

.close-btn:hover {
  background-color: var(--blue);
  color: white;
  border-color: var(--blue);
  transform: scale(1.1);
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@media (max-width: 480px) {
  .close-btn {
    top: -2rem;
    width: 2rem;
    height: 2rem;
    font-size: 1.2rem;
  }
}

@media (max-width: 480px) {
  .pdf-links {
    gap: 1rem;
  }

  .pdf-link {
    padding: 0.6rem 1.2rem;
    font-size: 13px;
  }
}
</style>
