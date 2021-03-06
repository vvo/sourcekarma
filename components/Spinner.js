export default function Spinner() {
  return (
    <svg
      className="animate-spin"
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        className="opacity-10"
        cx="100"
        cy="100"
        r="100"
        fill="currentColor"
      />
      <circle
        className="opacity-25"
        cx="100"
        cy="100"
        r="94.375"
        stroke="currentColor"
        strokeWidth="11.25"
      />
      <path
        className="opacity-75"
        d="M200 100C200 119.778 194.135 139.112 183.147 155.557C172.159 172.002 156.541 184.819 138.268 192.388C119.996 199.957 99.8891 201.937 80.491 198.079C61.0929 194.22 43.2746 184.696 29.2893 170.711L37.2425 162.757C49.6548 175.17 65.469 183.623 82.6853 187.047C99.9015 190.472 117.747 188.714 133.964 181.997C150.181 175.279 164.043 163.903 173.795 149.308C183.547 134.713 188.752 117.554 188.752 100H200Z"
        fill="currentColor"
      />
    </svg>
  );
}
