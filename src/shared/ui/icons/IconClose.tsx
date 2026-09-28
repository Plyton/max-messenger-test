type Props = {
  className?: string;
  width?: number | string;
  height?: number | string;
};

export function IconClose({ className, width = 24, height = 24 }: Props) {
  return (
    <svg className={className} width={width} height={height} viewBox="0 0 24 24" aria-hidden="true">
      <path d="m6 6 12 12M18 6 6 18" />
    </svg>
  );
}
