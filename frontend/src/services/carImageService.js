

/**
 * Service to construct and fetch car images from carimagesapi.com
 */

export const CAR_IMAGES_API_CONFIG = {
  baseUrl: import.meta.env.VITE_CAR_IMAGES_BASE_URL || "https://carimagesapi.com",
  endpoint: import.meta.env.VITE_CAR_IMAGES_ENDPOINT || "/api/v1/signed-urls",
  apiKey: import.meta.env.VITE_CAR_IMAGES_API_KEY || "",
};

/**
 * Builds the API endpoint URL for carimagesapi.com
 */
export function buildCarImageUrl({ brand, model, vehicle_age }, customConfig = {}) {
  const config = { ...CAR_IMAGES_API_CONFIG, ...customConfig };
  const currentYear = new Date().getFullYear();
  const year = vehicle_age !== undefined ? Math.max(1990, currentYear - Number(vehicle_age)) : currentYear - 3;
  
  const params = new URLSearchParams();
  if (config.apiKey) {
    params.append("api_key", config.apiKey);
  }
  
  return `${config.baseUrl}${config.endpoint}?${params.toString()}`;
}

/**
 * Fetches the car image from carimagesapi.com using the official signed-urls API.
 * Always retrieves real vehicle images directly from the API.
 */
export async function fetchCarImage(carData, customConfig = {}) {
  const config = { ...CAR_IMAGES_API_CONFIG, ...customConfig };
  const currentYear = new Date().getFullYear();
  const year = carData.vehicle_age !== undefined 
    ? Math.max(1990, currentYear - Number(carData.vehicle_age)) 
    : currentYear - 3;
  const brand = carData.brand || "Maruti";
  const model = carData.model || "Swift";

  if (!config.apiKey) {
    console.warn("[CarImagesAPI] No VITE_CAR_IMAGES_API_KEY configured in .env");
    return {
      url: null,
      urls: [],
      year,
      status: 'no_key',
      brand,
      model
    };
  }

  const apiUrl = `${config.baseUrl}${config.endpoint}?api_key=${encodeURIComponent(config.apiKey)}`;
  console.log("🔗 [CarImagesAPI] Requesting signed URL from API for:", { brand, model, year });

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        images: [{
          make: brand,
          model: model,
          year: String(year)
        }]
      })
    });

    if (!response.ok) {
      console.warn(`[CarImagesAPI] API responded with error status: ${response.status}`);
      return {
        url: null,
        urls: [],
        year,
        status: 'error',
        brand,
        model,
        error: `API returned status ${response.status}`
      };
    }

    const data = await response.json();
    if (data.urls && data.urls.length > 0 && data.urls[0]) {
      return {
        url: data.urls[0],
        urls: data.urls,
        year,
        status: 'success',
        brand,
        model,
        signedUrl: data.urls[0]
      };
    }

    return {
      url: null,
      urls: [],
      year,
      status: 'not_found',
      brand,
      model
    };

  } catch (err) {
    console.error("[CarImagesAPI] Fetch failed:", err.message);
    return {
      url: null,
      urls: [],
      year,
      status: 'error',
      brand,
      model,
      error: err.message
    };
  }
}

