function PropertyFilters({ query, setQuery} ) {

    //Baths and beds will be changed to dropdown
    return(
        <>

        <div className="flex flex-row">

            <form>
            <input
                name="zipCode"
                placeholder="(zipcode) ex: 90210"
                onChange={(e) => setQuery({...query, zipCode: e.target.value})}
            />  

            <input
                name="beds"
                placeholder="(beds) ex: 2" 
                onChange={(e) => setQuery({...query, beds: e.target.value})}
            /> 

            <button 
                className="border"
                type="button"    
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