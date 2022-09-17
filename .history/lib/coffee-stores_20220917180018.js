const getUrlForCoffeeStores = (latLong, query, limit) => {
    return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latLong}&open_now=true&limit=${limit}`;
}

export async function fetchCoffeeStores() {
    let latLong = "12.932772688121572,77.60313216982671";
    let limit = 6;
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: process.env.FOURSQUARE_API_KEY || "fsq3nhGmpeNi3gQk65Y0HLlk+XtRLWXef3es0EKghdAp9EQ="
        }
    };
    console.log('options', options);
    const response = await fetch(getUrlForCoffeeStores(latLong, "coffee", limit), options);
    const data = await response.json();
    return data.results
}