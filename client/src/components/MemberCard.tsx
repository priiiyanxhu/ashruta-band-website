import { useState } from "react";
import { Instagram, ChevronDown } from "lucide-react";

interface MemberCardProps {
  name: string;
  role: string;
  image: string;
  instagram?: string;
  onCardClick: () => void;
}

export default function MemberCard({
  name,
  role,
  image,
  instagram,
  onCardClick,
}: MemberCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group relative bg-gray-900 rounded-lg overflow-hidden cursor-pointer transition-all duration-500 hover:shadow-2xl hover:shadow-red-600/50 h-80"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onCardClick}
    >
      {/* Background Image */}
      <img
        src={image}
        alt={name}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500" />

      {/* Decorative Border */}
      <div className="absolute inset-0 border-2 border-red-600/0 group-hover:border-red-600/50 transition-colors duration-500 rounded-lg" />

      {/* Content Container */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 z-10">
        {/* Name */}
        <h3 className="text-xl font-bold text-white font-oswald mb-2 group-hover:text-red-400 transition-colors duration-300">
          {name}
        </h3>

        {/* Role - Always visible but animated */}
        <div
          className="overflow-hidden transition-all duration-500"
          style={{
            maxHeight: isHovered ? "100px" : "30px",
            opacity: 1,
          }}
        >
          <p className="text-red-500 font-semibold text-sm mb-3 font-oswald tracking-wider">
            {role}
          </p>

          {/* Role Description - Appears on hover */}
          <p className="text-gray-300 text-xs leading-relaxed mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
            Click to learn more about {name.split(" ")[0]}'s journey with Ashruta.
          </p>
        </div>

        {/* Social & Action Icons */}
        <div className="flex items-center justify-between pt-4 border-t border-red-600/30 group-hover:border-red-600/60 transition-colors duration-300">
          {instagram ? (
            <a
              href={instagram}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="p-2 bg-red-600/10 border border-red-600/30 rounded-lg hover:bg-red-600/20 hover:border-red-600 transition-all duration-300 hover:shadow-lg hover:shadow-red-600/20"
              title="Instagram"
            >
              <Instagram className="w-4 h-4 text-red-500" />
            </a>
          ) : (
            <div className="w-10 h-10" />
          )}

          {/* Expand Icon */}
          <div className="p-2 bg-red-600/10 border border-red-600/30 rounded-lg group-hover:bg-red-600/20 group-hover:border-red-600 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-red-600/20">
            <ChevronDown className="w-4 h-4 text-red-500 group-hover:translate-y-1 transition-transform duration-300" />
          </div>
        </div>
      </div>

      {/* Hover Glow Effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-red-600/0 via-red-600/0 to-red-600/0 group-hover:from-red-600/20 group-hover:to-red-600/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl" />
    </div>
  );
}
