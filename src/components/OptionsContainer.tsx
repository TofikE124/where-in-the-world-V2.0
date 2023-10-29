interface Props {
  children: React.ReactNode;
}

export default function OptionsContainer({ children }: Props) {
  return (
    <div className={`options-container bx-s bg-white br grid`}>{children}</div>
  );
}
