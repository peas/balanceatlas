import {useCallback, useMemo, useRef} from 'react';
import {AbsoluteFill, OffthreadVideo} from 'remotion';
import {engrave} from './engine.mjs';
import {engineSettings, looks} from './settings.mjs';

/** Same RGBA engine and 480px processing scale as the browser lab.
 * Synchronous in Remotion's frame callback so exports finish the filtered frame before capture.
 * This preserves source aspect ratio; the surrounding composition may add text/voiceover/paint.
 */
export function EngravedVideo({src, settings = looks.graphite, processingWidth = 480}: {
  src: string; settings?: typeof looks.graphite; processingWidth?: number;
}) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const options = useMemo(() => engineSettings(settings), [settings]);
  const onVideoFrame = useCallback((frame: CanvasImageSource) => {
    const target = canvas.current;
    if (!target) return;
    const source = frame as HTMLVideoElement & HTMLImageElement;
    const width = source.videoWidth || source.naturalWidth || source.width;
    const height = source.videoHeight || source.naturalHeight || source.height;
    if (!width || !height) return;
    const h = Math.round(processingWidth * height / width);
    if (target.width !== processingWidth || target.height !== h) {
      target.width = processingWidth; target.height = h;
    }
    const ctx = target.getContext('2d', {willReadFrequently: true})!;
    ctx.clearRect(0, 0, target.width, h);
    ctx.drawImage(frame, 0, 0, target.width, h);
    const image = ctx.getImageData(0, 0, target.width, h);
    ctx.putImageData(new ImageData(engrave(image.data, target.width, h, options), target.width, h), 0, 0);
  }, [options, processingWidth]);
  return <AbsoluteFill style={{backgroundColor: settings.paper}}>
    <OffthreadVideo src={src} muted onVideoFrame={onVideoFrame} style={{opacity: 0, position: 'absolute', inset: 0}} />
    <canvas ref={canvas} style={{position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'contain'}} />
  </AbsoluteFill>;
}
