// app/(main)/watch/[slug]/_components/VideoPlayer.tsx
import type { Episode } from '@/types';

interface VideoPlayerProps {
  episode: Episode;
}

export function VideoPlayer({ episode }: VideoPlayerProps) {
  return (
    <div className="aspect-video bg-black rounded-lg overflow-hidden shadow-lg">
      <iframe
        width="100%"
        height="100%"
        src={`https://www.youtube.com/embed/${episode.youtubeVideoId}?autoplay=1&rel=0&modestbranding=1&showinfo=0`}
        title={episode.title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
}