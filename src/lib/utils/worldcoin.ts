import {
  ISuccessResult,
  MiniAppVerifyActionPayload,
  VerificationLevel,
  VerifyCommandInput,
} from "@worldcoin/minikit-js";

const worldcoinAppId = process.env.NEXT_PUBLIC_APP_ID as `app_${string}`;
const IncognitoActions = {
  ARGIEFY_CLUB_LOGIN:
    process.env.NEXT_PUBLIC_WORLDCOIN_LOGIN_ACTION_NAME || "argiefy-club-login",
};
const loginDeviceVerifyPayload: VerifyCommandInput = {
  action: IncognitoActions.ARGIEFY_CLUB_LOGIN, // This is your action ID from the Developer Portal
  verification_level: VerificationLevel.Device, // Orb | Device
};

const activeUserId = "221b6a90-e61f-4ffc-b8fd-93ac192eb6bc";

const handleVerifyIdKit = async (proof: ISuccessResult) => {
  const res = await verifyWithServer(
    proof,
    IncognitoActions.ARGIEFY_CLUB_LOGIN
  );
  console.log({ res });
  if (!res.ok) {
    throw new Error("Verification failed."); // IDKit will display the error message to the user in the modal
  }
};

const verifyWithServer = async (proof: ISuccessResult, action: string) => {
  const url = `${process.env.NEXT_PUBLIC_SERVER_BASE_PATH}${process.env.NEXT_PUBLIC_WORLDCOIN_VERIFICATION_PATH}`;
  return await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      payload: proof,
      action,
    }),
  });
};

export {
  handleVerifyIdKit,
  worldcoinAppId,
  IncognitoActions,
  loginDeviceVerifyPayload,
  activeUserId,
  verifyWithServer,
};
