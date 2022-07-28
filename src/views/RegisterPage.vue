<template>
  <h1>Register</h1>
    <form @submit.prevent="registerHandler">
    <div v-if="error">{{ error }}</div>
    <input v-model="email" type="email" placeholder="Enter email">
    <input v-model="password" type="password" placeholder="Enter Password">
    <div><span>Already have an have an account?</span><router-link to="/login">
    click here...</router-link></div>
    <input type="submit" value="Register">
    </form>
</template>

<script>
import { ref } from '@vue/reactivity';
import { auth } from '@/firebase';
import { createUserWithEmailAndPassword } from '@firebase/auth';
import { useRouter } from 'vue-router';

  export default {
    name: "RegisterPage",
    setup() {
      const email = ref('')
      const password = ref('')
      const error = ref(null)
      const router = useRouter()
      const registerHandler = () => {
          createUserWithEmailAndPassword(auth, email.value, password.value)
          .then((data) => data.operationType === 'signIn' ? router.replace('/') : null)
          .catch((err) => {
            console.log(err.message)
            if(err.code === 'auth/weak-password'){
              error.value = 'Password should be at least 6 characters'
            } else if(err.code === 'auth/invalid-email'){
              error.value = 'Invalid Email'
            } else if(err.code === 'auth/email-already-in-use'){
              error.value = 'Email already registered'
            }
          })
      }

      return { email, password, registerHandler, error }
    }
  };
</script>

<style></style>
