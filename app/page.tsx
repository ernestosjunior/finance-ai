import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const HomePage = async () => {
  const { userId } = await auth();

  if (!userId) redirect("/login");

  return (
    <main className="flex h-full items-center justify-center">
      <UserButton showName />
    </main>
  );
};

export default HomePage;
