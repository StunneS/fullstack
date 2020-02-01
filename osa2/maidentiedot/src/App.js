import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {

  const [ countries, setCountries ] = useState([])
  const [ search, setSearch] = useState('')

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all")
    .then(response => {
      setCountries(response.data)
    })
  },[])
  console.log(countries[0])

  const handleSearch = (event) => {
    setSearch(event.target.value)
    console.log(search)
  }

  return (
    <div>
      <Finder search={search} handleSearch={handleSearch} />
      <Info countries={countries} search={search} handleSearch={handleSearch} />
    </div>
  );
}
const Finder = (props) => {
  return (
    <div>
      <p>Filter by <input value={props.search} onChange={props.handleSearch}></input></p>
    </div>
  )
}
const Info = (props) => {
  let filtered = props.countries.filter((country) => country.name.toLowerCase().includes(props.search.toLowerCase()))

  if(filtered.length > 10) {
    return (
      <div>
        <p>Too many matches, add a more spesific filter</p>
      </div>
    )
  }

  if(filtered.length === 1) {
    return(
      <div>
        <h1>{filtered[0].name}</h1>
        <p>Capital: {filtered[0].capital}</p>
        <p>Population: {filtered[0].population}</p>
        <p>Languages: </p>
        <ul>
          {filtered[0].languages.map((lang) => <li key={lang.name}>{lang.name}</li> )}
        </ul>
        <img src={filtered[0].flag} alt="Flag" width="150" />
      </div>
    )
  }
  return (
    <div>
    {filtered.map((country) => <p key={country.name}>{country.name} <button onClick={props.handleSearch} value={country.name} >Show</button></p>)}
    </div>
  )
}


export default App;
