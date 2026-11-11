import PropertyCard from "../components/PropertyCard";
import PropertyFilters from "../components/PropertyFilters";
import Pagination from "../components/Pagination";
import { fetchProperties } from "../api/client";
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

    //Pagination variables
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(20);

    const onPageChange = (page) => {
        setCurrentPage(page);
    }

    //Filter variables
    const [clickID, setClickID] = useState(false);

    useEffect(() => {
        async function loadFunction() {
            try {

                setClickID(false);
                setLoadingState(true);
                setErrorState(null);

                //Cleans query so empty filter values aren't sent to API
                const cleanedQuery = Object.fromEntries(
                    Object.entries(query).filter(
                        ([key, value]) => value !== '' && value !== null && value !== undefined
                    )
                );
                cleanedQuery.limit = query.limit;
                cleanedQuery.offset = (currentPage - 1) * itemsPerPage;

                //Gets the properties and sets them with setProperties and setTotal
                const data = await fetchProperties(cleanedQuery);
                if(!data) {
                    throw new Error("No data returned from fetchProperties!");
                }
                setProperties(data.results);
                setTotal(data.total);

            } catch(error) {
                setErrorState("Can't load properties :(", error);
            } finally {
                setLoadingState(false);
            }
        }
        loadFunction();
    }, [clickID, currentPage]);

    if(loadingState) return <div>LOADING...</div>
    if(errorState) return (
        <>
        <PropertyFilters query={query} setQuery={setQuery} setClickID={setClickID} setCurrentPage={setCurrentPage}></PropertyFilters>
        <div>ERROR: {errorState}</div>
        <div>Please enter valid input!</div>
        </>
    )
    
    return(
        
        <>

        {!loadingState && !errorState && properties.length === 0 && (
            <>
            <PropertyFilters query={query} setQuery={setQuery} setClickID={setClickID} setCurrentPage={setCurrentPage}></PropertyFilters>
            <div>Showing {properties.length} of {total} properties</div>
            <div>No properties available! Try searching for something else!</div>
            </>
        )}

        {!loadingState && !errorState && properties.length > 0 && (
            <>

            <PropertyFilters query={query} setQuery={setQuery} setClickID={setClickID} setCurrentPage={setCurrentPage}></PropertyFilters>
            <div>Showing {properties.length} of {total} properties</div>
            <div onClick={() => console.log("Clicked a property")} className="cursor-pointer">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {properties.map((prop) => (
                        <PropertyCard key={prop.id} property={prop} />
                    ))}
                </div>
            </div>

            <Pagination currentPage={currentPage} totalProperties={total} itemsPerPage={itemsPerPage} onPageChange={onPageChange}></Pagination>

            </>
        )} 
    
        </>
        
    )

}


export default ListingsPage;