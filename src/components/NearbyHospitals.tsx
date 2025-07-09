import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import {
  MapPin,
  Navigation,
  List,
  Map,
  Star,
  Phone,
  Clock,
  Heart,
  Baby,
  Stethoscope,
  Building2,
  Search,
  Loader2,
} from "lucide-react";

// Fix Leaflet marker icon issue
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Type definitions
interface Place {
  name: string;
  rating: number;
  description: string;
  distance: number;
  phone?: string;
  hours?: string;
  latitude: number;
  longitude: number;
}

interface UserLocation {
  lat: number;
  lng: number;
}

interface ApiResponse {
  results: Place[];
}

type ViewType = "list" | "map";
type QueryType = "hospital" | "women clinic" | "child clinic" | "maternity";

const NearbyHospitals: React.FC = () => {
  const [places, setPlaces] = useState<Place[]>([]);
  const [view, setView] = useState<ViewType>("list");
  const [query, setQuery] = useState<QueryType>("hospital");
  const [loading, setLoading] = useState<boolean>(false);
  const [userLocation, setUserLocation] = useState<UserLocation>({
    lat: 25.5935,
    lng: 85.1589,
  });

  // Get user location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos: GeolocationPosition) => {
        setUserLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      (err: GeolocationPositionError) => {
        console.warn("Geolocation not allowed, using default location.", err);
      }
    );
  }, []);

  // Fetch places from backend
  useEffect(() => {
    const fetchPlaces = async (): Promise<void> => {
      setLoading(true);
      try {
        const response = await axios.get<ApiResponse>(
          "http://localhost:5000/api/places",
          {
            params: {
              ll: `${userLocation.lat},${userLocation.lng}`,
              query,
              radius: 10000,
              sort: "DISTANCE",
              limit: 30,
            },
          }
        );
        console.log(response.data);
        setPlaces(response.data.results);
        setLoading(false);
      } catch (err) {
        console.error("❌ Error fetching places:", err);
        setLoading(false);
      }
    };

    if (userLocation.lat && userLocation.lng) {
      fetchPlaces();
    }
  }, [query, userLocation]);

  const getIcon = (type: QueryType): JSX.Element => {
    switch (type) {
      case "hospital":
        return <Building2 className="w-5 h-5 text-blue-600" />;
      case "women clinic":
        return <Heart className="w-5 h-5 text-pink-600" />;
      case "child clinic":
        return <Baby className="w-5 h-5 text-green-600" />;
      case "maternity":
        return <Heart className="w-5 h-5 text-purple-600" />;
      default:
        return <Stethoscope className="w-5 h-5 text-blue-600" />;
    }
  };

  const renderStars = (rating: number): JSX.Element[] => {
    const stars: JSX.Element[] = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Star
          key="half"
          className="w-4 h-4 fill-yellow-400 text-yellow-400 opacity-50"
        />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />);
    }

    return stars;
  };

  const handleViewToggle = (): void => {
    setView(view === "list" ? "map" : "list");
  };

  const handleQueryChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setQuery(e.target.value as QueryType);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-100 rounded-xl">
                <MapPin className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">
                  Nearby Healthcare
                </h1>
                <p className="text-gray-600">
                  Find the best medical facilities near you
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              <div className="relative">
                <select
                  className="appearance-none bg-white border-2 border-gray-200 rounded-xl px-4 py-3 pr-10 focus:border-blue-500 focus:outline-none transition-colors min-w-[200px]"
                  value={query}
                  onChange={handleQueryChange}
                >
                  <option value="hospital">🏥 Hospital</option>
                  <option value="women clinic">👩‍⚕️ Women Clinic</option>
                  <option value="child clinic">👶 Child Clinic</option>
                  <option value="maternity">🤱 Maternity</option>
                </select>
                <Search className="absolute right-3 top-3.5 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>

              <button
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2"
                onClick={handleViewToggle}
              >
                {view === "list" ? (
                  <>
                    <Map className="w-5 h-5" />
                    Map View
                  </>
                ) : (
                  <>
                    <List className="w-5 h-5" />
                    List View
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="flex items-center gap-3 text-blue-600">
              <Loader2 className="w-8 h-8 animate-spin" />
              <span className="text-lg font-semibold">
                Finding nearby hospitals...
              </span>
            </div>
          </div>
        ) : (
          <>
            {view === "list" ? (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {places.map((place: Place, i: number) => (
                  <div
                    key={i}
                    className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
                  >
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          {getIcon(query)}
                          <div>
                            <h2 className="font-bold text-xl text-gray-800 group-hover:text-blue-600 transition-colors">
                              {place.name}
                            </h2>
                            <div className="flex items-center gap-1 mt-1">
                              {renderStars(place.rating)}
                              <span className="text-sm text-gray-600 ml-1">
                                ({place.rating})
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {place.description}
                      </p>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Navigation className="w-4 h-4" />
                          <span>
                            {(place.distance / 1000).toFixed(2)} km away
                          </span>
                        </div>
                        {place.phone && (
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Phone className="w-4 h-4" />
                            <span>{place.phone}</span>
                          </div>
                        )}
                        {place.hours && (
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Clock className="w-4 h-4" />
                            <span>{place.hours}</span>
                          </div>
                        )}
                      </div>

                      <a
                        href={`https://www.google.com/maps/dir/?api=1&destination=${place.latitude},${place.longitude}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-4 py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-indigo-600 transition-all duration-200 flex items-center justify-center gap-2 group"
                      >
                        <Navigation className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        Get Directions
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="h-[600px] w-full">
                  <MapContainer
                    center={[userLocation.lat, userLocation.lng]}
                    zoom={13}
                    style={{ height: "100%", width: "100%" }}
                    className="rounded-2xl"
                  >
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <Marker position={[userLocation.lat, userLocation.lng]}>
                      <Popup>
                        <div className="text-center">
                          <MapPin className="w-5 h-5 mx-auto mb-2 text-blue-600" />
                          <strong>Your Location</strong>
                        </div>
                      </Popup>
                    </Marker>
                    {places.map((place: Place, i: number) => (
                      <Marker
                        key={i}
                        position={[place.latitude, place.longitude]}
                      >
                        <Popup>
                          <div className="min-w-[200px]">
                            <div className="flex items-center gap-2 mb-2">
                              {getIcon(query)}
                              <strong className="text-lg">{place.name}</strong>
                            </div>
                            <div className="flex items-center gap-1 mb-2">
                              {renderStars(place.rating)}
                              <span className="text-sm text-gray-600 ml-1">
                                ({place.rating})
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 mb-3">
                              {place.description}
                            </p>
                            <div className="space-y-1 text-xs text-gray-500 mb-3">
                              <div className="flex items-center gap-1">
                                <Navigation className="w-3 h-3" />
                                {(place.distance / 1000).toFixed(2)} km away
                              </div>
                              {place.phone && (
                                <div className="flex items-center gap-1">
                                  <Phone className="w-3 h-3" />
                                  {place.phone}
                                </div>
                              )}
                            </div>
                            <a
                              href={`https://www.google.com/maps/dir/?api=1&destination=${place.latitude},${place.longitude}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 bg-blue-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-blue-700 transition-colors"
                            >
                              <Navigation className="w-3 h-3" />
                              Get Directions
                            </a>
                          </div>
                        </Popup>
                      </Marker>
                    ))}
                  </MapContainer>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default NearbyHospitals;
