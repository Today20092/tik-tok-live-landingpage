import { useEffect, useRef, useState } from 'react';
import { IconX, IconZoomIn, IconZoomOut } from '@tabler/icons-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function ArticleImageViewer() {
  const [image, setImage] = useState<{
    src: string;
    alt: string;
    back?: { src: string; alt: string };
  } | null>(null);
  const [zoomed, setZoomed] = useState(false);
  const [point, setPoint] = useState({ x: 50, y: 50 });
  const pointerStart = useRef({ x: 0, y: 0 });
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (image && !dialog.current?.open) dialog.current?.showModal();
  }, [image]);
  useEffect(() => {
    const cleanup: (() => void)[] = [];
    document
      .querySelectorAll<HTMLImageElement>(
        '#article-body img, [data-article-image]'
      )
      .forEach((img) => {
        if (img.closest('a, button')) return;
        const trigger = document.createElement('button');
        trigger.type = 'button';
        trigger.className = 'article-image-trigger';
        trigger.setAttribute(
          'aria-label',
          `Enlarge image: ${img.alt || 'Article image'}`
        );
        trigger.setAttribute('aria-haspopup', 'dialog');
        img.before(trigger);
        trigger.append(img);
        const open = () => {
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
    // Buttons elsewhere (e.g. postcards) open the viewer with data-viewer-src/-alt.
    const openFromButton = (event: MouseEvent) => {
      const button = (event.target as Element).closest<HTMLElement>(
        '[data-viewer-src]'
      );
      if (!button) return;
      setZoomed(false);
      setPoint({ x: 50, y: 50 });
      setImage({
        src: button.dataset.viewerSrc!,
        alt: button.dataset.viewerAlt ?? '',
        back: button.dataset.viewerBack
          ? {
              src: button.dataset.viewerBack,
              alt: button.dataset.viewerBackAlt ?? '',
            }
          : undefined,
      });
    };
    document.addEventListener('click', openFromButton);
    cleanup.push(() => document.removeEventListener('click', openFromButton));
    return () => cleanup.forEach((dispose) => dispose());
  }, []);

  return (
    <dialog
      ref={dialog}
      id="article-image-viewer"
      data-pagefind-ignore
      aria-labelledby="article-image-viewer-title"
      aria-describedby="article-image-viewer-description"
      className="dialog_content article-image-viewer_dialogcontent"
      {...({ closedby: 'any' } as object)}
      onClose={() => setImage(null)}
      onClick={(event) => {
        // shortcut: backdrop-click fallback for browsers without closedby; drop once Safari ships it.
        if (
          'closedBy' in HTMLDialogElement.prototype ||
          event.target !== event.currentTarget
        )
          return;
        const rect = event.currentTarget.getBoundingClientRect();
        if (
          event.clientX < rect.left ||
          event.clientX > rect.right ||
          event.clientY < rect.top ||
          event.clientY > rect.bottom
        )
          event.currentTarget.close();
      }}
    >
      <div className="article-image-viewer_header">
        <div className="dialog_div">
          <h2
            id="article-image-viewer-title"
            className="dialog_dialogprimitive-title"
          >
            Enlarged image
          </h2>
          <p
            id="article-image-viewer-description"
            className="dialog_dialogprimitive-description"
          >
            Tap the image to zoom. Move your pointer or drag to explore; tap
            again to zoom out.
          </p>
        </div>
        <Button
          variant="outline"
          size="icon"
          className="article-image-viewer_close"
          aria-label="Close enlarged image"
          onClick={() => dialog.current?.close()}
        >
          <IconX aria-hidden="true" />
        </Button>
      </div>
      <div className="article-image-viewer_canvas">
        {image && (
          <button
            type="button"
            aria-label={zoomed ? 'Zoom out of image' : 'Zoom into image'}
            aria-pressed={zoomed}
            className={cn(
              'article-image-viewer_zoom',
              zoomed
                ? 'article-image-viewer_zoom-active'
                : 'article-image-viewer_zoom-idle'
            )}
            onClick={(event) => {
              if (event.detail === 0) setZoomed(!zoomed);
            }}
            onPointerDown={(event) => {
              pointerStart.current = { x: event.clientX, y: event.clientY };
              event.currentTarget.setPointerCapture(event.pointerId);
            }}
            onPointerMove={(event) => {
              if (!zoomed) return;
              const rect = event.currentTarget.getBoundingClientRect();
              setPoint({
                x: Math.max(
                  0,
                  Math.min(
                    100,
                    ((event.clientX - rect.left) / rect.width) * 100
                  )
                ),
                y: Math.max(
                  0,
                  Math.min(
                    100,
                    ((event.clientY - rect.top) / rect.height) * 100
                  )
                ),
              });
            }}
            onPointerUp={(event) => {
              if (
                Math.hypot(
                  event.clientX - pointerStart.current.x,
                  event.clientY - pointerStart.current.y
                ) > 8
              )
                return;
              const rect = event.currentTarget.getBoundingClientRect();
              setPoint({
                x: ((event.clientX - rect.left) / rect.width) * 100,
                y: ((event.clientY - rect.top) / rect.height) * 100,
              });
              setZoomed(!zoomed);
            }}
            onKeyDown={(event) => {
              const delta = {
                ArrowLeft: [-10, 0],
                ArrowRight: [10, 0],
                ArrowUp: [0, -10],
                ArrowDown: [0, 10],
              }[event.key];
              if (!zoomed || !delta) return;
              event.preventDefault();
              setPoint((p) => ({
                x: Math.max(0, Math.min(100, p.x + delta[0])),
                y: Math.max(0, Math.min(100, p.y + delta[1])),
              }));
            }}
          >
            {image.back ? (
              // Two-sided items (postcards) show front and back together.
              <span
                className="article-image-viewer_pair"
                style={{
                  transform: zoomed ? 'scale(2.5)' : 'scale(1)',
                  transformOrigin: `${point.x}% ${point.y}%`,
                }}
              >
                {[image, image.back].map((side) => (
                  <img
                    key={side.src}
                    src={side.src}
                    alt={side.alt}
                    draggable={false}
                    className="article-image-viewer_image"
                  />
                ))}
              </span>
            ) : (
              <img
                src={image.src}
                alt={image.alt}
                draggable={false}
                className="article-image-viewer_image"
                style={{
                  transform: zoomed ? 'scale(2.5)' : 'scale(1)',
                  transformOrigin: `${point.x}% ${point.y}%`,
                }}
              />
            )}
            <span aria-hidden="true" className="article-image-viewer_zoom-icon">
              {zoomed ? (
                <IconZoomOut size={20} aria-hidden="true" />
              ) : (
                <IconZoomIn size={20} aria-hidden="true" />
              )}
            </span>
          </button>
        )}
      </div>
    </dialog>
  );
}
