# Computação UFCG

## Clone o repositório
```
git clone https://github.com/cilasmarques/ufcg-comp-app-mobile
cd ufcg-comp-app-mobile
```

## Instale o NodeJS, o NPM e o Yarn
```
curl -s https://deb.nodesource.com/setup_16.x | sudo bash
sudo apt install nodejs -y
sudo apt-get update 
npm install --global yarn
```

## Instale as ferramentas do expo
```
sudo npm install -g expo-cli 
sudo npm install -g eas-cli
```

## Verifique a integridade do código
```
npx expo-cli doctor
```

## Build do aplicativo
* Desenvolvimento
```
eas build -p android --profile development
```

## Execução do aplicativo
```
npx expo start --dev-client
```
