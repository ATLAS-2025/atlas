'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { SensorResponse } from '@/apiClient';
import { editSensor } from '@/features/sensor/service'; // make sure this exists

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  type: z.string().min(2, 'Type must be at least 2 characters'),
  model: z.string().min(1, 'Model is required'),
  serialNumber: z.string().min(1, 'Serial number is required'),
  calibrationDate: z.string().refine(
    val => !isNaN(Date.parse(val)),
    'Invalid date format'
  ),
  notes: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function EditSensor({ defaultValues }: { defaultValues: SensorResponse }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...defaultValues,
      calibrationDate: (() => {
      const rawDate = defaultValues.calibrationDate;
      const parsedDate = rawDate ? new Date(rawDate) : null;
      return parsedDate instanceof Date && !isNaN(parsedDate.getTime())
        ? parsedDate.toISOString().split('T')[0]
        : '';
    })(),
    }
  });

  const onSubmit = async (data: FormData) => {
    try {
      const payload = {
        ...data,
        calibrationDate: new Date(data.calibrationDate), // Convert back to Date object
      };
      await editSensor(payload, defaultValues.id);
      reset();
      alert('Sensor updated!');
    } catch (error) {
      console.error(error);
      alert('Error updating sensor.');
    }
  };

  return (
    <div className="w-xl mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Edit Sensor</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {['name', 'type', 'model', 'serialNumber', 'calibrationDate', 'notes'].map((field) => (
              <div key={field}>
                <Label htmlFor={field} className="capitalize">
                  {field.replaceAll('_', ' ')}
                </Label>
                <Input
                  id={field}
                  type={field === 'calibrationDate' ? 'date' : 'text'}
                  {...register(field as keyof FormData)}
                />
                {errors[field as keyof FormData] && (
                  <p className="text-sm text-red-500">
                    {errors[field as keyof FormData]?.message?.toString()}
                  </p>
                )}
              </div>
            ))}
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : 'Update Sensor'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
