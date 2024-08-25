"use server";

import { v4 as uuidv4 } from "uuid";

const API_KEY =
  "TEST_API_KEY:b68a4a73befd1d342ed61c65e9d8f5c1:372a47fdfb1e5e91e7f0ed54bf6b32a8";

const options = (userId: string) => ({
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
  body: JSON.stringify({ userId }),
});
const createNewUser = async (userId: string) => {
  const url = "https://api.circle.com/v1/w3s/users";

  return await returnAwaitedFetch(url, options(userId));
};

const getSessionToken = async (userId: string) => {
  const url = "https://api.circle.com/v1/w3s/users/token";

  return await returnAwaitedFetch(url, options(userId));
};

const initializeUserAccount = async (userToken: string) => {
  const url = "https://api.circle.com/v1/w3s/user/initialize";

  const blockchains = ["ETH-SEPOLIA"];
  const idempotencyKey = uuidv4();

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
      "X-User-Token": userToken,
    },
    body: JSON.stringify({
      idempotencyKey,
      blockchains,
    }),
  };

  return await returnAwaitedFetch(url, options);
};

const checkWalletStatus = async (userId: string) => {
  const url = `https://api.circle.com/v1/w3s/wallets?userId=${userId}`;
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
  };

  return await returnAwaitedFetch(url, options);
};

const getWalletBalance = async (walletId: string) => {
  const url = `https://api.circle.com/v1/w3s/wallets/${walletId}/balances`;
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
  };

  return await returnAwaitedFetch(url, options);
};

const returnAwaitedFetch = async (url: string, options: RequestInit) => {
  try {
    const response = await fetch(url, options);
    const jsonResponse = await response.json();

    console.log(jsonResponse);
    return jsonResponse;
  } catch (error) {
    console.error(error);
  }
};

export {
  createNewUser,
  getSessionToken,
  initializeUserAccount,
  checkWalletStatus,
  getWalletBalance,
};
