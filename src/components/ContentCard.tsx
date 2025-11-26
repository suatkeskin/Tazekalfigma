import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Card } from "./ui/card";

interface ContentCardProps {
  title: string;
  description: string;
  imageQuery: string;
  compact?: boolean;
}

export function ContentCard({ title, description, imageQuery, compact }: ContentCardProps) {
  const imageUrls: Record<string, string> = {
    "mobile phone app": "https://images.unsplash.com/photo-1605108222700-0d605d9ebafe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBwaG9uZSUyMGFwcHxlbnwxfHx8fDE3NjMwNTA3MDF8MA&ixlib=rb-4.1.0&q=80&w=1080",
    "discover explore": "https://images.unsplash.com/photo-1640481312117-8c89697c4551?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXNjb3ZlciUyMGV4cGxvcmV8ZW58MXx8fHwxNzYzMTU3NDM1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    "trending popular": "https://images.unsplash.com/photo-1729215459766-538d1f06cfe2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmVuZGluZyUyMHBvcHVsYXJ8ZW58MXx8fHwxNzYzMTQ1NDIxfDA&ixlib=rb-4.1.0&q=80&w=1080",
    "startup begin": "https://images.unsplash.com/photo-1733826544831-ad71d05c8423?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGFydHVwJTIwYmVnaW58ZW58MXx8fHwxNzYzMTU3NDM1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    "design guidelines": "https://images.unsplash.com/photo-1596984292343-336a10af89fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNpZ24lMjBndWlkZWxpbmVzfGVufDF8fHx8MTc2MzE1NzQzNnww&ixlib=rb-4.1.0&q=80&w=1080",
  };

  return (
    <Card className="overflow-hidden">
      <ImageWithFallback
        src={imageUrls[imageQuery] || imageUrls["mobile phone app"]}
        alt={title}
        className={`w-full object-cover ${compact ? "h-24" : "h-40"}`}
      />
      <div className={compact ? "p-3" : "p-4"}>
        <h3 className={compact ? "text-sm" : ""}>{title}</h3>
        <p className={`text-gray-600 ${compact ? "text-xs" : "text-sm"} mt-1`}>
          {description}
        </p>
      </div>
    </Card>
  );
}