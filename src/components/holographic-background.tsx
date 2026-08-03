/** Fixed ambient chrome: three web hologram atmosphere layers only. */

export function HolographicBackground() {
  return (
    <div className="holo-bg-root" aria-hidden="true">
      <div className="holo-bg-mesh" />
      <div className="holo-bg-atmosphere">
        {/* Beeple HUD bars — deep full-bleed atmosphere (CC BY 4.0 — credit in footer) */}
        <div className="holo-bg-layer holo-bg-layer--beeple">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/holo/web/web-holo-08-holographic-interface-beeple.jpg"
            alt=""
          />
        </div>
        {/* Cube energy tunnel — mid-field cyan band */}
        <div className="holo-bg-layer holo-bg-layer--tunnel">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/holo/web/web-holo-02-cube-energy-tunnel.jpg" alt="" />
        </div>
        {/* Teal LED cyber texture — soft corner collage */}
        <div className="holo-bg-layer holo-bg-layer--teal">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/holo/web/web-holo-05-teal-led-cyber.jpg" alt="" />
        </div>
      </div>
      <div className="holo-bg-grid" />
      <div className="holo-bg-vignette" />
      <div className="holo-bg-scanlines" />
    </div>
  );
}
