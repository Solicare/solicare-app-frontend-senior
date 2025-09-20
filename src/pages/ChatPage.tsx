import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { NavButton } from '../components/StyledComponents';

// Web Speech API 타입 선언
interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  abort(): void;
  onresult: (event: SpeechRecognitionEvent) => void;
  onerror: (event: SpeechRecognitionErrorEvent) => void;
  onstart: () => void;
  onend: () => void;
}

interface SpeechRecognitionEvent {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

interface SpeechRecognitionResultList {
  length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
  length: number;
  item(index: number): SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
  isFinal: boolean;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface SpeechRecognitionErrorEvent {
  error: string;
  message: string;
}

declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognition;
    webkitSpeechRecognition: new () => SpeechRecognition;
  }
}

const mockChatHistory = [
  {
    id: 1,
    type: 'ai' as const,
    message:
      '안녕하세요! 건강 관리 도우미입니다. 오늘은 어떤 도움이 필요하신가요?',
    timestamp: '2024-03-14 09:00',
  },
  {
    id: 2,
    type: 'user' as const,
    message: '오늘 운동량을 확인하고 싶어요.',
    timestamp: '2024-03-14 09:01',
  },
  {
    id: 3,
    type: 'ai' as const,
    message:
      '좋습니다! 오늘 걸음 수를 확인해보니 6,500걸음 걸으셨네요. 목표량까지 3,500걸음 더 필요합니다. 오후에 가벼운 산책을 추천드려요!',
    timestamp: '2024-03-14 09:02',
  },
];

interface Message {
  id: number;
  type: 'user' | 'ai';
  message: string;
  timestamp: string;
}

const ChatWrapper = styled.div`
  padding: 30px;
  background-color: #f0f2f5;
  height: 100vh;
  font-family: 'Roboto', sans-serif;
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  margin: 0 auto;
  overflow: hidden;
`;

const ChatHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  background-color: white;
  padding: 20px 30px;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
`;

const PageTitle = styled.h2`
  font-size: 28px;
  color: #343a40;
  margin: 0;
  font-weight: 700;
`;

const ChatContainer = styled.div`
  flex: 1;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  padding: 20px;
  margin-bottom: 20px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 350px);
  max-height: 500px;
`;

const MessageBubble = styled.div<{ type: 'user' | 'ai' }>`
  max-width: 70%;
  padding: 15px 20px;
  border-radius: 20px;
  margin-bottom: 15px;
  line-height: 1.4;
  font-size: 16px;
  background-color: ${(props) =>
    props.type === 'user' ? '#007bff' : '#e9ecef'};
  color: ${(props) => (props.type === 'user' ? 'white' : '#333')};
  align-self: ${(props) => (props.type === 'user' ? 'flex-end' : 'flex-start')};
  border-bottom-right-radius: ${(props) =>
    props.type === 'user' ? '5px' : '20px'};
  border-bottom-left-radius: ${(props) =>
    props.type === 'user' ? '20px' : '5px'};
`;

const MessageText = styled.div`
  margin-bottom: 5px;
`;

const Timestamp = styled.div`
  font-size: 12px;
  opacity: 0.7;
  text-align: right;
  margin-top: 5px;
`;

const TypingIndicator = styled.div`
  align-self: flex-start;
  padding: 15px 20px;
  border-radius: 20px;
  background-color: #e9ecef;
  color: #333;
  font-size: 16px;
  margin-bottom: 15px;
`;

const InputArea = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  padding: 15px 20px;
  margin-bottom: 20px;
`;

const ChatInput = styled.input`
  flex: 1;
  padding: 12px 15px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const SendButton = styled.button<{ disabled?: boolean }>`
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  background-color: #007bff;
  color: white;
  transition:
    background-color 0.3s ease,
    transform 0.2s ease;

  &:hover {
    background-color: #0056b3;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    background-color: #e9ecef;
    color: #a0a0a0;
    cursor: not-allowed;
    transform: none;
  }
