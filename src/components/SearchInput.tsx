import { useEffect, useRef, useState } from 'react';
import { IconSearch, IconX } from '@tabler/icons-react';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/components/ui/input-group';

export default function SearchInput() {
  const [query, setQuery] = useState('');
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // The page owns Pagefind initialization and URL synchronization.
    const sync = () => setQuery(input.current?.value || '');
    input.current?.addEventListener('search-sync', sync);
    const element = input.current;
    sync();
    return () => element?.removeEventListener('search-sync', sync);
  }, []);

  return (
    <InputGroup className="h-12">
      <InputGroupInput
        ref={input}
        id="site-search-input"
        type="search"
        aria-label="Search articles and resources"
        placeholder="Search articles and resources"
        autoComplete="off"
        enterKeyHint="search"
        className="h-full [&::-webkit-search-cancel-button]:appearance-none"
        onChange={(event) => setQuery(event.target.value)}
      />
      <InputGroupAddon>
        <IconSearch aria-hidden="true" />
      </InputGroupAddon>
      {query && (
        <InputGroupAddon align="inline-end">
          <InputGroupButton
            size="icon-sm"
            className="size-11"
            aria-label="Clear search"
            onClick={() => {
              if (!input.current) return;
              input.current.value = '';
              input.current.dispatchEvent(
                new Event('input', { bubbles: true })
              );
              setQuery('');
              input.current.focus();
            }}
          >
            <IconX aria-hidden="true" />
          </InputGroupButton>
        </InputGroupAddon>
      )}
    </InputGroup>
  );
}
