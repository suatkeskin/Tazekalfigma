import { Product } from "../types";
import { ProductCard } from "./ProductCard";
import { AlertCircle, Clock, Calendar, CheckCircle, Package, Plus, Search } from "lucide-react";
import { useState } from "react";
import { Input } from "./ui/input";

interface HomeScreenProps {
  products: Product[];
  onDeleteProduct: (id: string) => void;
  groupBy?: string;
  onAddProduct?: () => void;
}

export function HomeScreen({ products, onDeleteProduct, groupBy = "none", onAddProduct }: HomeScreenProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const getDaysUntilExpiration = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const expDate = new Date(date);
    expDate.setHours(0, 0, 0, 0);
    const diffTime = expDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Filter products based on search query
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const urgent = filteredProducts.filter((p) => getDaysUntilExpiration(p.expirationDate) <= 3);
  const soon = filteredProducts.filter(
    (p) => getDaysUntilExpiration(p.expirationDate) > 3 && getDaysUntilExpiration(p.expirationDate) <= 7
  );
  const thisMonth = filteredProducts.filter(
    (p) => getDaysUntilExpiration(p.expirationDate) > 7 && getDaysUntilExpiration(p.expirationDate) <= 30
  );
  const later = filteredProducts.filter((p) => getDaysUntilExpiration(p.expirationDate) > 30);

  const Section = ({
    title,
    items,
    icon: Icon,
    color,
    emptyMessage,
  }: {
    title: string;
    items: Product[];
    icon: any;
    color: string;
    emptyMessage?: string;
  }) => (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-3 px-4">
        <Icon className={`h-5 w-5 ${color}`} />
        <h2 className={color}>{title}</h2>
        <span className={`ml-auto text-sm ${color}`}>{items.length}</span>
      </div>
      {items.length === 0 ? (
        <p className="text-gray-400 text-sm px-4">{emptyMessage || "No items"}</p>
      ) : (
        <div className="space-y-2 px-4">
          {items
            .sort((a, b) => a.expirationDate.getTime() - b.expirationDate.getTime())
            .map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onDelete={onDeleteProduct}
              />
            ))}
        </div>
      )}
    </div>
  );

  const capitalizeCategory = (category: string) => {
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  // Group by category
  const groupByCategory = () => {
    const categories = new Map<string, Product[]>();
    products.forEach((product) => {
      const category = product.category;
      if (!categories.has(category)) {
        categories.set(category, []);
      }
      categories.get(category)!.push(product);
    });
    return Array.from(categories.entries()).sort((a, b) => a[0].localeCompare(b[0]));
  };

  // Render based on groupBy option
  const renderContent = () => {
    if (products.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-16 px-4">
          <Calendar className="h-16 w-16 text-gray-300 mb-4" />
          <h3 className="text-gray-600 mb-2">No products yet</h3>
          <p className="text-gray-400 text-sm text-center">
            Tap the + button to add your first product
          </p>
        </div>
      );
    }

    // None - Show all products in a single list
    if (groupBy === "none") {
      return (
        <div className="mb-6">
          <div className="space-y-2 px-4">
            {filteredProducts
              .sort((a, b) => a.expirationDate.getTime() - b.expirationDate.getTime())
              .map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onDelete={onDeleteProduct}
                />
              ))}
          </div>
        </div>
      );
    }

    // Category - Group by category
    if (groupBy === "category") {
      const categorizedProducts = groupByCategory();
      return (
        <>
          {categorizedProducts.map(([category, items]) => (
            <div key={category} className="mb-6">
              <div className="flex items-center gap-2 mb-3 px-4">
                <Package className="h-5 w-5 text-teal-600" />
                <h2 className="text-gray-900">{capitalizeCategory(category)}</h2>
                <span className="ml-auto text-sm text-gray-600">{items.length}</span>
              </div>
              <div className="space-y-2 px-4">
                {items
                  .sort((a, b) => a.expirationDate.getTime() - b.expirationDate.getTime())
                  .map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onDelete={onDeleteProduct}
                    />
                  ))}
              </div>
            </div>
          ))}
        </>
      );
    }

    // Expiration - Group by expiration date (default color-coded sections)
    return (
      <>
        <Section
          title="Expiring Soon"
          items={urgent}
          icon={AlertCircle}
          color="text-red-600"
          emptyMessage="Great! Nothing expiring urgently"
        />
        <Section
          title="This Week"
          items={soon}
          icon={Clock}
          color="text-orange-600"
        />
        <Section
          title="This Month"
          items={thisMonth}
          icon={Calendar}
          color="text-yellow-600"
        />
        <Section
          title="Later"
          items={later}
          icon={CheckCircle}
          color="text-green-600"
        />
      </>
    );
  };

  return (
    <div className="py-4 relative">
      <div className="px-4 mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>
      {renderContent()}
      
      {/* FAB Button */}
      {onAddProduct && (
        <button
          onClick={onAddProduct}
          className="fixed bottom-20 right-4 w-14 h-14 bg-teal-600 hover:bg-teal-700 text-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110 z-10"
          aria-label="Add product"
        >
          <Plus className="h-6 w-6" />
        </button>
      )}
    </div>
  );
}