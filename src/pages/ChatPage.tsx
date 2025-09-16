import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockChatHistory } from '../data/mockData';
import styled from 'styled-components';
import { NavButton } from '../components/StyledComponents';

interface Message {
  id: number;
  type: 'user' | 'ai';
  message: string;
  timestamp: string;
}

// Styled Components for Chat Page
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

  @media (max-width: 1400px) {
    max-width: 1000px;
  }

  @media (max-width: 1200px) {
    max-width: 900px;
    padding: 20px;
  }

  @media (max-width: 768px) {
    max-width: 100%;
    padding: 15px;
  }
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

  @media (max-width: 768px) {
    padding: 15px 20px;
    margin-bottom: 20px;
  }
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

  @media (max-width: 768px) {
    padding: 15px;
    height: calc(100vh - 320px);
    max-height: 400px;
  }
`;

const MessageBubble = styled.div<{ type: 'user' | 'ai' }>`
  max-width: 70%;
  padding: 15px 20px;
  border-radius: 20px;
  margin-bottom: 15px;
  line-height: 1.4;

  @media (max-width: 768px) {
    max-width: 85%;
    padding: 12px 16px;
  }
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

  @media (max-width: 768px) {
    padding: 12px 15px;
    gap: 8px;
  }
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

  @media (max-width: 768px) {
    padding: 10px 12px;
    font-size: 14px;
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

const VoiceButton = styled.button<{ isListening?: boolean }>`
  padding: 12px;
  border: none;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  cursor: pointer;
  background-color: ${(props) => (props.isListening ? '#dc3545' : '#87ceeb')};
  color: white;
  transition:
    background-color 0.3s ease,
    transform 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;

  &:hover {
    background-color: ${(props) => (props.isListening ? '#c82333' : '#00bfff')};
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

  &:hover {
    background-color: #007bff;
    color: white;
  }
`;

const QuickQuestionButtonWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const ChatPage: React.FC = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>(mockChatHistory);
  const [inputMessage, setInputMessage] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [isListening, setIsListening] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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

    // Simulate AI response
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

  const generateAIResponse = (userInput: string) => {
    const input = userInput.toLowerCase();

    if (input.includes('약') || input.includes('복용')) {
      return '네, 약물 복용에 대해 도움을 드리겠습니다. 현재 혈압약은 복용하셨고, 당뇨약과 비타민은 아직 복��하지 않으셨습니다. 궁금한 점이 있으시면 언제든 말씀해 주세요.';
    } else if (input.includes('운동') || input.includes('걸음')) {
      return '오늘은 3,240보를 걸으셨고, 2.1km를 이동하셨습니다. 총 25분간 운동하셨네요. 정말 좋습니다! 규칙적인 운동을 계속하시면 ��강에 도움이 됩니다.';
    } else if (input.includes('건강') || input.includes('상태')) {
      return '현재 건강 상태를 확인해보니 약물 복용도 잘 하고 계시고, 운동도 꾸준히 하고 계시네요. 계속 이렇게 관리하시면 건강한 생활을 유지하실 수 있을 것 같습니다.';
    } else if (input.includes('안녕') || input.includes('인사')) {
      return '안녕하세요! 저는 건강 관리를 도와드리는 AI입니다. 약물 복용, 운동, 건강에 대한 질문이 있으시면 언제든 말씀해 주세요.';
    } else {
      return '죄송합니다. 더 구체적으로 말씀해 주시면 더 정확한 도움을 드릴 수 있습니다. 약물 복용, 운동, 건강 상태에 대해 궁금한 점이 있으시면 언제든 말씀해 주세요.';
    }
  };

  // const handleVoiceInput = () => {
  //   if (isListening) {
  //     setIsListening(false);
  //     // Stop listening logic would go here
  //   } else {
  //     setIsListening(true);
  //     // Start listening logic would go here
  //     // For now, we'll simulate voice input
  //     setTimeout(() => {
  //       setInputMessage('오늘 약을 먹었는지 확인해주세요');
  //       setIsListening(false);
  //     }, 2000);
  //   }
  // };

  const handleVoiceInput = () => {
    if (isListening) {
      setIsListening(false);
      // Stop listening logic would go here
    } else {
      setIsListening(true);
      // Start listening logic would go here
      // For now, we'll simulate voice input
      setTimeout(() => {
        setInputMessage('오늘 약을 먹었는지 확인해주세요');
        setIsListening(false);
      }, 2000);
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
        <PageTitle>🤖 AI 음성 상담</PageTitle>
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
        <VoiceButton onClick={handleVoiceInput} isListening={isListening}>
          {isListening ? '⏹️' : '🎤'}
        </VoiceButton>
        <SendButton onClick={handleSendMessage} disabled={!inputMessage.trim()}>
          전송
        </SendButton>
      </InputArea>

      <QuickQuestionCard>
        <QuickQuestionTitle>빠른 질문</QuickQuestionTitle>
        <QuickQuestionButtonWrapper>
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
        </QuickQuestionButtonWrapper>
      </QuickQuestionCard>
    </ChatWrapper>
  );
};

export default ChatPage;
