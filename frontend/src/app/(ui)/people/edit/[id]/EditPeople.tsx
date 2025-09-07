"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { PeopleResponse, PeopleUpdateRequest } from "@/apiClient";
import { editPeople } from "@/features/people/service";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  role: z.string().min(2, "Role must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  organization: z.string().min(2, "Organization must be at least 2 characters"),
});

type FormData = z.infer<typeof formSchema>;

export default function EditPeople({
  defaultValues,
}: {
  defaultValues: PeopleResponse;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  });

  const onSubmit = async (data: FormData) => {
    try {
      // Submit to server route or API
      console.log(data);
      await editPeople(data, defaultValues.id);
      //   await onAdd(JSON.stringify(data));
      reset();

      alert("User created!");
    } catch (error) {
      console.error(error);
      alert("Error creating user.");
    }
  };

  return (
    <div className="w-xl mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Add New People</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {["name", "role", "email", "phone", "organization"].map(field => (
              <div key={field}>
                <Label htmlFor={field} className="capitalize">
                  {field.replaceAll("_", " ")}
                </Label>
                <Input id={field} {...register(field as keyof FormData)} />
                {errors[field as keyof FormData] && (
                  <p className="text-sm text-red-500">
                    {errors[field as keyof FormData]?.message?.toString()}
                  </p>
                )}
              </div>
            ))}
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Update People"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
