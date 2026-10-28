const BASE_API = "/api";


export async function fetchProperties(params = {}) { //params? api url?
    
    try {

        const query = new URLSearchParams(params).toString();
        const response = await fetch(`${BASE_API}/properties${query ? `?${query}` : ""}`); 
        if(!response.ok) {
            throw new Error("Hey! I couldn't fetch this property/resource! Check for network errors!");
        }
        const data = await response.json();
        return data;

    } catch(error) {
        console.error("Oops! API error in fetchProperties function: ", error);
    }

}


export async function fetchPropertyDetail(ID) {

    try {

        const response = await fetch(`${BASE_API}/properties/${ID}`);
        if(!response.ok) {
            throw new Error("Hey! I couldn't fetch this property detail!");
        }
        const data = await response.json();
        return data;

    } catch(error) {
        console.error("Oops! API error in fetchPropertyDetail function: ", error);
    }

}


export async function fetchOpenHouses(ID) {

    try {

        const response = await fetch(`${BASE_API}/properties/${ID}/openhouses`);
        if(!response.ok) {
            throw new Error("Hey! I couldn't fetch this open house!");
        }
        const data = await response.json();
        return data;

    } catch(error) {
        console.error("Oops! API error in fetchOpenHouses function: ", error);
    }

}
