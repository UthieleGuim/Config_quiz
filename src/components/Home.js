import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleStartExercises = () => {
    localStorage.removeItem('exerciseProgress');
    Object.keys(localStorage)
    .filter(key => key.startsWith('exercise_') && key.endsWith('_progress'))
    .forEach(key => localStorage.removeItem(key));
    navigate('/exercicios');
  };

  return (
    <div>
      <section className="hero">
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}>
          <div style={{ flex: '1', minWidth: '300px' }}>
            <h1>📧 Como Configurar uma Conta de E-mail Profissional</h1>
            <p>
              Aprenda os conceitos essenciais para criar e gerenciar uma conta de e-mail profissional
              através de exercícios interativos e práticos.
            </p>
            <button className="btn-accent" onClick={handleStartExercises}>
              🚀 Começar Exercícios
            </button>
          </div>
          <div style={{ flex: '1', minWidth: '300px', textAlign: 'center' }}>
            <img 
              src="/images/email-setup.svg" 
              alt="Configuração de E-mail Profissional" 
              style={{ 
                maxWidth: '100%', 
                height: 'auto',
                borderRadius: '15px',
                boxShadow: '0 8px 16px rgba(0,0,0,0.2)'
              }}
            />
          </div>
        </div>
      </section>

      <section className="card">
        <div className="card-body">
          <h2>📚 Sobre o Curso</h2>
          <p>
            Este curso autoinstrucional foi desenvolvido para ensinar os conceitos fundamentais
            sobre configuração de contas de e-mail profissional. Você aprenderá sobre:
          </p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginTop: '2rem' }}>
            <div>
              <h3>📧 Tipos de E-mail</h3>
              <p>Diferenças entre e-mails pessoais e profissionais, provedores recomendados.</p>
            </div>
            
            <div>
              <h3>🔒 Segurança</h3>
              <p>Senhas seguras, autenticação de dois fatores e boas práticas de segurança.</p>
            </div>
            
            <div>
              <h3>⚙️ Configuração</h3>
              <p>Configuração de clientes de e-mail, IMAP, POP3 e SMTP.</p>
            </div>
            
            <div>
              <h3>📱 Sincronização</h3>
              <p>Sincronização entre dispositivos e backup de dados importantes.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="card">
        <div className="card-body">
          <h2> 📧 Tipos de E-mail pessoal Característica</h2>
          <p>Endereço: Pode usar apelidos, números, domínios genéricos (gmail.com, yahoo.com etc.).
            </p>
             <p>
                 Uso / Contexto: Amigos, familiares, lazer, cadastro em redes sociais.
            </p> 
             <p>
               Segurança: Pode ter menos controle, menos exigências de autenticação, políticas mais frouxas.
            </p> 
            <p>
               Provedor / Domínio: Pode usar provedores gratuitos ou grátis, sem domínio próprio.
            </p> 
            <p>
              Recursos extras: Espaço, filtros básicos, versão para consumo pessoal.
            </p> 

           <h2> 📧 Tipos de  E-mail profissional Característica</h2>
            <p>
              Endereço: Geralmente com domínio personalizado da empresa (ex: nome@empresa.com), ou subdomínio profissional; aparência mais formal, confiável e reconhecível.

             </p>
          <p>
          Uso / Contexto: Comunicação com clientes, fornecedores, marketing, assuntos internos da empresa; eficácia e imagem são importantes.
          </p>
          <p>
              Segurança: Políticas de segurança mais rígidas: senhas fortes, autenticação de dois fatores (2FA), proteção contra phishing, políticas internas etc.
          </p>
          <p>
          Provedor / Domínio: Muitas vezes usa provedores pagos ou serviços empresariais (ex: Microsoft 365, Google Workspace), com domínio próprio da empresa, para reforçar credibilidade.
          </p>
          <p>
          Recursos extras:Recursos como backup, auditoria, logs, conformidade, controle administrativo, quotas, criptografia, suporte técnico etc.
          </p>
         <h4> 📧 Provedores recomendados para e-mail profissional</h4>

        <p>
              Alguns critérios para escolher bem: confiabilidade, segurança, suporte, integração com outras ferramentas da empresa, custo, recessibilidade, facilidade de administração.
          </p>

           <h4> 📧 Exemplos de provedores bons para uso profissional:</h4>

      <p>
      Google Workspace (antigo G Suite) — oferece Gmail com domínio próprio, Drive, Google Meet, etc.
      </p>
      <p>
      Microsoft 365 / Office 365 — Outlook profissional, Exchange, possibilidade de gerenciar contas, políticas de segurança, etc.
      </p>
      <p>
        Zoho Mail — opção mais acessível para empresas menores, com domínio personalizado, boa interface, ferramentas de colaboração.
      </p>
      <p>
        Provedores locais / regionais — dependendo do país, empresas de hospedagem ou provedores de internet que oferecem e-mail empresarial com redundância e suporte local.
      </p>
      <p>
        Fastmail, ProtonMail, entre outros — se a privacidade ou funcionalidades específicas forem muito importantes.
      </p>
    <h2>🔒 Segurança</h2>

     <p>
        
            Usar senhas longas (idealmente : 12 caracteres), misturando letras maiúsculas e minúsculas, números e símbolos.
          </p> 
           <p>
            Não usar senhas óbvias ou baseadas em informações pessoais (ex: datas de nascimento).
          </p>
          <p>
            Utilizar senhas diferentes para diferentes serviços (se possível), para evitar que comprometimento de um serviço leve aos outros.
          </p>
          <p>
