import {
  FormControl,
  FormDescription,
  FormField as ShadcnFormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import React from "react";
import { ReactNode } from "react";
import {
  ControllerRenderProps,
  FieldValues,
  useFormContext,
} from "react-hook-form";

type FormFieldProps = {
  name: string;
  label?: string;
  description?: string;
  register: (field: ControllerRenderProps<FieldValues, string>) => ReactNode;
};

export function FormField(props: FormFieldProps) {
  const { control } = useFormContext();

  return (
    <ShadcnFormField
      control={control}
      name={props.name}
      render={({ field }) => {
        return (
          <FormItem>
            {props.label && <FormLabel>{props.label}</FormLabel>}
            <FormControl>{props.register(field)}</FormControl>
            <FormMessage />
            {props.description && (
              <FormDescription>{props.description}</FormDescription>
            )}
          </FormItem>
        );
      }}
    />
  );
}
