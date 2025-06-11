import React from 'react';
import styled from 'styled-components';
import { colors } from '../theme/colors';

const ChatBotContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: ${colors.eggshell};
`;

const Header = styled.header`
  background-color: ${colors.darkTeal};
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  color: ${colors.white};
  font-size: 1.5rem;
  margin: 0;
  font-family: 'Arial', sans-serif;
`;

const ChatContainer = styled.div`
  flex: 1;
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: stretch;
`;

const ChatBotFrame = styled.iframe`
  width: 100%;
  height: calc(100vh - 80px);
  border: none;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  background-color: ${colors.white};
`;

const ChatBot: React.FC = () => {
  return (
    <ChatBotContainer>
      <Header>
        <Title>Global FoodBanking Network Chat Assistant</Title>
      </Header>
      <ChatContainer>
        <ChatBotFrame
          src="https://copilotstudio.microsoft.com/environments/Default-697ceabf-7b96-43b0-8a38-eac37e61ed52/bots/cr203_agentHbBKq0/webchat?__version__=2"
          title="Copilot Chat"
        />
      </ChatContainer>
    </ChatBotContainer>
  );
};

export default ChatBot; 