import styled from 'styled-components';

// Container
export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  min-height: 100vh;
  background-color: #f8f9fa;
`;

// Large Button for elderly users
export const LargeButton = styled.button`
  width: 100%;
  max-width: 400px;
  height: 80px;
  font-size: 24px;
  font-weight: bold;
  border: none;
  border-radius: 15px;
  background-color: ${props => props.variant === 'primary' ? '#007bff' : '#6c757d'};
  color: white;
  cursor: pointer;
  margin: 15px 0;
  transition: all 0.3s ease;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0,0,0,0.15);
    background-color: ${props => props.variant === 'primary' ? '#0056b3' : '#545b62'};
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    background-color: #e9ecef;
    color: #6c757d;
    cursor: not-allowed;
    transform: none;
  }
`;

// Large Input
export const LargeInput = styled.input`
  width: 100%;
  max-width: 400px;
  height: 60px;
  font-size: 20px;
  padding: 0 20px;
  border: 2px solid #dee2e6;
  border-radius: 10px;
  margin: 10px 0;
  outline: none;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #007bff;
  }

  &::placeholder {
    color: #6c757d;
    font-size: 18px;
  }
`;

// Large Text
export const LargeText = styled.h1`
  font-size: 32px;
  font-weight: bold;
  color: #333;
  margin: 20px 0;
  text-align: center;
`;

export const MediumText = styled.h2`
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin: 15px 0;
`;

export const RegularText = styled.p`
  font-size: 18px;
  color: #666;
  margin: 10px 0;
  line-height: 1.6;
`;

// Card
export const Card = styled.div`
  background: white;
  border-radius: 15px;
  padding: 30px;
  margin: 20px 0;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  border: 1px solid #e9ecef;
`;

// Grid Layout
export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin: 20px 0;
`;

// Flex Container
export const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
`;

// Status Badge
export const StatusBadge = styled.span`
  display: inline-block;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 16px;
  font-weight: bold;
  background-color: ${props => props.status === 'taken' ? '#d4edda' : '#f8d7da'};
  color: ${props => props.status === 'taken' ? '#155724' : '#721c24'};
`;

// Navigation
export const NavContainer = styled.nav`
  background: white;
  padding: 20px;
  border-radius: 15px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

export const NavButton = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  color: #007bff;
  cursor: pointer;
  padding: 10px 20px;
  border-radius: 8px;
  margin: 0 10px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f8f9fa;
  }
`;

// Loading Spinner
export const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-size: 20px;
  color: #007bff;
`;
