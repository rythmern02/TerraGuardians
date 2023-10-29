import { useEffect, useRef, useState } from "react";
const LocationPicker = ({ longitude, latitude, setLatitude, setLongitude }) => {
  const mapRef = useRef(null);
  const [activePushpin, setActivePushpin] = useState(null);
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://www.bing.com/api/maps/mapcontrol?callback=initMapScenario";
    script.async = true;
    window.initMapScenario = initMap;
    document.body.appendChild(script);
  }, []);

  const initMap = () => {
    var map = new window.Microsoft.Maps.Map(mapRef.current, {
      credentials:
        "AhLc3CF15lbfWJWGpK4mkqiLaKiIvbhpbmhgHAxbgrCyhqgFYGKGtBTYfgNyYTXB",
      center: new Microsoft.Maps.Location(51.50632, -0.12714),
      mapTypeId: Microsoft.Maps.MapTypeId.aerial,
    });

    Microsoft.Maps.Events.addHandler(map, "click", (e) => {
      const location = e.location;
      map.entities.clear();
      setLatitude(location.latitude);
      setLongitude(location.longitude);
      const pushpin = new Microsoft.Maps.Pushpin(
        new Microsoft.Maps.Location(location.latitude, location.longitude),
        {
          title: "Pollution",
          icon: "/locationPicker.png",
          
        }
      );
      setActivePushpin(pushpin);
      map.entities.push(pushpin);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!latitude || !longitude) {
      alert("Select Location");
    }
    console.log("Latitude:", latitude);
    console.log("Longitude:", longitude);
  };

  return (
    <>
      <div className="p-4">
        <h2>Select Your House Location</h2>
        <div
          ref={mapRef}
          style={{ width: "screen", height: "50vh" }}
          className="lg:max-w-screen-30 self-center"
        ></div>
        <form onSubmit={handleSubmit}>
          <input type="hidden" name="latitude" value={latitude} />
          <input type="hidden" name="longitude" value={longitude} />
          <button type="submit">Save Location</button>
        </form>
      </div>
    </>
  );
};

export default LocationPicker;
