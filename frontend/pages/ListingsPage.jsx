import PropertyCard from "../components/PropertyCard";
import { fetchProperties } from "../src/api/client";
import { useState, useEffect } from "react";


function ListingsPage() {

    const [properties, setProperties] = useState([]);
    const [total, setTotal] = useState(0);
    const params = { limit: 20, offset: 0 };

    useEffect(() => {
        async function load() {
            try {
                const data = await fetchProperties(params);
            if(!data) throw new Error("No data returned");
                setProperties(data.results || data);
                setTotal(data.total ?? data.results?.length?? 0);
            } catch(error) {
                console.error("Can't load properties oops: ", error);
            }
        }
        load();
    }, []);

    
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