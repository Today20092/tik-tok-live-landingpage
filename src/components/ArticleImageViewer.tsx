import { useEffect, useRef, useState } from 'react';
import { IconX, IconZoomIn, IconZoomOut } from '@tabler/icons-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';

export default function ArticleImageViewer() {
  const [image, setImage] = useState<{ src: string; alt: string } | null>(null);
  const [zoomed, setZoomed] = useState(false);
  const [point, setPoint] = useState({ x: 50, y: 50 });
  const pointerStart = useRef({ x: 0, y: 0 });
  const opener = useRef<HTMLButtonElement | null>(null);
  useEffect(() => {
    const cleanup: (() => void)[] = [];
    document.querySelectorAll<HTMLImageElement>('#article-body img, [data-article-image]').forEach((img) => {
      if (img.closest('a, button')) return;
      const trigger = document.createElement('button');
      trigger.type = 'button';
      trigger.className = 'block max-w-full cursor-zoom-in rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring';
      trigger.setAttribute('aria-label', `Enlarge image: ${img.alt || 'Article image'}`);
      trigger.setAttribute('aria-haspopup', 'dialog');
      img.before(trigger);
      trigger.append(img);
      const open = () => {
        opener.current = trigger;
        setZoomed(false);
        setPoint({ x: 50, y: 50 });
        setImage({ src: img.currentSrc || img.src, alt: img.alt });
      };
      trigger.addEventListener('click', open);
      cleanup.push(() => {
        trigger.removeEventListener('click', open);
        trigger.replaceWith(img);
      });
    });
    return () => cleanup.forEach((dispose) => dispose());
  }, []);

  return (
    <Dialog open={Boolean(image)} onOpenChange={(open) => { if (!open) setImage(null); }}>
      <DialogContent
        id="article-image-viewer"
        data-pagefind-ignore
        showCloseButton={false}
        className="max-h-[90dvh] grid-rows-[auto_minmax(0,1fr)] overflow-hidden sm:max-w-6xl"
        onCloseAutoFocus={(event) => {
          event.preventDefault();
          opener.current?.focus({ preventScroll: true });
        }}
      >
        <div className="flex items-start justify-between gap-4">
          <DialogHeader>
            <DialogTitle>Enlarged image</DialogTitle>
            <DialogDescription>Tap the image to zoom. Move your pointer or drag to explore; tap again to zoom out.</DialogDescription>
          </DialogHeader>
          <DialogClose asChild>
            <Button variant="outline" size="icon" className="min-h-11 min-w-11" aria-label="Close enlarged image">
              <IconX aria-hidden="true" />
            </Button>
          </DialogClose>
        </div>
        <div className="min-h-0 overflow-hidden text-center">
          {image && <button
            type="button"
            aria-label={zoomed ? 'Zoom out of image' : 'Zoom into image'}
            aria-pressed={zoomed}
            className={cn('relative inline-block max-w-full overflow-hidden rounded-md align-top focus-visible:outline-2 focus-visible:outline-ring', zoomed ? 'cursor-zoom-out touch-none' : 'cursor-zoom-in touch-manipulation')}
            onClick={(event) => { if (event.detail === 0) setZoomed(!zoomed); }}
            onPointerDown={(event) => {
              pointerStart.current = { x: event.clientX, y: event.clientY };
              event.currentTarget.setPointerCapture(event.pointerId);
            }}
            onPointerMove={(event) => {
              if (!zoomed) return;
              const rect = event.currentTarget.getBoundingClientRect();
              setPoint({ x: Math.max(0, Math.min(100, (event.clientX - rect.left) / rect.width * 100)), y: Math.max(0, Math.min(100, (event.clientY - rect.top) / rect.height * 100)) });
            }}
            onPointerUp={(event) => {
              if (Math.hypot(event.clientX - pointerStart.current.x, event.clientY - pointerStart.current.y) > 8) return;
              const rect = event.currentTarget.getBoundingClientRect();
              setPoint({ x: (event.clientX - rect.left) / rect.width * 100, y: (event.clientY - rect.top) / rect.height * 100 });
              setZoomed(!zoomed);
            }}
            onKeyDown={(event) => {
              const delta = { ArrowLeft: [-10, 0], ArrowRight: [10, 0], ArrowUp: [0, -10], ArrowDown: [0, 10] }[event.key];
              if (!zoomed || !delta) return;
              event.preventDefault();
              setPoint((p) => ({ x: Math.max(0, Math.min(100, p.x + delta[0])), y: Math.max(0, Math.min(100, p.y + delta[1])) }));
            }}
          >
            <img src={image.src} alt={image.alt} draggable={false} className="mx-auto h-auto max-h-[60dvh] w-auto max-w-full object-contain" style={{ transform: zoomed ? 'scale(2.5)' : 'scale(1)', transformOrigin: `${point.x}% ${point.y}%` }} />
            <span aria-hidden="true" className="pointer-events-none absolute bottom-3 right-3 rounded-full bg-background p-2 text-foreground shadow-sm">
              {zoomed ? <IconZoomOut size={20} /> : <IconZoomIn size={20} />}
            </span>
          </button>}
        </div>
      </DialogContent>
    </Dialog>
  );
}
