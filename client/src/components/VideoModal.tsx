import { X } from "lucide-react";
import { useEffect } from "react";

interface VideoModalProps {
  videoSrc: string;
  title: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function VideoModal({ videoSrc, title, isOpen, onClose }: VideoModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white hover:text-red-500 transition-colors z-10"
        >
          <X className="w-8 h-8" />
        </button>
        <p className="text-white text-lg font-bold mb-3" style={{ fontFamily: "'Oswald', sans-serif" }}>
          {title}
        </p>
        <video
          src={videoSrc}
          controls
          autoPlay
          className="w-full rounded-sm border border-red-600/30"
          style={{ maxHeight: "80vh" }}
        />
      </div>
    </div>
  );
}
