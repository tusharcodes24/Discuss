"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "../ui/textarea";
import { useActionState } from "react";
import { useRouter } from "next/navigation";
import { createPost } from "@/actions/create-post";
import React from "react";

type CreatePostFormProps = {
  slug: string;
};

const PostCreateForm: React.FC<CreatePostFormProps> = ({ slug }) => {
  const router = useRouter();
  const [pending, setPending] = React.useState(false);

  const [formState, action] = useActionState(
    createPost.bind(null, slug),
    { errors: {}, redirectUrl: "" }
  );

  React.useEffect(() => {
    if (formState.redirectUrl) {
      router.push(formState.redirectUrl);
    }
  }, [formState, router]);

  // Custom submit handler to manage loading state
  const handleSubmit = async (formData: FormData) => {
    setPending(true);
    await action(formData);
    setPending(false);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create a Post</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form action={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create a Post</DialogTitle>
            <DialogDescription>
              Write a new post. Click save when you are done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input id="title" name="title" />
            </div>
            {formState.errors.title && (
              <p className="text-sm text-red-600">{formState.errors.title}</p>
            )}
            <div>
              <Label htmlFor="content" className="text-right">
                Content
              </Label>
              <Textarea id="content" name="content" />
            </div>
            {formState.errors.content && (
              <p className="text-sm text-red-600">{formState.errors.content}</p>
            )}
            {formState.errors.formError && (
              <div className="border border-red-600 bg-red-200 p-2 rounded">
                {formState.errors.formError}
              </div>
            )}
          </div>
          <DialogFooter>
            <Button type="submit" className="w-full" disabled={pending}>
              {pending ? "Saving..." : "Save changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PostCreateForm;
