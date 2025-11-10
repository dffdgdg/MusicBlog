"use client";

import { Button } from '@/components/ui/buttonts';
import {cn} from '@/lib/utils/css';

interface FormActionsProps {
  submitLabel: string;
  cancelLabel?: string;
  onCancel?: () => void;
  isSubmitting?: boolean;
  className?: string;
}

export function FormActions({ 
  submitLabel, 
  cancelLabel = "Отмена", 
  onCancel, 
  isSubmitting = false,
  className 
}: FormActionsProps) {
  return (
    <div className={cn("flex gap-3 pt-6", className)}>
      <Button
        type="submit"
        disabled={isSubmitting}
        className="flex-1"
      >
        {isSubmitting ? (
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto" />
        ) : (
          submitLabel
        )}
      </Button>
      
      {onCancel && (
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          {cancelLabel}
        </Button>
      )}
    </div>
  );
}