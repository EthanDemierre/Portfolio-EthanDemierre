<template>
  <section
    ref="nav"
    :class="['navigation', { 'navigation--active': showNav }]"
  >
    <slider />
  </section>

  <button
    ref="menuBtn"
    @click="toggleNav"
    class="hamburger"
    :class="{ 'hamburger--active': showNav }"
  >
    <span class="hamburger-line"></span>
    <span class="hamburger-line"></span>
    <span class="hamburger-line"></span>
  </button>
</template>

<script>
export default {
  data() {
    return {
      showNav: false
    };
  },
  methods: {
    toggleNav() {
      this.showNav = !this.showNav;
    },
    handleClickOutside(event) {
      const nav = this.$refs.nav;
      const menuBtn = this.$refs.menuBtn;
      if (
        this.showNav &&
        nav &&
        !nav.contains(event.target) &&
        menuBtn &&
        !menuBtn.contains(event.target)
      ) {
        this.showNav = false;
      }
    }
  },
  mounted() {
    document.addEventListener('click', this.handleClickOutside);
  },
  beforeUnmount() {
    document.removeEventListener('click', this.handleClickOutside);
  }
};
</script>

<style scoped>
.navigation {
  position: fixed;
  z-index: 100;
  width: 25%;
  height: 100vh;
  background-color: var(--blue);
  box-shadow: 0 0px 10px rgb(0, 0, 0);
  transform: translateX(-100%);
  transition: transform 0.4s ease-in-out;
}

@media (max-width: 1440px) {
  .navigation {
    width: 30%;
  }
}

@media (max-width: 1024px) {
  .navigation {
    width: 40%;
  }
}

@media (max-width: 768px) {
  .navigation {
    width: 60%;
  }
}

@media (max-width: 480px) {
  .navigation {
    width: 100%;
  }
}

.navigation--active {
  transform: translateX(0);
}

button.hamburger {
  background: none;
  border: none;
  cursor: pointer;
  position: fixed;
  top: 2.2rem;
  left: 2.2rem;
  z-index: 999;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  width: 1.8rem;
  height: auto;
  pointer-events: auto;
}

.hamburger-line {
  width: 1.8rem;
  height: 0.15rem;
  background-color: var(--black);
  transition: all 0.3s ease-in-out;
  transform-origin: center;
}

.hamburger--active .hamburger-line:nth-child(1) {
  transform: rotate(45deg) translateY(0.55rem);
}

.hamburger--active .hamburger-line:nth-child(2) {
  opacity: 0;
}

.hamburger--active .hamburger-line:nth-child(3) {
  transform: rotate(-45deg) translateY(-0.55rem);
}

@media (max-width: 1440px) {
  button.hamburger {
    top: 2rem;
    left: 2rem;
  }
}

@media (max-width: 1024px) {
  button.hamburger {
    top: 1.75rem;
    left: 1.75rem;
    width: 1.6rem;
    gap: 0.35rem;
  }

  .hamburger-line {
    width: 1.6rem;
    height: 0.13rem;
  }

  .hamburger--active .hamburger-line:nth-child(1) {
    transform: rotate(45deg) translateY(0.48rem);
  }

  .hamburger--active .hamburger-line:nth-child(3) {
    transform: rotate(-45deg) translateY(-0.48rem);
  }
}

@media (max-width: 768px) {
  button.hamburger {
    top: 1.25rem;
    left: 1.25rem;
    width: 1.5rem;
    gap: 0.35rem;
  }

  .hamburger-line {
    width: 1.5rem;
    height: 0.13rem;
  }

  .hamburger--active .hamburger-line:nth-child(1) {
    transform: rotate(45deg) translateY(0.45rem);
  }

  .hamburger--active .hamburger-line:nth-child(3) {
  transform: rotate(-45deg) translateY(-0.45rem);
}
}

@media (max-width: 768px) and (max-height: 600px) {
  .navigation {
    overflow-y: auto;
  }
}

@media (max-width: 480px) {
  button.hamburger {
    top: 0.75rem;
    left: 1.1rem;
    width: 1.2rem;
    gap: 0.3rem;
    padding: 0.4rem;
  }

  .hamburger-line {
    width: 1.2rem;
    height: 0.12rem;
  }

  .hamburger--active .hamburger-line:nth-child(1) {
    transform: rotate(45deg) translateY(0.36rem);
  }

  .hamburger--active .hamburger-line:nth-child(3) {
    transform: rotate(-45deg) translateY(-0.36rem);
  }
}
</style>
