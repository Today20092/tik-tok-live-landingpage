import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Slot } from 'radix-ui';

const buttonVariants = cva('control', {
  variants: {
    variant: {
      default: 'control-primary',
      outline: 'control-outline',
      secondary: 'control-secondary',
      ghost: 'control-ghost',
      destructive: 'control-destructive',
      link: 'control-link',
    },
    size: {
      default: 'control-standard',
      xs: 'control-small',
      sm: 'control-small',
      lg: 'control-standard',
      icon: 'control-icon',
      'icon-xs': 'control-icon',
      'icon-sm': 'control-icon',
      'icon-lg': 'control-icon',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

function Button({
  className,
  variant = 'default',
  size = 'default',
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot.Root : 'button';

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
