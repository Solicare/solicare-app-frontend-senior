import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockChatHistory } from '../data/mockData';
import { 
  Container, 
  LargeButton, 
  LargeText, 
  MediumText, 
  Card, 
  NavContainer, 
  NavButton,
  RegularText,
  LargeInput
} from '../components/StyledComponents';

const ChatPage = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState(mockChatHistory);
  const [inputMessage, setInputMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      message: inputMessage,
      timestamp: new Date().toLocaleString('ko-KR')
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputMessage);
      const aiMessage = {
        id: Date.now() + 1,
        type: 'ai',
        message: aiResponse,
        timestamp: new Date().toLocaleString('ko-KR')
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (userInput) => {
    const input = userInput.toLowerCase();
    
    if (input.includes('약') || input.includes('복용')) {
      return '네, 약물 복용에 대해 도움을 드리겠습니다. 현재 혈압약은 복용하셨고, 당뇨약과 비타민은 아직 복용하지 않으셨습니다. 궁금한 점이 있으시면 언제든 말씀해 주세요.';
    } else if (input.includes('운동') || input.includes('걸음')) {
      return '오늘은 3,240보를 걸으셨고, 2.1km를 이동하셨습니다. 총 25분간 운동하셨네요. 정말 좋습니다! 규칙적인 운동을 계속하시면 건강에 도움이 됩니다.';
    } else if (input.includes('건강') || input.includes('상태')) {
      return '현재 건강 상태를 확인해보니 약물 복용도 잘 하고 계시고, 운동도 꾸준히 하고 계시네요. 계속 이렇게 관리하시면 건강한 생활을 유지하실 수 있을 것 같습니다.';
    } else if (input.includes('안녕') || input.includes('인사')) {
      return '안녕하세요! 저는 건강 관리를 도와드리는 AI입니다. 약물 복용, 운동, 건강에 대한 질문이 있으시면 언제든 말씀해 주세요.';
    } else {
      return '죄송합니다. 더 구체적으로 말씀해 주시면 더 정확한 도움을 드릴 수 있습니다. 약물 복용, 운동, 건강 상태에 대해 궁금한 점이 있으시면 언제든 말씀해 주세요.';
    }
  };

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

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <Container>
      <NavContainer>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <MediumText style={{ margin: 0 }}>🤖 AI 음성 상담</MediumText>
          <NavButton onClick={() => navigate('/')}>홈으로</NavButton>
        </div>
      </NavContainer>

      <LargeText>AI와 대화하기</LargeText>

      {/* 음성 입력 버튼 */}
      <Card>
        <div style={{ textAlign: 'center' }}>
          <LargeButton
            variant={isListening ? 'secondary' : 'primary'}
            onClick={handleVoiceInput}
            style={{ 
              width: '200px', 
              height: '100px', 
              fontSize: '20px',
              borderRadius: '50%',
              margin: '20px 0'
            }}
          >
            {isListening ? '🎤 듣는 중...' : '🎤 음성 입력'}
          </LargeButton>
          <RegularText style={{ margin: '10px 0' }}>
            {isListening ? '말씀해 주세요...' : '버튼을 눌러 음성으로 질문하세요'}
          </RegularText>
        </div>
      </Card>

      {/* 채팅 메시지 */}
      <Card style={{ height: '400px', overflowY: 'auto', margin: '20px 0' }}>
        <div style={{ padding: '10px' }}>
          {messages.map((message) => (
            <div
              key={message.id}
              style={{
                display: 'flex',
                justifyContent: message.type === 'user' ? 'flex-end' : 'flex-start',
                margin: '15px 0'
              }}
            >
              <div
                style={{
                  maxWidth: '70%',
                  padding: '15px 20px',
                  borderRadius: '20px',
                  backgroundColor: message.type === 'user' ? '#007bff' : '#e9ecef',
                  color: message.type === 'user' ? 'white' : '#333',
                  fontSize: '18px',
                  lineHeight: '1.4'
                }}
              >
                <div>{message.message}</div>
                <div style={{ 
                  fontSize: '14px', 
                  opacity: 0.7, 
                  marginTop: '5px',
                  textAlign: 'right'
                }}>
                  {message.timestamp}
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div style={{ display: 'flex', justifyContent: 'flex-start', margin: '15px 0' }}>
              <div style={{
                padding: '15px 20px',
                borderRadius: '20px',
                backgroundColor: '#e9ecef',
                color: '#333',
                fontSize: '18px'
              }}>
                AI가 답변을 준비하고 있습니다...
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </Card>

      {/* 텍스트 입력 */}
      <Card>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <LargeInput
            type="text"
            placeholder="메시지를 입력하세요..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            style={{ flex: 1, margin: 0 }}
          />
          <LargeButton
            variant="primary"
            onClick={handleSendMessage}
            disabled={!inputMessage.trim()}
            style={{ 
              width: '100px', 
              height: '60px', 
              fontSize: '18px',
              margin: 0
            }}
          >
            전송
          </LargeButton>
        </div>
      </Card>

      {/* 빠른 질문 버튼들 */}
      <Card>
        <MediumText>빠른 질문</MediumText>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', margin: '20px 0' }}>
          {[
            '오늘 약을 먹었나요?',
            '운동은 얼마나 했나요?',
            '건강 상태는 어떤가요?',
            '다음 약은 언제 먹어야 하나요?'
          ].map((question, index) => (
            <LargeButton
              key={index}
              variant="secondary"
              onClick={() => setInputMessage(question)}
              style={{ 
                width: 'auto', 
                height: '50px', 
                fontSize: '16px',
                padding: '0 20px',
                margin: '5px'
              }}
            >
              {question}
            </LargeButton>
          ))}
        </div>
      </Card>
    </Container>
  );
};

export default ChatPage;
