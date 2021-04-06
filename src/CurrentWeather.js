import React, { useState, useEffect }from 'react'

export default function CurrentWeather() {
    const [lat, setLat] = useState(null)
    const [lng, setLng] = useState(null)
    const [status, setStatus] = useState(null)

    const getLocation = () => {
        if (!navigator.geolocation) {
            setStatus('Geolocation is not supported by your browser')
        } else {
            setStatus('Locating...')
            navigator.geolocation.getCurrentPosition((position) => {
                setStatus('Position loaded');
                setLat(position.coords.latitude)
                setLng(position.coords.longitude);
            }, () => {
                setStatus('Unables to retrieve your location');
            });
        }
    }

    useEffect(() => {
        getLocation()
    }, [])

    return (
        <div >
            
            <h1>Current Weather In LOCATION</h1>
            {status}
            {lat && <p>Latitude: {lat}</p>}
            {lng && <p>Longitude: {lng}</p>}
        </div>
    )
}
