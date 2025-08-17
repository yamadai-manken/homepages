// VideoToColorRadial.tsx
import { useEffect, useRef, useState } from 'react';
import lineWebm from '../../assets/to_loveru_drowing_3m_ankuru.webm';
import colorImg from '../../assets/to_loveru_color.png';

type Edge = 'center' | 'top' | 'bottom' | 'left' | 'right' | 'custom';

export default function VideoToColorRadial({
  revealMs = 1200,
  startAt = 'center',
  customPos = { x: 50, y: 50 },
  // ▼ 追加: 拡大率と拡大の基準位置
  scale = 1, // 1 = 等倍、2 = 2倍
  zoomAt = 'center' as Edge,
  zoomPos = { x: 50, y: 50 }, // zoomAt='custom' のときの%指定
}: {
  revealMs?: number;
  startAt?: Edge;
  customPos?: { x: number; y: number };
  scale?: number;
  zoomAt?: Edge;
  zoomPos?: { x: number; y: number };
}) {
  const vRef = useRef<HTMLVideoElement>(null);
  const [aspect, setAspect] = useState<number | null>(null);
  const [reveal, setReveal] = useState(false);

  // 動画メタデータからアスペクト比を決める
  useEffect(() => {
    const v = vRef.current;
    if (!v) return;
    const onLoaded = () => {
      if (v.videoWidth && v.videoHeight) {
        setAspect(v.videoWidth / v.videoHeight);
      }
    };
    v.addEventListener('loadedmetadata', onLoaded);
    return () => v.removeEventListener('loadedmetadata', onLoaded);
  }, []);

  // 色の広がり開始位置（reveal の中心）
  const revealOrigin = (() => {
    switch (startAt) {
      case 'top': return '50% 0%';
      case 'bottom': return '50% 100%';
      case 'left': return '0% 50%';
      case 'right': return '100% 50%';
      case 'custom': return `${customPos.x}% ${customPos.y}%`;
      default: return '50% 50%';
    }
  })();

  // ズームの基準位置（transform-origin）
  const zoomOrigin = (() => {
    switch (zoomAt) {
      case 'top': return '50% 0%';
      case 'bottom': return '50% 100%';
      case 'left': return '0% 50%';
      case 'right': return '100% 50%';
      case 'custom': return `${zoomPos.x}% ${zoomPos.y}%`;
      default: return '50% 50%';
    }
  })();

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: 960,
        height:'100%',
        overflow: 'hidden',
        background: '#fff',
      }}
    >
      {/* 下層：線画アニメ */}
      <video
        ref={vRef}
        src={lineWebm}
        autoPlay
        muted
        playsInline
        onEnded={(e) => {
          const video = e.currentTarget;
          video.pause();
          video.currentTime = video.duration;
          setReveal(true);
        }}
        className="zoomable"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          // CSS変数でズーム制御（動画と画像で共有）
          // @ts-expect-error CSS var
          ['--zoom' as any]: scale,
          ['--zoom-origin' as any]: zoomOrigin,
        }}
      />

      {/* 上層：色付き静止画（ラジアルマスクで中心から広げる） */}
      <img
        src={colorImg}
        alt=""
        className={reveal ? 'reveal-mask --on zoomable' : 'reveal-mask zoomable'}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          pointerEvents: 'none',
          // マスクの中心
          // @ts-expect-error CSS var
          ['--reveal-origin' as any]: revealOrigin,
          ['--reveal-ms' as any]: `${revealMs}ms`,
          // ズーム設定（動画と同値）
          ['--zoom' as any]: scale,
          ['--zoom-origin' as any]: zoomOrigin,
        }}
      />

      <style>{`
        /* 画像/動画の共通ズーム */
        .zoomable {
          transform-origin: var(--zoom-origin, 50% 50%);
          transform: scale(var(--zoom, 1));
          will-change: transform;
        }

        /* clip-path 版（多くのモダンブラウザでOK） */
        .reveal-mask {
          clip-path: circle(0% at var(--reveal-origin, 50% 50%));
          will-change: clip-path;
        }
        .reveal-mask.--on {
          animation: revealCircle var(--reveal-ms, 1200ms) ease-out forwards;
        }
        @keyframes revealCircle {
          from { clip-path: circle(0% at var(--reveal-origin, 50% 50%)); }
          to   { clip-path: circle(150% at var(--reveal-origin, 50% 50%)); }
        }

        /* 必要なら Safari 向け -webkit-mask 版に切り替え可（コメント参照） */
      `}</style>
    </div>
  );
}

