import type { ProgramIconName } from "@/content/programs";
const paths: Record<ProgramIconName, string> = {
  alarm: "M5 3H19V21H5Z M8 6H16V11H8Z M9 16H15 M12 13V19",
  sprinkler:
    "M12 2V10 M7 10H17 M9 10V14H15V10 M6 17 3 20 M12 18V22 M18 17 21 20 M8 15 5 16 M16 15 19 16",
  pump: "M3 15H7 M17 15H21 M7 15A5 5 0 1 0 17 15A5 5 0 1 0 7 15 M12 10V4H19 M8 21H17 M10 13 14 17 M14 13 10 17",
  suppression:
    "M3 4H21 M7 4V10 M17 4V10 M5 10H9L7 13Z M15 10H19L17 13Z M3 21H21 M5 18H19 M7 15V16 M17 15V16",
  extinguisher:
    "M9 7H15V21H7V9L9 7Z M10 3H14V7 M10 3H17V6H20V12 M8 13H14 M8 16H14",
  egress:
    "M3 2H21V8H3Z M7 11H18V22 M7 22V11 M12 15H3 M3 15 6 12 M3 15 6 18 M15 16V17",
  backflow:
    "M2 11H7V16H17V11H22 M2 15H4V20H20V15H22 M7 11V6 M17 11V6 M4 6H10 M14 6H20 M12 16V11 M10 11H14",
  elevator: "M4 2H20V22H4Z M7 9H17V22 M12 9V22 M7 6 9 4 11 6 M13 4 15 6 17 4",
};
export function ProgramIcon({ name }: { name: ProgramIconName }) {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="square"
      aria-hidden="true"
    >
      <path d={paths[name]} pathLength="1" />
    </svg>
  );
}
