import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { iconMap } from './Data/emoji';

function App() {

  let [city, setCity] = useState("");
  let [wDetail, setWdetail] = useState();
  let [isLoading, setIsLoading] = useState(false);

  let getData = (event) => {
    event.preventDefault();
    async function fetchData() {
      setIsLoading(true);
      try {
        let data = await fetch(`https://wttr.in/${city}?format=j1`);
        let response = await data.json();
        console.log(response);
        setWdetail(response);
      }
      catch (error) {
        console.error('Error:', error);
      }
      setIsLoading(false);
    }
    fetchData();
    setCity("");
  }

  let weatherDesc, icon;
  if (wDetail) {
    weatherDesc = wDetail.current_condition[0].weatherDesc[0].value;
    icon = iconMap[weatherDesc] || "";
  }

  return (
    <div className="App w-100 d-flex align-items-center">
      <div className='maxWidth mx-auto'>
        <h1 className='mainHeading'>Simple Weather App</h1>
        <form onSubmit={getData}>
          <input value={city} onChange={(event) => setCity(event.target.value)} placeholder='City Name' className='cityDetail ps-3' />
          <Button className='submitBtn mb-1' disabled={!city} onClick={getData}>Submit</Button>
        </form>

        <div className='secondDiv bg-white shadow-lg mx-auto'>
          <img className={`w-25 ${(isLoading) ? "" : "d-none"}`} src='https://media.tenor.com/WX_LDjYUrMsAAAAi/loading.gif' alt={"buffering image"}></img>
          {(wDetail !== undefined)
            ?
            <div>
              {(isLoading)
                ?
                null
                :
                <div>
                  <h3 className='font-bold'> {wDetail.nearest_area[0].areaName[0].value} <span className='bg-yellow'> {wDetail.nearest_area[0].country[0].value} </span></h3>
                  <h2 className='font-bold'>{wDetail.current_condition[0].temp_C}</h2>
                  <div>{icon}</div>
                  <p>{wDetail.current_condition[0].weatherDesc[0].value}</p>
                </div>
                }
            </div>
            :
            "No Data Found"
          }
        </div>
      </div>
    </div>
  );
}

export default App;
