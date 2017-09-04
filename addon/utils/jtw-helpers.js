/**
 * Returns the payload of a JSON Web Token
 *
 * The JWT consists of three parts; header, payload and signature.
 * Each part is base64 encoded and separated with a .
 *
 * @param  {String} token The jwt to decode and get payload from
 * @return {String}       Payload extracted from the token
 */
export function getJWTPayload(token) {
  const payload = token.split('.')[1]
  const tokenData = decodeURIComponent(window.escape(atob(payload)))

  try {
    return JSON.parse(tokenData)
  } catch (e) {
    return tokenData
  }
}
