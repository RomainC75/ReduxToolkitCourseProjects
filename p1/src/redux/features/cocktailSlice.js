import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios"

export const fetchCocktails = createAsyncThunk(
    "cocktails/fetchCocktails",
    async ()=>{
        return axios.get("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=").then((ans)=>{
            return ans.data
        })
    }
)

export const fetchSingleCocktail = createAsyncThunk(
    "cocktails/fetchSingleCocktail",
    async ({id})=>{
        return axios.get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`).then((ans)=>{
            return ans.data
        })
    }
)

export const fetchSearchCocktail = createAsyncThunk(
    "cocktails/fetchSearchCocktail",
    async ({searchText})=>{
        return axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?i=${searchText}`).then((ans)=>{
            return ans.data
        })
    }
)

const cocktailSlice = createSlice({
    name:"cocktails",
    initialState:{
        cocktails:[],
        cocktail:[],
        loading:false,
        error: null,
    },
    extraReducers:{
        [fetchCocktails.pending]:(state, action)=>{
            state.loading = true
        },
        [fetchCocktails.fulfilled]:(state,action)=>{
            state.loading=false
            state.cocktails=action.payload.drinks
        },
        [fetchCocktails.rejected]:(state,action)=>{
            state.loading=false
            state.error=action.payload
        },

        [fetchSingleCocktail.pending]:(state, action)=>{
            state.loading = true
        },
        [fetchSingleCocktail.fulfilled]:(state,action)=>{
            state.loading=false
            state.cocktail=action.payload.drinks
        },
        [fetchSingleCocktail.rejected]:(state,action)=>{
            state.loading=false
            state.error=action.payload
        },

        [fetchSearchCocktail.pending]:(state, action)=>{
            state.loading = true
        },
        [fetchSearchCocktail.fulfilled]:(state,action)=>{
            state.loading=false
            state.cocktail=action.payload.drinks
        },
        [fetchSearchCocktail.rejected]:(state,action)=>{
            state.loading=false
            state.error=action.payload
        }
    }
})

export default cocktailSlice.reducer