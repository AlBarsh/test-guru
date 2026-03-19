import { useAddProductForm } from "../lib/use-add-product-form";
import { Field, FieldError, FieldGroup, FieldLabel } from "shared/ui/components/field";
import { Button } from "shared/ui/components/button";
import { cn } from "shared/lib/utils";

interface AddProductFormProps {
  onSuccess?: () => void;
}

export function AddProductForm({ onSuccess }: AddProductFormProps) {
  const { form, onSubmit } = useAddProductForm(onSuccess);

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <FieldGroup>
        <Field>
          <FieldLabel>Наименование</FieldLabel>
          <input
            {...form.register("title")}
            placeholder="Введите наименование"
            className={cn(
              "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background",
              "file:border-0 file:bg-transparent file:text-sm file:font-medium",
              "placeholder:text-muted-foreground",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              "disabled:cursor-not-allowed disabled:opacity-50"
            )}
          />
          <FieldError errors={form.formState.errors.title ? [form.formState.errors.title] : undefined} />
        </Field>

        <Field>
          <FieldLabel>Цена</FieldLabel>
          <input
            type="number"
            step="0.01"
            {...form.register("price", { valueAsNumber: true })}
            placeholder="Введите цену"
            className={cn(
              "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background",
              "file:border-0 file:bg-transparent file:text-sm file:font-medium",
              "placeholder:text-muted-foreground",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              "disabled:cursor-not-allowed disabled:opacity-50"
            )}
          />
          <FieldError errors={form.formState.errors.price ? [form.formState.errors.price] : undefined} />
        </Field>

        <Field>
          <FieldLabel>Вендор</FieldLabel>
          <input
            {...form.register("vendor")}
            placeholder="Введите вендора"
            className={cn(
              "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background",
              "file:border-0 file:bg-transparent file:text-sm file:font-medium",
              "placeholder:text-muted-foreground",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              "disabled:cursor-not-allowed disabled:opacity-50"
            )}
          />
          <FieldError errors={form.formState.errors.vendor ? [form.formState.errors.vendor] : undefined} />
        </Field>

        <Field>
          <FieldLabel>Артикул</FieldLabel>
          <input
            {...form.register("sku")}
            placeholder="Введите артикул"
            className={cn(
              "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background",
              "file:border-0 file:bg-transparent file:text-sm file:font-medium",
              "placeholder:text-muted-foreground",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              "disabled:cursor-not-allowed disabled:opacity-50"
            )}
          />
          <FieldError errors={form.formState.errors.sku ? [form.formState.errors.sku] : undefined} />
        </Field>
      </FieldGroup>

      <div className="flex justify-end gap-2">
        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? "Добавление..." : "Добавить"}
        </Button>
      </div>
    </form>
  );
}

