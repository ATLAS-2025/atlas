

"use client";

import { useState } from "react";
import { GraduationCap } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";

interface CreateTestModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateTest?: (testName: string) => void;
}

export function CreateTestModal({
  open,
  onOpenChange,
  onCreateTest,
}: CreateTestModalProps) {
  const [testName, setTestName] = useState("");

  const handleCreate = () => {
    if (testName.trim()) {
      onCreateTest?.(testName.trim());
      setTestName("");
      onOpenChange(false);
    }
  };

  const handleCancel = () => {
    setTestName("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-foreground text-xl font-semibold">
            Create a new test
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="test-name" className="text-foreground text-sm font-medium">
              Test name
            </Label>
            <div className="relative">
              <GraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-primary" />
              <Input
                id="test-name"
                placeholder="Name"
                value={testName}
                onChange={(e) => setTestName(e.target.value)}
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
            disabled={!testName.trim()}
          >
            Create
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
