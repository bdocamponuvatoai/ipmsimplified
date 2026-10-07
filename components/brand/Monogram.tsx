export function Monogram({ letter }: { letter: string }) {
  return (
    <span className="monogram" aria-hidden="true">
      <span>{letter}</span>
      <i />
    </span>
  );
}
