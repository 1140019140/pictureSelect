
const Url = require('url-parse');

const formatPreviewResource = (uri) => {
  const previewPrefix = new Url('https://static.my01.com/');
  if (!uri.startsWith('http')) {
    if (!uri.startsWith('/')) {
      return `${previewPrefix.origin}/${uri}`;
    }
    return `${previewPrefix.origin}${uri}`;
  }
  const parsed = new Url(uri);
  return `${previewPrefix.origin}${parsed.pathname}`;
};

export default (formatPreviewResource);
