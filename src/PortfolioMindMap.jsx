import { useState, useRef, useEffect } from "react";

// ── トークン ──────────────────────────────────────────────
const CREAM = "#F1ECDD";
const INK = "#1a1a1a";
const RING = "#0c0c0c";

const CENTER_LABEL = "PORTFOLIO";
const CENTER_CODE = "RTD 001";

// 各項目 = レコードラベル風カード。accent はジャケットの色帯に使う。
const NODES = [
  {
    id: "conductor",
    label: "Space Conductor",
    en: "SPACE CONDUCTOR",
    code: "SC.03",
    sub: "統合環境デザインサービス",
    angle: -90,
    accent: ["#3f6b3a", "#7e9c6f"],
    photos: [
      { caption: "事業計画 概要図", src: "/images/conductor-01.jpeg" },
      { caption: "ゾーニング 照明案", src: "/images/conductor-02.jpeg" },
      { caption: "marché 出展プラン", src: "/images/conductor-03.jpeg" },
    ],
  },
  {
    id: "electric",
    label: "電気工事",
    en: "ELECTRICAL WORK",
    code: "EW.01",
    sub: "テナント電気工事",
    angle: 90,
    accent: ["#c45a2c", "#3a3a3a"],
    photos: [
      { caption: "案件A - 01", src: "/images/1E124F83-5ECB-46AA-9D6F-B9487DEE947D.jpeg" },
      { caption: "案件A - 02", src: "/images/141FEAA2-40CA-4CF9-A8E1-6391AF74FC72.jpeg" },
      { caption: "案件B - 01", src: "/images/30820932-8AB4-485C-B4B3-B7F4BDDA8CE5.jpeg" },
      { caption: "案件B - 02", src: "/images/7EAD256A-4513-4DCC-874D-10FA1D5B72F9.jpeg" },
      { caption: "案件B - 03", src: "/images/6FBB0173-329E-4DF6-8286-6533044B306D.jpg" },
      { caption: "案件B - 04", src: "/images/5E21A7E4-D843-48AB-9A56-FF7877FFDD9F.jpeg" },
      { caption: "案件C - 01", src: "/images/3CE03199-5F9E-4D43-B320-B7BF9C4FE1AE.jpeg" },
      { caption: "案件C - 02", src: "/images/9A286C3E-B30C-41B8-8CD8-F2158E4852DC.jpeg" },
      { caption: "案件C - 03", src: "/images/0019B5AA-E6D3-49EF-9585-CBD13B8A313E.jpeg" },
      { caption: "案件C - 04", src: "/images/615A7B31-044E-4FA7-BA02-328CE356F962.jpeg" },
      { caption: "案件C - 05", src: "/images/63251F90-4E54-48DE-A2D8-07B96CB0A87E.jpeg" },
      { caption: "案件C - 06", src: "/images/2237378A-DE58-4B92-A2C5-0198E462F9D9.jpeg" },
      { caption: "案件C - 07", src: "/images/DEEADBA2-45CF-46E1-A6BB-1AB0844B5468.jpeg" },
      { caption: "案件C - 08", src: "/images/EAB69500-E214-411A-899B-1E32BBA1D995.jpg" },
      { caption: "案件D - 01", src: "/images/28DFB670-A19F-4CBA-8BC2-61F9325E5CF9.jpg" },
      { caption: "案件D - 02", src: "/images/92CBBC93-AC7C-47A4-AF91-4785A201EA8D.jpg" },
      { caption: "案件D - 03", src: "/images/DE5E4B87-912E-4C57-AFEB-31FF7C2E64BC.jpg" },
      { caption: "案件E - 01", src: "/images/384B080D-CEC5-498E-BBF5-015E1098A66A.jpeg" },
      { caption: "案件E - 02", src: "/images/9733D0AB-26BE-48AE-83A9-4FD8F15391C7.jpeg" },
      { caption: "案件F - 01", src: "/images/0A46779D-7F5A-41D9-B0E4-88E09A3940C3.jpg" },
      { caption: "案件F - 02", src: "/images/6919BD90-1F7E-4333-970C-7F303A6C99DB.jpg" },
      { caption: "案件F - 03", src: "/images/51014CA4-FC28-453C-8780-EAC1C6CBED3F.jpeg" },
      { caption: "案件F - 04", src: "/images/B4477415-AEC2-460E-B8BC-920401F8D282.jpg" },
      { caption: "案件F - 05", src: "/images/D894F0A3-A20B-4EFE-8DAD-BAA4707DD255.jpg" },
      { caption: "案件G - 01", src: "/images/B87EF344-1D96-4E81-B3D3-7902EB2A9507.jpeg" },
      { caption: "案件G - 02", src: "/images/E4BB7538-2659-4217-8B6A-E13368A7AAC3.jpeg" },
      { caption: "案件G - 03", src: "/images/F148B4C6-2756-474D-9FD3-03ABA8051E97.jpeg" },
      { caption: "案件H - 01", src: "/images/IMG_0005.jpeg" },
      { caption: "案件H - 02", src: "/images/IMG_0374.jpeg" },
      { caption: "案件H - 03", src: "/images/IMG_0375.jpeg" },
      { caption: "案件H - 04", src: "/images/IMG_6634.jpeg" },
      { caption: "案件I - 01", src: "/images/IMG_3775.jpeg" },
      { caption: "案件I - 02", src: "/images/IMG_3796.jpeg" },
      { caption: "案件I - 03", src: "/images/IMG_3797.jpeg" },
      { caption: "案件J - 01", src: "/images/IMG_3715.jpeg" },
      { caption: "案件J - 02", src: "/images/IMG_3716.jpeg" },
      { caption: "案件K - 01", src: "/images/IMG_0791.jpeg" },
      { caption: "案件K - 02", src: "/images/IMG_0947.jpeg" },
      { caption: "案件K - 03", src: "/images/IMG_0949.jpeg" },
      { caption: "案件K - 04", src: "/images/IMG_0978.jpeg" },
      { caption: "案件K - 05", src: "/images/IMG_1412.jpeg" },
      { caption: "案件K - 06", src: "/images/IMG_1413.jpeg" },
      { caption: "案件K - 07", src: "/images/IMG_1415.jpeg" },
      { caption: "案件K - 08", src: "/images/IMG_1417.jpeg" },
      { caption: "案件L - 01", src: "/images/IMG_1138.jpeg" },
      { caption: "案件L - 02", src: "/images/IMG_1139.jpeg" },
      { caption: "案件L - 03", src: "/images/IMG_1156.jpeg" },
      { caption: "案件L - 04", src: "/images/IMG_1160.jpeg" },
      { caption: "案件L - 05", src: "/images/IMG_1161.jpeg" },
      { caption: "案件L - 06", src: "/images/IMG_1162.jpeg" },
      { caption: "案件L - 07", src: "/images/IMG_1163.jpeg" },
      { caption: "案件L - 08", src: "/images/IMG_1172.jpeg" },
      { caption: "案件L - 09", src: "/images/IMG_1173.jpeg" },
      { caption: "案件L - 10", src: "/images/IMG_1174.jpeg" },
      { caption: "案件L - 11", src: "/images/IMG_1178.jpeg" },
      { caption: "案件L - 12", src: "/images/IMG_1180.jpeg" },
      { caption: "案件L - 13", src: "/images/IMG_1185.jpeg" },
      { caption: "案件L - 14", src: "/images/IMG_1192.jpeg" },
      { caption: "案件M - 01", src: "/images/IMG_0018.jpeg" },
      { caption: "案件M - 02", src: "/images/IMG_0189.jpeg" },
      { caption: "案件M - 03", src: "/images/IMG_0198.jpeg" },
      { caption: "案件M - 04", src: "/images/IMG_0204.jpeg" },
      { caption: "案件M - 05", src: "/images/IMG_0400.jpeg" },
      { caption: "案件N - 01", src: "/images/IMG_4832.jpeg" },
      { caption: "案件N - 02", src: "/images/IMG_4839.jpeg" },
      { caption: "案件N - 03", src: "/images/IMG_4843.jpeg" },
      { caption: "案件N - 04", src: "/images/IMG_4854.jpeg" },
      { caption: "案件O - 01", src: "/images/IMG_2912.jpeg" },
      { caption: "案件O - 02", src: "/images/IMG_4296.jpeg" },
      { caption: "案件O - 03", src: "/images/IMG_4297.jpeg" },
      { caption: "案件O - 04", src: "/images/IMG_4298.jpeg" },
      { caption: "案件O - 05", src: "/images/IMG_4302.jpeg" },
      { caption: "案件O - 06", src: "/images/IMG_4567.jpeg" },
      { caption: "案件P - 01", src: "/images/IMG_4138.jpeg" },
      { caption: "案件P - 02", src: "/images/IMG_4136.jpeg" },
      { caption: "案件P - 03", src: "/images/IMG_4134.jpeg" },
      { caption: "案件P - 04", src: "/images/IMG_4132.jpeg" },
      { caption: "案件P - 05", src: "/images/IMG_2141.jpeg" },
      { caption: "案件P - 06", src: "/images/IMG_2136.jpeg" },
      { caption: "案件Q - 01", src: "/images/IMG_3198.jpeg" },
      { caption: "案件Q - 02", src: "/images/IMG_3202.jpeg" },
      { caption: "案件Q - 03", src: "/images/IMG_3203.jpeg" },
      { caption: "案件R - 01", src: "/images/IMG_0866.jpeg" },
      { caption: "案件R - 02", src: "/images/IMG_0869.jpeg" },
      { caption: "案件R - 03", src: "/images/IMG_0870.jpeg" },
      { caption: "案件S - 01", src: "/images/IMG_3801.jpeg" },
      { caption: "案件S - 02", src: "/images/IMG_3802.jpeg" },
      { caption: "案件T - 01", src: "/images/IMG_3511.jpeg" },
      { caption: "案件T - 02", src: "/images/IMG_3757.jpeg" },
      { caption: "案件T - 03", src: "/images/IMG_4491.jpeg" },
      { caption: "案件U - 01", src: "/images/IMG_5213.jpeg" },
      { caption: "案件U - 02", src: "/images/IMG_5248.jpeg" },
    ],
  },
  {
    id: "space",
    label: "光景",
    en: "SCENERY",
    code: "LS.02",
    sub: "灯の記録",
    angle: 150,
    accent: ["#5a6e8c", "#9aa6b5"],
    photos: [
      { caption: "光景 01", src: "/images/R0014544.jpeg" },
      { caption: "光景 02", src: "/images/IMG_4554.jpeg" },
      { caption: "光景 03", src: "/images/IMG_4646.jpeg" },
      { caption: "光景 04", src: "/images/IMG_4029.jpeg" },
      { caption: "光景 05", src: "/images/IMG_2990.jpeg" },
      { caption: "光景 06", src: "/images/IMG_3056.jpeg" },
      { caption: "光景 07", src: "/images/IMG_3159.jpeg" },
      { caption: "光景 08", src: "/images/IMG_3283.jpeg" },
      { caption: "光景 09", src: "/images/IMG_3298.jpeg" },
      { caption: "光景 10", src: "/images/IMG_4318.jpeg" },
      { caption: "光景 11", src: "/images/IMG_4739.jpeg" },
      { caption: "光景 12", src: "/images/IMG_5498.jpeg" },
    ],
  },
  {
    id: "flyer",
    label: "Flyer",
    en: "FLYER",
    code: "FL.04",
    sub: "フライヤー / グラフィックデザイン",
    angle: 30,
    accent: ["#8c4a8c", "#c79bc7"],
    photos: [
      { caption: "チラシデザイン 01", src: "/images/flyer01.JPG" },
      { caption: "チラシデザイン 02" },
      { caption: "チラシデザイン 03" },
    ],
  },
  {
    id: "av",
    label: "Installation",
    en: "AV SYSTEM DESIGN",
    code: "IR.05",
    sub: "システムインテグレーション設計",
    angle: -150,
    accent: ["#9c7a2c", "#d4b95f"],
    photos: [
      { caption: "信号フロー図", src: "/images/installation-01.jpeg" },
      { caption: "機器カタログ管理", src: "/images/installation-02.jpeg" },
      { caption: "AI構成検証", src: "/images/installation-03.jpeg" },
    ],
  },
  {
    id: "app",
    label: "音景",
    en: "SOUNDSCAPE",
    code: "SS.06",
    sub: "オリジナル音楽 / サウンドデザイン",
    type: "audio",
    angle: -30,
    accent: ["#2c5c66", "#7fb0ba"],
    photos: [
      { caption: "Track 01", audioSrc: "/audio/track-01.mp3" },
      { caption: "Track 02", audioSrc: "/audio/track-02.mp3" },
      { caption: "Track 03", audioSrc: "/audio/track-03.mp3" },
    ],
  },
];

