<template>
  <div class="nav">
      <div class="left-nav">
        <router-link to="/">Home</router-link> |
    <router-link to="/">Products</router-link> |
    <router-link to="/about">About us</router-link> |
    </div> 
    <div class="right-nav">
        <span>Welcome {{user}}</span> |
    <button @click="signoutHandler">Signout</button>
    </div>
  </div>
</template>

<script>
export default {
    name: 'CustomerNav',
    props: ['user', 'signoutHandler']
}
</script>

<style>

a {
    font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
}

.nav {
    display: flex;
    padding: 30px;
}

.left-nav {
    margin-right: auto;
}

a.router-link-exact-active {
  color: #42b983;
}


</style>