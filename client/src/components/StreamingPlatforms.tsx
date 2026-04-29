import React from 'react';
import { Music, Apple } from 'lucide-react';

interface StreamingLink {
  platform: 'spotify' | 'apple';
  url: string;
  label: string;
}

interface StreamingPlatformsProps {
  links?: StreamingLink[];
}

export default function StreamingPlatforms({ links }: StreamingPlatformsProps) {
  // Default streaming links - replace with actual artist links
  const defaultLinks: StreamingLink[] = [
    {
      platform: 'spotify',
      url: 'https://open.spotify.com/search/ashruta%20the%20band',
      label: 'Listen on Spotify',
    },
    {
      platform: 'apple',
      url: 'https://music.apple.com/search?term=ashruta%20the%20band',
      label: 'Listen on Apple Music',
    },
  ];

  const streamingLinks = links || defaultLinks;

  return (
    <div className="mt-8 pt-8 border-t border-red-500/20">
      <h4 className="text-sm font-semibold text-gray-300 mb-4">Stream on Your Favorite Platform</h4>
      <div className="flex flex-wrap gap-3">
        {streamingLinks.map((link) => (
          <a
            key={link.platform}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
              link.platform === 'spotify'
                ? 'bg-green-600/20 hover:bg-green-600/40 text-green-400 hover:text-green-300 border border-green-600/30 hover:border-green-500'
                : 'bg-gray-800/50 hover:bg-gray-700/50 text-gray-300 hover:text-white border border-gray-700/50 hover:border-gray-600'
            }`}
          >
            {link.platform === 'spotify' ? (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-12.061-1.419-.479.12-1.02-.179-1.14-.66-.12-.48.179-1.02.66-1.14 4.5-1.26 9.791-.75 13.394 1.62.361.21.599.659.301 1.099zm.12-3.36C15.24 9.6 8.82 9.21 5.46 10.56c-.6.18-1.2-.18-1.38-.75-.18-.6.18-1.2.75-1.38 3.9-1.5 10.921-.84 15.24 1.26.6.21 1.02.84.6 1.44-.42.72-1.2.96-1.8.72z" />
              </svg>
            ) : (
              <Apple className="w-5 h-5" />
            )}
            <span>{link.label}</span>
          </a>
        ))}
      </div>

      {/* Additional streaming platforms info */}
      <div className="mt-6 p-4 bg-red-900/10 border border-red-500/20 rounded-lg">
        <p className="text-xs text-gray-400">
          🎵 <strong>Ashruta's music is available on all major streaming platforms.</strong> Search for "Ashruta the Band" or click above to add our tracks to your playlists and discover the Bollywood fusion metal revolution!
        </p>
      </div>
    </div>
  );
}
