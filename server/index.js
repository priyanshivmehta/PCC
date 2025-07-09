const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();
app.use(cors());
const PORT = process.env.PORT || 5000;

const FOURSQUARE_API_KEY = process.env.FOURSQUARE_API_KEY;
if (!FOURSQUARE_API_KEY) {
  console.error("Foursquare API key missing!");
}

app.get("/api/places", async (req, res) => {
  try {
    const { ll, query, radius, sort, limit } = req.query;

    const options = {
      method: "GET",
      url: "https://places-api.foursquare.com/places/search",
      headers: {
        accept: "application/json",
        "X-Places-Api-Version": "2025-06-17",
        authorization:
          "Bearer LR2VB2WMOW1MDURMMILSVPCKLO3443QIFYDITXJSPSNX4WGO",
      },
      params: { ll, query, radius, sort, limit },
    };

    const apiResponse = await axios.request(options);
    // console.log(apiResponse.data);
    const results = apiResponse.data.results.map((place) => ({
      name: place.name || "Unnamed",
      distance: place.distance || 0,
      latitude: place.latitude || 0, // default if missing
      longitude: place.longitude || 0, // default if missing
      rating: (Math.random() * 2 + 3).toFixed(1),
      description: place.categories?.[0]?.name || "Healthcare service",
      phone: place.tel || "Not available",
      hours: place.hours_display || "24 hours",
    }));

    // console.log(results, "results");
    res.json({ results });
  } catch (err) {
    console.error("🔴 Foursquare API Error:", err.message);
    res.status(500).json({
      error: err.response?.data?.message || "Something went wrong",
    });
  }
});

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