// 登録した写真の枚数に応じて四角のサイズを決める
const BASE_SIZE = 40; // 写真が最少の項目のサイズ
const SIZE_STEP = 7; // 写真1枚増えるごとに大きくなる量
const MAX_SIZE = BASE_SIZE * 3; // 最大でも基準サイズの3倍まで
const MIN_PHOTO_COUNT = Math.min(...NODES.map((n) => n.photos.length));
function nodeSize(n) {
  return Math.min(
    MAX_SIZE,
    BASE_SIZE + (n.photos.length - MIN_PHOTO_COUNT) * SIZE_STEP
  );
}
const MAX_NODE_SIZE = Math.max(...NODES.map(nodeSize));

// ── レコードラベル風スクエア ────────────────────────────────
function VinylLabel({ size = 96, node, isCenter = false }) {
  const inset = size * 0.07;
  const holeSize = size * 0.09;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <rect
        x={1.5}
        y={1.5}
        width={size - 3}
        height={size - 3}
        rx={size * 0.06}
        fill={CREAM}
        stroke={RING}
        strokeWidth={isCenter ? 3 : 2}
      />
      <rect
        x={inset}
        y={inset}
        width={size - inset * 2}
        height={size - inset * 2}
        rx={size * 0.03}
        fill="none"
        stroke={RING}
        strokeWidth={0.6}
        opacity={0.45}
      />
      <rect
        x={size / 2 - holeSize / 2}
        y={size / 2 - holeSize / 2}
        width={holeSize}
        height={holeSize}
        fill={RING}
      />
      {!isCenter && node?.accent && (
        <g>
          {node.accent.map((c, i) => (
            <rect
              key={i}
              x={size / 2 - size * 0.22 + i * (size * 0.22)}
              y={size * 0.8}
              width={size * 0.2}
              height={size * 0.1}
              fill={c}
            />
          ))}
        </g>
      )}
    </svg>
  );
}

