/* Two transparent logo files: navy wordmark for light backgrounds, white wordmark for dark ones. */
const logos = {
  onLight: "/images/logo-on-light.png",
  onDark: "/images/logo-on-dark.png",
} as const;

export function Brand({ variant = "onLight" }: { variant?: keyof typeof logos }) {
  return (
    <img
      src={logos[variant]}
      alt="Elevate Care Pharmacy"
      width={992}
      height={256}
      className="brand-logo-img"
    />
  );
}
