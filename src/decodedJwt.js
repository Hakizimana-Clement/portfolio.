function decodedJwt(token) {
  const base64Payload = token.split(".")[1];
  const payloadBuffer = window.atob(base64Payload, "base64");
  return JSON.parse(payloadBuffer.toString());
}
