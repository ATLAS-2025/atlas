"use client";
import { Button } from "@/components/ui/button";
import { deleteSensor } from "@/features/sensor/service";
import { Trash2 } from "lucide-react";

export const DeleteButton = ({ id }: { id: number }) => {
  return (
    <Button
      variant="destructive"
      className="hover:pointer"
      size="icon"
      onClick={async () => {
        try {
          await deleteSensor(id);
          alert("Succesfully deleted");
        } catch (error) {
          console.log(error);
        }
      }}
    >
      <Trash2 className="w-4 h-4" />
    </Button>
  );
};
