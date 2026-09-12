import { useEffect, useRef, useState } from 'react';
import { IconX } from '@tabler/icons-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';

export default function ArticleImageViewer() {
  const [image, setImage] = useState<{ src: string; alt: string } | null>(null);
  const [fullSize, setFullSize] = useState(false);
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
        setFullSize(false);
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
        className="max-h-[90dvh] grid-rows-[auto_auto_minmax(0,1fr)] overflow-hidden sm:max-w-6xl"
        onCloseAutoFocus={(event) => {
          event.preventDefault();
          opener.current?.focus({ preventScroll: true });
        }}
      >
        <div className="flex items-start justify-between gap-4">
          <DialogHeader>
            <DialogTitle>Enlarged image</DialogTitle>
            <DialogDescription>Choose full size to read small details.</DialogDescription>
          </DialogHeader>
          <DialogClose asChild>
            <Button variant="outline" size="icon" className="min-h-11 min-w-11" aria-label="Close enlarged image">
              <IconX aria-hidden="true" />
            </Button>
          </DialogClose>
        </div>
        <Button variant="outline" className="min-h-11 justify-self-start" aria-pressed={fullSize} onClick={() => setFullSize(!fullSize)}>
          {fullSize ? 'Fit image' : 'Full size'}
        </Button>
        <div tabIndex={0} role="region" aria-label="Image, scroll to explore at full size" className="max-h-[65dvh] min-h-0 overflow-auto rounded-md focus-visible:outline-2 focus-visible:outline-ring">
          {image && <img src={image.src} alt={image.alt} className={cn('mx-auto h-auto w-auto', fullSize ? 'max-w-none' : 'max-h-[60dvh] max-w-full object-contain')} />}
        </div>
      </DialogContent>
    </Dialog>
  );
}
