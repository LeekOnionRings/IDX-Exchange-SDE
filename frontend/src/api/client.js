const BASE_API = "/api";


export async function fetchProperties(params = {}) { //params? api url?
    
    try {

        const query = new URLSearchParams(params).toString();
        const response = await fetch(`${BASE_API}/properties${query ? `?${query}` : ""}`); 
        if(!response.ok) {
            throw new Error(`Hey! We couldn't fetch this property: ${response.status}`);
        }
        const data = await response.json();
        return data;

    } catch(error) {
        console.error("Oops! API error in fetchProperties: ", error);
        throw error;
    }

}


export async function fetchPropertyDetail(ID) {

    try {

        const response = await fetch(`${BASE_API}/properties/${ID}`);
        if(!response.ok) {
            throw new Error(`Hey! We couldn't fetch this property detail: ${response.status}`);
        }
        const data = await response.json();
        return data;

    } catch(error) {
        console.error("Oops! API error in fetchPropertyDetail: ", error);
        throw error;
    }

}


export async function fetchOpenHouses(ID) {

    try {

        const response = await fetch(`${BASE_API}/properties/${ID}/openhouses`);
        if(!response.ok) {
            throw new Error(`Hey! We couldn't fetch this open house: ${response.status}`);
        }
        const data = await response.json();
        return data;

    } catch(error) {
        console.error("Oops! API error in fetchOpenHouses: ", error);
        throw error;
    }

}
