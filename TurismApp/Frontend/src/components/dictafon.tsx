import SpeechRecognition, {useSpeechRecognition} from 'react-speech-recognition';

interface DictafonProps {
  onCafe: () => void,
  onGasStation: () => void
}

const Dictaphone = ({onCafe, onGasStation}: DictafonProps) => {
  const {transcript, browserSupportsSpeechRecognition} = useSpeechRecognition({
    commands: [
      {
        command: ['заправка', 'АЗС', 'автозаправка', 'заправиться', 'заправить'],
        callback: () => {
          SpeechRecognition.abortListening();
          onGasStation();
        },
        matchInterim: true,
      },
      {
        command: ['покушать', 'кафе', 'еда'],
        callback: () => {
          SpeechRecognition.abortListening();
          onCafe();
        },
        matchInterim: true,
      },
    ]
  });

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  SpeechRecognition.startListening({continuous: true}).then();

  return <code className="hidden">{transcript}</code>;
};
export default Dictaphone;