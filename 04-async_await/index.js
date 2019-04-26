/*
	UTILIZANDO PROMISES. O dir 02-nodejs cont�m a mesma pasta, mas utilizando CALLBACKS.

	00 Obter Usuario
	01 Resolvido o Usuario, obter Endereco
	02 Resolvido o Endereco, obter Telefone 
*/

// Importamos um m�dulo interno do node.js
const util = require('util')
// Abaixo utilizei o m�dulo para transformar a funcao que funcionava a callback, para uma funcao
// que funciona a base de Promise. Isso tudo utilizando o m�dulo chamado 'util' do node.js
const obterEnderecoAsync = util.promisify(obterEndereco)
// A const acima agora � uma fun��o promise, feita a partir de uma fun��o callback.


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
		}, 1000)
	})
}

function obterTelefone(){
	return new Promise(function resolverPromise(resolve, reject){
		setTimeout(function () { 
			return resolve({
				ddd: 11,
				telefone: 992244,
			})
		}, 2000)
	})
}

function obterEndereco(callback){
		setTimeout(function () {
			return callback(null, {
				rua: 'dos bobos',
				numero: 0,
			})
	}, 3000)
}


// 1o passo adicionar a palavra async -> automaticamente ela retornar� uma Promise
main()
async function main(){
	try{
		// Abrindo o medidor de tempo		
		console.time('medida-promise')

		const usuario = await obterUsuario()

		// const telefone = await obterTelefone()
		// const endereco = await obterEnderecoAsync()

		// A seguir uma maneira mais r�pida de rodar o programa. Utilizando o m�todo abaixo
		// Se resolve as Promises sem ter que 'esperar' o t�rmino da anterior, s�o realizadas 
		// em segundo plano ASINCRONAMENTE
		const result = await Promise.all([
				obterTelefone(),
				obterEnderecoAsync()
			])

		const telefone = result[0]
		const endereco = result[1]
		
		// Imprimindo tudo
		console.log(`
			Nome: ${usuario.nome}
			Telefone: (${telefone.ddd}) ${telefone.telefone}
			Endereco: ${endereco.rua}, ${endereco.numero}
			`)
		// Fechando o medidor de tempo
		console.timeEnd('medida-promise')
	}catch(erro){
		console.error('DEU RUIM', erro)
	}
}





// Para manipular o sucesso usamos a funcao .then
// Para manipular o erro usamos a funcao .catch

// Atencao ! As linhas a seguir, que manipulam as Promises, foram feitos todas por mim, 
// a aula onde eles demonstra a manipula��o delas est�o 'sem otimiza��o', 
// tomei a liberdade de faz�-lo.

// Abaixo uma estrutura das fun��es deste documento, usando PROMISE
/*
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
*/


// Abaixo uma estrutura das fun��es deste documento, usando CALLBACK
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