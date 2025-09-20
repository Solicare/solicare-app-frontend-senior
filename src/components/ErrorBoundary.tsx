import React, { Component, ErrorInfo, ReactNode } from 'react';
import styled from 'styled-components';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 20px;
  text-align: center;
  background-color: #f8f9fa;
`;

const ErrorTitle = styled.h1`
  color: #dc3545;
  margin-bottom: 20px;
  font-size: 24px;
`;

const ErrorMessage = styled.p`
  color: #6c757d;
  margin-bottom: 30px;
  font-size: 16px;
  max-width: 500px;
`;

const RetryButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
    window.location.href = '/start';
  };

  public render() {
    if (this.state.hasError) {
      return (
        <ErrorContainer>
          <ErrorTitle>🚫 페이지 오류</ErrorTitle>
          <ErrorMessage>
            죄송합니다. 페이지를 로드하는 중 문제가 발생했습니다.
            <br />
            다시 시도해 주세요.
          </ErrorMessage>
          <RetryButton onClick={this.handleRetry}>홈으로 돌아가기</RetryButton>
        </ErrorContainer>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
