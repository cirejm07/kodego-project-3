<template>
  <div>
    <h1>Admin Page</h1>
  <div class="d-flex">
    <div v-for="shoe in shoes" :key="shoe.id" class="home">
  <div class="card" style="width: 18rem; height: 35rem;">
  <img :src="shoe.imageUrl" class="card-img-top" :alt="shoe.imgUrl">
  <div class="card-body">
    <p>id - {{shoe.id}}</p>
    <h5 class="card-title">Name - {{shoe.name}}</h5>
    <p>Price - {{shoe.price}}</p>
    <p class="card-text">Description - {{shoe.description}}</p>
    <p>Category: {{shoe.category}}</p>
    <p>Gender - {{shoe.gender}}</p>
    <div class="d-flex justify-content-end">
      <router-link class="btn btn-primary h-25 me-1" :to="{path:`/${shoe.id}`}">Edit</router-link>
     <p @click="deleteHandler(shoe.id)" class="btn btn-danger">Delete</p>
    </div>
  </div>
</div>
    <br>
    
  </div>
  </div>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import { auth, shoesCollectionRef } from '@/firebase'
import { onBeforeMount, onMounted } from '@vue/runtime-core'
import { deleteDoc, doc, onSnapshot } from '@firebase/firestore'
export default {
    name: 'AdminView',
    setup() {
      const name = ref('')
    const shoes = ref([])
    
    onBeforeMount(() => {
        let user = auth.currentUser;
      if(user) {
       name.value = user.email.split('@')[0]
      }
    })

    onMounted(() => {
       onSnapshot(shoesCollectionRef, (querySnapshot) => {
  const getShoes = [];
  querySnapshot.forEach((doc) => {
    const shoe = {
      id: doc.id,
      category: doc.data().category,
      description: doc.data().description,
      gender: doc.data().gender,
      imageUrl: doc.data().imageUrl,
      name: doc.data().name,
      price: doc.data().price,
      size: doc.data().size
    }
      getShoes.push(shoe)
  })
    shoes.value = getShoes
   
    })
    })
    
    const deleteHandler = async (shoeId)  => {
        
        try{
          let shoeRef = doc(shoesCollectionRef, shoeId)
        await deleteDoc(shoeRef)
        alert('shoe deleted')
        }
        catch(error){
          console.log(error)
        }
    }
    

    return { name, shoes, deleteHandler }
    }
}
</script>

<style>

</style>