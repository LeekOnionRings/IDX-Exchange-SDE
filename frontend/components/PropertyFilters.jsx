

function PropertyFilters({ query, setQuery, setClickID }) {

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Button clicked");
        setClickID(true);
    };

    //Baths and beds will be changed to dropdown
    return(
        <>

        <div className="flex flex-row">

            <form>
                <input
                    name="city"
                    placeholder="(city) ex: Irvine"
                    onChange={(e) => setQuery({...query, city: e.target.value})}
                />  

                <input
                    name="zipCode"
                    placeholder="(zipcode) ex: 90210"
                    inputMode="numeric"
                    onChange={(e) => setQuery({...query, zipcode: e.target.value})}
                />  

                <input
                    name="minPrice"
                    placeholder="(minPrice) ex: 3750000"
                    inputMode="numeric"
                    onChange={(e) => setQuery({...query, minPrice: e.target.value})}
                />

                <input
                    name="maxPrice"
                    placeholder="(maxPrice) ex: 3750000"
                    inputMode="numeric"
                    onChange={(e) => setQuery({...query, maxPrice: e.target.value})}
                />  

                <input
                    name="beds"
                    placeholder="(beds) ex: 2" 
                    onChange={(e) => setQuery({...query, beds: e.target.value})}
                /> 

                <input
                    name="baths"
                    placeholder="(baths) ex: 3" 
                    onChange={(e) => setQuery({...query, baths: e.target.value})}
                /> 

                <button 
                    className="border"
                    type="button"  
                    onClick={handleSubmit} 
                >   
                    SEARCH
                </button>
            </form>
            
            {/*<label className="search-input-label" htmlFor="search">
                <input
                    className="search-input"
                    type="search"
                    name="search"
                    id="search"
                    placeholder="Search..."
                    required
                />
            </label>*/}

        </div>
        </>
    )

}

export default PropertyFilters