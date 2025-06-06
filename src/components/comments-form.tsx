import "../styles/comments-form.scss";
import "../styles/Form.scss";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { authedApi } from "../lib/api";
import { useAuth } from "../contexts/auth-context";
import { useQueryClient } from "@tanstack/react-query";

const commentSchema = z.object({
  content: z.string().min(4, { message: "Must be at least 4 characters" }),
});

const CommentsForm = () => {
  const { accessToken } = useAuth();
  const queryClient = useQueryClient();

  const {
    register,
    reset,
    formState: { isSubmitting, isLoading, errors },
    handleSubmit,
  } = useForm<z.infer<typeof commentSchema>>({
    defaultValues: {
      content: undefined,
    },
    resolver: zodResolver(commentSchema),
  });

  const onSubmit = async (values: z.infer<typeof commentSchema>) => {
    if (!accessToken) return;
    try {
      const res = await authedApi(accessToken).post("/comment", values);

      console.log(res.status, res.data);

      queryClient.invalidateQueries({ queryKey: ["comments"] });
      alert("Comment created successfully!");
      reset();
    } catch (error) {
      alert("Failed to create comment");
      console.log(error);
    }
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
        <label htmlFor="content-input">Content</label>
        <input
          {...register("content")}
          type="text"
          id="content-input"
          placeholder="Whats on your mind..."
          className="user-form-input"
        />
        {errors.content && <p>{errors.content.message}</p>}
        <button className="submit-comment-button">Submit</button>
      </form>
    </>
  );
};

export default CommentsForm;
