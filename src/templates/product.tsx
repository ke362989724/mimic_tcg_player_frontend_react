import React, { useState } from "react";
import FilePreviewUpload from "@/components/file-upload-preview/file-upload-preview";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  getCategoryList,
  getCardConditionList,
  getPreSignedUrlMultiple,
  createProduct,
} from "@/api-service/main";
import { useQuery } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import TextareaComponent from "@/components/textarea/textarea";
import InputField from "@/components/input-field/input-field";
import InputFieldUnit from "@/components/input-field-unit/input-field-unit";
import PillButtonGroupComponent from "@/components/pill-button-group/pill-button-group";
import CustomDialog from "@/components/dialog/dialog";
import { uploadMultipleImage } from "@/api-service/image";
import { Progress } from "@/components/ui/progress";
import { useMutation } from "@tanstack/react-query";

type CardCategoryProps = {
  id: string;
  name: string;
};

const imageSchema = z
  .instanceof(File)
  .refine(
    (file) => file.size <= 5 * 1024 * 1024, // 5MB max
    "File size must be less than 5MB",
  )
  .refine(
    (file) => ["image/jpeg", "image/png", "image/webp"].includes(file.type),
    "Only .jpg, .png, and .webp formats are allowed",
  );

const createProductSchema = z.object({
  imageList: z
    .array(
      z.object({
        file: imageSchema,
        preview: z.string(),
      }),
    )
    .min(1, "At least one image is required")
    .max(10, "At least tem images is required"),
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title must be less than 100 characters"),
  content: z
    .string()
    .min(1, "Content is required")
    .max(250, "Content must be less than 100 characters"),
  cardCondition: z
    .string({
      required_error: "Card Condition is required",
    })
    .min(1, "Card condition is required"),
  price: z.coerce.number().min(0.01).max(99999),
  number: z.coerce.number().min(1, "number is required"),
  cardCategory: z
    .string({
      required_error: "Card Category is required",
    })
    .min(1, "Card category is required"),
});