export default function PortfolioMindMap() {
  const [selected, setSelected] = useState(null);
  const [photoIndex, setPhotoIndex] = useState(0);
  const containerRef = useRef(null);
  const [dims, setDims] = useState({ w: 800, h: 600 });
  const [t, setT] = useState(0);

  useEffect(() => {
    function measure() {
      if (containerRef.current) {
        setDims({
          w: containerRef.current.clientWidth,
          h: containerRef.current.clientHeight,
        });
      }
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // 四角と線を同期させてゆらゆら動かすためのタイムループ
  useEffect(() => {
    let raf;
    const start = performance.now();
    function loop(now) {
      setT((now - start) / 1000);
      raf = requestAnimationFrame(loop);
    }
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  const cx = dims.w / 2;
  const cy = dims.h / 2;
  const radius = Math.min(dims.w, dims.h) * 0.5;

  function nodePos(angle, sz) {
    const rad = (angle * Math.PI) / 180;
    const r = Math.max(
      radius * 0.6,
      radius + (sz ? (sz - MAX_NODE_SIZE) * 1.2 : 0)
    );
    const padX = (sz || 60) / 2 + 30; // 四角＋ラベル分の余白
    const padY = (sz || 60) / 2 + 30;
    const x = Math.min(dims.w - padX, Math.max(padX, cx + r * Math.cos(rad)));
    const y = Math.min(
      dims.h - padY,
      Math.max(padY + 30, cy + r * Math.sin(rad))
    );
    return { x, y };
  }

  // ノードごとに異なる周期・位相でゆらぎを計算（線と四角で共通利用）
  function wobble(i) {
    const freq = 0.06 + (i % 4) * 0.018;
    const phase = i * 1.8;
    const dx = Math.sin(t * freq * 2 * Math.PI + phase) * 5;
    const dy = Math.cos(t * freq * 2 * Math.PI * 0.85 + phase * 1.3) * 5;
    const scale =
      1 + Math.sin(t * freq * 1.3 * 2 * Math.PI + phase * 0.7) * 0.07;
    return { dx, dy, scale };
  }

  const activeNode = NODES.find((n) => n.id === selected);

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        background: CREAM,
        fontFamily:
          "'Iowan Old Style','Georgia','Hiragino Mincho ProN',serif",
        position: "relative",
        overflow: "hidden",
        color: INK,
      }}
    >
      {/* ── ホーム：マインドマップ ───────────────────────── */}
      <div
        ref={containerRef}
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          opacity: selected ? 0 : 1,
          pointerEvents: selected ? "none" : "auto",
          transition: "opacity 0.35s ease",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 16,
            left: 0,
            width: "100%",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: 10,
              letterSpacing: 3,
              color: "#8a8576",
              marginBottom: 3,
            }}
          >
            電気環境計画 ARCHIVE
          </div>
          <div style={{ fontSize: 11, letterSpacing: 2, color: "#555" }}>
            {CENTER_CODE}
          </div>
        </div>

        <svg
          width={dims.w}
          height={dims.h}
          style={{ position: "absolute", top: 0, left: 0 }}
        >
          {NODES.map((n, i) => {
            const p = nodePos(n.angle, nodeSize(n));
            const { dx, dy } = wobble(i);
            return (
              <line
                key={n.id}
                x1={cx}
                y1={cy}
                x2={p.x + dx}
                y2={p.y + dy}
                stroke={RING}
                strokeWidth={1}
                opacity={0.55}
              />
            );
          })}
        </svg>

        <div
          style={{
            position: "absolute",
            left: cx,
            top: cy,
            transform: "translate(-50%, -50%)",
            lineHeight: 0,
          }}
        >
          <VinylLabel size={26} isCenter />
          <span
            style={{
              position: "absolute",
              top: "100%",
              left: "50%",
              transform: "translateX(-50%)",
              marginTop: 6,
              fontSize: 9,
              letterSpacing: 1.5,
              fontWeight: 600,
              color: INK,
              whiteSpace: "nowrap",
            }}
          >
            {CENTER_LABEL}
          </span>
        </div>

        {NODES.map((n, i) => {
          const p = nodePos(n.angle, nodeSize(n));
          const { dx, dy, scale } = wobble(i);
          return (
            <button
              key={n.id}
              onClick={() => {
                setSelected(n.id);
                setPhotoIndex(0);
              }}
              style={{
                position: "absolute",
                left: p.x,
                top: p.y,
                transform: "translate(-50%, -50%)",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
                lineHeight: 0,
                display: "inline-block",
              }}
              aria-label={n.label}
            >
              <div
                style={{
                  transform: `translate(${dx}px, ${dy}px) scale(${scale})`,
                  willChange: "transform",
                }}
              >
                <VinylLabel size={nodeSize(n)} node={n} />
              </div>
              <div
                style={{
                  position: "absolute",
                  top: "100%",
                  left: "50%",
                  transform: "translateX(-50%)",
                  marginTop: 7,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 4,
                  width: 150,
                }}
              >
                <span
                  style={{
                    fontSize: 12.5,
                    lineHeight: 1.35,
                    whiteSpace: "pre-line",
                    textAlign: "center",
                    color: INK,
                  }}
                >
                  {n.label}
                </span>
                <span
                  style={{
                    fontSize: 9.5,
                    letterSpacing: 1,
                    color: "#9a9484",
                  }}
                >
                  {n.code}
                </span>
              </div>
            </button>
          );
        })}

        <div
          style={{
            position: "absolute",
            bottom: 18,
            left: 0,
            width: "100%",
            textAlign: "center",
            fontSize: 10.5,
            color: "#9a9484",
            letterSpacing: 1.5,
          }}
        >
          項目をタップしてポートフォリオを見る
        </div>
      </div>

      {/* ── 拡大ビュー ───────────────────────────────────── */}
      {activeNode && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: CREAM,
            display: "flex",
            flexDirection: "column",
            animation: "fadeIn 0.35s ease",
          }}
        >
          <style>{`
            @keyframes fadeIn { from { opacity: 0; transform: scale(0.97); } to { opacity: 1; transform: scale(1); } }
          `}</style>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              padding: "22px 22px 16px",
              borderBottom: `1px solid ${RING}`,
            }}
          >
            <button
              onClick={() => setSelected(null)}
              style={{
                border: `1px solid ${RING}`,
                background: CREAM,
                width: 36,
                height: 36,
                borderRadius: 6,
                cursor: "pointer",
                fontSize: 15,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: INK,
              }}
              aria-label="戻る"
            >
              ←
            </button>
            <VinylLabel size={46} node={activeNode} />
            <div>
              <div
                style={{ fontSize: 9.5, letterSpacing: 2, color: "#9a9484" }}
              >
                {activeNode.en} · {activeNode.code}
              </div>
              <div
                style={{
                  fontSize: 16,
                  fontWeight: 700,
                  lineHeight: 1.25,
                  marginTop: 2,
                }}
              >
                {activeNode.label}
              </div>
              <div style={{ fontSize: 11, color: "#8a8576", marginTop: 2 }}>
                {activeNode.sub}
              </div>
            </div>
          </div>

          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 20,
              padding: 24,
            }}
          >
            <div
              style={{
                width: "min(72vw, 340px)",
                height: "min(102vw, 480px)",
                maxHeight: "72vh",
                borderRadius: 8,
                border: `2px solid ${RING}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                flexDirection: "column",
                gap: 10,
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* 左端タップ：前の写真へ */}
              <button
                onClick={() =>
                  setPhotoIndex(
                    (photoIndex - 1 + activeNode.photos.length) %
                      activeNode.photos.length
                  )
                }
                aria-label="前の写真"
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  width: "30%",
                  height: "100%",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  zIndex: 2,
                }}
              />
              {/* 右端タップ：次の写真へ */}
              <button
                onClick={() =>
                  setPhotoIndex((photoIndex + 1) % activeNode.photos.length)
                }
                aria-label="次の写真"
                style={{
                  position: "absolute",
                  right: 0,
                  top: 0,
                  width: "30%",
                  height: "100%",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  zIndex: 2,
                }}
              />

              {activeNode.type === "audio" ? (
                // ── 音楽データ：実ファイルがあれば <audio> プレイヤーを表示 ──
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 14,
                    padding: 20,
                    width: "100%",
                  }}
                >
                  <svg width="56" height="32" viewBox="0 0 56 32">
                    {[6, 14, 22, 11, 26, 9, 18, 13, 24, 8, 16].map((h, i) => (
                      <rect
                        key={i}
                        x={i * 5}
                        y={16 - h / 2}
                        width={3}
                        height={h}
                        fill={RING}
                        opacity={0.75}
                      />
                    ))}
                  </svg>
                  <span style={{ fontSize: 12, color: "#8a8576" }}>
                    {activeNode.photos[photoIndex].caption}
                  </span>
                  {activeNode.photos[photoIndex].audioSrc ? (
                    <audio
                      controls
                      src={activeNode.photos[photoIndex].audioSrc}
                      style={{ width: "90%" }}
                    />
                  ) : (
                    <span style={{ fontSize: 9.5, color: "#bdb6a3" }}>
                      （ここに音源プレイヤーが表示されます）
                    </span>
                  )}
                </div>
              ) : activeNode.photos[photoIndex].src ? (
                // ── 写真：実ファイルがあれば <img> で表示 ──
                <img
                  src={activeNode.photos[photoIndex].src}
                  alt={activeNode.photos[photoIndex].caption}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />
              ) : (
                // ── 写真未登録：プレースホルダー ──
                <>
                  <div
                    style={{
                      position: "absolute",
                      inset: "10%",
                      borderRadius: 4,
                      border: `0.5px solid ${RING}`,
                      opacity: 0.35,
                    }}
                  />
                  <div style={{ width: 14, height: 14, background: RING }} />
                  <span
                    style={{
                      fontSize: 12,
                      color: "#8a8576",
                      marginTop: 70,
                      letterSpacing: 0.5,
                    }}
                  >
                    {activeNode.photos[photoIndex].caption}
                  </span>
                  <span style={{ fontSize: 9.5, color: "#bdb6a3" }}>
                    （ここに写真が表示されます）
                  </span>
                </>
              )}

              {!activeNode.type && (
                <div
                  style={{
                    display: "flex",
                    gap: 6,
                    position: "absolute",
                    bottom: 10,
                  }}
                >
                  {activeNode.accent.map((c, i) => (
                    <div
                      key={i}
                      style={{ width: 18, height: 8, background: c }}
                    />
                  ))}
                </div>
              )}
            </div>

            <div style={{ display: "flex", gap: 10 }}>
              {activeNode.photos.map((p, i) => (
                <button
                  key={i}
                  onClick={() => setPhotoIndex(i)}
                  style={{
                    width: 10,
                    height: 10,
                    border: `1px solid ${RING}`,
                    background: i === photoIndex ? RING : CREAM,
                    cursor: "pointer",
                    padding: 0,
                  }}
                  aria-label={`photo ${i + 1}`}
                />
              ))}
            </div>

            <div
              style={{ fontSize: 10.5, color: "#9a9484", letterSpacing: 1 }}
            >
              {String(photoIndex + 1).padStart(2, "0")} /{" "}
              {String(activeNode.photos.length).padStart(2, "0")}
            </div>

            <div
              style={{
                fontSize: 10,
                color: "#bdb6a3",
                letterSpacing: 1,
                display: "flex",
                gap: 16,
                marginTop: 4,
              }}
            >
              <button
                onClick={() =>
                  setPhotoIndex(
                    (photoIndex - 1 + activeNode.photos.length) %
                      activeNode.photos.length
                  )
                }
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: 10,
                  color: "#bdb6a3",
                  letterSpacing: 1,
                  padding: 0,
                }}
              >
                ← 戻る
              </button>
              <button
                onClick={() =>
                  setPhotoIndex((photoIndex + 1) % activeNode.photos.length)
                }
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: 10,
                  color: "#bdb6a3",
                  letterSpacing: 1,
                  padding: 0,
                }}
              >
                進む →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
