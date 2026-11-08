function PropertyFilters({ query, setQuery, setClickID }) {

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Button clicked");
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
        });
    };

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

                <div className="flex">

                    <div>Beds:</div>
                    <select onInput={
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

                    <div>Baths:</div>
                    <select onInput={
                        (e) => {
                            const v = e.target.value;
                            //If v is 10plus, set baths to 10 else set baths to the number as usual
                            setQuery({...query, baths: v === "10plus" ? 10 : Number(v)})
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
                    className="search-button border"
                    type="button"  
                    onClick={handleSubmit} 
                >   
                    SEARCH
                </button>

                <button
                    className="clear-button border"
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