import { auth, clerkClient } from "@clerk/nextjs/server";

export const getUser = async () => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized.");
  }

  const clerk = await clerkClient();

  const user = await clerk.users.getUser(userId);

  return user;
};
