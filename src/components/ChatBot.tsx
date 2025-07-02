import React, { useEffect } from 'react';
import styled from 'styled-components';
import { colors } from '../theme/colors';

const ChatBotContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  height: 100vh; /* Fija la altura al 100% de la ventana */
  display: flex;
  flex-direction: column;
  background-color: ${colors.eggshell};
  position: fixed; /* Evita el scroll del body */
  top: 0;
  left: 0;
  overflow: hidden;
`;

const Header = styled.header`
  background-color: ${colors.darkTeal};
  padding: 1rem;
  display: flex;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 768px) {
    padding: 0.75rem;
  }
`;

const Title = styled.h1`
  color: ${colors.white};
  font-size: 1.5rem;
  margin: 0;
  font-family: 'Arial', sans-serif;
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const ChatContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: stretch;
  position: relative;
  overflow: hidden;
`;

const ChatBotFrame = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  background-color: ${colors.white};
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const InstallPrompt = styled.div`
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: ${colors.darkTeal};
  color: white;
  padding: 12px 24px;
  border-radius: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  display: none;
  align-items: center;
  gap: 8px;
  z-index: 1000;
  
  &.show {
    display: flex;
  }
`;

const InstallButton = styled.button`
  background-color: white;
  color: ${colors.darkTeal};
  border: none;
  padding: 8px 16px;
  border-radius: 16px;
  font-weight: bold;
  cursor: pointer;
  
  &:hover {
    background-color: #f0f0f0;
  }
`;

const ChatBot: React.FC = () => {
  useEffect(() => {
    // Manejar la instalación de PWA
    let deferredPrompt: any;

    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      deferredPrompt = e;
      
      // Mostrar el botón de instalación
      const prompt = document.querySelector('.install-prompt');
      if (prompt) prompt.classList.add('show');
    });

    // Manejar el botón de instalación
    const installButton = document.querySelector('.install-button');
    if (installButton) {
      installButton.addEventListener('click', async () => {
        const prompt = document.querySelector('.install-prompt');
        if (prompt) prompt.classList.remove('show');
        
        if (deferredPrompt) {
          deferredPrompt.prompt();
          const { outcome } = await deferredPrompt.userChoice;
          console.log(`User response to the install prompt: ${outcome}`);
          deferredPrompt = null;
        }
      });
    }

    // Ajustar la altura en móviles
    const adjustHeight = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    window.addEventListener('resize', adjustHeight);
    adjustHeight();

    return () => {
      window.removeEventListener('resize', adjustHeight);
    };
  }, []);

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
      <InstallPrompt className="install-prompt">
        ¿Quieres instalar la app?
        <InstallButton className="install-button">Instalar</InstallButton>
      </InstallPrompt>
    </ChatBotContainer>
  );
};

export default ChatBot; 