function PropertyCard({property}) {

    //Since L_Photos is stored as a JSON string in the database, use JSON.parse to convert it into an array
    let firstImage = "";
    try {
        //Checks if there's a valid array and if there is, displays first photo
        const images = JSON.parse(property.L_Photos ?? "[]");
        if(Array.isArray(images) && images.length > 0) {
            firstImage = images[0];
        }
    } catch(error) {
        console.error("Invalid L_Photos JSON: ", error)
    }


    //Returns a single property card displaying property count, price, address, etc.
    return(
        <div className="flex flex-col bg-white overflow-hidden hover:bg-sky-700">
            {firstImage ? (
                <img 
                src={firstImage}
                className="h-48 w-full object-cover"
                />
            ) : (
                <div className="flex items-center justify-center h-48 w-full bg-gray-200">No photo available</div>
            )}

        <div className="flex flex-col p-3">
            <div>Price: ${property.L_SystemPrice}</div>
            <div>{property.L_Address}</div>
            <div>{property.L_City}, {property.L_State}</div>
            <div>{property.L_Keyword2} beds</div>
            <div>{property.LM_Dec_3} baths</div>
            <div>{property.LM_Int2_3} sq ft</div>
        </div>

        </div>
        
    )

}

export default PropertyCard;