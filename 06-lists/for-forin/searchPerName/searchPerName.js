// Esse script encontra os personagens de Star Wars através da api do swapi.com
// OS LEITORES DE INPUT ESTÃO FUNCIONANDO UM EM CIMA DO OUTRO, TEM QUE CONSERTAR SÓ ISSO
// APARENTEMENTE


// Atribuindo o modulo 'service', que é a pasta que vimos anteriormente, para
// o const 'service'

	const service = require('./service')
	const readLine = require('readline')

	const rl = readLine.createInterface({
		input: process.stdin,
		output: process.stdout
	});

	console.log("Busque os detalhes de seu personagem Star Wars !")
	console.log('Buscar por: ')

rl.on("line", async function (valorDado){
// Faz uma pesquisa com o valor digitado e guarda a resposta em result.
	const result = await service.obterPessoasPorNome(valorDado)

	const names = []

	for(let i in result.results){
		const pessoa = result.results[i]
		names.push(pessoa.name)
	}

	if(names.length == 1){
		console.log('Procura este personagem? (Y/N)')
		console.log(names[0])
		
		// rl.close()
		
		const confirmacao =  await confirmPersonagem(names)

		if(confirmacao == 1){
			console.log('Detalhes dele(a): ')
			detalhesPersonagem(result.results[0])
		}else if(confirmacao == 0){
			console.log('Nao encontramos o personagem :(')
		}

	}else if(names.length >= 2){
		console.log('Ele esta nessa lista? (Y/N)')

		for(let i in names){
			console.log(`${i} - ${names[i]}`)
		}

		// rl.close()

		const confirmacao = confirmPersonagem(names)

		if(confirmacao == 1){
			console.log('Qual eh a posicao? ')
			const index = confirmIndex() - 1;
			console.log('Detalhes do personagem: ')
			detalhesPersonagem(result.results[index])
		}else if(confirmacao == 0){
			console.log('Nao encontramos o personagem :(')
		}
	}else{
		rl.close()
		console.log('Nenhum personagem com esse nome :(')
	}
})

function detalhesPersonagem(result){
	console.log(result)
}

function confirmIndex(){
	const r3 = readLine.createInterface({
		input: process.stdin,
		output: process.stdout
	});

	r3.on('data', async function(valorRecebido){
		return valorRecebido
	})
}

function confirmPersonagem(nomes){
	const r2 = readLine.createInterface({
		input: process.stdin,
		output: process.stdout
	});s

	r2.on('line', async function(valorConfirmacao){
		if(esteValor == 'y' || esteValor == 'Y'){
			r2.close()
			return 1
		}else if (valorConfirmacao == 'n' || valorConfirmacao == 'N'){
			r2.close()
			return 0
		}else{
			console.log("Resposta nao processada.")
			if(nomes.length == 1){
				console.log('Seu personagem eh este? (Y/N)')
				confirmPersonagem(nomes)
			}else{
				console.log('Seu personagem esta listado? (Y/N)')
				confirmPersonagem(nomes)
			}
		}
	})
}
