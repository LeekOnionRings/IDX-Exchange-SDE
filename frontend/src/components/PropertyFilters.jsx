//query, setQuery, setClickID, setCurrentPage
function PropertyFilters({ query, setQuery, setSearchTrigger, setCurrentPage }) {

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Button clicked");
        setCurrentPage(1);
        //setClickID(true);
        setSearchTrigger((prev) => prev + 1);
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
        //setClickID(true);
        setSearchTrigger((prev) => prev + 1);
    };

    return(
        <>

        <div className="flex-1 items-center border text-black font-bold bg-rose-300">

            <form>

                <div className="">
                    <label className="mr-2" htmlFor="city-filter">City</label>
                    <input
                        className="mr-2 ml-21 bg-gray-200 border"
                        id="city-filter"
                        name="city"
                        placeholder=" ex: Irvine"
                        onChange={(e) => setQuery({...query, city: e.target.value})}
                    />  

                    <label className="mr-2 ml-28" htmlFor="zipcode-filter">Zipcode</label>
                    <input
                        className="mr-2 ml-18 bg-gray-200 border"
                        id="zipcode-filter"
                        name="zipCode"
                        placeholder=" ex: 90210"
                        inputMode="numeric"
                        onChange={(e) => setQuery({...query, zipcode: e.target.value})}
                    />  
                </div>
                

                <div className="">
                    <label className="mr-2" htmlFor="minPrice-filter">Minimum Price </label>
                    <input
                        className="mr-2 bg-gray-200 border"
                        id="minPrice-filter"
                        name="minPrice"
                        placeholder=" ex: 3750000"
                        inputMode="numeric"
                        onChange={(e) => setQuery({...query, minPrice: e.target.value})}
                    />

                    <label className="mr-2 ml-28" htmlFor="maxPrice-filter">Maximum Price </label>
                    <input
                        className="mr-2 ml-3 bg-gray-200 border"
                        id="maxPrice-filter"
                        name="maxPrice"
                        placeholder=" ex: 3750000"
                        inputMode="numeric"
                        onChange={(e) => setQuery({...query, maxPrice: e.target.value})}
                    />  
                </div>


                <div className="mr-5 justify-center">
                    <label className="mr-2" htmlFor="beds-filter">Beds</label>
                    <select    
                        className="mr-2 bg-gray-200 border"
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

                    <label className="mr-2" htmlFor="baths-filter">Baths</label>
                    <select 
                        className="mr-2 bg-gray-200 border"
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


                <div className="flex justify-around mb-2 mt-2">
                    <button 
                        className="search-button border-2 bg-gray-200 hover:bg-sky-600"
                        type="button"  
                        onClick={handleSubmit} 
                    >   
                        SEARCH
                    </button>

                    <button
                        className="clear-button border-2 bg-gray-200 hover:bg-sky-600"
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