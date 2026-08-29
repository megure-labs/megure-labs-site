type LogoLockupProps = {
  inverse?: boolean;
};

export default function LogoLockup({ inverse = false }: LogoLockupProps) {
  return (
    <a
      className={`logo-lockup${inverse ? " logo-lockup-inverse" : ""}`}
      href="#top"
      aria-label="Megure Labs home"
    >
      <img src="/brand/megure-mark.png" alt="" className="logo-mark" />
      <span className="logo-type">
        Megure<span>Labs</span>
      </span>
    </a>
  );
}
