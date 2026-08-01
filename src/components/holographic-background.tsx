export function HolographicBackground() {
  return (
    <div className="holo-bg-root" aria-hidden="true">
      <div className="holo-bg-mesh" />
      <div className="holo-bg-grid" />
      <div className="holo-bg-frame">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/holoframe.png" alt="" />
      </div>
      <div className="holo-bg-vignette" />
      <div className="holo-bg-scanlines" />
    </div>
  );
}
