import { useEffect, useRef, useState } from 'react'
import './App.css'
import useFetch from './hooks/useFetch';
import LocationCard from './components/LocationCard';
import ResidentCard from './components/ResidentCard';
import Pagination from './components/Pagination';

function App() {
  
  const [finder, setFinder] = useState(Math.floor(Math.random() * 126 + 1));
  const [location, getLocation, isLoading, hasError] = useFetch();
  const [currentPage, setCurrentPage] = useState(1);
  
  useEffect(() => {
    const url = `https://rickandmortyapi.com/api/location/${finder}`
    getLocation(url);
  }, [finder])

  // console.log(randomLocation);

  const textInput = useRef();

  const handleSubmit = event => {
    event.preventDefault();
    setFinder(textInput.current.value.trim());
  }

  const quantity = 8;
  const second = currentPage * quantity;
  const first = second - quantity;
  const residentsPart = location && location.residents.slice(first, second);
  const totalPages = location && Math.floor(location.residents.length / quantity) + 1;
  
  return (
    <div className='app'>
      {
        isLoading ?
          <div className='app_loading'>
            <img src="https://i.gifer.com/ZiaV.gif" alt="Loading" />
            <h2>Loading...</h2>
          </div>
          :
          <>
            <div className='app_header'>
              <header>
                <img src="https://i.redd.it/o6cwlzg3exk41.png" alt="image-header" />
              </header>
            </div>
            <form 
              onSubmit={handleSubmit}
              className='app_form'
            >
              <input 
              className='app_text'
              type="number" 
              ref={textInput} 
              placeholder='type a number (1 to 126)'
              />
              <button className='app_btn'>Search</button>
            </form>
            {
              hasError || finder === '0' ?
                <div className='non-existent'>
                  <hr />
                  <h2>This location does not exist</h2>
                  <hr />
                </div>
                :
                <>
                <LocationCard 
                  location={location}
                />
                <div className='app_container'>
                {
                  residentsPart.map(resident => (
                    <ResidentCard 
                      key={resident}
                      url={resident}
                    />
                  ))
                }
                </div>
                <Pagination 
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  totalPages={totalPages}
                />
                </>
            }
          </>
      }
    </div>
  )
}

export default App;
