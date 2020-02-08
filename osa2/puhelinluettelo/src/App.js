import React, { useState, useEffect } from 'react'
import personService from './services/persons'
import './index.css'

const App = () => {

  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNmbr, setNewNmbr ] = useState('')
  const [ newSearch, setNewSearch ] = useState('')
  const [ error, setError] = useState('')
  const [ success, setSuccess] = useState('')

  useEffect(() => {
      personService
        .getAll()
        .then(startPersons => setPersons(startPersons))
    },[])

  const addPerson = (event) => {
    event.preventDefault()
      let val = persons.find(person => person.name.toLowerCase() === newName.toLowerCase())
      const personObj = { name: newName, number: newNmbr}
      if(val != null) {
          if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
              personService
                .update(val.id, personObj)
                .then(response => {
                    setPersons(persons.map(person => person.id !== val.id ? person : response))
                    setNewName('')
                    setNewNmbr('')
                    setSuccess(
                        `${personObj.name}'s number changed.`
                    )
                    setTimeout(() => {
                        setSuccess('')
                    },4000)
                })
                .catch(error => {
                    setError(
                        `${personObj.name}'s information already removed.`
                    )
                    setTimeout(() => {
                        setError('')
                    }, 4000)
                })
          }
      } else {
        personService
            .create(personObj)
            .then(response => {
                setPersons(persons.concat(response))
                setNewName('')
                setNewNmbr('')
                setSuccess(
                    `${personObj.name} added.`
                )
                setTimeout(() => {
                    setSuccess('')
                },4000)
            }).catch(error =>{
                setError('Varmistathan että annettu nimi on yli 2 merkkiä pitkä, ja että numero on yli 7 merkkiä pitkä')
                setTimeout(() => {
                    setError('')
                }, 4000)
            })
      }
  }
  const deletePerson = (event) => {
      event.preventDefault()
      const pers = persons.find(person => person.name === event.target.value)

      if(window.confirm(`Delete ${pers.name} ?`)) {
          personService
            .remove(pers.id)
            .then(response => {
                setPersons(persons.filter(person => person.id !== pers.id))
                setSuccess(
                    `${pers.name} deleted.`
                )
                setTimeout(() => {
                    setSuccess('')
                },4000)
            })

      }
  }
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNmbrChange = (event) => {
      setNewNmbr(event.target.value)
  }
  const handleSearch = (event) => {
      setNewSearch(event.target.value)
  }
  const ErrorMsg = ({message}) => {
      if(message === '') {
          return null
      }
      return (
          <div className="error">
              {message}
          </div>
      )
  }
  const SuccessMsg = ({message}) => {
    if(message === '') {
        return null
    }
    return (
        <div className="success">
            {message}
        </div>
    )
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <ErrorMsg message={error} />
      <SuccessMsg message={success} />
      <Filter newSearch={newSearch} handleSearch={handleSearch} />
      <p>Add a new number:</p>
      <Form addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} 
      newNmbr={newNmbr} handleNmbrChange={handleNmbrChange} />
      <h2>Numbers</h2>
      <Numbers persons={persons} newSearch={newSearch} deletePerson={deletePerson} />
    </div>
  )
}
const Filter = (props) => {
    return (
        <div>
        <p> Filter phonebook: <input value={props.newSearch} onChange={props.handleSearch}/> </p>
        </div>
    )
}
const Form = (props) => {
    return (
        <div>
            <form onSubmit={props.addPerson}>
                <div>
                name: <input value={props.newName} onChange={props.handleNameChange} />
                </div>
                <div>
                number: <input value={props.newNmbr} onChange={props.handleNmbrChange} />
                </div>
                <div>
                <button type="submit">add</button>
                </div>
            </form>
        </div>
    )
}
const Numbers = (props) => {
    let list = props.persons.filter((person) => person.name.toLowerCase().includes(props.newSearch.toLowerCase()))

    return (
        list.map((person) => <Number key={person.name} person={person} deletePerson={props.deletePerson}/>)
    )
}
const Number = (props) => {
    return (
        <div>
            <p> {props.person.name} , {props.person.number} <button value={props.person.name} onClick={props.deletePerson}>Delete</button></p>
        </div>
    )
}
export default App