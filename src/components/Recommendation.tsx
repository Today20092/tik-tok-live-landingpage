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
      className="recommendation_collapsible"
    >
      <p>
        {preview}
        {open ? '.' : '...'}
      </p>
      <CollapsibleContent forceMount hidden={!open}>
        <div className="recommendation_div">
          {paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </CollapsibleContent>
      <CollapsibleTrigger asChild>
        <Button variant="link" className="recommendation_button">
          {open ? 'Show less' : 'Read more'}
          <Chevron data-icon="inline-end" aria-hidden="true" />
        </Button>
      </CollapsibleTrigger>
    </Collapsible>
  );
}
