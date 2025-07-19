import { Input as AriaInput } from 'react-aria-components';

import { css } from '@/../styled-system/css';

const inputStyles = css({
  _disabled: {
    cursor: 'not-allowed',
    opacity: 0.5,
  },
  _focus: {
    borderColor: 'blue.500',
    boxShadow: '0 0 0 2px rgba(59, 130, 246, 0.2)',
    outline: 'none',
  },
  _hover: {
    borderColor: 'gray.300',
  },
  backgroundColor: 'slate.800',
  border: '1px solid',
  borderColor: 'gray.200',
  borderRadius: '6px',
  fontSize: 'sm',
  lineHeight: '1.5',
  padding: '8px 12px',
  transition: 'all 0.2s',
  width: '100%',
});

type InputProps = React.ComponentProps<typeof AriaInput>;

export function Input(props: InputProps) {
  return <AriaInput className={inputStyles} {...props} />;
}
