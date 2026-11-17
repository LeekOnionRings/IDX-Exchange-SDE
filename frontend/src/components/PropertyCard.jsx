function PropertyCard({property}) {

    const placeholderImage = "https://www.nist.gov/sites/default/files/images/2025/05/09/No%20Photo%20Available.png";
    const onImageError = (e) => {
        e.target.src = placeholderImage;
    }

    //Since L_Photos is stored as a JSON string in the database, use JSON.parse to convert it into an array
    let firstImage = "";
    try {
        //Checks if there's a valid array and if there is, displays first photo (returns [] if property.L_Photos is null/undefined)
        const images = JSON.parse(property.L_Photos ?? "[]");
        console.log(images);
        if(Array.isArray(images) && images.length > 0) {

            const tempFirst = images[0];

            //Makes sure broken files with DOCUMENT-Pdf in their links do not display
            if(typeof tempFirst === "string" && tempFirst.includes("DOCUMENT-Pdf")) {
                tempFirst = "[]";
            }

            firstImage = tempFirst;

        }
    } catch(error) {
        console.error("Invalid L_Photos JSON: ", error)
    }


    //Returns a single property card displaying property count, price, address, etc.
    return(
        
        <div className="flex flex-col bg-white overflow-hidden hover:bg-sky-700">
            <img 
                src={firstImage ? firstImage : placeholderImage}
                className="h-48 w-full object-cover"
                onError={onImageError}
            />

        <div className="flex flex-col p-3">
            <div>Price: ${property.L_SystemPrice}</div>
            <div>{property.L_Address}</div>
            <div>{property.L_City}, {property.L_State}, {property.L_Zip}</div>
            <div>{property.L_Keyword2} beds</div>
            <div>{parseInt(property.LM_Dec_3)} baths</div>
            <div>{property.LM_Int2_3} sq ft</div>
        </div>

        </div>
        
    )

}

export default PropertyCard;