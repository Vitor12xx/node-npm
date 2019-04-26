// Essa file serve para demonstrar a diferença de performance dos diferentes
// loops de for: 'for' comum, 'for in' e 'for of'

// Atribuindo o modulo 'service', que é a pasta que vimos anteriormente, para
// o const 'service'
const service = require('./service')

// Função async Promise 'main', que vai utilizar a função exportada da file 'service'
// e buscar por todos os personagens de com 'a' no nome
async function main(){
	try{
		// Criando uma const que guarda as respostas da pesquisa
		const result = await service.obterPessoas('a')
		// Criando um array para futuramente guardar apenas os nomes dos personagens
		const names = []
		
		// Cada loop possui um contador de tempo para analisar a velocidade de cada um

		// Loop 'for' comum.
		console.time('for')
		for(let i = 0; i <= result.results.length - 1; i++){
			const pessoa = result.results[i]
			names.push(pessoa.name)
		}
		console.timeEnd('for')
		

		// Loop 'for in'. Percorre o array selecionado e incrementa
		// a variavel automaticamente 
		console.time('forin')
		for(let i in result.results){
			const pessoa = result.results[i]
			names.push(pessoa.name)
		}
		console.timeEnd('forin')
		
		// Loop 'for of'. Percorre cada objeto OF algo, neste caso 'result.results'
		console.time('forof')
		for(pessoa of result.results){
			names.push(pessoa.name)
		}
		console.timeEnd('forof')

		// Imprime o array 'names', que depois de passado pelos loops,
		// está cheio com os nomes dos personagens
		console.log(`names`, names)
	}

	// Se algum erro ocorrer, cairá aqui
	catch(error){
		console.error('ERRO INTERNO', error)
	}
}

// Finalmente, chamamos a função escrita acima.
main()