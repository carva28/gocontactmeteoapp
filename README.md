
## Meteo App

Este projeto foi desenvolvido com 
+ `React.JS`
+ `Node.JS`

Para além destas 2 tecnologias utilizou-se 2 API para informação do tempo e horário do sol

+ [OpenWeather] (https://openweathermap.org/api)
+ [weather.cit] (https://weather.cit.api.here.com/weather/1.0/report.json?product=forecast_astronomy&name=Valongo&app_id=DemoAppId01082013GAL&app_code=AJKnXv84fjrb0KIHawS0Tg)


### `Como testar`

1. Descarregar do repositório ou fazer `git clone`.
2. Por linha de comandos entrar na pasta gocontactapp `cd gocontactapp`
3. Executar o comando `npm install` para instalar os módulos necessários para correr o programa
4. Entrar na pasta `Backend`, através do terminal `cd Backend`
5. Executar o comando `npm install` para instalar os módulos necessários para o backend funcionar
6. Utilizar [Postman](https://www.getpostman.com/downloads/) ou outro programa à preferência para inserir um utilizador.
7. Dentro da pasta `Backend` executar no terminal nodemon app.js e no programa que escolheu para inserir um utilizador deve utilizar copiar o link `http://localhost:8080/api/registo` e depois preencher os campos do formulário com name e password e escrever os dados que pretende.

![alt text](https://github.com/carva28/gocontactmeteoapp/blob/master/insert_user.jpeg "Logo Title Text 1")

8. Entrar na pasta do gocontactapp e executar o comando `npm start` e proceder ao login com as credenciais que preencheu.
9. A plataforma foi desenhada para o utilizador preencher entre uma cidade a seis e de seguida pesquisar a temperatura num gráfico. Após a verificação do gráfico existe uma tabela que apresenta as horas do nascer e o pôr do sol.

