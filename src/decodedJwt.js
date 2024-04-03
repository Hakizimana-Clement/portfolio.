function decodedJwt(token) {
  const base64Payload = token.split(".")[1];
  const payloadBuffer = window.atob(base64Payload, "base64");
  return JSON.parse(payloadBuffer.toString());
}
// function decodedJwt(token) {
//   try {
//     const base64Payload = token.split(".")[1];
//     const payloadBuffer = window.atob(base64Payload);
//     const payload = JSON.parse(payloadBuffer);

//     // Check if the payload contains the necessary fields
//     if (!payload || !payload.role) {
//       throw new Error("Token payload is missing required fields.");
//     }

//     return payload;
//   } catch (error) {
//     console.error("Error decoding JWT:", error.message);
//     return null; // or throw error if needed
//   }
// }
