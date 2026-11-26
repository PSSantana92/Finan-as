# Minhas Finanças

App de finanças pessoais que roda no navegador e pode ser instalado na tela inicial do Android e do iPhone (PWA). Os dados ficam só no aparelho (localStorage).

## Funções
- Lançamento de gastos e receitas com categoria, forma de pagamento (Pix, débito, dinheiro, boleto, cartões), data e local
- Cartões com dia de fechamento e vencimento, compras parceladas, faturas abertas, fechadas, vencidas e pagas
- Importação de faturas e extratos: CSV e OFX lidos no aparelho; PDF e fotos lidos pela API do Claude com a chave do usuário (Ajustes)
- Relatórios: categorias, locais, formas de pagamento, origem das receitas, evolução de 6 meses
- Backup e restauração em JSON, exportação em CSV

## Publicar
Ative o GitHub Pages em Settings › Pages › Deploy from a branch › `main` / root. O app fica em `https://<usuario>.github.io/<repositorio>/`.

## Instalar
- Android (Chrome): menu › Instalar app
- iPhone (Safari): Compartilhar › Adicionar à Tela de Início

## Atualizar
Ao mudar arquivos, altere `VERSION` em `sw.js` para os aparelhos baixarem a nova versão.

## Terceiros
`vendor/anthropic.js`: Anthropic TypeScript SDK 1.6.0 (MIT). `vendor/pdf*.js`: PDF.js 3.11.174 (Apache 2.0).

## Segurança e conta compartilhada

- Com `firebase-config.js` preenchido, o app pede login com Google e guarda os dados no Firestore em `spaces/casa`.
- Quem pode ler e gravar é definido só pelas regras do Firestore (modelo em `firestore.rules`; os e-mails reais ficam apenas no console do Firebase, nunca neste repositório).
- As regras aceitam somente contas Google com e-mail verificado da lista, validam cada lançamento (campos, tipos e tamanhos) e bloqueiam qualquer outro caminho.
- A página tem Content-Security-Policy: só roda scripts do próprio site e do login do Google.
- A chave da API do Claude fica só no aparelho (localStorage) e nunca é enviada para o Firestore nem para o GitHub.
- Ao sair da conta, o cache local do Firestore é apagado do aparelho.
