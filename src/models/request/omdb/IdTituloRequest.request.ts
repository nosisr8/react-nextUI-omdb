interface IdTituloRequest {
  i?: string; // A valid IMDb ID (Optional, but either i or t must be present).
  t?: string; // Movie title to search for (Optional, but either i or t must be present).
  type?: "movie" | "series" | "episode"; // Type of result to return (Optional).
  y?: string; // Year of release (Optional).
  plot?: "short" | "full"; // Return short or full plot (Optional).
  r?: "json" | "xml"; // Data type to return (Optional).
  callback?: string; // JSONP callback name (Optional).
  v?: number; // API version (Optional, reserved for future use).
}

export default IdTituloRequest;