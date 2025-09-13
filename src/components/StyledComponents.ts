import styled from 'styled-components';

interface StatusBadgeProps {
  status?: 'taken' | 'not-taken';
}

// Medium Text
export const MediumText = styled.h2`
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin: 15px 0;
`;

// Grid Layout
export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  margin-bottom: 32px;
  width: 100%;
  max-width: 1400px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 1400px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 16px;
    margin-bottom: 24px;
  }
`;

// Status Badge
export const StatusBadge = styled.span<StatusBadgeProps>`
  display: inline-block;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 16px;
  font-weight: bold;
  background-color: ${(props) =>
    props.status === 'taken' ? '#d4edda' : '#f8d7da'};
  color: ${(props) => (props.status === 'taken' ? '#155724' : '#721c24')};
`;

// Navigation
export const NavContainer = styled.nav`
  background: white;
  padding: 20px;
  border-radius: 15px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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
