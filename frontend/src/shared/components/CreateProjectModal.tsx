"use client";

import { useState } from "react";
import { FolderPlus } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addPeople } from "@/features/people/service";
import z from "zod";
import { addProject } from "@/features/project/service";

const formSchema = z.object({
  title: z.string().min(2, "Name must be at least 2 characters"),
  subtitle: z.string().min(2, "subtitle must be at least 2 characters"),
  project_type: z.string().min(2, "project_type can't be empty"),
});
type FormData = z.infer<typeof formSchema>;

interface CreateProjectModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateProject?: (projectName: string) => void;
}

export function CreateProjectModal({
  open,
  onOpenChange,
  onCreateProject,
}: CreateProjectModalProps) {

  const handleCancel = () => {
    onOpenChange(false);
  };
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
      // Submit to server route or API
      await addProject(data);
      //   await onAdd(JSON.stringify(data));
      reset();
      onOpenChange(false);

      alert("Project Created");
    } catch (error) {
      console.error(error);
      alert("Error creating Project.");
    }
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-foreground text-xl font-semibold">
            Create a new project
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label
                htmlFor="project-name"
                className="text-foreground text-sm font-medium"
              >
                Project name
              </Label>
              <div className="relative">
                <FolderPlus className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-primary" />

                <Input
                  id="project-name"
                  placeholder="Project Name"
                  className="pl-10 bg-background border-primary text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary"
                  autoFocus
                  {...register("title")}
                />
                {errors["title"] && (
                  <p className="text-sm text-red-500">
                    {errors["title"]?.message?.toString()}
                  </p>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="project-name"
                className="text-foreground text-sm font-medium"
              >
                Project Subtitle
              </Label>
              <div className="relative">
                <FolderPlus className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-primary" />

                <Input
                  id="project-name"
                  placeholder="Project Subtitle"
                  className="pl-10 bg-background border-primary text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary"
                  autoFocus
                  {...register("subtitle")}
                />
                {errors["subtitle"] && (
                  <p className="text-sm text-red-500">
                    {errors["subtitle"]?.message?.toString()}
                  </p>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="project-name"
                className="text-foreground text-sm font-medium"
              >
                Project Tag
              </Label>
              <div className="relative">
                <FolderPlus className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-primary" />

                <Input
                  id="project-name"
                  placeholder="Project Tag"
                  className="pl-10 bg-background border-primary text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary"
                  autoFocus
                  {...register("project_type")}
                />
                {errors["project_type"] && (
                  <p className="text-sm text-red-500">
                    {errors["project_type"]?.message?.toString()}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={handleCancel}
              className="bg-transparent border-border text-foreground hover:bg-accent"
            >
              Cancel
            </Button>
            <Button
              // onClick={handleCreate}
              type="submit"
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
              // disabled={!projectName.trim()}
            >
              Create
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
