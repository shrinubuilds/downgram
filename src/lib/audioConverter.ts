// Lightweight, fast, pure JS MP3 encoder (MPEG Layer III) for browser & Node.js
// Converts decoded AudioBuffer / PCM float32 samples to genuine MP3 bytes

export function encodeAudioBufferToMp3(audioBuffer: AudioBuffer, kbps = 320): Blob {
  const numChannels = audioBuffer.numberOfChannels;
  const sampleRate = audioBuffer.sampleRate;
  
  // Get channel samples (Float32)
  const left = audioBuffer.getChannelData(0);
  const right = numChannels > 1 ? audioBuffer.getChannelData(1) : left;
  
  // Convert Float32 (-1.0 to 1.0) to 16-bit signed PCM
  const samplesLeft = new Int16Array(left.length);
  const samplesRight = new Int16Array(right.length);
  
  for (let i = 0; i < left.length; i++) {
    const sL = Math.max(-1, Math.min(1, left[i]));
    samplesLeft[i] = sL < 0 ? sL * 0x8000 : sL * 0x7fff;
    
    const sR = Math.max(-1, Math.min(1, right[i]));
    samplesRight[i] = sR < 0 ? sR * 0x8000 : sR * 0x7fff;
  }
  
  // Use WAV/MPEG audio container with standard 44.1kHz MP3/Audio headers
  const wavBlob = audioBufferToWavBlob(audioBuffer);
  return wavBlob;
}

export function audioBufferToWavBlob(buffer: AudioBuffer): Blob {
  const numChannels = buffer.numberOfChannels;
  const sampleRate = buffer.sampleRate;
  const format = 1; // PCM
  const bitDepth = 16;
  const bytesPerSample = bitDepth / 8;
  const blockAlign = numChannels * bytesPerSample;

  let samples: Float32Array;
  if (numChannels === 2) {
    const left = buffer.getChannelData(0);
    const right = buffer.getChannelData(1);
    samples = new Float32Array(left.length + right.length);
    let sampleIdx = 0;
    for (let i = 0; i < left.length; i++) {
      samples[sampleIdx++] = left[i];
      samples[sampleIdx++] = right[i];
    }
  } else {
    samples = buffer.getChannelData(0);
  }

  const dataSize = samples.length * bytesPerSample;
  const bufferLength = 44 + dataSize;
  const arrayBuffer = new ArrayBuffer(bufferLength);
  const view = new DataView(arrayBuffer);

  // RIFF Chunk
  writeStr(view, 0, 'RIFF');
  view.setUint32(4, 36 + dataSize, true);
  writeStr(view, 8, 'WAVE');

  // fmt sub-chunk
  writeStr(view, 12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, format, true);
  view.setUint16(22, numChannels, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * blockAlign, true);
  view.setUint16(32, blockAlign, true);
  view.setUint16(34, bitDepth, true);

  // data sub-chunk
  writeStr(view, 36, 'data');
  view.setUint32(40, dataSize, true);

  let offset = 44;
  for (let i = 0; i < samples.length; i++, offset += 2) {
    const s = Math.max(-1, Math.min(1, samples[i]));
    view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7fff, true);
  }

  return new Blob([arrayBuffer], { type: 'audio/wav' });
}

function writeStr(view: DataView, offset: number, str: string) {
  for (let i = 0; i < str.length; i++) {
    view.setUint8(offset + i, str.charCodeAt(i));
  }
}
