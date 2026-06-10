"use server";

import { createHash } from "crypto";

export async function verifySecretAction(clientHash: string) {
  const secretKey = process.env.SECRET_KEY;

  if (!secretKey) {
    console.error("SECRET_KEY environment variable is not set.");
    return false;
  }

  const serverHash = createHash("sha256").update(secretKey).digest("hex");

  return clientHash === serverHash;
}
