const crypto = require("crypto");

module.exports = (secret) => {
  if (!secret || typeof secret !== "string") {
    throw Error("invalid secret!");
  }

  const functions = {
    sign: (value) => {
      // 1. Create HMAC instance
      const hmac = crypto.createHmac("sha256", secret);
      //  2. Update with input value
      hmac.update(value);
      //  3. Return digest in hex
      return hmac.digest("hex");
    },

    validate: (value, hash) => {
      // Recompute the signature
      const signedValue = functions.sign(value);
      // Use timingSafeEqual to prevent timing attacks
      const a = Buffer.from(signedValue);
      const b = Buffer.from(hash);

      // if lengths mismatch, fail fast
      if (a.length !== b.length) return false;

      return crypto.timingSafeEqual(a, b);
    },
  };

  return functions;
};
