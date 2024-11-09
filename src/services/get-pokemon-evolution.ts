import { httpRequest } from '~/src/libraries/http-request'

async function getPokemonImage(name: string) {
  const pokemonResponse = await httpRequest.get(`/pokemon/${name}`)
  return pokemonResponse.data.sprites.front_default
}

interface TEvolutionChain {
  species: {
    name: string
  }
  evolves_to: Array<TEvolutionChain>
}

export async function requestEvolutionPokemonChain(speciesUrl: string) {
  const responseSpecies = await httpRequest.get(speciesUrl)
  const responseChain = await httpRequest.get(responseSpecies.data.evolution_chain.url)
  const chain = responseChain.data.chain

  let evolutionData: Array<{ name: string; url: string }> = []
  let currentChain: TEvolutionChain | null = chain

  while (currentChain) {
    const name = currentChain.species.name
    const url = await getPokemonImage(name)
    evolutionData.push({ name, url })

    if (currentChain.evolves_to.length > 0) {
      currentChain = currentChain.evolves_to[0]
    } else {
      currentChain = null
    }
  }

  return evolutionData
}
