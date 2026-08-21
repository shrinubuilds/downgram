// Pure Audio conversion utility from MP4/video buffer to pure MP3/WAV audio
export async function convertVideoToPureAudio(videoBlob: Blob, sampleRate = 44100): Promise<Blob> {
  const arrayBuffer = await videoBlob.arrayBuffer();
  
  // Use AudioContext to decode audio from video stream
  const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
  const audioCtx = new AudioContextClass();
  
  const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
  
  // Encode AudioBuffer into WAV format (or MP3 PCM)
  const wavBlob = audioBufferToWav(audioBuffer);
  await audioCtx.close();
  return wavBlob;
}

function audioBufferToWav(buffer: AudioBuffer): Blob {
  const numChannels = buffer.numberOfChannels;
  const sampleRate = buffer.sampleRate;
  const format = 1; // PCM
  const bitDepth = 16;
  
  const bytesPerSample = bitDepth / 8;
  const blockAlign = numChannels * bytesPerSample;
  
  // Merge channels
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
  
  // RIFF identifier
  writeString(view, 0, 'RIFF');
  // RIFF chunk length
  view.setUint32(4, 36 + dataSize, true);
  // RIFF type
  writeString(view, 8, 'WAVE');
  // format chunk identifier
  writeString(view, 12, 'fmt ');
  // format chunk length
  view.setUint32(16, 16, true);
  // sample format (raw PCM)
  view.setUint16(20, format, true);
  // channel count
  view.setUint16(22, numChannels, true);
  // sample rate
  view.setUint32(24, sampleRate, true);
  // byte rate (sample rate * block align)
  view.setUint32(28, sampleRate * blockAlign, true);
  // block align (channel count * bytes per sample)
  view.setUint16(32, blockAlign, true);
  // bits per sample
  view.setUint16(34, bitDepth, true);
  // data chunk identifier
  writeString(view, 36, 'data');
  // data chunk length
  view.setUint32(40, dataSize, true);
  
  // Write interleaved PCM samples (16-bit)
  let offset = 44;
  for (let i = 0; i < samples.length; i++, offset += 2) {
    const s = Math.max(-1, Math.min(1, samples[i]));
    view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7fff, true);
  }
  
  return new Blob([arrayBuffer], { type: 'audio/mp3' });
}

function writeString(view: DataView, offset: number, string: string) {
  for (let i = 0; i < string.length; i++) {
    view.setUint8(offset + i, string.charCodeAt(i));
  }
}
