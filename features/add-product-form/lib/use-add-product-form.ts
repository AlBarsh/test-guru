import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  productFormSchema,
  type ProductFormData,
} from "../model/product-form-schema";
import { toast } from "sonner";

export function useAddProductForm(onSuccess?: () => void) {
  const form = useForm<ProductFormData>({
    resolver: zodResolver(productFormSchema),
    mode: "onSubmit",
    defaultValues: {
      title: "",
      price: 0,
      vendor: "",
      sku: "",
    },
  });

  const onSubmit = async (data: ProductFormData) => {
    toast.success("Товар успешно добавлен!");
    form.reset();
    onSuccess?.();
  };

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
  };
}
