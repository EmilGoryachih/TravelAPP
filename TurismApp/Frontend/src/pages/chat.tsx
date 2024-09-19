import Avatar from '@mui/material/Avatar';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import {useNavigate} from "react-router-dom";
import {purple} from "@mui/material/colors";
import {useEffect, useState} from "react";
import TextField from "@mui/material/TextField";

const Chat = () => {

  const navigate = useNavigate();  // Хук для навигации
  const [timeoutId, setTimeoutId] = useState<number | null>(null);
  const [messages, setMessages] = useState<{is_me: boolean, text: string}[]>([]);
  const [message, setMessage] = useState<string>('');

  const goBack = () => {
    navigate('/route-card');
  };

  useEffect(() => {
    updateMessages();

    return () => {
      if (timeoutId) {
        clearInterval(timeoutId);
      }
    };
  }, []);

  function updateMessages() {
    const oldSize = messages.length;
    fetch("/messages")
    .then(r => r.json())
    .then((data) => data as {is_me: boolean, text: string}[])
    .then((data) => {
      setMessages(data.reverse());
      console.log(data.length);
      console.log(oldSize);
      if (oldSize !== data.length) {
        scrollToBottom();
      }
    });

    setTimeoutId(setTimeout(() => {
      updateMessages();
    }, 7500));
  }

  function sendMessage(messageText: string) {
    if (messageText.trim().length === 0) {
      return;
    }

    setMessage('');
    fetch("/messages", {
      method: 'POST',
      body: JSON.stringify({text: messageText, is_me: true}),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(r => r.json())
    .then((data) => data as {is_me: boolean, text: string}[])
    .then(data => {
      setMessages(data.reverse());
      scrollToBottom();
    });
  }

  function scrollToBottom() {
    setTimeout(() => {
      window.scrollTo({top: document.body.scrollHeight + 100, behavior: 'smooth'});
    })
  }

  return (
    <div className="flex flex-col gap-2 px-4">
      <div className="flex items-center py-2 bg-white gap-4 sticky top-0">
        <ArrowLeftIcon color="primary" onClick={goBack}/>
        <Avatar
          alt="Пушистая Игрунка"
          src="./cocaine-dog.jpg"
          sx={{bgcolor: purple[500]}}
        />
        <span className="text-lg font-bold">Отель</span>
      </div>
      <div className="flex flex-col gap-2" id="chat">
        {messages.map((message, index) => <Message key={index} is_me={message.is_me} text={message.text}/>)}
        <div className="w-full h-20"></div>
      </div>
      <div className="flex items-center justify-between gap-4 fixed bottom-0 left-0 px-4 py-2 w-full bg-white">
        <TextField className="w-full" value={message} onChange={(e) => setMessage(e.target.value)}/>
        <button className="bg-blue-500 text-white rounded-lg px-4 py-2" onClick={() => sendMessage(message)}>
          Отправить
        </button>
      </div>
    </div>
  );
};

const Message = (props: { is_me: boolean, text: string }) => {
  return (
    <div
      className={`px-2 py-1 font-bold rounded-lg ${props.is_me ? 'bg-[#DEE6FF] ml-20' : 'bg-[#FEF7FF] mr-20'}`}>{props.text}</div>
  );
}

export default Chat;
