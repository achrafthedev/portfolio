import { useMemo } from 'react';
import * as THREE from 'three';

function wrapLines(ctx, text, maxWidth, maxLines) {
  const words = text.split(' ');
  const lines = [];
  let current = '';

  for (const word of words) {
    const test = current ? `${current} ${word}` : word;
    if (ctx.measureText(test).width > maxWidth && current) {
      lines.push(current);
      current = word;
      if (lines.length === maxLines - 1) break;
    } else {
      current = test;
    }
  }
  if (current) lines.push(current);

  if (lines.length === maxLines && words.join(' ') !== lines.join(' ')) {
    lines[maxLines - 1] = `${lines[maxLines - 1].replace(/\s*\S*$/, '')}…`;
  }
  return lines;
}

// Generates a dynamic CanvasTexture carrying the project's real title, role,
// description and tags — used as the face of a 3D card in ProjectGallery so
// project data lives inside the scene itself rather than an HTML overlay.
// Drop a real image in /public/projects/<id>.jpg and swap this for
// useTexture(`${import.meta.env.BASE_URL}projects/${project.id}.jpg`) once
// screenshots exist (composite it behind this text instead of replacing it).
export function useCardTexture(project, color, lang = 'en') {
  return useMemo(() => {
    const W = 768;
    const H = 480;
    const canvas = document.createElement('canvas');
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext('2d');

    const gradient = ctx.createLinearGradient(0, 0, W, H);
    gradient.addColorStop(0, '#0c1030');
    gradient.addColorStop(1, '#020408');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, W, H);

    ctx.strokeStyle = color;
    ctx.lineWidth = 6;
    ctx.strokeRect(3, 3, W - 6, H - 6);

    ctx.fillStyle = color;
    ctx.globalAlpha = 0.15;
    ctx.beginPath();
    ctx.arc(W - 90, 90, 200, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;

    const pad = 40;

    ctx.fillStyle = color;
    ctx.font = '700 20px Inter, sans-serif';
    ctx.fillText((lang === 'fr' ? project.role_fr : project.role_en).toUpperCase(), pad, 56);

    ctx.fillStyle = '#f1f5f9';
    ctx.font = '800 52px Inter, sans-serif';
    ctx.fillText(project.title, pad, 118);

    ctx.fillStyle = '#cbd5e1';
    ctx.font = '400 24px Inter, sans-serif';
    const desc = lang === 'fr' ? project.desc_fr : project.desc_en;
    const lines = wrapLines(ctx, desc, W - pad * 2, 4);
    lines.forEach((line, i) => ctx.fillText(line, pad, 168 + i * 32));

    const tagY = H - 60;
    let tagX = pad;
    ctx.font = '600 18px Inter, sans-serif';
    (project.tags || []).slice(0, 4).forEach((tag) => {
      const textWidth = ctx.measureText(tag).width;
      const boxWidth = textWidth + 24;
      ctx.strokeStyle = color;
      ctx.lineWidth = 1.5;
      ctx.globalAlpha = 0.6;
      ctx.strokeRect(tagX, tagY, boxWidth, 32);
      ctx.globalAlpha = 1;
      ctx.fillStyle = '#e2e8f0';
      ctx.fillText(tag, tagX + 12, tagY + 22);
      tagX += boxWidth + 12;
    });

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 4;
    return texture;
  }, [project, color, lang]);
}
