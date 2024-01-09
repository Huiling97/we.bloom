import { useEffect, useRef } from 'react';

//Fix for "ReferenceError: TextDecoder is not defined" error
import { TextEncoder, TextDecoder } from 'text-encoding';
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

const AddressMap = () => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const marker = useRef<mapboxgl.Marker | null>(null);

  const lat = 103.85462;
  const lng = 1.346679;

  useEffect(() => {
    if (map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current!,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [lat, lng],
      zoom: 15,
    });
    map.current.addControl(new mapboxgl.NavigationControl());
    marker.current = new mapboxgl.Marker({ color: '#ea4335' })
      .setLngLat([lat, lng])
      .addTo(map.current);

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
      if (marker.current) {
        marker.current.remove();
        marker.current = null;
      }
    };
  }, []);

  return <div ref={mapContainer} className='map-container' />;
};

export default AddressMap;
