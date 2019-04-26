/*
	UTILIZANDO PROMISES. O dir 02-nodejs contém a mesma pasta, mas utilizando CALLBACKS.

	00 Obter Usuario
	01 Resolvido o Usuario, obter Endereco
	02 Resolvido o Endereco, obter Telefone 
*/

// Importamos um módulo interno do node.js
const util = require('util')
// Abaixo utilizei o módulo para transformar a funcao que funcionava a callback, para uma funcao
// que funciona a base de Promise. Isso tudo utilizando o módulo chamado 'util' do node.js
const obterEnderecoAsync = util.promisify(obterEndereco)
// A const acima agora é uma função promise, feita a partir de uma função callback.


 function obterUsuario(){
 	//Quando der algum problema --> reject(ERRO)
 	//Quando der sucesso --> RESOLVE
 	return new Promise(function resolvePromise(resolve, reject){
		setTimeout(function () { 
			// return reject(new Error('DEU RUIM DE VERDADE'))
			return resolve({
				id: 1,
				nome: 'Aladin',
			})
		}, 0)
	})
}

function obterTelefone(){
	return new Promise(function resolverPromise(resolve, reject){
		setTimeout(function () { 
			return resolve({
				ddd: 11,
				telefone: 992244,
			})
		}, 0)
	})
}

function obterEndereco(callback){
		setTimeout(function () {
			return callback(null, {
				rua: 'dos bobos',
				numero: 0,
			})
	}, 0)
}


// Para manipular o sucesso usamos a funcao .then
// Para manipular o erro usamos a funcao .catch

// Atencao ! As linhas a seguir, que manipulam as Promises, foram feitos todas por mim, 
// a aula onde eles demonstra a manipulação delas estão 'sem otimização', 
// tomei a liberdade de fazê-lo.

obterUsuario()
	.then(function (usuario_retornado){
		return obterTelefone()
		.then(function (retorno_obterTelefone){
			return obterEnderecoAsync()
			.then(function (retorno_obterEnderecoAsync){
				return {
					usuario: usuario_retornado,
					telefone: retorno_obterTelefone,
					endereco: retorno_obterEnderecoAsync
				}
			})
		})
	})
	.then(function(resultado) {
		console.log(`
			Nome: ${resultado.usuario.nome},
			Telefone: ${resultado.telefone.ddd}, ${resultado.telefone.telefone},
			Endereco: ${resultado.endereco.rua}, ${resultado.endereco.numero}
			`)
	})
	.catch(function(error){
		console.error('DEU RUIM', error)
	})


// Abaixo uma estrutura das funções deste documento, mas usando CALLBACK
/*
obterUsuario(function resolverUsuario(erro, usuario){
	if(erro){
		console.error('DEU RUIM em USUARIO', error)
		return;
	}
	obterEndereco( function resolverEndereco(erro1, endereco){
		if(erro1){
			console.error('DEU RUIM em ENDERECO', error);
			return;
		}
		obterTelefone( function resolverTelefone( erro2, telefone){
			if(erro2){
				console.error('DEU RUIM em TELEFONE', error);
				return;
			}
			
			console.log(`
				Id e Nome:${usuario.id} ${usuario.nome},
				Telefone: ${telefone.ddd}, ${telefone.telefone},
				Endereco: ${endereco.rua} numero ${endereco.numero}
				`)
		})
	})
})
*/