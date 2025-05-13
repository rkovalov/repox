import { css } from '@/../styled-system/css';
import { Input as AriaInput } from 'react-aria-components';

const inputStyles = css({
  width: '100%',
  padding: '8px 12px',
  borderRadius: '6px',
  border: '1px solid',
  borderColor: 'gray.200',
  backgroundColor: 'slate.800',
  fontSize: 'sm',
  lineHeight: '1.5',
  transition: 'all 0.2s',
  _focus: {
    outline: 'none',
    borderColor: 'blue.500',
    boxShadow: '0 0 0 2px rgba(59, 130, 246, 0.2)',
  },
  _disabled: {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
  _hover: {
    borderColor: 'gray.300',
  },
});

type InputProps = React.ComponentProps<typeof AriaInput>;

export function Input(props: InputProps) {
  return <AriaInput className={inputStyles} {...props} />;
}
