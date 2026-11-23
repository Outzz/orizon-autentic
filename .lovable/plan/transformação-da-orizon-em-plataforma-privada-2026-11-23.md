# Transformação da Orizon em plataforma privada

## Auditoria do projeto atual

- A base usa React 19, TypeScript, TanStack Start/Router/Query, Vite, Tailwind CSS v4, shadcn/Radix, React Hook Form, Zod, Lucide, next-themes e Vitest. Essa stack será preservada; nenhuma dependência nova é necessária para a primeira entrega.
- Já existem componentes reutilizáveis de sidebar recolhível, navegação mobile, botões, campos, diálogos, tabelas, abas, cartões, logo e alternância de tema. Os tokens visuais da sidebar ainda precisam ser completados no CSS global.
- As rotas atuais são `/`, `/auth`, `/reset-password` e `/equipe`. A landing page está componentizada por seção e pode ser movida sem reconstrução.
- Pedidos de orçamento, acesso da equipe e sugestões de resposta por IA já funcionam por funções server-side e permanecem isolados. A nova área de trabalho não ganhará novas dependências de backend.
- O build usa o script Vite existente. Não há configuração da Vercel no repositório; nenhuma configuração de publicação será alterada nesta etapa.

## Escopo desta primeira entrega: fases 1 a 3

### 1. Preservar o que existe

- Manter a landing page atual e seus componentes, movendo-a para `/site`; o painel privado passará a ocupar `/`. Esta é a opção adotada enquanto a pergunta sobre o destino do site estiver pendente.
- Conservar `/equipe`, os pedidos de orçamento, o WhatsApp e os recursos atuais sem mudanças de dados ou permissões.
- Reutilizar o login e a proteção de rotas já existentes. Não adicionar planos, pagamentos, créditos ou limites de uso.

### 2. Criar o ambiente de trabalho

- Criar um layout protegido com sidebar escura, minimalista, recolhível no desktop e em gaveta no mobile, usando os componentes shadcn existentes.
- Incluir Dashboard, Criar projeto, Meus projetos, Templates, Assistente IA, Clientes, Prospecção, CRM, Propostas, Contratos, Arquivos, Histórico e Configurações.
- Criar as rotas independentes `/`, `/projetos/novo`, `/projetos`, `/templates`, `/assistente`, `/clientes`, `/prospeccao`, `/crm`, `/propostas`, `/contratos`, `/arquivos`, `/historico` e `/configuracoes`.
- As páginas cujos módulos ainda não foram implementados terão estados vazios honestos e navegação funcional, sem botões que fingem executar ações. O Assistente IA informará claramente que a integração ainda não está conectada.
- Adicionar metadados próprios e `noindex` às páginas privadas.

### 3. Entregar o dashboard dinâmico

- Mostrar saudação, campo “O que vamos criar hoje?”, ação de novo projeto, projetos recentes e atividades recentes.
- Calcular total de projetos, projetos em desenvolvimento, concluídos, publicados e clientes cadastrados a partir dos registros locais, sem números fictícios.
- Criar a camada inicial de serviços e tipos para projetos, clientes e atividades. Preferências usarão LocalStorage; registros e, posteriormente, arquivos usarão IndexedDB. A interface permitirá trocar o armazenamento por backend no futuro.
- Ligar o campo de criação à rota de novo projeto, preservando a descrição informada para a próxima fase.

## Próximas entregas, após validação desta

1. Criador e gerenciamento de projetos, com fluxo em etapas e templates ou início do zero.
2. Ambiente de desenvolvimento em três painéis e editor visual, sem simular geração por IA.
3. Biblioteca de templates e biblioteca de arquivos.
4. Clientes, prospecção e CRM em Kanban.
5. Propostas, contratos, exportação de PDF e configurações.
6. Persistência completa, importação/exportação de backups e integração futura com IA local.

## Validação desta entrega

- Testar regras dos indicadores, persistência local e existência/proteção das rotas.
- Conferir a navegação e os estados vazios em 375 px, 768 px e 1440 px, incluindo sidebar recolhida e mobile.
- Verificar que `/site`, o formulário, o WhatsApp e `/equipe` continuam funcionando.
- Rodar os testes existentes e os novos, além de conferir o build e o console do navegador.
