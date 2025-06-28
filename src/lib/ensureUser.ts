import { prisma } from "@/lib";
import { currentUser } from "@clerk/nextjs/server";

export async function ensureUserInDatabase() {
  const user = await currentUser();
  if (!user) return null;

  let dbUser = await prisma.user.findUnique({ where: { id: user.id } });

  if (!dbUser) {
    dbUser = await prisma.user.create({
      data: {
        id: user.id,
        name: [user.firstName, user.lastName].filter(Boolean).join(" "),
        email: user.emailAddresses[0]?.emailAddress,
        image: user.imageUrl,
      },
    });
  }
  return dbUser;
}
