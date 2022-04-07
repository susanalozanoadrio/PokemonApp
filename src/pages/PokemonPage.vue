<template>
<div class="container">
  <h1 v-if="!pokemon">Espere por favor ...</h1>
  <div v-else>
    <h1 class="title">¿Quién es este pokémon?</h1>
    <!-- TODO: img -->
    <!-- TODO: Opciones -->
    <PokemonPicture :pokemonId="pokemon.id" :showPokemon="showPokemon"/>
    <PokemonOptions 
      :pokemons="pokemonArr"
      @selection="checkAnswer"
      />
    <template v-if="showAnswer">
      <div  class="container-button">
        <h2 class="fade-in message">{{message}}</h2>
        <button class="myBtn" @click="newGame">Nuevo Juego</button>
      </div>
    </template>
  </div>
  </div>
</template>

<script>
import PokemonPicture from '@/components/PokemonPicture'
import PokemonOptions from '@/components/PokemonOptions'
import getPokemonOptions from '@/helpers/getPokemonOptions'

//console.log(getPokemonOptions())

export default {
   components: {
    PokemonPicture,
    PokemonOptions,
  },
  data(){
    return{
      pokemonArr: [],
      pokemon: null,
      showPokemon: false,
      showAnswer: false,
      message: ''
    }
  },
  methods: {
    async mixPokemonArray() {
      this.pokemonArr = await getPokemonOptions()
      const rndInt = Math.floor( Math.random() * 4)
      this.pokemon = this.pokemonArr[ rndInt ]
      console.log(this.pokemonArr)
      console.log(rndInt)
    },
    checkAnswer(pokemonId ) {
      this.showPokemon = true
      this.showAnswer = true
      console.log('pokemon page llamado', pokemonId)
      if(pokemonId === this.pokemon.id) {
        this.message = `Correcto, es ${this.pokemon.name} :)`
      }else {
        this.message = `Oops, era ${this.pokemon.name} :(`
      }
    },
    newGame(){
      this.showPokemon = false
      this.showAnswer = false
      this.pokemonArr = []
      this.pokemon = null
      this.mixPokemonArray()
    }
  },
  mounted() {
    this.mixPokemonArray()
  }
}

</script>

<style>

.container {
  width: 60%;
  padding: 0% 0px;
  border: 1px solid black;
  background-color: #f1f1f1;
}

.title {
  margin-bottom: 8%;
  color: rebeccapurple;
}

.message {
  color: rebeccapurple;
}

.container-button {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.myBtn {
  width: 200px;
  padding: 2%;
  color: white;
  font-family: 'Suez One', serif;
  background-color: rebeccapurple;
  border: none;
  border-radius: 4px;
  margin-bottom: 5%;
  
}

</style>