import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: "booking" | "music" | "band" | "general";
}

interface FAQAccordionProps {
  items: FAQItem[];
  title?: string;
  description?: string;
}

export default function FAQAccordion({ items, title, description }: FAQAccordionProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleItem = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const categories = {
    booking: "🎫 Booking & Tickets",
    music: "🎵 Music & Performances",
    band: "🎸 About the Band",
    general: "❓ General",
  };

  // Group items by category
  const groupedItems = items.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, FAQItem[]>);

  return (
    <div className="w-full">
      {title && (
        <div className="text-center mb-12">
          <h2
            className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-wider"
            style={{ fontFamily: "'Oswald', sans-serif" }}
          >
            {title}
          </h2>
          {description && (
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              {description}
            </p>
          )}
        </div>
      )}

      <div className="space-y-8">
        {Object.entries(groupedItems).map(([category, categoryItems]) => (
          <div key={category}>
            <h3
              className="text-2xl font-bold text-red-500 mb-6 flex items-center gap-2 uppercase tracking-wider"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              {categories[category as keyof typeof categories]}
            </h3>

            <div className="space-y-4">
              {categoryItems.map((item) => (
                <div
                  key={item.id}
                  className="border border-red-600/30 rounded-lg overflow-hidden transition-all duration-300 hover:border-red-600/60 hover:shadow-lg hover:shadow-red-600/20"
                >
                  <button
                    onClick={() => toggleItem(item.id)}
                    className="w-full px-6 py-4 flex items-center justify-between bg-black/50 hover:bg-black/70 transition-colors duration-200"
                  >
                    <span
                      className="text-lg font-semibold text-white text-left"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      {item.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-red-500 flex-shrink-0 ml-4 transition-transform duration-300 ${
                        expandedId === item.id ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {expandedId === item.id && (
                    <div className="px-6 py-4 bg-black/30 border-t border-red-600/20 animate-slideDown">
                      <p className="text-gray-300 leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
