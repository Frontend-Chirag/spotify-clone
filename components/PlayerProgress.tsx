import React, { useEffect, useState, useRef } from 'react';

interface PlayerProgressProps {
  songUrl: string;
}

const PlayerProgress: React.FC<PlayerProgressProps> = ({ songUrl }) => {
  const [audio] = useState(new Audio(songUrl));
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [duration, setDuration] = useState<number | null>(null);
  const [currentTime, setCurrentTime] = useState<number>(0);

  useEffect(() => {
    const updateProgress = () => {
      setCurrentTime(audio.currentTime);
    };

    const fetchDuration = () => {
      audio.addEventListener('loadeddata', () => {
        const songDuration = audio.duration;
        setDuration(isNaN(songDuration) ? null : songDuration);
      });
    };

    audio.addEventListener('timeupdate', updateProgress);
    fetchDuration();

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('loadeddata', fetchDuration);
    };
  }, [songUrl]);

  const togglePlayPause = () => {
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    audio.volume = newVolume;
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    if (!isNaN(newTime) && duration) {
      const newCurrentTime = (newTime / 100) * duration;
      setCurrentTime(newCurrentTime);
      audio.currentTime = newCurrentTime;
    }
  };

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className='flex '>
      <div>
        {/* <button onClick={() => audio.currentTime -= 5}>Previous</button> */}
        <button onClick={togglePlayPause}>{isPlaying ? 'Pause' : 'Play'}</button>
        {/* <button onClick={() => audio.currentTime += 5}>Next</button> */}
      </div>
      <input
        type="range"
        min="0"
        max={duration || 100}
        value={(currentTime / (duration || 1)) || 0}
        step="0.01"
        onChange={handleSeek}
      />
      <div>
        {formatTime(currentTime)} / {formatTime(duration || 0)}
      </div>
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={handleVolumeChange}
      />
    </div>
  );
};



export default PlayerProgress;
