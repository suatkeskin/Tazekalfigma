import { Plus, Users, Package, ChevronRight } from "lucide-react";
import { Product } from "../types";

interface DashboardScreenProps {
  products: Product[];
  onAddProduct: () => void;
  onAddTeamMember: () => void;
  onViewProducts: () => void;
}

export function DashboardScreen({
  products,
  onAddProduct,
  onAddTeamMember,
  onViewProducts,
}: DashboardScreenProps) {
  // Calculate statistics
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const expiredCount = products.filter((p) => {
    const expiryDate = new Date(p.expiryDate);
    return expiryDate < today;
  }).length;

  const expiringSoonCount = products.filter((p) => {
    const expiryDate = new Date(p.expiryDate);
    const daysUntilExpiry = Math.ceil(
      (expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    );
    return daysUntilExpiry >= 0 && daysUntilExpiry <= 7;
  }).length;

  const totalProducts = products.length;

  return (
    <div className="p-4 space-y-6">
      {/* Summary Card */}
      <div className="bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl p-6 text-white">
        <div className="flex items-center gap-2 mb-8">
          <span className="text-xl">Today</span>
          <span className="opacity-60">•</span>
          <span className="opacity-80">
            {new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" })}
          </span>
        </div>
        
        <div className="flex items-center justify-around">
          <div className="flex flex-col items-center">
            <div className="text-3xl mb-2">{totalProducts}</div>
            <div className="text-sm opacity-80">Total</div>
          </div>
          
          <div className="h-16 w-px bg-white opacity-30"></div>
          
          <div className="flex flex-col items-center">
            <div className="text-3xl mb-2">{expiringSoonCount}</div>
            <div className="text-sm opacity-80">Expiring</div>
          </div>
          
          <div className="h-16 w-px bg-white opacity-30"></div>
          
          <div className="flex flex-col items-center">
            <div className="text-3xl mb-2">{expiredCount}</div>
            <div className="text-sm opacity-80">Expired</div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="space-y-3">
        <h2 className="text-sm">Quick Actions</h2>
        <div className="bg-white rounded-2xl border border-gray-200 divide-y divide-gray-200">
          <button
            onClick={onAddProduct}
            className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors first:rounded-t-2xl"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-teal-100 rounded-xl flex items-center justify-center">
                <Plus className="h-5 w-5 text-teal-600" />
              </div>
              <span className="text-sm">Add Product</span>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </button>
          
          <button
            onClick={onAddTeamMember}
            className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors last:rounded-b-2xl"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
              <span className="text-sm">Add Team Member</span>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </button>
        </div>
      </div>

      {/* Products Section */}
      <div className="space-y-3">
        <h2 className="text-sm">Products</h2>
        <div className="bg-white rounded-2xl border border-gray-200">
          <button
            onClick={onViewProducts}
            className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors rounded-2xl"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                <Package className="h-5 w-5 text-purple-600" />
              </div>
              <span className="text-sm">View & Manage Products</span>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </button>
        </div>
      </div>
    </div>
  );
}