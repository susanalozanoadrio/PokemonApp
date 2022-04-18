import { shallowMount } from "@vue/test-utils";
import PokemonOptions from "@/components/PokemonOptions";
import { mockPokemons } from "../mocks/pokemons.mock";

describe("PokemonOptions components", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(PokemonOptions, {
      props: {
        pokemons: mockPokemons,
      },
    });
  });

  test("debe hacer match con el snapshot", () => {

    //console.log(wrapper.html());
    expect(wrapper.html()).toMatchSnapshot();

  })
  test('debe mostrar las 4 opciones correctamente', () => {

     //que existan 4 li
    const liItems = wrapper.findAll('li')
    expect(liItems.length).toBe(4)
     //cada li debe de tener el nombre correpondiente
    expect( liItems[0].text() ).toBe('bulbasaur')
    expect( liItems[1].text() ).toBe('ivysaur')
    expect( liItems[2].text() ).toBe('venusaur')
    expect( liItems[3].text() ).toBe('charmander')

  })
  test('debe emitir "selection" con sus respectivos parámetros al hacer click', () => {

    const [ li1, li2, li3, li4] = wrapper.findAll('li')

    li1.trigger('click')
    li2.trigger('click')
    li3.trigger('click')
    li4.trigger('click')
    //console.log(wrapper.emitted('selection'))
    expect( wrapper.emitted('selection').length ).toBe(4)
    expect( wrapper.emitted('selection')[0] ).toEqual( [1] )
    expect( wrapper.emitted('selection')[1] ).toEqual( [2] )
    expect( wrapper.emitted('selection')[2] ).toEqual( [3] )
    expect( wrapper.emitted('selection')[3] ).toEqual( [4] )
  })
});
