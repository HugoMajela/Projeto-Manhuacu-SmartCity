const puppeteer = require('puppeteer')

async function scrap() {
    const navegador = await puppeteer.launch({ headless: "new" })
    const pagina = await navegador.newPage();
    await pagina.goto("https://paxaemcasa.com.br/loja/")
    await pagina.waitForNetworkIdle();

    const resultado = await pagina.evaluate(() => {
        const produtos = []

        document.querySelectorAll("div.caption > a > span").forEach(produto => produtos.push({ titulo: produto.innerText }))
        document.querySelectorAll("div.col-12.container-preco.padding0 > div > div > strong").forEach((produto, i) => {
            produtos[i].preco = produto.innerText;
        })
        
        return produtos
    })

    console.log(resultado)

    navegador.close()
}

scrap();