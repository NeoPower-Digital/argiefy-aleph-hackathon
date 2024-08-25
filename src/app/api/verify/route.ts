import { createClient } from '@/lib/utils/supabase/server';
import { activeUserId } from '@/lib/utils/worldcoin';
import { verifyCloudProof, ISuccessResult } from '@worldcoin/minikit-js';
import { NextRequest, NextResponse } from 'next/server';

interface IRequestPayload {
  payload: ISuccessResult;
  action: string;
  signal: string | undefined;
}
const updateUser = async (userId: string) => {
  const supabase = createClient();
  const { data: updatedUser } = await supabase
    .from('users_data')
    .upsert({ user_id: userId, world_id_verified: true })
    .select();
  return updatedUser;
};

export async function POST(req: NextRequest) {
  const { payload, action, signal } = (await req.json()) as IRequestPayload;
  const app_id = process.env.NEXT_PUBLIC_APP_ID as `app_${string}`;
  const verifyRes = await verifyCloudProof(payload, app_id, action, signal);

  if (verifyRes.success) {
    // This is where you should perform backend actions if the verification succeeds
    // Such as, setting a user as "verified" in a database
    const updatedUser = await updateUser(activeUserId);
    return NextResponse.json({
      user: updatedUser?.length ? updatedUser[0] : null,
      status: 200,
    });
  } else {
    // This is where you should handle errors from the World ID /verify endpoint.
    // Usually these errors are due to a user having already verified.
    return NextResponse.json({ verifyRes, status: 400 });
  }
}
