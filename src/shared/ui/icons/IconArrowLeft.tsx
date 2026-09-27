type Props = {
  className?: string;
  width?: number | string;
  height?: number | string;
};

export function IconArrowLeft({ className, width = 24, height = 24 }: Props) {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M19 12H7M11 6l-6 6 6 6" />
    </svg>
  );
}
