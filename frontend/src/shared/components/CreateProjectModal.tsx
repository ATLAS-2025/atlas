

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
  const [projectName, setProjectName] = useState("");

  const handleCreate = () => {
    if (projectName.trim()) {
      onCreateProject?.(projectName.trim());
      setProjectName("");
      onOpenChange(false);
    }
  };

  const handleCancel = () => {
    setProjectName("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-foreground text-xl font-semibold">
            Create a new project
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="project-name" className="text-foreground text-sm font-medium">
              Project name
            </Label>
            <div className="relative">
              <FolderPlus className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-primary" />
              <Input
                id="project-name"
                placeholder="Name"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                className="pl-10 bg-background border-primary text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary"
                autoFocus
              />
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
            onClick={handleCreate}
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
            disabled={!projectName.trim()}
          >
            Create
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
