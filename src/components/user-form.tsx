import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/auth-context";
import { api, authApi } from "../lib/api";
import "../styles/form.scss";

const formSchema = z.object({
  username: z
    .string()
    .min(4, { message: "Username must be at least 4 characters" })
    .max(30, { message: "Username must be no longer than 30 Characters" }),
  password: z
    .string()
    .min(4, { message: "Password must be at least 4 characters" })
    .max(25, { message: "Password must be no longer than 25 Characters" }),
});

interface Props {
  isLogin?: boolean;
}

const UserForm = ({ isLogin = true }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      password: undefined,
      username: undefined,
    },
    resolver: zodResolver(formSchema),
  });

  const navigate = useNavigate();

  const { loginAuth } = useAuth();

  const textContent = isLogin ? "login" : "register";

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (isLogin) {
      try {
        const res = await authApi.post("/login", values);
        const token = res.data.access;

        loginAuth(token);
        reset();
      } catch (error) {
        alert("Login failed");
        console.log(error);
      }
    } else {
      try {
        await api.post("/register", values);

        reset();
        alert("User created successfully! Now login");
      } catch (error) {
        alert("Error creating user");
        console.log(error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
      <label htmlFor="username">Username:</label>
      <input
        {...register("username")}
        id="username"
        type="text"
        placeholder="Username..."
        className="user-form-input"
      />
      {errors.username && <p>{errors.username.message}</p>}
      <label htmlFor="password">Password:</label>
      <input
        {...register("password")}
        id="password"
        type="password"
        placeholder="Password..."
        className="user-form-input"
      />
      {errors.password && <p>{errors.password.message}</p>}
      <div className="">
        <button
          type="submit"
          className={isLogin ? "btn-login" : "btn-register"}
          disabled={isSubmitting}
        >
          {textContent}
        </button>
      </div>
    </form>
  );
};

export default UserForm;
