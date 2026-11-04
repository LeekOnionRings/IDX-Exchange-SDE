import PropertyCard from "../components/PropertyCard";
import PropertyFilters from "../components/PropertyFilters";
import { fetchProperties } from "../src/api/client";
import { useState, useEffect } from "react";


function ListingsPage() {

    const [properties, setProperties] = useState([]);
    const [total, setTotal] = useState(0);
    const [loadingState, setLoadingState] = useState(true);
    const [errorState, setErrorState] = useState(null);

    const [query, setQuery] = useState({
        city: '',
        zipcode: '',
        minPrice: '',
        maxPrice: '',
        beds: '',
        baths: '',
        limit: 20,
        offset: 0
    });
    //const params = { limit: 20, offset: 0 };

    const [clickID, setClickID] = useState(false);

    useEffect(() => {
        async function loadFunction() {
            try {

                setClickID(false);

                setLoadingState(true);
                setErrorState(null);
                    //Gets the properties and sets them with setProperties and setTotal
                const data = await fetchProperties(query);
                if(!data) {
                    throw new Error("No data returned from fetchProperties!");
                }
                setProperties(data.results);
                setTotal(data.total);
            } catch(error) {
                setErrorState("Can't load properties oops: ", error);
            } finally {
                setLoadingState(false);
            }
        }
        loadFunction();
    }, [clickID]);

    if(loadingState) return <div>LOADING...</div>
    if(errorState) return <div>ERROR: {errorState}</div>

    
    return(
        
        <>

        {!loadingState && !errorState && (
            <PropertyFilters query={query} setQuery={setQuery} setClickID={setClickID}></PropertyFilters>
        )}

        {!loadingState && !errorState && (
            <div>Showing {properties.length} of {total} properties</div>
        )}
        
        {!loadingState && !errorState && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {properties.map((prop) => (
                    <PropertyCard key={prop.id} property={prop} />
                ))}
            </div>
        )}
        </>
        
    )

}


export default ListingsPage;