export async function fetchProperties() { //params? api url?
    
    try {
        const response = await fetch('/api/properties/'); //${variablename/userinput}
        if(!response.ok) {
            throw new Error("Hey! I couldn't fetch this property/resource! Check for network errors!");
        }
        const data = await response.json();
        return data;

    } catch(error) {
        console.error("Oops! Error: ", error);
    }

}
