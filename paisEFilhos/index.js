import * as puppeteer from 'puppeteer'
import { setTimeout } from "node:timers/promises"


async function scrap() {
    const navegador = await puppeteer.launch({ headless: false })
    const pagina = await navegador.newPage();
    await pagina.goto("https://supermercadopaisefilhos.com.br/")
    await pagina.waitForNetworkIdle();

    await pagina.click("#menu-mobile > ul > li:nth-child(4) > a")
    await pagina.waitForNetworkIdle();
    await pagina.type('#login-form > div:nth-child(2) > div.form-group > input', 'gugue2206@gmail.com', { delay: 100 });
    await pagina.type('#login-form > div:nth-child(3) > div > input', 'pbgJBRZ8EDY', { delay: 100 })

    const botaoLogin = '#login-form > div.form-group.row.mb-0.col-sm-12 > div:nth-child(1) > button';

    await pagina.waitForSelector(botaoLogin, { visible: true });
    await pagina.evaluate((selector) => {
        const btn = document.querySelector(selector);
        if (btn && !btn.disabled) btn.click();
    }, botaoLogin);
    
    await setTimeout(5000);

    await pagina.click("#main-navbar > div.row.col-sm-12.menu-principal.menu-pading.align-items-center.px-4 > div.col-7.col-sm-4 > a > img")
    await pagina.waitForSelector("div.preco.menor.text-secondary.d-inline-block > strong > b:nth-child(3)")

    const resultado = await pagina.evaluate(() => {
        const produtos = [];
        const titulos = document.querySelectorAll("a > p");
        const precos = document.querySelectorAll("div.preco.menor.text-secondary.d-inline-block > strong > b:nth-child(3)");

        titulos.forEach((produto, i) => {
            produtos.push({
                titulo: produto.innerText.trim(),
                preco: precos[i] ? precos[i].innerText.trim() : "Indisponível"
            });
        });

        return produtos;
    });

    await pagina.waitForNetworkIdle()
    console.log(resultado)

    navegador.close()
}

scrap();