`;

const VoiceButton = styled.button<{ $isListening?: boolean }>`
  padding: 12px;
  border: none;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  cursor: pointer;
  background-color: ${(props) => (props.$isListening ? '#ff4757' : '#87ceeb')};
  color: white;
  transition:
    background-color 0.3s ease,
    transform 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  animation: ${(props) =>
    props.$isListening ? 'pulse 1.5s ease-in-out infinite' : 'none'};

  @keyframes pulse {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
    }
  }

  &:hover {
    background-color: ${(props) =>
      props.$isListening ? '#ff3742' : '#00bfff'};
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const QuickQuestionCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
`;

const QuickQuestionTitle = styled.h3`
  font-size: 18px;
  color: #343a40;
  margin-bottom: 15px;
`;

const QuickQuestionButton = styled.button`
  padding: 10px 18px;
  border: 1px solid #007bff;
  border-radius: 20px;
  background-color: #e7f3ff;
  color: #007bff;
  font-size: 14px;
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    color 0.2s ease;
  margin-right: 10px;
  margin-bottom: 10px;

  &:hover {
    background-color: #007bff;
    color: white;
  }
`;

const ChatPage: React.FC = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>(() => {
    const savedMessages = localStorage.getItem('chatMessages');
    return savedMessages ? JSON.parse(savedMessages) : mockChatHistory;
  });
  const [inputMessage, setInputMessage] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [isListening, setIsListening] = useState<boolean>(false);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(
    null
  );
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(messages));
  }, [messages]);

  // 음성 인식 초기화
  useEffect(() => {
    if (
      'SpeechRecognition' in window ||
      'webkitSpeechRecognition' in window
    ) {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();

      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;
      recognitionInstance.lang = 'ko-KR';

      recognitionInstance.onresult = (event: SpeechRecognitionEvent) => {
        const transcript = event.results[0][0].transcript;
        setInputMessage(transcript);
        setIsListening(false);
      };

      recognitionInstance.onerror = (event: SpeechRecognitionErrorEvent) => {
        setIsListening(false);

        let errorMessage = '';
        switch (event.error) {
          case 'not-allowed':
            errorMessage =
              '마이크 접근 권한이 필요합니다.\n브라우저 설정에서 마이크 권한을 허용해주세요.';
            break;
          case 'no-speech':
            errorMessage = '음성이 감지되지 않았습니다.\n다시 시도해주세요.';
            break;
          case 'audio-capture':
            errorMessage =
              '마이크를 찾을 수 없습니다.\n마이크가 연결되어 있는지 확인해주세요.';
            break;
          case 'network':
            errorMessage =
              '네트워크 오류가 발생했습니다.\n인터넷 연결을 확인해주세요.';
            break;
          default:
            errorMessage = `음성 인식 오류가 발생했습니다.\n오류 코드: ${event.error}`;
        }

        alert(errorMessage);
      };

      recognitionInstance.onstart = () => {
        setIsListening(true);
      };

      recognitionInstance.onend = () => {
        setIsListening(false);
      };

      setRecognition(recognitionInstance);
    }
  }, []);

  const generateAIResponse = (userInput: string) => {
    const input = userInput.toLowerCase();

    if (
      input.includes('약') ||
      input.includes('복용') ||
      input.includes('먹었')
    ) {
      return '약 복용 관리는 정말 중요하죠! 현재 등록된 약물들의 복용 상태를 확인해보니, 꾸준히 잘 관리하고 계시는 것 같아요. 정해진 시간에 복용하는 것이 효과적입니다.';
    } else if (
      input.includes('운동') ||
      input.includes('걸음') ||
      input.includes('활동')
    ) {
      return '운동 기록을 보니 정말 꾸준히 하고 계시네요! 규칙적인 운동은 건강 관리의 핵심이에요. 오늘도 목표량 달성을 위해 화이팅하세요!';
    } else if (
      input.includes('건강') ||
      input.includes('상태') ||
      input.includes('컨디션')
    ) {
      return '전반적인 건강 상태가 안정적으로 보이네요! 약물 복용도 잘 하시고, 운동도 꾸준히 하시니 정말 모범적이세요. 계속 이런 패턴을 유지하시면 좋겠어요.';
    } else if (input.includes('안녕') || input.includes('인사')) {
      return '안녕하세요! 오늘도 건강 관리를 위해 도움이 필요하시면 언제든 말씀해 주세요. 어떤 것부터 확인해보실까요?';
    } else {
      return '네, 알겠습니다! 건강 관리와 관련해서 더 구체적으로 말씀해 주시면 정확한 정보를 제공해 드릴 수 있어요. 약물 복용, 운동, 건강 상태 중 어떤 부분이 궁금하신가요?';
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      type: 'user',
      message: inputMessage,
      timestamp: new Date().toLocaleString('ko-KR'),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    setTimeout(() => {
      const aiResponse = generateAIResponse(inputMessage);
      const aiMessage: Message = {
        id: Date.now() + 1,
        type: 'ai',
        message: aiResponse,
        timestamp: new Date().toLocaleString('ko-KR'),
      };

      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleVoiceInput = () => {
    if (!recognition) {
      alert(
        '이 브라우저는 음성 인식을 지원하지 않습니다.\nChrome, Edge, Safari 등의 최신 브라우저를 사용해주세요.'
      );
      return;
    }

    if (isListening) {
      recognition.stop();
      setIsListening(false);
    } else {
      try {
        // 첫 사용 시 안내 메시지
        if (!localStorage.getItem('voicePermissionRequested')) {
          alert(
            '음성 인식을 위해 마이크 접근 권한이 필요합니다.\n브라우저에서 권한 요청이 나타나면 "허용"을 클릭해주세요.'
          );
          localStorage.setItem('voicePermissionRequested', 'true');
        }

        recognition.start();
        setIsListening(true);
      } catch {
        alert(
          '음성 인식을 시작할 수 없습니다.\n다음을 확인해주세요:\n• 마이크가 연결되어 있는지\n• 브라우저 설정에서 마이크 권한이 허용되었는지\n• 다른 앱에서 마이크를 사용하고 있지 않은지'
        );
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <ChatWrapper>
      <ChatHeader>
        <PageTitle>🤖 AI 상담</PageTitle>
        <NavButton onClick={() => navigate('/')}>홈으로</NavButton>
      </ChatHeader>

      <ChatContainer>
        {messages.map((message) => (
          <MessageBubble key={message.id} type={message.type}>
            <MessageText>{message.message}</MessageText>
            <Timestamp>{message.timestamp}</Timestamp>
          </MessageBubble>
        ))}

        {isTyping && (
          <TypingIndicator>AI가 답변을 준비하고 있습니다...</TypingIndicator>
        )}

        <div ref={messagesEndRef} />
      </ChatContainer>

      <InputArea>
        <ChatInput
          type="text"
          placeholder="메시지를 입력하세요..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <VoiceButton $isListening={isListening} onClick={handleVoiceInput}>
          {isListening ? '🔴' : '🎤'}
        </VoiceButton>
        <SendButton onClick={handleSendMessage} disabled={!inputMessage.trim()}>
          전송
        </SendButton>
      </InputArea>

      <QuickQuestionCard>
        <QuickQuestionTitle>빠른 질문</QuickQuestionTitle>
        <div>
          {[
            '오늘 약을 먹었나요?',
            '운동은 얼마나 했나요?',
            '건강 상태는 어떤가요?',
            '다음 약은 언제 먹어야 하나요?',
          ].map((question, index) => (
            <QuickQuestionButton
              key={index}
              onClick={() => setInputMessage(question)}
            >
              {question}
            </QuickQuestionButton>
          ))}
        </div>
      </QuickQuestionCard>
    </ChatWrapper>
  );
};

export default ChatPage;
