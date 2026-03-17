export function DroplyLogo() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <defs>
        <linearGradient id="logoGrad" x1="0" y1="0" x2="32" y2="32">
          <stop stopColor="#7c5cfc" />
          <stop offset="1" stopColor="#c084fc" />
        </linearGradient>
      </defs>
      <path
        d="M16 2C16 2 6 14 6 20a10 10 0 0020 0C26 14 16 2 16 2z"
        fill="url(#logoGrad)"
        opacity="0.9"
      />
      <path
        d="M16 6C16 6 10 14 10 18a6 6 0 0012 0C22 14 16 6 16 6z"
        fill="white"
        opacity="0.2"
      />
    </svg>
  );
}
