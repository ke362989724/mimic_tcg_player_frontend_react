import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { createUser, getCountryList } from "@/api-service/main";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { AxiosErrorProps } from "@/interface/axios";
import { useNavigate } from "react-router-dom";

interface FormData {
  email: string;
  password: string;
  country: string;
  nickname: string;
  username: string;
  confirmPassword: string;
}

interface InputField {
  label: string;
  type: string;
  placeholder: string;
  code: keyof FormData;
  htmlFor: string;
  inputType: string;
  selectList?: {
    label: string;
    value: string;
  }[];
}

export interface Country {
  name: string;
  id: string;
}

const SignUp = () => {
  const navigate = useNavigate();
  const postCreateUserMutate = useMutation({
    mutationFn: async (data: FormData) => {
      return await createUser(data);
    },
    onSuccess: () => {
      navigate("/create-account-success", { state: { from: "/sign-up" } });
    },
    onError: (error: AxiosErrorProps) => {
      toast.error(error.message);
    },
  });

  const [inputFieldList, setInputFieldList] = useState<InputField[]>([
    {
      label: "Username",
      type: "username",
      placeholder: "Enter your username",
      code: "username",
      htmlFor: "username",
      inputType: "input",
    },
    {
      label: "Nickname",
      type: "nickname",
      placeholder: "Enter your nickname",
      code: "nickname",
      htmlFor: "nickname",
      inputType: "input",
    },
    {
      label: "Email",
      type: "email",
      placeholder: "Enter your email",
      code: "email",
      htmlFor: "email",
      inputType: "input",
    },
    {
      label: "Password",
      type: "password",
      placeholder: "Enter your password",
      code: "password",
      htmlFor: "password",
      inputType: "input",
    },
    {
      label: "Confirm Password",
      type: "password",
      placeholder: "Re-enter your password",
      code: "confirmPassword",
      htmlFor: "confirmPassword",
      inputType: "input",
    },
    {
      label: "Country",
      type: "country",
      placeholder: "Your Country",
      code: "country",
      htmlFor: "",
      inputType: "select",
      selectList: [],
    },
  ]);

  const countryListQuery = useQuery({
    queryKey: ["countryList"],
    queryFn: getCountryList,
    gcTime: 1000 * 60 * 60 * 24,
    staleTime: 1000 * 60 * 60 * 24,
  });

  // Update input fields when countries data changes
  useEffect(() => {
    if (countryListQuery?.data) {
      setInputFieldList((prevFields) =>
        prevFields.map((field) =>
          field.code === "country"
            ? {
                ...field,
                selectList: countryListQuery?.data.map((country: Country) => ({
                  label: country.name,
                  value: country.id,
                })),
              }
            : field,
        ),
      );
    }
  }, [countryListQuery?.data]);

  const signUpSchema = z
    .object({
      email: z.string().email(),
      password: z.string().min(8).max(20),
      nickname: z.string().min(5).max(20),
      username: z.string().min(8).max(20),
      country: z.string(),
      confirmPassword: z.string().min(8).max(20),
    })
    .superRefine((val, ctx) => {
      if (val.password !== val.confirmPassword) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Password is not the same as confirm password",
          path: ["confirmPassword"],
        });
      }
    });

  type SignUpSchema = z.infer<typeof signUpSchema>;

  const onSubmit: SubmitHandler<FormData> = (data) => {
    postCreateUserMutate.mutate(data);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    clearErrors,
  } = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
  });

  return (
    <div className="flex w-full flex-1 items-center justify-center">
      <div className="w-full max-w-[1000px] py-20 text-center shadow-2xl">
        <form className="mx-10 space-y-5" onSubmit={handleSubmit(onSubmit)}>
          {inputFieldList.map((el, index) =>
            el.inputType === "input" ? (
              <div key={"login" + el.label + index}>
                <Label htmlFor={el.htmlFor} className="mx-1">
                  {el.label}
                </Label>
                <Input
                  className="mt-2"
                  {...register(el.code)}
                  type={el.type}
                  placeholder={el.placeholder}
                />
                {errors[el.code] && (
                  <p className="mx-1 mt-1 text-left text-sm text-red-500">
                    {errors[el.code]?.message}
                  </p>
                )}
              </div>
            ) : el.inputType === "select" ? (
              <div key={"login" + el.label + index}>
                <Label htmlFor={el.htmlFor} className="mx-1">
                  {el.label}
                </Label>
                <Select
                  onValueChange={(value) => {
                    clearErrors(el.code);
                    setValue(el.code, value);
                  }}
                >
                  <SelectTrigger className="mt-2 w-full">
                    <SelectValue placeholder={el.placeholder} />
                  </SelectTrigger>
                  <SelectContent>
                    {el.selectList &&
                      el.selectList.map((item) => {
                        return (
                          <SelectItem value={item.value} key={item.value}>
                            {item.label}
                          </SelectItem>
                        );
                      })}
                  </SelectContent>
                </Select>
                {errors[el.code] && (
                  <p className="mx-1 mt-1 text-left text-sm text-red-500">
                    {errors[el.code]?.message}
                  </p>
                )}
              </div>
            ) : null,
          )}
          <Button className="mt-8 flex w-full cursor-pointer justify-center">
            <input type="submit" />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
