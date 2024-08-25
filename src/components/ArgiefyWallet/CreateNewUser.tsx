import {
  createNewUser,
  getSessionToken,
  initializeUserAccount,
} from "@/lib/actions/programmableWallet";
import { Button } from "../ui/button";
import { FC } from "react";
import { W3SSdk } from "@circle-fin/w3s-pw-web-sdk";

const appId = "282b5b14-dd49-53d3-b53c-e5e321c2a047";

const CreateNewUser: FC<{
  userId: string;
  onChallengeResolved: () => void;
}> = ({ userId, onChallengeResolved }) => {
  const handleCreateNewUser = async () => {
    await createNewUser(userId);

    const { data: sessionTokenData } = (await getSessionToken(userId)) as {
      data: { userToken: string; encryptionKey: string };
    };

    const { data: initializeData } = (await initializeUserAccount(
      sessionTokenData.userToken
    )) as { data: { challengeId: string } };

    const sdk = new W3SSdk(
      {
        appSettings: { appId },
        authentication: {
          userToken: sessionTokenData.userToken,
          encryptionKey: sessionTokenData.encryptionKey,
        },
      },
      (error, result) => {
        if (error) {
          return;
        }

        console.log(result);
        onChallengeResolved();
      }
    );

    sdk.execute(initializeData.challengeId, (error, result) => {
      if (error) {
        return;
      }

      console.log(result);
    });
  };

  return (
    <>
      <Button className="w-full mt-4" onClick={handleCreateNewUser}>
        Create new user
      </Button>
    </>
  );
};

export default CreateNewUser;
