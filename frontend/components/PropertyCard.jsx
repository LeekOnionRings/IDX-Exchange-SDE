import { fetchProperties } from "../src/api/client";

/*const getData = async () => {
        const properties = await fetchProperties('');
        //console.log("Running getData: ", properties);
       const propertiesResults = properties.results;   
       return propertiesResults;
    };
getData();*/

const properties = await fetchProperties('');
const propertiesResults = properties.results;   

function PropertyCard( {property} ) {

    return(
        <div className="flex w-100 h-100 bg-red-200">
            {propertiesResults.map((info) => {
                return <h1>{info.L_ListingID}</h1>
            })}
        </div>
    )

}

export default PropertyCard;