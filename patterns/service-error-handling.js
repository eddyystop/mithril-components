/*
 There is an interaction in m.request(...) between extract and unwrapError.
 The web-server may send an error response, e.g. 404 Cannot GET ...,
 or the app may send error info within the JSON response, e.g. 403 {error:"..."}.

 This can be handled without hard-coding individual HTTP status codes with something like:
 */

m.request({ method: "GET", url: "...",

  extract: function coerceToJson(xhr) {
    var isJson = "\"[{".indexOf(xhr.responseText.charAt(0)) !== -1; // fragile but fast
    return isJson ? xhr.responseText : JSON.stringify(xhr.responseText);
  },

  unwrapSuccess: function (response) { return response.data; },

  unwrapError: function (response) {
    return typeof response === "object" && "error" in response ? response.error : response;
  }
});