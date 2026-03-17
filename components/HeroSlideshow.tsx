'use client';

import React, { useEffect, useRef, useState } from 'react';

// Free Pexels beauty/spa stock videos — swap src for local files if preferred
export const VIDEO_SLIDES = [
    {
        src: 'https://videos.pexels.com/video-files/3997992/3997992-hd_1920_1080_30fps.mp4',
        poster: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=1200&q=80&auto=format',
    },
    {
        src: 'https://videos.pexels.com/video-files/4046457/4046457-hd_1920_1080_30fps.mp4',
        poster: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=1200&q=80&auto=format',
    },
    {
        src: 'https://videos.pexels.com/video-files/6663358/6663358-hd_1920_1080_30fps.mp4',
        poster: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1200&q=80&auto=format',
    },
    {
        src: 'https://videos.pexels.com/video-files/4355104/4355104-hd_1920_1080_30fps.mp4',
        poster: 'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=1200&q=80&auto=format',
    },
];

const INTERVAL_MS = 6000;
const FADE_MS = 1600;

interface Props {
    current: number;
    prev: number | null;
    fading: boolean;
}

const HeroSlideshow = ({ current, prev, fading }: Props) => {
    return (
        <div className="absolute inset-0 w-full h-full">
            {/* Previous video fading out */}
            {prev !== null && (
                <video
                    key={`prev-${prev}`}
                    src={VIDEO_SLIDES[prev].src}
                    poster={VIDEO_SLIDES[prev].poster}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{
                        opacity: fading ? 0 : 1,
                        transition: `opacity ${FADE_MS}ms cubic-bezier(0.4, 0, 0.2, 1)`,
                        zIndex: 1,
                    }}
                />
            )}

            {/* Current video */}
            <video
                key={`cur-${current}`}
                src={VIDEO_SLIDES[current].src}
                poster={VIDEO_SLIDES[current].poster}
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
                style={{
                    opacity: fading ? 0 : 1,
                    transition: `opacity ${FADE_MS}ms cubic-bezier(0.4, 0, 0.2, 1)`,
                    zIndex: 2,
                }}
            />
        </div>
    );
};

export { INTERVAL_MS, FADE_MS };
export default HeroSlideshow;
