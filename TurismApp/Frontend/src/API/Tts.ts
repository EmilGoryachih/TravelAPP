export default function Tts(text: string) {
  return fetch("/speechToText?text=" + text, {
    headers: {
      responseType: 'blob',
      Accept: "audio/mpeg",
    }
  }).then((r: Response) => r.blob())
  .then((blob: Blob) => {
    const downloadUrl = window.URL.createObjectURL(blob);
    const audio = new Audio(downloadUrl)
    audio.load()
    audio.play()
  }).catch();
};