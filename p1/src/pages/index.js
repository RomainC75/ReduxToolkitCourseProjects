import React from 'react'
import CocktailList from '../components/CocktailList'
import { SearchInput } from '../components/SearchInput'

export const Home = () => {
  return (
    <div>
        <h2>Home</h2>
        <SearchInput/>
        <CocktailList/>
    </div>
  )
}
