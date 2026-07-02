<template>
  <page-nav />

  <main class="grid-container">
    <section class="content grid-item-main">
      <div class="contact-form">
        <b>Envoie moi un message.</b>
        <form @submit.prevent="sendMessage">
          <div class="form-row">
            <input v-model="form.firstName" type="text" placeholder="Ethan" required />
            <input v-model="form.lastName" type="text" placeholder="Demierre" required />
          </div>
          <div class="form-row">
            <input v-model="form.email" type="email" placeholder="ethandemierre@gmail.com" required />
            <input v-model="form.phone" type="tel" placeholder="079/657/54/43" />
          </div>
          <textarea v-model="form.message" placeholder="Je t'aime ethan" required></textarea>
          <button type="submit" class="submit-btn">Envoyez</button>
        </form>

        <p v-if="successMessage" class="success">{{ successMessage }}</p>
        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
      </div>
    </section>

    <section class="quote grid-item-quote">

    </section>
  </main>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import emailjs from 'emailjs-com'

onMounted(() => {
  emailjs.init('5II7cZTJAkDhnbIrR')
})

const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  message: ''
})

const successMessage = ref('')
const errorMessage = ref('')

const sendMessage = () => {
  const templateParams = {
    to_email: 'ethandemierre@gmail.com',
    from_name: `${form.firstName} ${form.lastName}`,
    from_email: form.email,
    phone: form.phone,
    message: form.message
  }

  emailjs.send('service_i092x4v', 'template_ksv7zxk', templateParams)
    .then(() => {
      successMessage.value = 'Message envoyé avec succès !'
      errorMessage.value = ''
      form.firstName = ''
      form.lastName = ''
      form.email = ''
      form.phone = ''
      form.message = ''
      setTimeout(() => {
        successMessage.value = ''
      }, 3000)
    })
    .catch(() => {
      successMessage.value = ''
      errorMessage.value = 'Erreur lors de l\'envoi. Réessaie plus tard.'
    })
}
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

.grid-item-main {
  grid-column: 4 / span 6;
  grid-row: 4 / span 6;
}

@media (max-width: 1024px) {
  .grid-item-main {
    grid-column: 3 / span 7;
    grid-row: 3 / span 7;
  }
}

@media (max-width: 768px) {
  .grid-item-main {
    grid-column: 2 / span 10;
    grid-row: 3 / span 8;
  }
}

@media (max-width: 480px) {
  .grid-item-main {
    grid-column: 1 / -1;
    grid-row: 2 / span 9;
    padding: 0.75rem;
  }
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  font-family: monospace;
  padding: 2rem;
}

@media (max-width: 768px) {
  .contact-form {
    padding: 1.25rem;
    gap: 0.9rem;
  }
}

@media (max-width: 480px) {
  .contact-form {
    padding: 0.75rem;
    gap: 0.75rem;
  }
}

.form-row {
  display: flex;
  gap: 1rem;
}

@media (max-width: 1024px) {
  .form-row {
    flex-direction: column;
    gap: 0.75rem;
  }
}

@media (max-width: 768px) {
  .form-row {
    flex-direction: column;
    gap: 0.75rem;
  }
}

@media (max-width: 480px) {
  .form-row {
    flex-direction: column;
    gap: 0.75rem;
  }
}

input,
textarea {
  width: 100%;
  padding: 1rem;
  font-family: monospace;
  border: 1px solid black;
  font-size: 1rem;
}

@media (max-width: 768px) {
  input,
  textarea {
    padding: 0.75rem;
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  input,
  textarea {
    padding: 0.75rem;
    font-size: 0.85rem;
  }
}

textarea {
  min-height: 150px;
  margin-bottom: 0;
}

@media (max-width: 480px) {
  textarea {
    min-height: 120px;
  }
}

.submit-btn {
  font-weight: bold;
  font-style: italic;
  background-color: var(--blue);
  color: white;
  padding: 1rem 2rem;
  border: none;
  width: fit-content;
  cursor: pointer;
  align-self: center;
}

@media (max-width: 480px) {
  .submit-btn {
    width: 100%;
    padding: 0.875rem 1.5rem;
  }
}

.success {
  color: green;
}

.error {
  color: red;
}

.grid-item-quote {
  grid-column: 10 / span 3;
  grid-row: 10 / span 2;
  align-self: end;
  justify-self: start;
  font-family: monospace;
}

@media (max-width: 1024px) {
  .grid-item-quote {
    grid-column: 9 / span 4;
    grid-row: 10 / span 2;
  }
}

@media (max-width: 768px) {
  .grid-item-quote {
    grid-column: 1 / span 12;
    grid-row: 9 / span 2;
  }
}

@media (max-width: 480px) {
  .grid-item-quote {
    grid-column: 1 / -1;
    grid-row: 12 / span 2;
  }
}

.quote p {
  width: 75%;
  margin-bottom: 0.5rem;
  font-size: 0.8rem;
  text-align: left;
}

@media (max-width: 1024px) {
  .quote p {
    width: 85%;
    font-size: 0.8rem;
  }
}

@media (max-width: 768px) {
  .quote p {
    width: 100%;
    font-size: 0.75rem;
  }
}

@media (max-width: 480px) {
  .quote p {
    width: 100%;
    font-size: 0.7rem;
    margin-bottom: 0.25rem;
  }
}

b {
  color: #000;
  font-family: 'coralpixel', sans-serif;
  font-size: 2rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1rem;
  letter-spacing: 0.1rem;
}

@media (max-width: 768px) {
  b {
    font-size: 1.75rem;
  }
}

@media (max-width: 480px) {
  b {
    font-size: 1.5rem;
  }
}
</style>
