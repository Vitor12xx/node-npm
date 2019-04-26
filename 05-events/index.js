// Essa file serve para desmonstrar alguns usos do módulo 'events', que controla as ações 
// assim que um determindado evento é acionado.

// Transfere o modulo 'events' para o const EventEmitter
const EventEmitter = require('events')

// Extende as funcoes de EventEmitter para uma nova classe chamada MeuEmissor
class MeuEmissor extends EventEmitter{

}

// Cria um const da classe MeuEmissor
const meuEmissor = new MeuEmissor()

// Adiciona uma string simples ao 'nomeEvento'
const nomeEvento = 'usuario:click'

// Quando o algum elemento for clicado, executara a funcao seguinte. 
meuEmissor.on(nomeEvento, function (click){
	console.log('um usuario clicou', click)
})

// Abre um leitor de standard input para ler o terminal
const stdin = process.openStdin()

// Quando alguma 'data' for inserida na const 'stdin', executara a funcao seguinte (que imprimira
// o proprio valor inserido)
stdin.addListener('data', function (value){
	console.log(`Voce digitou: ${value.toString().trim()}`)
})


// Abaixo, forjando emicoes de evento de click para o proprosito de testes.
/*
meuEmissor.emit(nomeEvento, 'na barra de rolagem')
meuEmissor.emit(nomeEvento, 'no ok')

let count = 0
setInterval(function (){
	meuEmissor.emit(nomeEvento, 'no ok' + (count++))
}, 1000)
*/