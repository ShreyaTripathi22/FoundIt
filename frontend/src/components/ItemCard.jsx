import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";

export function ItemCard({ item, onClick }) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer group relative overflow-hidden rounded-lg bg-zinc-900/50 border border-zinc-800/50 hover:border-zinc-700/50 transition-all duration-300"
    >
      <div className="aspect-square overflow-hidden">
        <img
          src={`http://localhost:3000/uploads/${item.Image}`}
          alt={item.Name}
          className="w-full h-full object-cover rounded-xl"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg text-white font-semibold truncate">{item.Name}</h3>
        <div className="flex items-center text-zinc-400 mt-1">
          <span className="text-sm">{item.Location}</span>
        </div>
      </div>
    </div>
  );
}
