// Essa file serve para armazenar a função obterPessoas e seus mecânismos
// File basicamente feita para ser exportada, como acontece ao final do code.


// Atribuindo um módulo ao const 'axios'
const axios = require('axios')
// Atribuindo uma URL para a const 'URL'
const URL = `https://swapi.co/api/people`

// Criando uma funçao async Promise que obtém as pessoas da URL pelo nome buscado
async function obterPessoasPorNome(nome){
	const url = `${URL}/?search=${nome}&format=json`
	const response = await axios.get(url)
	return response.data
}

// Exporta a função obterPessoas, para que outras files possam usar
module.exports = {
	obterPessoasPorNome
}

// Teste para ver se funciona, utilizando a pesquisa 'r2' Spoiler: funciona
/*
obterPessoas('r2')
	.then(function (resultado_pesquisa_r2){
		console.log('resultado', resultado_pesquisa_r2)
	})

	.catch(function (error){
		console.error('DEU RUIM', error)
	})

*/
