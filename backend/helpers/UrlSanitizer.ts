export const sanitizeUrl = (url: string): string => {
  const invalidProtocolRegex = /^(%20|\s)*(javascript|data|vbscript)/im;
  const ctrlCharactersRegex = /[^\x20-\x7EÀ-ž]/gim;
  const urlSchemeRegex = /^([^:]+):/gm;
  const relativeFirstCharacters = [".", "/"];

  function _isRelativeUrlWithoutProtocol(url: string) {
    return relativeFirstCharacters.indexOf(url[0]) > -1;
  }

  const sanitizedUrl = url.replace(ctrlCharactersRegex, "").trim();
  if (_isRelativeUrlWithoutProtocol(sanitizedUrl)) {
    return sanitizedUrl;
  }

  const urlSchemeParseResults = sanitizedUrl.match(urlSchemeRegex);
  if (!urlSchemeParseResults) {
    return sanitizedUrl;
  }

  const urlScheme = urlSchemeParseResults[0];
  if (invalidProtocolRegex.test(urlScheme)) {
    throw new Error("URL failed sanitizing process");
  }

  return sanitizedUrl;
};
