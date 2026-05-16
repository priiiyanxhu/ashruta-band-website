import { X, Instagram, Mail, Phone } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface Member {
  name: string;
  role: string;
  description: string;
  image: string;
  instagram?: string;
  email?: string;
  phone?: string;
  bio?: string;
  instruments?: string[];
  joinedYear?: number;
}

interface MemberModalProps {
  member: Member | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function MemberModal({ member, isOpen, onClose }: MemberModalProps) {
  if (!member) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-black border-red-600/50 text-white">
        <DialogHeader className="border-b border-red-600/30">
          <DialogTitle className="text-2xl font-oswald text-red-500">{member.name}</DialogTitle>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-6 py-6">
          {/* Member Image */}
          <div className="flex flex-col items-center">
            <div className="relative w-full max-w-xs mb-4">
              <div className="absolute inset-0 bg-gradient-to-br from-red-600/30 to-purple-600/20 rounded-lg blur-2xl" />
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-80 object-cover rounded-lg relative z-10 border-2 border-red-600/30"
              />
              {/* Corner accents */}
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-red-600 rounded-tr-lg" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-red-600 rounded-bl-lg" />
            </div>

            {/* Social Links */}
            <div className="flex gap-4 justify-center w-full">
              {member.instagram && (
                <a
                  href={member.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-red-600/10 border border-red-600/30 rounded-lg hover:bg-red-600/20 hover:border-red-600 transition-all duration-300"
                  title="Instagram"
                >
                  <Instagram className="w-5 h-5 text-red-500" />
                </a>
              )}
              {member.email && (
                <a
                  href={`mailto:${member.email}`}
                  className="p-2 bg-red-600/10 border border-red-600/30 rounded-lg hover:bg-red-600/20 hover:border-red-600 transition-all duration-300"
                  title="Email"
                >
                  <Mail className="w-5 h-5 text-red-500" />
                </a>
              )}
              {member.phone && (
                <a
                  href={`tel:${member.phone}`}
                  className="p-2 bg-red-600/10 border border-red-600/30 rounded-lg hover:bg-red-600/20 hover:border-red-600 transition-all duration-300"
                  title="Phone"
                >
                  <Phone className="w-5 h-5 text-red-500" />
                </a>
              )}
            </div>
          </div>

          {/* Member Details */}
          <div className="flex flex-col justify-start">
            {/* Role & Year */}
            <div className="mb-6">
              <h3 className="text-red-500 font-oswald text-lg mb-2">{member.role}</h3>
              {member.joinedYear && (
                <p className="text-gray-400 text-sm">Joined: {member.joinedYear}</p>
              )}
            </div>

            {/* Main Description */}
            <p className="text-gray-300 mb-6 leading-relaxed border-l-4 border-red-600/50 pl-4">
              {member.description}
            </p>

            {/* Extended Bio */}
            {member.bio && (
              <div className="mb-6">
                <h4 className="text-red-400 font-semibold mb-2">About</h4>
                <p className="text-gray-400 text-sm leading-relaxed">{member.bio}</p>
              </div>
            )}

            {/* Instruments */}
            {member.instruments && member.instruments.length > 0 && (
              <div>
                <h4 className="text-red-400 font-semibold mb-3">Instruments</h4>
                <div className="flex flex-wrap gap-2">
                  {member.instruments.map((instrument, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-red-600/10 border border-red-600/30 rounded-full text-sm text-red-300"
                    >
                      {instrument}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
