import React, {useState, useEffect} from 'react'
import { Link, useParams } from 'react-router-dom'
import { fetchSingleCocktail } from '../redux/features/cocktailSlice'
import { useDispatch, useSelector } from 'react-redux'


const SingleCocktail = () => {
  const {cocktail, loading} = useSelector((state)=>({...state.app}))
  const [modifiedCocktail, setModifiedCocktail] = useState([])
  const dispatch = useDispatch()
  const {id } = useParams()

  useEffect(()=>{
    // get an OBJECT  as parameter !!
    dispatch(fetchSingleCocktail({id}))
  },[id])

  useEffect(()=>{
    if(cocktail.length>0){
      const {
        strDrink: name,
        strDrinkThumb: image,
        strAlcoholic: info,
        strCategory: category,
        strGlass: glass,
        strInstructions: instructions,
        strIngredient1,
        strIngredient2,  
        strIngredient3,
        strIngredient4,
        strIngredient5,
      } = cocktail[0]
      const ingredients=[strIngredient1, strIngredient2, strIngredient3, strIngredient4, strIngredient5]
      const newCocktails = {
        name,image,info,category,glass,instructions, ingredients
      }
      setModifiedCocktail(newCocktails)
    }else{
      setModifiedCocktail(null)
    }
  },[id,cocktail])

  if(!modifiedCocktail){
    return <h2>PROBLEM</h2>
  }else{
    const {name, image, category, info, glass, instructions, ingredients}=modifiedCocktail
    return (
      <>
        {loading ? (
          <div>
            LOADING
          </div>
        ) :(
          <section className="section cocktail-section">
            <Link to="/">
              <button className="btn btrn-danger" style={{marginTop: "2rem"}}>
                Go back
              </button>
            </Link>
            <h2 className="section-title">{name}</h2>
            <div className="drink ">
              <img src={image} alt={name}/>
              <div className="drink-info">
                <p>
                  <span className="drink-data">Name=</span>{name}
                </p>
                <p>
                  <span className="drink-data">Category=</span>{category}
                </p>
                <p>
                  <span className="drink-data">Info=</span>{info}
                </p>
                <p>
                  <span className="drink-data">Glass=</span>{glass}
                </p>
                <p>
                  <span className="drink-data">Instructions=</span>{instructions}
                </p>
                
              </div>
            </div>
          </section>
        )
        
        }
      </>
    )
  }

  
}

export default SingleCocktail