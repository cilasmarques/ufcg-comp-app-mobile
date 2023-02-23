# Computação UFCG

## Instale o NodeJS, o NPM e o Yarn
```
curl -s https://deb.nodesource.com/setup_16.x | sudo bash
```

```
sudo apt-get install -y nodejs
```

```
sudo apt-get update 
```

```
sudo npm install -g npm@9.5.0
```

```
sudo npm install -g yarn
```

## Instale as ferramentas para uso do expo
```
sudo apt install git -y
sudo npm install -g expo-cli 
sudo npm install -g eas-cli
```

## Clone o repositório
```
git clone https://github.com/cilasmarques/ufcg-comp-app-mobile
cd ufcg-comp-app-mobile
```
> Configure as variaveis do **src/utils/constants**


## Verifique a integridade do código
```
npx expo-cli doctor
```

## Build do aplicativo
* Desenvolvimento
```
eas build -p android --profile development
```

* Produção
```
eas build -p android --profile production
```

## Execução do aplicativo pelo expo
```
npx expo start --dev-client
```