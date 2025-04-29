import React from "react";
import { Button } from "@/components/ui/button";
import { useForm, SubmitHandler } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { postLogin } from "@/api-service/main";
import { AxiosErrorProps } from "../../../interface/axios";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import Cookies from "js-cookie";

interface FormData {
  email: string;
  password: string;
}

interface InputField {
  label: string;
  type: string;
  placeholder: string;
  code: keyof FormData;
  htmlFor: string;
}

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(20),
});

type LoginSchema = z.infer<typeof loginSchema>;

const SignInForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const postLoginMutate = useMutation({
    mutationFn: (data: { email: string; password: string }) => {
      return postLogin(data.email, data.password);
    },
    onSuccess: () => {
      toast.success("Login Success");
      Cookies.set("isLogin", "true", {
        expires: 7,
      });
      window.location.reload();
    },
    onError: (error: AxiosErrorProps) => {
      toast.error(error.message);
    },
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    postLoginMutate.mutate(data);
  };

  const inputFieldList: InputField[] = [
    {
      label: "Email",
      type: "email",
      placeholder: "Enter your email",
      code: "email",
      htmlFor: "email",
    },
    {
      label: "Password",
      type: "password",
      placeholder: "Enter your password",
      code: "password",
      htmlFor: "password",
    },
  ];
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {inputFieldList.map((el, index) => {
        return (
          <React.Fragment key={"login" + el.label + index}>
            <Label htmlFor="email" className="mx-1">
              {el.label}
            </Label>
            <Input className="mt-2" {...register(el.code)} type={el.type} />
            {errors[el.code] && (
              <p className="mx-1 mt-1 text-sm text-red-500">
                {errors[el.code]?.message}
              </p>
            )}
          </React.Fragment>
        );
      })}
      <Button className="mt-8 flex w-full cursor-pointer justify-center">
        <input type="submit" />
      </Button>
    </form>
  );
};

export default SignInForm;
