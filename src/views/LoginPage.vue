<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="loginHandler">
    <p v-if="error">{{error}}</p>
    <input v-model="email" type="email" placeholder="Enter email">
    <input v-model="password" type="password" placeholder="Enter Password">
    <div><span>Don't have an account?</span><router-link to="/register">
    click here...</router-link></div>
    <input type="submit" value="Login">
    

    </form>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import { auth } from '@/firebase'
import { signInWithEmailAndPassword } from '@firebase/auth'
// import { useRouter } from 'vue-router'


export default {
  name: 'LoginPage',
  setup() {
      const email = ref('')
      const password = ref('')
      const error = ref(null)
      // const router = useRouter()
      const loginHandler = () => {
        signInWithEmailAndPassword(auth, email.value, password.value)
        .then((data) => {
          
          if(data.user.uid  === '7W29HGeCdfPpqASfWeHlZkOY9t63'){
            console.log(data)
            window.location.assign('/admin')
          } else {
            window.location.assign('/')
          }
          
          } )
        .catch((err) => {
          if(err.code === 'auth/user-not-found'){
            error.value = 'User not found'
          } else if (err.code === 'auth/invalid-email'){
            error.value = 'Invalid Email'
          }
          else if (err.code === 'auth/wrong-password'){
            error.value = 'Invalid Password'
          } else if (err.code === 'auth/user-disabled'){
            error.value = 'User disabled'
          }
        })
      }

       return { email, password, loginHandler, error }
  }
}
</script>

<style>

</style>