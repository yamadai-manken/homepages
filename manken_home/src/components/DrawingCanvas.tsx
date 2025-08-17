import { useRef, useEffect } from 'react';

import lineSvgUrl from '../assets/to_loveru_line.svg?url';
import coloredSvgUrl from '../assets/to_loveru_color.svg?url';


export default function DrawingCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    canvas.width = 800;
    canvas.height = 800;

    const colorImg = new Image();
    colorImg.src = coloredSvgUrl;

    let svgPathElement: SVGPathElement;
    let totalLength = 0;
    let drawLength = 0;
    let colorRadius = 0;

    // SVGパスをフェッチして処理開始
    fetch(lineSvgUrl)
      .then(res => res.text())
      .then(svgText => {
        const parser = new DOMParser();
        const svgDoc = parser.parseFromString(svgText, 'image/svg+xml');
        const path = svgDoc.querySelector('path');

        if (!path) {
          console.error('SVG内に<path>が見つかりません');
          return;
        }

        svgPathElement = path;
        totalLength = svgPathElement.getTotalLength();

        requestAnimationFrame(drawLineStep);
      });

    // 線を順に描く
    function drawLineStep() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const step = 4;
      const samples = Math.floor(drawLength / step);

      ctx.beginPath();
      for (let i = 0; i <= samples; i++) {
        const pt = svgPathElement.getPointAtLength(i * step);
        if (i === 0) {
          ctx.moveTo(pt.x, pt.y);
        } else {
          ctx.lineTo(pt.x, pt.y);
        }
      }
      ctx.strokeStyle = 'black';
      ctx.lineWidth = 2;
      ctx.stroke();

      drawLength += step;
      if (drawLength < totalLength) {
        requestAnimationFrame(drawLineStep);
      } else {
        setTimeout(() => requestAnimationFrame(drawColorStep), 300);
      }
    }

    // 色を水滴のように広げていく
    function drawColorStep() {
      ctx.save();
      ctx.beginPath();
      ctx.arc(canvas.width / 2, canvas.height / 2, colorRadius, 0, 2 * Math.PI);
      ctx.clip();
      ctx.drawImage(colorImg, 0, 0, canvas.width, canvas.height);
      ctx.restore();

      colorRadius += 10;
      if (colorRadius < canvas.width * 1.5) {
        requestAnimationFrame(drawColorStep);
      }
    }
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ border: '1px solid #ccc', display: 'block', margin: '0 auto' }}
    />
  );
}

