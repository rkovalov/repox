import { css } from '@/../styled-system/css';
import { type ButtonProps, Button as RACButton } from 'react-aria-components';

const buttonStyles = css({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '0.5rem 1rem',
  fontSize: '0.875rem',
  fontWeight: 500,
  borderRadius: '0.375rem',
  transition: 'all 0.2s',
  cursor: 'pointer',
  backgroundColor: 'slate.700',
  color: 'white',
  _hover: {
    backgroundColor: 'slate.600',
  },
  _focus: {
    outline: 'none',
    ring: '2px',
    ringColor: 'slate.500',
    ringOffset: '2px',
  },
  _disabled: {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
});

export function Button(props: ButtonProps) {
  return <RACButton className={buttonStyles} {...props} />;
}
