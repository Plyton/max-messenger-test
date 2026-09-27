import type { ComponentPropsWithRef } from 'react';
import styles from './BaseButton.module.scss';

type Props = ComponentPropsWithRef<'button'>;

function BaseButton({ className, ...props }: Props) {
  return <button className={`${styles.button} ${className ?? ''}`} {...props} />;
}

export default BaseButton;
