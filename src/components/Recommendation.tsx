import { useState } from 'react';
import { IconChevronDown, IconChevronUp } from '@tabler/icons-react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from './ui/collapsible';
import { Button } from './ui/button';

interface Props {
  preview: string;
  paragraphs: string[];
}

export default function Recommendation({ preview, paragraphs }: Props) {
  const [open, setOpen] = useState(false);
  const Chevron = open ? IconChevronUp : IconChevronDown;
  return (
    <Collapsible
      open={open}
      onOpenChange={setOpen}
      className="text-muted-foreground text-base leading-relaxed"
    >
      <p>
        {preview}
        {open ? '.' : '...'}
      </p>
      <CollapsibleContent forceMount hidden={!open}>
        <div className="flex flex-col gap-3 pt-3">
          {paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </CollapsibleContent>
      <CollapsibleTrigger asChild>
        <Button variant="link" className="mt-1 min-h-11 px-0">
          {open ? 'Show less' : 'Read more'}
          <Chevron data-icon="inline-end" aria-hidden="true" />
        </Button>
      </CollapsibleTrigger>
    </Collapsible>
  );
}
