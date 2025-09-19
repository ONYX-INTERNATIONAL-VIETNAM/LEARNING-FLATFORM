"use client";

import * as React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash2, AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ConfirmDialogProps {
  title?: string;
  description?: string;
  onConfirm: () => void;
  triggerLabel?: string;
  triggerVariant?: "default" | "destructive" | "outline" | "ghost";
}

export function ConfirmDialog({
  title = "Xác nhận xóa",
  description = "Bạn có chắc chắn muốn xóa mục này? Hành động này không thể hoàn tác.",
  onConfirm,
  triggerLabel = "Xóa",
  triggerVariant = "destructive",
}: ConfirmDialogProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant={triggerVariant}
          size="sm"
          className="flex items-center gap-2 transition-all duration-200 hover:scale-105 hover:shadow-md"
        >
          <Trash2 className="h-4 w-4" />
          {triggerLabel}
        </Button>
      </AlertDialogTrigger>

      <AnimatePresence>
        <AlertDialogContent className="sm:max-w-md rounded-xl shadow-2xl bg-white dark:bg-gray-800 p-6 transform transition-all duration-300">
          <AlertDialogHeader className="space-y-4 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
              className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30"
            >
              <AlertTriangle className="h-7 w-7 text-red-600 dark:text-red-400" />
            </motion.div>
            <AlertDialogTitle className="text-xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">
              {title}
            </AlertDialogTitle>
            <AlertDialogDescription className="text-base text-gray-600 dark:text-gray-300 leading-relaxed">
              {description}
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter className="flex flex-col sm:flex-row justify-center gap-3 mt-6">
            <AlertDialogCancel
              className="px-6 py-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 font-medium rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
            >
              Hủy
            </AlertDialogCancel>
            <AlertDialogAction
              className="px-6 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 hover:shadow-lg transition-all duration-200"
              onClick={onConfirm}
            >
              Xóa
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AnimatePresence>
    </AlertDialog>
  );
}