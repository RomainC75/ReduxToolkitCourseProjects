import { configureStore} from "@reduxjs/toolkit"
import CocktailReducer from "./features/cocktailSlice"

export default configureStore({
    reducer:{
        app: CocktailReducer,
    }
})