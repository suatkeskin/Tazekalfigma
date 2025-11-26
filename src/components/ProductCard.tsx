import { Product } from "../types";
import { Card } from "./ui/card";
import { Trash2 } from "lucide-react";
import { getCategoryInfo } from "../utils/categories";
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
} from "./ui/alert-dialog";

interface ProductCardProps {
  product: Product;
  onDelete: (id: string) => void;
}

export function ProductCard({ product, onDelete }: ProductCardProps) {
  const getDaysUntilExpiration = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const expDate = new Date(date);
    expDate.setHours(0, 0, 0, 0);
    const diffTime = expDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const daysLeft = getDaysUntilExpiration(product.expirationDate);
  const categoryInfo = getCategoryInfo(product.category);

  const getUrgencyColor = (days: number) => {
    if (days <= 3) return "bg-red-50 border-red-200";
    if (days <= 7) return "bg-orange-50 border-orange-200";
    if (days <= 30) return "bg-yellow-50 border-yellow-200";
    return "bg-green-50 border-green-200";
  };

  const getBadgeColor = (days: number) => {
    if (days <= 3) return "bg-red-600 text-white";
    if (days <= 7) return "bg-orange-600 text-white";
    if (days <= 30) return "bg-yellow-600 text-white";
    return "bg-green-600 text-white";
  };

  const getDaysText = (days: number) => {
    if (days < 0) return "Expired";
    if (days === 0) return "Today";
    if (days === 1) return "Tomorrow";
    return `${days} days`;
  };

  return (
    <Card className={`p-4 ${getUrgencyColor(daysLeft)} border transition-all`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 flex-1">
          <div className="text-2xl mt-0.5">{categoryInfo.icon}</div>
          <div className="flex-1 min-w-0">
            <h3 className="truncate">{product.name}</h3>
            <p className="text-sm text-gray-600 mt-0.5">
              {categoryInfo.label}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Expires: {formatDate(product.expirationDate)}
            </p>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <div className={`px-2 py-1 rounded text-xs whitespace-nowrap ${getBadgeColor(daysLeft)}`}>
            {getDaysText(daysLeft)}
          </div>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button className="text-gray-400 hover:text-red-600 transition-colors p-1">
                <Trash2 className="h-4 w-4" />
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete product?</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete "{product.name}"? This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => onDelete(product.id)}>
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </Card>
  );
}
