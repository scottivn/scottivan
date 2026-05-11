// CloudFront Function (viewer-request) — rewrites clean URLs to underlying S3 keys.
// Required because Next.js static export with trailingSlash: true emits files like
// `shop/index.html`, but the URL `/shop/` doesn't match a key when CloudFront uses
// an S3 REST origin via OAC. Without this rewrite the request 404s and falls back
// to the home page via the distribution's custom-error response.

function handler(event) {
  var uri = event.request.uri;

  // Trailing slash → append index.html
  if (uri.endsWith("/")) {
    event.request.uri = uri + "index.html";
    return event.request;
  }

  // No file extension at the leaf → treat as a folder
  var lastSegment = uri.split("/").pop();
  if (lastSegment && lastSegment.indexOf(".") === -1) {
    event.request.uri = uri + "/index.html";
  }

  return event.request;
}
