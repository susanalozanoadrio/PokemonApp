import { shallowMount, mount } from '@vue/test-utils'
import PokemonPage from '@/pages/PokemonPage'
import { mockPokemons } from '../mocks/pokemons.mock'

describe('PokemonPage pages', () => {

    let wrapper
    beforeEach(() => {
        wrapper = shallowMount( PokemonPage )
    })

    test('debe hacer match con el snapshot', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })
    test('debe de llamar mixPokemonArray al montar', () => {

        const mixPokemonArraySpy = jest.spyOn( PokemonPage.methods, 'mixPokemonArray')
        const wrapper = shallowMount( PokemonPage )
        expect( mixPokemonArraySpy ).toHaveBeenCalled
    })
    test('debe hacer match con el snapshot cuando cargan los pokemon', () => {

        const wrapper = mount( PokemonPage, {
            data(){
                return{
                  pokemonArr: mockPokemons,
                  pokemon: mockPokemons[0],
                  showPokemon: false,
                  showAnswer: false,
                  message: ''
                }
              }
        })

        expect( wrapper.html() ).toMatchSnapshot()
    })
    test('debe mostrar los componentes PokemonPicture y PokemonOption', () => {

        const wrapper = shallowMount( PokemonPage, {
            data(){
                return{
                  pokemonArr: mockPokemons,
                  pokemon: mockPokemons[0],
                  showPokemon: false,
                  showAnswer: false,
                  message: ''
                }
              }
        })

        //console.log(wrapper.html())
        const picture = wrapper.find('pokemon-picture-stub')
        const options = wrapper.find('pokemon-options-stub')
        expect(picture.exists()).toBeTruthy()
        expect(options.exists()).toBeTruthy()
        
        expect(picture.attributes('pokemonid')).toEqual('1')
        
        expect(options.attributes('pokemons')).toBeTruthy()
    })
    test('pruebas con checkAnswer', async() => {

        const wrapper = shallowMount( PokemonPage, {
            data(){
                return{
                  pokemonArr: mockPokemons,
                  pokemon: mockPokemons[0],
                  showPokemon: false,
                  showAnswer: false,
                  message: ''
                }
              }
        })

        await wrapper.vm.checkAnswer(1)
        expect(wrapper.find('h2').exists()).toBeTruthy()
        //console.log(wrapper.find('h2').text())
        expect(wrapper.vm.showPokemon).toBeTruthy()
        expect(wrapper.find('h2').text()).toBe(`Correcto, es ${mockPokemons[0].name} :)`)

        await wrapper.vm.checkAnswer(4)
        //console.log(wrapper.find('h2').text())
        expect(wrapper.vm.message).toBe(`Oops, era ${mockPokemons[0].name} :(`)


    })
})