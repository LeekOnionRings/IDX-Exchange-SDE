import './App.css'
import { fetchProperties } from './api/client'

function App() {
  
  const getData = async () => {
    const properties = await fetchProperties({baths: 3, beds: 3});
    console.log("Running getData: ", properties);   
  };

  getData();
  
  return(

    <div>
      App
        <h1 className="text-3xl font-bold underline">
        Hello world!
        </h1>
    </div>
  )

}

export default App
