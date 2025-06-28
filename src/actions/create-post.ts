'use server'
import { auth, clerkClient } from "@clerk/nextjs/server";
import { prisma } from "@/lib"; 
import { revalidatePath } from "next/cache";
import { z } from "zod";

const createPostSchema = z.object({
    title: z.string().min(3),
    content: z.string().min(10)
});

type CreatePostFormState = {
    errors: {
        title?: string[],
        content?: string[],
        formError?: string[]
    },
    redirectUrl?: string
}

async function syncClerkUserToDb(userId: string) {
    const dbUser = await prisma.user.findUnique({ where: { id: userId } });
    if (dbUser) return dbUser;
    const client = await clerkClient();
    const clerkUser = await client.users.getUser(userId);
    return await prisma.user.create({
        data: {
            id: clerkUser.id,
            name: [clerkUser.firstName, clerkUser.lastName].filter(Boolean).join(" "),
            email: clerkUser.emailAddresses[0]?.emailAddress,
            image: clerkUser.imageUrl,
        }
    });
}

export const createPost = async (
    slug: string,
    prevState: CreatePostFormState,
    formData: FormData
): Promise<CreatePostFormState> => {

    const result = createPostSchema.safeParse({
        title: formData.get('title'),
        content: formData.get('content')
    });

    if (!result.success) {
        return {
            errors: result.error.flatten().fieldErrors,
        }
    }

    const session = await auth();
    if (!session || !session.userId) {
        return {
            errors: {
                formError: ['You have to login first']
            }
        }
    }

    try {
        await syncClerkUserToDb(session.userId);

        const topic = await prisma.topic.findFirst({
            where: { slug }
        });

        if (!topic) {
            return {
                errors: {
                    formError: ['Topic not found']
                }
            }
        }

        const post = await prisma.post.create({
            data: {
                title: result.data.title,
                content: result.data.content,
                userId: session.userId,
                topicId: topic.id
            }
        });

        revalidatePath(`/topics/${slug}`);
        return {
            errors: {},
            redirectUrl: `/topics/${slug}/posts/${post.id}`
        };
        
    } catch (error: unknown) {
        if (error instanceof Error) {
            return {
                errors: {
                    formError: [error.message]
                }
            }
        }
        return {
            errors: {
                formError: ['Failed to create post']
            }
        }
    }
}
