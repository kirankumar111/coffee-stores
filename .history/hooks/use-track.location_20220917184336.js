import { useState } from "react"

const useTrackLocation = () => {
    const [locationErrorMsg, setLocationErrorMsg] = useState("");
    const success = (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
    }

    const error = () => {

    }

    const handleTrackLocation = () => {
        if (!navigator.geolocation) {
            status.textContent = 'Geolocation is not supported by your browser.';

        }
    }
}