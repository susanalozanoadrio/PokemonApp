<template>

  <PokemonPage/>
 
</template>

<script>
import PokemonPage from '@/pages/PokemonPage'


export default {
  name: 'App',
  components: {
    PokemonPage,
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Suez+One&display=swap');
#app {
   font-family: 'Suez One', serif; 
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
