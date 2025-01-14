// Update the time and date every second
function updateTimeAndDate() {
    const now = new Date();
    const timeElement = document.getElementById('time');
    const dateElement = document.getElementById('date');

    const timeString = now.toLocaleTimeString();
    const dateString = now.toLocaleDateString();

    timeElement.textContent = timeString;
    dateElement.textContent = dateString;
}

setInterval(updateTimeAndDate, 1000);
updateTimeAndDate();

// Fetch and update the user's location with detailed information
async function fetchLocation() {
    const locationElement = document.getElementById('location-info');

    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                
                // Fetch detailed location using a geocoding API
                try {
                    const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=d1d3d61ff8f04212b69b651ed5d7bc93`);
                    const data = await response.json();

                    if (data && data.results && data.results.length > 0) {
                        const locationDetails = data.results[0].formatted;
                        locationElement.textContent = `Location: ${locationDetails}`;
                    } else {
                        locationElement.textContent = `Latitude: ${latitude.toFixed(2)}, Longitude: ${longitude.toFixed(2)}`;
                    }
                } catch (error) {
                    console.error('Error fetching location details:', error);
                    locationElement.textContent = `Latitude: ${latitude.toFixed(2)}, Longitude: ${longitude.toFixed(2)}`;
                }
            },
            (error) => {
                locationElement.textContent = 'Unable to retrieve location.';
                console.error(error);
            }
        );
    } else {
        locationElement.textContent = 'Geolocation is not supported by your browser.';
    }
}
