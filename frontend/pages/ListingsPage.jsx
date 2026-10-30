import PropertyCard from "../components/PropertyCard";
import { fetchProperties } from "../src/api/client";
import { useState, useEffect } from "react";


function ListingsPage() {

    const [properties, setProperties] = useState([]);
    const [total, setTotal] = useState(0);
    const [loadingState, setLoadingState] = useState(true);
    const [errorState, setErrorState] = useState(null);

    const params = { limit: 20, offset: 0 };

    useEffect(() => {
        async function loadFunction() {
            try {
                setLoadingState(true);
                setErrorState(null);
                const data = await fetchProperties(params);
                if(!data) {
                    throw new Error("No data returned from fetchProperties!");
                }
                setProperties(data.results);
                setTotal(data.total);
            } catch(error) {
                console.error("Can't load properties oops: ", error);
            } finally {
                setLoadingState(false);
            }
        }
        loadFunction();
    }, []);

    if(loadingState) return <div>LOADING...</div>
    if(errorState) return <div>ERROR: {errorState}</div>

    
    return(
        
        <div>Showing {properties.length} of {total} properties
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {properties.map((prop) => (
                <PropertyCard key={prop.id} property={prop} />
            ))}
        </div>

        </div>
        
    )

}


export default ListingsPage;