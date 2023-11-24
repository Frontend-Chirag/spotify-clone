import React from 'react';
import Slider from './Slider';

interface PlaybackSliderProps {
    currentTime: number;
    duration: number;
    onSliderChange: (value: number) => void;
}

const PlaybackSlider: React.FC<PlaybackSliderProps> = ({ currentTime, duration, onSliderChange }) => {
    const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

    return (
        <div className='flex items-center w-full'>
            <div className='flex-1 mr-2'>
                <Slider
                    value={progress}
                    onChange={(value) => onSliderChange(value / 100)}
                />
            </div>
            <div className='text-xs text-neutral-400'>{formatTime(currentTime)}</div>
        </div>
    );
};

const formatTime = (time: number): string => {
    // Format the time as needed (e.g., convert seconds to minutes:seconds)
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

export default PlaybackSlider;
