function PropertyFilters({ query, setQuery, setClickID, setCurrentPage }) {

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Button clicked");
        setCurrentPage(1);
        setClickID(true);
    };

    const handleClear = () => {
        setQuery({...query,
            city: '',
            zipcode: '',
            minPrice: '',
            maxPrice: '',
            beds: '',
            baths: '',
            offset: 0
        });
        setCurrentPage(1);
        setClickID(true);
    };

    return(
        <>

        <div className="flex flex-row">

            <form>
                <label htmlFor="city-filter">City</label>
                <input
                    id="city-filter"
                    name="city"
                    placeholder=" ex: Irvine"
                    onChange={(e) => setQuery({...query, city: e.target.value})}
                />  

                <label htmlFor="zipcode-filter">Zipcode</label>
                <input
                    id="zipcode-filter"
                    name="zipCode"
                    placeholder=" ex: 90210"
                    inputMode="numeric"
                    onChange={(e) => setQuery({...query, zipcode: e.target.value})}
                />  

                
                    <label htmlFor="minPrice-filter">Minimum Price </label>
                    <input
                        id="minPrice-filter"
                        name="minPrice"
                        placeholder=" ex: 3750000"
                        inputMode="numeric"
                        onChange={(e) => setQuery({...query, minPrice: e.target.value})}
                    />

                    <div>
                    <label htmlFor="maxPrice-filter">Maximum Price </label>
                    <input
                        id="maxPrice-filter"
                        name="maxPrice"
                        placeholder=" ex: 3750000"
                        inputMode="numeric"
                        onChange={(e) => setQuery({...query, maxPrice: e.target.value})}
                    />  
                    </div>

                <div className="">

                    <label htmlFor="beds-filter">Beds</label>
                    <select    
                        id="beds-filter"
                        onChange={
                        (e) => {
                            const v = e.target.value;
                            //If v is 10plus, set beds to 10 else set beds to the number as usual
                            setQuery({...query, beds: v === "10plus" ? 10 : Number(v)})
                        }
                    }>
                        <option value={''}></option>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                        <option value={6}>6</option>
                        <option value={7}>7</option>
                        <option value={8}>8</option>
                        <option value={9}>9</option>
                        <option value={"10plus"}>10+</option>
                    </select>

                    <label htmlFor="baths-filter">Baths</label>
                    <select 
                        id="baths-filter"
                        onChange={
                        (e) => {
                            const v = e.target.value;
                            //If v is 10plus, set baths to 10 else set baths to the number as usual
                            setQuery({...query, baths: v === "10plus" ? 10 : Number(v)});
                        }
                    }>
                        <option value={''}></option>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                        <option value={6}>6</option>
                        <option value={7}>7</option>
                        <option value={8}>8</option>
                        <option value={9}>9</option>
                        <option value={"10plus"}>10+</option>
                    </select>

                </div>

                <div className="flex justify-around">
                <button 
                    className="search-button border hover:bg-sky-500"
                    type="button"  
                    onClick={handleSubmit} 
                >   
                    SEARCH
                </button>

                <button
                    className="clear-button border hover:bg-sky-500"
                    type="button"
                    onClick={handleClear}
                >
                    CLEAR
                </button>
                </div>

            </form>

        </div>
        </>
    )

}

export default PropertyFilters;