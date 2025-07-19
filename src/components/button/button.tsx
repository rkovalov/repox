import { type ButtonProps, Button as RACButton } from 'react-aria-components';

import { css } from '@/../styled-system/css';

const buttonStyles = css({
  _disabled: {
    cursor: 'not-allowed',
    opacity: 0.5,
  },
  _focus: {
    outline: 'none',
    ring: '2px',
    ringColor: 'slate.500',
    ringOffset: '2px',
  },
  _hover: {
    backgroundColor: 'slate.600',
  },
  alignItems: 'center',
  backgroundColor: 'slate.700',
  borderRadius: '0.375rem',
  color: 'white',
  cursor: 'pointer',
  display: 'inline-flex',
  fontSize: '0.875rem',
  fontWeight: 500,
  justifyContent: 'center',
  padding: '0.5rem 1rem',
  transition: 'all 0.2s',
});

export function Button(props: ButtonProps) {
  return <RACButton className={buttonStyles} {...props} />;
}
