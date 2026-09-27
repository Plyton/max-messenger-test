type Props = {
  className?: string;
  width?: number | string;
  height?: number | string;
};

export function IconSend({ className, width = 24, height = 24 }: Props) {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M3.5 11.2 20.3 3.7c.7-.3 1.4.4 1.1 1.1l-7.5 16.8c-.3.7-1.3.6-1.4-.2l-1.1-6.4-6.4-1.1c-.8-.1-.9-1.1-.2-1.4Zm8.9 2.9 1 5.4 5.2-11.6-11.6 5.2 5.4 1Z" />
    </svg>
  );
}
