/* webCAD - Persistencia DXF de imagenes embebidas | SPDX-License-Identifier: GPL-3.0-or-later */

const APP_ID = 'WEBCAD';
const FORMAT_MARKER = 'WEBCAD_IMAGE_V1';
const META_BEGIN = 'META_BEGIN';
const DATA_BEGIN = 'DATA_BEGIN';
const DATA_END = 'DATA_END';
const DXF_STRING_CHUNK = 240;

function chunks(value) {
  const result = [];
  for (let index = 0; index < value.length; index += DXF_STRING_CHUNK) {
    result.push(value.slice(index, index + DXF_STRING_CHUNK));
  }
  return result;
}

function rotatedVector(x, y, angle) {
  const cosine = Math.cos(angle);
  const sine = Math.sin(angle);
  return { x: x * cosine - y * sine, y: x * sine + y * cosine };
}

export function appendEmbeddedImageToDxf(lines, entity) {
  if (!entity?.source) return false;
  const angle = entity.rotation * Math.PI / 180;
  const lowerLeftOffset = rotatedVector(-entity.width * 0.5, entity.height * 0.5, angle);
  const uVector = rotatedVector(entity.width, 0, angle);
  const vVector = rotatedVector(0, -entity.height, angle);
  const metadata = encodeURIComponent(JSON.stringify({
    name: entity.name,
    center: entity.center,
    width: entity.width,
    height: entity.height,
    rotation: entity.rotation,
    opacity: entity.opacity,
    flipX: entity.flipX,
    flipY: entity.flipY,
  }));

  lines.push(
    '0', 'IMAGE',
    '8', entity.layer,
    '10', String(entity.center.x + lowerLeftOffset.x),
    '20', String(-(entity.center.y + lowerLeftOffset.y)),
    '30', '0',
    '11', String(uVector.x),
    '21', String(-uVector.y),
    '31', '0',
    '12', String(vVector.x),
    '22', String(-vVector.y),
    '32', '0',
    '13', '1', '23', '1',
    '340', '0',
    '70', '3', '280', '0',
    '1001', APP_ID,
    '1000', FORMAT_MARKER,
    '1000', META_BEGIN,
  );
  chunks(metadata).forEach((chunk) => lines.push('1000', chunk));
  lines.push('1000', DATA_BEGIN);
  chunks(entity.source).forEach((chunk) => lines.push('1000', chunk));
  lines.push('1000', DATA_END);
  return true;
}

export function parseEmbeddedImageFromDxf(entityPairs) {
  const appIndex = entityPairs.findIndex(([code, value]) => code === '1001' && value === APP_ID);
  if (appIndex < 0) return null;
  const values = entityPairs
    .slice(appIndex + 1)
    .filter(([code]) => code === '1000')
    .map(([, value]) => value);
  if (values[0] !== FORMAT_MARKER) return null;
  const metaStart = values.indexOf(META_BEGIN);
  const dataStart = values.indexOf(DATA_BEGIN);
  const dataEnd = values.lastIndexOf(DATA_END);
  if (metaStart < 0 || dataStart <= metaStart || dataEnd <= dataStart) return null;

  try {
    const metadata = JSON.parse(decodeURIComponent(values.slice(metaStart + 1, dataStart).join('')));
    const source = values.slice(dataStart + 1, dataEnd).join('');
    if (!source.startsWith('data:image/') || !source.includes(';base64,')) return null;
    return {
      source,
      name: String(metadata.name || 'Imagen PNG'),
      center: {
        x: Number(metadata.center?.x),
        y: Number(metadata.center?.y),
      },
      width: Number(metadata.width),
      height: Number(metadata.height),
      rotation: Number(metadata.rotation) || 0,
      opacity: Number(metadata.opacity) || 1,
      flipX: metadata.flipX === true,
      flipY: metadata.flipY === true,
    };
  }
  catch {
    return null;
  }
}

export function embeddedImageAppId() {
  return APP_ID;
}
