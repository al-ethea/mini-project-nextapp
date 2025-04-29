'use client';
import Image from 'next/image';

import { useState } from 'react';

const videoList = [
  {
    id: 'si6Ox8IuZeU',
    title: 'Move (feat. Camila Cabello)',
    thumbnail: 'https://img.youtube.com/vi/si6Ox8IuZeU/hqdefault.jpg',
  },
  {
    id: 'fKopy74weus',
    title: 'Lauv - Because Of You',
    thumbnail: 'https://img.youtube.com/vi/fKopy74weus/hqdefault.jpg',
  },
  {
    id: 'PT2_F-1esPk',
    title: 'The Chainsmokers - Closer',
    thumbnail: 'https://img.youtube.com/vi/PT2_F-1esPk/hqdefault.jpg',
  },
  {
    id: 'NlwIDxCjL-8',
    title: 'Sting - Shape of My Heart',
    thumbnail: 'https://img.youtube.com/vi/NlwIDxCjL-8/hqdefault.jpg',
  },
  {
    id: '6ONRf7h3Mdk',
    title: 'Travis Scott - SICKO MODE ft. Drake',
    thumbnail: 'https://img.youtube.com/vi/6ONRf7h3Mdk/hqdefault.jpg',
  },
];

export default function NowWatching() {
  const [selectedVideo, setSelectedVideo] = useState(videoList[0]);

  return (
    <div className="flex flex-col md:flex-row gap-6">
      {/* Main Video */}
      <div className="flex-1">
        <div className="aspect-video w-full rounded overflow-hidden max-h-[500px]">
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${selectedVideo.id}`}
            title={selectedVideo.title}
            frameBorder="0"
            allowFullScreen
            className="w-full h-full"
          ></iframe>
        </div>
      </div>
      {/* Video List */}
      <div className="w-full md:w-80 space-y-3 overflow-y-auto max-h-[500px]">
        {videoList.map((video) => (
          <div
            key={video.id}
            onClick={() => setSelectedVideo(video)}
            className={`flex gap-3 cursor-pointer border rounded p-2 bg-[#2f2d2d] hover:bg-[#3a3838] transition ${
              selectedVideo.id === video.id
                ? 'border-red-500'
                : 'border-transparent'
            }`}
          >
            <Image
              src={video.thumbnail}
              alt={video.title}
              width={96}
              height={70}
              className="rounded object-cover"
            />
            <p className="text-sm font-semibold">{video.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
