import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useForm, SubmitHandler } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

type Props = {};

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

const SignInDialog = (props: Props) => {
  const {} = props;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });
  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log("testing", data);
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
    <div>
      <Dialog open={true}>
        <DialogTrigger className="mx-1 my-3">
          <Button className="cursor-pointer">Sign in</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader className="flex justify-center">Sign In</DialogHeader>
          <DialogDescription>
            <form onSubmit={handleSubmit(onSubmit)}>
              {inputFieldList.map((el) => {
                return (
                  <>
                    <Label htmlFor="email" className="mx-1">
                      {el.label}
                    </Label>
                    <Input className="mt-2" {...register(el.code)} />
                    {errors[el.code] && (
                      <p className="mx-1 mt-1 text-sm text-red-500">
                        {errors[el.code]?.message}
                      </p>
                    )}
                  </>
                );
              })}
              <Button className="mt-8 flex w-full cursor-pointer justify-center">
                <input type="submit" />
              </Button>
            </form>
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SignInDialog;
