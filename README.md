# Projeto PetShop Amigo Fiel - Fase 2

Este repositório contém o código-fonte da **Fase 2** do Projeto da disciplina de **Fundamentos de Sistemas Web** (PUCRS Online). Nesta etapa, o sistema web estático da Fase 1 foi evoluído com **CSS3, Bootstrap 5 e JavaScript**, tornando-se responsivo, dinâmico, acessível e interativo.

## Funcionalidades da Página Web

* **Cabeçalho e Barra de Status Dinâmica (`Header`):**
  * Menu de navegação responsivo (`navbar` do Bootstrap) com links internos para todas as seções.
  * Função temporal em JavaScript que exibe a hora atual em tempo real e informa se o petshop está *Aberto* ou *Fechado* conforme o horário comercial.

* **Carrossel de Destaques (`Carousel`):**
  * Banner rotativo interativo apresentando os serviços de Banho e Tosa, Rações Premium e Tele-busca, com controles manuais e transição automática.

* **Catálogo de Produtos e Serviços (`Main`):**
  * Organização das três categorias de produtos da Fase 1 (Alimentação, Brinquedos e Higiene) e dos serviços do petshop em **Cards** responsivos do Bootstrap.

* **Formulário de Cadastro e Agendamento Online:**
  * **Dados do Cliente (Tutor):** Nome completo, CPF (com máscara automática), endereço, sexo (`radio`), telefone/WhatsApp (com máscara) e e-mail.
  * **Dados do Pet:** Nome, raça, idade (`number`) e indicação de alergias/cuidados especiais (`checkbox`).
  * **Serviço e Agendamento:** Escolha entre *Banho* e *Tosa*, modalidade (*Tele-busca* ou *Entrega do pet no local*), calendário com bloqueio de datas passadas (`date`) e horário (`time`).
  * **Comprovante Dinâmico:** Ao enviar o formulário, o JavaScript processa os dados e exibe um resumo confirmando o agendamento na tela.

* **Acessibilidade:**
  * Implementação de audiodescrição detalhada no atributo `alt` de todas as imagens, associação semântica de `<label>` em todos os campos de formulário, atributos ARIA (`aria-label`, `aria-live`) e destaque de foco para navegação via teclado.

## Ajustes Realizados (Evolução da Fase 1 para a Fase 2)

1. **Separação de Responsabilidades:** Estruturação do código em arquivos distintos (`index.html`, `style.css` e `script.js`), todos devidamente comentados.
2. **Estilização e Responsividade:** Substituição das listas não ordenadas puras da Fase 1 pelo sistema de grid e cards do Bootstrap 5, garantindo adaptação em computadores e celulares.
3. **Aprimoramento da Acessibilidade:** Revisão das descrições `alt` das imagens da Fase 1 para incluir audiodescrição detalhada e adição de indicadores visuais de foco no CSS.
4. **Interatividade:** Inclusão de validação de datas no calendário (impedindo agendamentos retroativos) e máscaras de formatação para CPF e telefone.

## Tecnologias Utilizadas
* HTML5 Semântico
* CSS3 & Bootstrap 5
* JavaScript (ES6+)

---
*Desenvolvido por Simone Barros para fins acadêmicos.*
