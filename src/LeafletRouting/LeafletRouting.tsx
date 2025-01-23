import { useEffect } from 'react';
import L from 'leaflet';
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import { useMap } from "react-leaflet";

function LeafletRouting({ start, end }) {
    const map = useMap();

    useEffect(() => {

        if (map._routingControl) {
            map.removeControl(map._routingControl);
        }

        if (start && end) {

            const routingControl = L.Routing.control({
                waypoints: [
                    L.latLng(start.latitude, start.longitude),  // Start point (user's location)
                    L.latLng(end.latitude, end.longitude)       // End point (destination from booking)
                ],
                lineOptions: {
                    styles: [
                      {
                        color: "blue",
                        weight: 4,
                        opacity: 0.7,
                      },
                    ],
                  },
                  routeWhileDragging: true,
                  addWaypoints: false,
                  draggableWaypoints: true,
                  fitSelectedRoutes: true,
                  showAlternatives: true,
            }).addTo(map);

            // Store the routing control in the map's instance
            map._routingControl = routingControl;
        }

        // Cleanup function to remove routing control on component unmount or change
        return () => {
            if (map._routingControl) {
                map.removeControl(map._routingControl);
            }
        };
    }, [start, end, map]);  // Re-run effect when start or end changes

    return null;
}

export default LeafletRouting;