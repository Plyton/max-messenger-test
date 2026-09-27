import { memo } from 'react';
import type { ComponentPropsWithRef } from 'react';
import styles from './BaseInput.module.scss';

type Props = ComponentPropsWithRef<'input'>;

function BaseInput({ className, ...props }: Props) {
  return <input className={`${styles.input} ${className ?? ''}`} {...props} />;
}

export default memo(BaseInput);
