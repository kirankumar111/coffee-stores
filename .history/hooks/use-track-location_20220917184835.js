import { useState } from "react"

const useTrackLocation = () => {
    const [locationErrorMsg, setLocationErrorMsg] = useState("");
    const [latLong, setLatLong] = useState("");
    const success = (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        setLatLong(`${latitude} ${longitude}`);
        setLocationErrorMsg('');
    }

    const error = () => {
        setLocationErrorMsg("Unable to retrieve location");
    }

    const handleTrackLocation = () => {
        if (!navigator.geolocation) {
            status.textContent = 'Geolocation is not supported by your browser.';

        } else {
            navigator.geolocation.getCurrentPosition(success, error);
        }
    }

    return {
        latlong,
        handleTrackLocation,
        locationErrorMsg
    }
}