Sempre ativar 2FA se o provedor permitir (via SMS, app autenticador como Google Authenticator,Authenticator apps ou tokens de hardware).

          </p>

          <p>
Em ambientes corporativos, em geral, usar autenticação multifator mais forte possível.
          </p>

          <p>
Verificar recuperação de conta: ter métodos alternativos seguros caso perca acesso ao segundo fator.
          </p>
           <p>
Usar protocolos seguros, criptografia de transporte (TLS/SSL) nas conexões (recepção e envio de e-mail).
          </p>
           <p>
Autenticação de servidores de envio: configurar SPF, DKIM e DMARC no domínio da empresa para evitar falsificação de remetente (spoofing). 
          </p>
           <p>
Monitorar logs de acesso, tentativas de login suspeitas, configurações de encaminhamento automático de e-mail.
          </p>
           <p>
Atualizar softwares de cliente de e-mail, servidor, plugins, etc. para corrigir vulnerabilidades.
          </p>
           <p>
Educar usuários sobre phishing, anexos suspeitos, links suspeitos.
          </p>
 <h2>⚙️ Configuração</h2>
 <h4>Configuração técnica — clientes de e-mail, IMAP, POP3 e SMTP</h4>

 <p>Protocolos básicos: IMAP, POP3, SMTP</p>
 <p>SMTP (Simple Mail Transfer Protocol): usado para enviar e-mails. O servidor SMTP é responsável pelo encaminhamento de mensagens do remetente para o servidor de destino ou para outro servidor SMTP. </p>


<p>POP3 (Post Office Protocol v3): protocolo usado para receber e-mails. Baixa os e-mails do servidor para o dispositivo cliente, geralmente removendo do servidor (dependendo da configuração). Bom para uso com um único dispositivo ou quando não é necessário manter sincronizado.</p>
 

<p>IMAP (Internet Message Access Protocol): também para receber, mas mantém os e-mails no servidor; permite sincronização entre múltiplos dispositivos, pastas, marcadores, buscas remotas. É mais flexível para uso em dispositivos diferentes (PC, celular, tablet). </p>



<h4>Configuração de cliente de e-mail</h4>
<p> Para configurar uma conta profissional num cliente (Outlook, Thunderbird, Apple Mail, etc.), geralmente você precisa: </p>
<p>Endereço completo do e-mail (ex: nome@empresa.com), senha, servidor de entrada (IMAP ou POP3) → nome do host, porta, tipo de criptografia (SSL/TLS ou STARTTLS) e servidor de saída (SMTP) → host, porta, tipo de criptografia, se autenticação é necessária (quase sempre)</p>

 <h3>Por exemplo, para Microsoft 365, configurações típicas são: </h3>

<p>Tipo : IMAP</p>
<p>Servidor:outlook.office365.com</p>
<p>Porta:993</p>
<p>Criptografia: SSL/TLS </p>


<p>Tipo : POP3 </p>
<p>Servidor: outlook.office365.com</p>
 <p>Porta: 995 </p>
  <p>Criptografia: SSL/TLS  </p>

  <p> Tipo:SMTP</p>
<p>Servidor:  smtp.office365.com </p>
 <p> Porta: 587 </p>
 <p> Criptografia: SSL/TLS</p>



 <h3> Exemplos de configuração: passo a passo</h3>
