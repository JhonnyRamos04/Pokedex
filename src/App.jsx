import { useEffect, useRef, useState, useCallback } from 'react'
import './App.css'
import { Pkm } from './components/Pkm'
import { useSearch } from './hooks/useSearch'
import debounce from 'just-debounce-it'
import { IconSearch } from '@tabler/icons-react'


//const pkm = '153'

export const App = () => {

  const [search, setSearch] = useState('')
  const [error, setError] = useState(null)
  const isFirstInput = useRef(true)
  const { newPkm, newError, getPkm } = useSearch({ search })

  const DebounceSearch = useCallback(debounce(newSearch => {
    getPkm(newSearch.toLowerCase())
  }, 500), [])


  useEffect(() => {
    if (isFirstInput) {
      isFirstInput.current = search === ''
      return
    }

    if (search.length < 1) {
      setError('Tienes que tener al menos un numero para buscar tu pokemon')
      return
    }
    if (newError) {
      setError(newError)
    }

  }, [newPkm])

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  const handleChange = (e) => {
    const newSearch = e.target.value
    setSearch(e.target.value)
    DebounceSearch(newSearch)
  }

  return (
    <section className='pkm-section w-96 md:w-[600px] overflow-hidden'>
      <form action="" className='flex flex-col items-center justify-center' onSubmit={handleSubmit}>
        <div className='flex justify-center items-center px-12 gap-x-1'>
          <img src="/PokeEggIcon.png" alt="Egg-pokemon" className='size-10' />
          <h1 className=' font-bold'>Pokedex</h1>
        </div>
        <div className='bg-white flex items-center justify-center rounded p-2 mt-3 mb-2'>
          <input type="text" className='px-2 w-full text-gray-900 font-semibold text-lg bg-transparent' value={search} onChange={handleChange} placeholder='Numero o nombre' />
          <button type="submit"><IconSearch color='#000' /></button>
        </div>
        {
          search.length <= 0 && <span className='p-2 text-lg font-semibold text-black italic'>Busca un Pokemon por nombre o por indice en la Pokedex</span>
        }
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {
        newPkm ? <Pkm pkm={newPkm} /> : <div className='lds-dual-ring mt-12'></div>
      }

    </section>
  )
}
