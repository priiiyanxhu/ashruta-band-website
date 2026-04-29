import { Instagram, ExternalLink } from "lucide-react";

interface InstagramFeedProps {
  username: string;
  profileUrl: string;
  displayName: string;
  bio?: string;
  followers?: string;
  posts?: number;
}

export function InstagramFeed({
  username,
  profileUrl,
  displayName,
  bio,
  followers,
  posts,
}: InstagramFeedProps) {
  return (
    <div className="group relative overflow-hidden rounded-lg border border-red-900/50 bg-gradient-to-br from-gray-900 to-black p-6 transition-all duration-300 hover:border-red-500 hover:shadow-lg hover:shadow-red-500/20">
      {/* Background glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-500/0 via-transparent to-red-500/0 opacity-0 transition-opacity duration-300 group-hover:opacity-10" />

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-gradient-to-br from-red-600 to-red-900 p-3">
              <Instagram className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-white">{displayName}</h3>
              <p className="text-sm text-gray-400">@{username}</p>
            </div>
          </div>
          <a
            href={profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-red-600 p-2 transition-all duration-300 hover:bg-red-700 hover:shadow-lg hover:shadow-red-600/50"
          >
            <ExternalLink className="h-5 w-5 text-white" />
          </a>
        </div>

        {/* Bio */}
        {bio && <p className="mb-4 text-sm text-gray-300">{bio}</p>}

        {/* Stats */}
        <div className="mb-6 grid grid-cols-2 gap-4 rounded-lg bg-black/40 p-4">
          {posts !== undefined && (
            <div className="text-center">
              <p className="text-lg font-bold text-red-500">{posts}</p>
              <p className="text-xs text-gray-400">Posts</p>
            </div>
          )}
          {followers && (
            <div className="text-center">
              <p className="text-lg font-bold text-red-500">{followers}</p>
              <p className="text-xs text-gray-400">Followers</p>
            </div>
          )}
        </div>

        {/* CTA Button */}
        <a
          href={profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full rounded-lg bg-gradient-to-r from-red-600 to-red-700 py-2 text-center font-semibold text-white transition-all duration-300 hover:from-red-700 hover:to-red-800 hover:shadow-lg hover:shadow-red-600/50"
        >
          Follow on Instagram
        </a>
      </div>
    </div>
  );
}
