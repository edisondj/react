import { useLocation, useNavigate } from "react-router-dom"
import queryString from 'query-string'
import { useForm } from "../../hooks/useForm"
import { getHeroesByName } from "../helpers"
import {HeroCard} from '../components/HeroCard'


export const SearchPage = () => {

  const navigate = useNavigate()
  const location = useLocation()

  const {q = ''} = queryString.parse(location.search)
  const heroes = getHeroesByName(q)

  const showSearch = (q.length === 0)
  const showError = (q.length > 0 ) && heroes.length === 0


  const {searchText, onInputChange} = useForm({
    searchText: ''
  })

  const onSearchSubmit = (event) =>{
    event.preventDefault()
    //if (searchText.trim().length <= 1) return;

    navigate(`?q=${searchText}`)
    
  }



  return (
    <>
    <div className="row">
      <h1>Search</h1>
      <hr />
      <div className="col-5">
        <h4>Searching</h4>
        <hr />
        <form onSubmit={onSearchSubmit}>
          <input 
           type="text"
           placeholder="Search Hero" 
           className="form-control" 
           name="searchText" 
           autoComplete="off" 
           value={searchText}
           onChange = {onInputChange}           
           />
          <button className="btn btn-outline-primary mt-3">Search</button>
        </form>
      </div>

      <div className="col-7">
        <h4>Result</h4>
        <hr />

      {/*   {
          (q === '')
          ?<div className="alert alert-primary">Search a Hero</div>
          : (heroes.leght === 0 ) 
            && <div className="alert alert-danger">There's no Hero with the name of <b>{q}</b></div>
        } */}

        <div className="alert alert-primary animate__animated animate__fadeIn" style={{display: showSearch ? '' : 'none'}}>
          Search a Hero
        </div>

        <div className="alert alert-danger animate__animated animate__fadeIn" style={{display: showError ? '' : 'none'}}>
          There's no Hero with the name of <b>{q}</b>
        </div>
       

        {
            heroes.map(hero => (
              <HeroCard key={hero.id} {...hero} />
            ))
        }

      </div>
    </div>


    </>
  )
}
