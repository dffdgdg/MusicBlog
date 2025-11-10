"use client";

import { useState, useRef } from 'react';
import { Play, Pause, Volume2 } from 'lucide-react';

interface AudioPlayerProps {
  src: string;
  title?: string;
}

export default function AudioPlayer({ src, title = "Аудио пример" }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="bg-white/5 border border-orange-500/20 rounded-2xl p-4 my-6">
      <div className="flex items-center gap-4 mb-3">
        <button
          onClick={togglePlay}
          className="w-10 h-10 bg-orange-500 hover:bg-orange-600 rounded-full flex items-center justify-center transition-colors"
        >
          {isPlaying ? <Pause size={16} /> : <Play size={16} />}
        </button>
        
        <div className="flex-1">
          <p className="text-white font-semibold">{title}</p>
          <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
            <div 
              className="bg-orange-500 h-2 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <Volume2 className="text-gray-400" size={20} />
      </div>

      <audio
        ref={audioRef}
        src={src}
        onTimeUpdate={(e) => {
          const audio = e.currentTarget;
          const progress = (audio.currentTime / audio.duration) * 100;
          setProgress(progress);
        }}
        onEnded={() => {
          setIsPlaying(false);
          setProgress(0);
        }}
      />
    </div>
  );
}