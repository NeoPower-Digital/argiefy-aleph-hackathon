"use server";

const API_KEY = "";

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

const initializeUserAccount = async (
  userToken: string,
  idempotencyKey: string
) => {
  const url = "https://api.circle.com/v1/w3s/user/initialize";

  const blockchains = [""];

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
  return await returnAwaitedFetch(url, options);
};
