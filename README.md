## ▶️ Como rodar o projeto localmente

### 1️⃣ Clonar o repositório

```bash
git clone (URL)
cd desafio-flugo
```

### 2️⃣ Instalar as dependências

```bash
npm install
```

### 3️⃣ Criar um projeto no Firebase
- Acesse: https://console.firebase.google.com
- Crie um novo projeto
- Ative o Firestore Database
- Vá em Configurações do projeto > SDK da Web
- Copie as credenciais geradas

### 4️⃣ Criar o arquivo .env
Crie um arquivo .env na raiz do projeto com as credenciais do Firebase:

```bash
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

### 5️⃣ Rodar o projeto

```bash
npm run dev
```