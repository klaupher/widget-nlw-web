import html2canvas from 'html2canvas';
import { backgroundSize } from 'html2canvas/dist/types/css/property-descriptors/background-size';
import { Camera, Trash } from 'phosphor-react';
import React, { useState } from 'react';
import Loading from '../Loading';

interface ScreenshootButtonProps {
  screenshot: string | null;
  onScreenshotTook: (screenshot: string | null) => void;
}

function ScreenshootButton({ screenshot, onScreenshotTook }: ScreenshootButtonProps) {
  const [isTakingScreenshot, setIsTakingScreenshot] = useState(false);

  async function handleTakeScreenshot() {
    setIsTakingScreenshot(true);
    const canvas = await html2canvas(document.querySelector('html')!);
    const base64image = canvas.toDataURL('image/png');

    onScreenshotTook(base64image);

    setIsTakingScreenshot(false);
  }

  if (screenshot) {
    return (
      <button
        type="button"
        className="p-1 w-10 h-10 rounded-md border-transparent flex justify-end items-end text-sinc-400 hover:text-zinc-100 transition-colors"
        style={{
          backgroundImage: `url(${screenshot})`,
          backgroundPosition: 'right bottom',
          backgroundSize: 180,
        }}
      >
        <Trash weight="fill" onClick={() => onScreenshotTook(null)} />
      </button>
    );
  }
  return (
    <button
      type="button"
      onClick={handleTakeScreenshot}
      className="p-2 bg-zinc-800 rounded-md border-transparent hover:bg-zinc-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500"
    >
      {isTakingScreenshot ? <Loading /> : <Camera className="w-6 h-6" />}
    </button>
  );
}

export default ScreenshootButton;