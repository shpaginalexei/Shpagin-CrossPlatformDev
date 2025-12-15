import { useState, useTransition } from "react";

import { LuTrash2 } from "react-icons/lu";
import { toast } from "sonner";

import { DeleteActionResponse } from "@/lib/actions/api";
import { LoadingFallback } from "@/components/loading-fallback";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

interface DeleteConfirmDialogProps {
  info: string;
  deleteAction: () => Promise<DeleteActionResponse>;
}

export function DeleteConfirmDialog({
  info,
  deleteAction,
}: DeleteConfirmDialogProps) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  async function onSubmit() {
    startTransition(async () => {
      const result = await deleteAction();
      console.log(result);
      if (result.status === "error") {
        toast.error(result.message);
      } else {
        toast.success("Удалено успешно");
      }
      setOpen(false);
    });
  }

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  return (
    <AlertDialog open={open} onOpenChange={handleOpenChange}>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <LuTrash2 />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-card">
        <AlertDialogHeader>
          <AlertDialogTitle className="break-all">
            Вы уверены, что хотите удалить {info}?
          </AlertDialogTitle>
          <AlertDialogDescription className="break-all">
            Действие нельзя будет отменить. Это навсегда удалит информацию о{" "}
            {info} с сервера.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="w-20">Отмена</AlertDialogCancel>
          <Button
            className="bg-destructive dark:bg-destructive/60 hover:bg-destructive focus-visible:ring-destructive text-foreground w-20"
            onClick={onSubmit}
            disabled={isPending}
          >
            {isPending ? <LoadingFallback /> : "Удалить"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
