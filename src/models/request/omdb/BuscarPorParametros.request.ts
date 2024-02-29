interface BuscarRequest {
  t?: string;
  i?: string;
  s?: string; // Movie title to search for (Required).
  type?: "movie" | "series" | "episode"; // Type of result to return (Optional).
  y?: string; // Year of release (Optional).
  r?: "json" | "xml"; // Data type to return (Optional).
  page?: number; // Page number to return (Optional, range 1-100).
  callback?: string; // JSONP callback name (Optional).
  v?: number; // API version (Optional, reserved for future use).
  apikey?: string;
  plot?: string;
}

export default BuscarRequest;