import {
  ISuccessResult,
  MiniAppVerifyActionPayload,
} from '@worldcoin/minikit-js';

const handleMiniKitSubscription = async (
  response: MiniAppVerifyActionPayload
) => {
  if (response.status === 'error') {
    throw new Error(`Verification failed: ${JSON.stringify(response)}`);
  }

  // Verify the proof in the backend
  const verifyResponse = await verifyWithServer(response);

  // TODO: Handle Success!
  const verifyResponseJson = await verifyResponse.json();
  if (verifyResponseJson.status === 200) {
    console.log('Verification success!', verifyResponseJson);
  }
};

const handleVerifyIdKit = async (proof: ISuccessResult) => {
  const res = await verifyWithServer(proof);
  if (!res.ok) {
    throw new Error('Verification failed.'); // IDKit will display the error message to the user in the modal
  }
};

const verifyWithServer = async (proof: ISuccessResult, action?: string) => {
  const url = `${process.env.NEXT_PUBLIC_SERVER_URL}${process.env.NEXT_PUBLIC_SERVER_BASE_PATH}${process.env.NEXT_PUBLIC_WORLDCOIN_VERIFICATION_PATH}`;
  return await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      payload: proof,
      action,
    }),
  });
};

export { handleMiniKitSubscription, handleVerifyIdKit };
