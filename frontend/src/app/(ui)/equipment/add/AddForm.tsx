"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { addEquipment } from "@/features/equipment/service"; // make sure this exists

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  type: z.string().min(2, "Type must be at least 2 characters"),
  manufacturer: z.string().min(2, "Manufacturer must be at least 2 characters"),
  model: z.string().min(1, "Model is required"),
  serialNumber: z.string().min(1, "Serial number is required"),
  location: z.string().min(2, "Location must be at least 2 characters"),
  notes: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function AddEquipmentPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      await addEquipment(data);
      reset();
      alert("Equipment added!");
    } catch (error) {
      console.error(error);
      alert("Error adding equipment.");
    }
  };

  return (
    <div className="w-xl mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Add New Equipment</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {[
              "name",
              "type",
              "manufacturer",
              "model",
              "serialNumber",
              "location",
              "notes",
            ].map(field => (
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
              {isSubmitting ? "Saving..." : "Add Equipment"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