const Product = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const cardCategoryListQuery = useQuery({
    queryKey: ["cardCategoryList"],
    queryFn: async () => {
      return await getCategoryList();
    },
    gcTime: 1000 * 60 * 60 * 24,
    staleTime: 1000 * 60 * 60 * 24,
  });

  const cardConditionQuery = useQuery({
    queryKey: ["cardConditionList"],
    queryFn: getCardConditionList,
    gcTime: 1000 * 60 * 60 * 24,
    staleTime: 1000 * 60 * 60 * 24,
  });

  type CreateLoginSchema = z.infer<typeof createProductSchema>;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CreateLoginSchema>({
    resolver: zodResolver(createProductSchema),
  });

  const createRecordMutate = useMutation({
    mutationFn: async (data: CreateLoginSchema) => {
      setUploadProgress(() => 0);
      const multipleResponse = await getPreSignedUrlMultiple({
        fileNumber: data.imageList.length,
      });

      const uploadPromises = Array.from(data.imageList).map(
        async (image, index) => {
          return uploadMultipleImage({
            preSignedUrl: multipleResponse[index].signedUrl,
            file: image.file,
            fileNumber: index,
          });
        },
      );

      await Promise.all(uploadPromises)
        .then(() => {
          setUploadProgress(() => 70);
        })
        .catch((error) => {
          window.alert(JSON.stringify(error));
        });

      console.log(
        "multipleResponse",
        multipleResponse,
        import.meta.env.VITE_R2_PUBLIC_ENDPOINT,
      );

      await createProduct({
        name: data.title,
        description: data.content,
        price: data.price,
        qty: data.number,
        cardCategoryId: data.cardCategory,
        cardConditionId: data.cardCondition,
        images: multipleResponse.map(
          (image) =>
            import.meta.env.VITE_R2_PUBLIC_ENDPOINT + image.presignedKey,
        ),
        currencyId: "02eaed63-1d5c-4d88-bf4d-170a09b8a4cc",
      }).then(() => {
        setUploadProgress(() => 100);
        setTimeout(() => {
          window.location.href = "/";
        }, 500);
      });
    },
    onSuccess: () => {},
    onError: () => {
      setUploadProgress(0);
      setOpenDialog(false);
    },
  });

  const onSubmit: SubmitHandler<CreateLoginSchema> = async (data) => {
    createRecordMutate.mutate(data);
    setOpenDialog(true);
  };

  console.log("testingWatch", watch("imageList"));

  return (
    <>
      <div className={cn("flex flex-1 flex-col py-10")}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-10 md:flex-row">
            <div
              className={cn({
                "flex-1/3": watch("imageList")?.length > 0,
                "mx-auto w-full max-w-[1240px]":
                  watch("imageList")?.length === 0,
              })}
            >
              <FilePreviewUpload
                error={errors["imageList"]?.message}
                {...register("imageList", {
                  required: "this field is required",
                })}
              />
            </div>
            {watch("imageList")?.length > 0 && (
              <div className="flex-2/3">
                <div className="space-y-6 rounded-md border p-4 shadow-2xl">
                  <div>
                    <Select
                      onValueChange={(value) => {
                        setValue("cardCategory", value);
                      }}
                    >
                      <SelectTrigger className="!h-12 w-full">
                        <SelectValue placeholder={"Card Category"} />
                      </SelectTrigger>
                      <SelectContent>
                        {cardCategoryListQuery?.data &&
                          cardCategoryListQuery?.data.map(
                            (el: CardCategoryProps) => {
                              return (
                                <SelectItem
                                  className="h-12"
                                  value={el.id}
                                  key={el.id}
                                  onChange={() => {}}
                                >
                                  {el.name}
                                </SelectItem>
                              );
                            },
                          )}
                      </SelectContent>
                    </Select>
                    {errors["cardCategory"]?.message && (
                      <div className="text-destructive p3">
                        {errors["cardCategory"]?.message}
                      </div>
                    )}
                  </div>
                  <InputField
                    placeholder={"Item Name"}
                    title={"Item Name"}
                    {...register("title", {
                      required: "this field is required",
                    })}
                    type="text"
                    error={errors["title"]?.message}
                    value={""}
                  />
                  <TextareaComponent
                    {...register("content", {
                      required: "this field is required",
                    })}
                    title={"Description (Optional)"}
                    placeholder="Provide More Detail"
                    maxLength={250}
                    error={errors["content"]?.message}
                  />
                  <div className="flex flex-wrap gap-2">
                    {cardConditionQuery.data && (
                      <PillButtonGroupComponent
                        optionList={cardConditionQuery.data.map((el) => {
                          return {
                            name: el.name,
                            value: el.id,
                          };
                        })}
                        {...register("cardCondition", {
                          required: "this field is required",
                        })}
                        error={errors["cardCondition"]?.message}
                      />
                    )}
                  </div>
                  <div>
                    <div className="p1 mb-1">Price</div>
                    <InputFieldUnit
                      unit={"HKD"}
                      placeholder={"price"}
                      {...register("price")}
                      error={errors["price"]?.message}
                    />
                  </div>
                  <div>
                    <div className="p1 mb-1">Item Number</div>
                    <InputField
                      {...register("number", {
                        required: "this field is required",
                      })}
                      placeholder={"Item Number"}
                      title={"Item Number"}
                      type="number"
                      error={errors["number"]?.message}
                      value={""}
                    />
                  </div>
                  <div className="p2 text-right">
                    <input
                      type="submit"
                      value={"Publish now"}
                      className="bg-primary cursor-pointer rounded-xl p-2 text-right text-white"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </form>
      </div>
      <CustomDialog
        isOpen={openDialog}
        setIsOpen={setOpenDialog}
        preventClose={true}
      >
        <div className="space-y-10">
          <div className="p2 text-center">Please wait it is processing</div>
          <Progress value={uploadProgress} />
        </div>
      </CustomDialog>
    </>
  );
};

export default Product;
