# Estúdio de Relatórios — pacote para GitHub Pages

Desenvolvido por Edson Luciano
eluciano@verointernet.com.br

Versão exportada em 28/09/2026. Código da versão: 3c28344d603e312a0d4e0145a81316dc830009b0.

## 1. Publicar no GitHub Pages pelo navegador

1. Extraia este ZIP no Windows (botão direito > Extrair tudo).
2. No GitHub, crie um repositório chamado estudio-relatorios. Não selecione uma licença para os arquivos de terceiros: mantenha as licenças já incluídas.
3. No repositório, escolha Add file > Upload files.
4. Abra a pasta Estudio_Relatorios_GitHub e envie O CONTEÚDO dela, preservando as subpastas assets, fonts e vendor. O index.html deve ficar na raiz do repositório, ao lado de README.md. Não envie apenas o ZIP e não crie uma pasta extra ao redor do sistema.
5. Clique em Commit changes para salvar na branch main.
6. Vá a Settings > Pages. Em Source, escolha Deploy from a branch. Selecione main e /(root), depois Save.
7. Aguarde a publicação. O endereço será mostrado em Settings > Pages, normalmente https://SEU-USUARIO.github.io/estudio-relatorios/.
8. Teste os exemplos fictícios, a visualização e uma exportação antes de usar o sistema.

É uma aplicação estática: não precisa de npm, Node, Python, servidor de banco de dados ou chave de IA na hospedagem. O arquivo .nojekyll pode estar oculto no gerenciador de arquivos. As referências internas são relativas e funcionam no caminho do repositório.

GitHub Free oferece Pages para repositórios públicos. Disponibilidade em repositórios privados depende do plano. Um repositório privado, por si só, NÃO torna o site Pages privado. Para acesso corporativo restrito, a TI deve escolher uma hospedagem com autenticação adequada ou uma modalidade de Pages que ofereça esse controle.

## 2. Usar como aplicativo no Windows

1. Abra o endereço publicado no Microsoft Edge.
2. No menu ... procure Mais ferramentas > Aplicativos > Instalar este site como aplicativo. Os nomes e a posição podem variar na versão do Edge.
3. Dê o nome Estúdio de Relatórios.
4. Escolha fixar no Iniciar ou na barra de tarefas.

Isso cria uma janela de aplicativo para o site. Não publica na Microsoft Store, não concede acesso ao Microsoft 365 e não garante funcionamento offline. Este pacote deve ser servido por HTTPS; abrir index.html com file:// pode impedir leitura de PDFs, fontes e exportações. Para uso offline, utilize a versão portátil específica.

## 3. Usar dentro do Teams ou Microsoft 365

Adicionar um link ao Teams não equivale a integrar dados da conta corporativa. Dependendo da versão e das políticas, uma aba de site pode abrir no navegador, em vez de incorporar a página.

Para aparecer como um aplicativo dentro do Teams/Microsoft 365, a TI precisa autorizar a instalação e a distribuição. É necessário preparar e validar um pacote de aplicativo Teams com a URL final, manifest, ícones, domínios permitidos e inicialização do SDK TeamsJS. Este ZIP é o site, NÃO é um pacote de aplicativo Teams. Não envie este ZIP na opção de carregar aplicativo personalizado do Teams.

Para ler presença, e-mails ou arquivos corporativos automaticamente, é necessária uma integração autenticada e autorizada para esses recursos. Instalar um atalho no Edge não ativa essa integração. O sistema mantém a área Microsoft 365 assistida: preparar mensagem, copiar conteúdo e abrir os aplicativos.

## 4. Usar outra conta ou outro computador

Quem puder acessar a URL poderá usar o site. Esta cópia não contém o controle de acesso do site hospedado no ChatGPT e não possui login Microsoft próprio.

O preenchimento fica em memória e, quando você ativa essa opção, no rascunho do navegador. Ele não é compartilhado automaticamente com colegas. Para continuar em outro navegador ou computador: Salvar backup > transferir o arquivo JSON pelo canal corporativo aprovado > Abrir backup no outro acesso.

Ao mudar do endereço antigo para o GitHub Pages, o rascunho também não migra automaticamente: exporte o backup no endereço antigo antes de mudar.

O pacote inclui o código, as imagens de marca/personagem e exemplos fictícios. Não inclui seus preenchimentos do navegador. Não adicione planilhas reais, relatórios, backups, senhas ou credenciais ao repositório público. O nome, e-mail de autoria e as imagens incorporadas ao código fazem parte do material publicado.

## 5. Atualizar o sistema

Para atualizar esta cópia, envie os novos arquivos ao mesmo repositório mantendo a estrutura. GitHub Pages publica a atualização da branch configurada. Esta cópia não recebe automaticamente as futuras alterações realizadas no site do ChatGPT.

## 6. Conferência após publicar

- Carregar exemplo de treinamento e exemplo anual.
- Visualizar relatório e alternar Vero/B2B.
- Importar um pequeno PDF com texto selecionável.
- Salvar e reabrir um backup JSON.
- Exportar PDF e conferir a composição.
- Preparar Outlook/Copilot e confirmar a conta corporativa antes de colar ou anexar conteúdo.

## Documentação oficial

GitHub Pages: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
Instalar site pelo Edge: https://support.microsoft.com/pt-br/edge/install-manage-or-uninstall-apps-in-microsoft-edge
Sites em abas Teams: https://devblogs.microsoft.com/microsoft365dev/upcoming-updates-to-loading-websites-in-teams-tabs/
Requisitos de abas Teams: https://learn.microsoft.com/en-us/microsoftteams/platform/tabs/how-to/tab-requirements

As fontes e bibliotecas têm suas próprias licenças, preservadas no pacote. As marcas e imagens não ganham uma licença pública pelo fato de o código ser publicado.