<h4>No cliente de e-mail </h4>
 <p>1- Vá em “Adicionar Conta” ou “Configurar manualmente”</p>

 <p>2-Informe endereço, nome de usuário (geralmente o e-mail completo) e senha</p>

<p>3-Escolha se vai usar IMAP ou POP3 (IMAP é recomendado para uso em vários dispositivos)</p>

<p>4-Inserir servidor de entrada com porta, criptografia (por exemplo, IMAP-SSL porta 993 ou IMAP STARTTLS 143)</p>

<p>5-Inserir servidor SMTP de saída, porta apropriada (587 com STARTTLS ou 465 com SSL em alguns casos), ativar autenticação SMTP com usuário/senha</p>

<p>6-Testar envio e recebimento</p>



           <h2>📱 Sincronização</h2>
           <h4>Sincronização entre dispositivos e backup de dados importantes</h4>
              <p>     
Usando IMAP: ideal para sincronizar pastas, marcar mensagens como lidas/não lidas, apagar etc., em todos os dispositivos: PC, celular, tablet.
</p>

<p>
Também verificar se o cliente de e-mail ou serviço suporta notificações push (para novos e-mails), sincronização de contatos e calendário (se aplicável) para consistência.
</p>

<p> 
Evitar usar POP3 se você precisar acessar os e-mails de mais de um dispositivo, ou se quiser sempre ver os mesmos estados (pastas, lidos, não lidos etc.).
</p>

<h4>Backup / preservação dos dados</h4>


<p> 
Fazer backups regulares dos e-mails, principalmente os relacionamentos importantes ou arquivos anexos críticos. Pode ser via exportação de pasta (arquivo .pst no Outlook, por exemplo), ou ferramenta de backup da própria infraestrutura de e-mail.
</p>

<p> 
Ter políticas de retenção de e-mails: quanto tempo guardar, quais pastas, limpeza de conteúdo antigo, etc.
</p>

<p> 
Armazenamento seguro dos backups (criptografado, com acesso controlado) para evitar vazamento de dados.
</p>

<p> 
Verificar redundância no servidor de e-mail (se estiver hospedado por empresa/provedor), para garantir disponibilidade.
</p>
    


          
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', marginTop: '1.5rem' }}>
            <div style={{ flex: '1', minWidth: '200px' }}>
              <h3> 💡 Observações Importantes 💡 </h3>
              <p>Para um e-mail profissional, a segurança é crítica. Utilizar senhas diferentes para diferentes serviços (se possível), para evitar que comprometimento de um serviço leve aos outros.
          </p>
          
          
            </div>
            
            <div style={{ flex: '1', minWidth: '200px' }}>
              <h3> 💡 Observações Importantes 💡</h3>
              <p>Opte sempre por provedores confiáveis e reconhecidos no mercado, pois isso garante maior estabilidade, suporte técnico e segurança para sua conta profissional.</p>
            </div>
            
            <div style={{ flex: '1', minWidth: '200px' }}>
              <h3>💡 Observações Importantes 💡</h3>
              <p>Troque suas senhas periodicamente e nunca compartilhe com terceiros. Sempre habilite autenticação de dois fatores quando possível.</p>
            </div>
          </div>
          
          <div style={{ marginTop: '2rem', padding: '1.5rem', backgroundColor: 'var(--accent-color)', color: 'white', borderRadius: '10px',  marginBottom: '2rem' }}>
            <h4>💡 Importante</h4>
            <p>Protocolos básicos: IMAP, POP3, SMTP</p>
            <p>IMAP (Internet Message Access Protocol)</p>
             <p>POP3 (Post Office Protocol v3)</p>
             <p>SMTP (Simple Mail Transfer Protocol)</p>
             <p>Porta apropriada (587 com STARTTLS ou 465 com SSL em alguns casos)</p>
            
          </div>
        </div>
      </section>

      <section className="card">
        <div className="card-body">
          <h2>Observações sobre o quiz</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginTop: '1.5rem' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📱</div>
              <h4> Tentativas </h4>
              <p>você tem até três tentativas</p>

 
            </div>
            
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔄</div>
              <h4>Zera o teste</h4>
              <p>Você pode reiniciar o teste</p>
            </div>
            
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>💾</div>
              <h4>Persistência</h4>
              <p>Seu progresso é salvo automaticamente</p>
            </div>
            
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🏆</div>
              <h4>Pontuação</h4>
              <p>Sistema de pontuação baseado em tentativas</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
