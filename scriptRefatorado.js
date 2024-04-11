// Funções auxiliares
function pegarElemento(id) {
  return document.getElementById(id);
}

function criarElemento(tipo) {
  return document.createElement(tipo);
}

function imprimirElemento(elemento) {
  console.log(elemento);
}

// Função principal
function atualizarSite() {
  const titulo = pegarElemento("nome-empresa");
  imprimirElemento(titulo);
  const tituloTexto = titulo.innerText;
  imprimirElemento(tituloTexto);

  setTimeout(() => {
    titulo.innerText = "Meu Site";
  }, 1000);

  const sobreAEmpresa = pegarElemento("sobre");
  imprimirElemento(sobreAEmpresa);
  const conteudoSobreAEmpresa = sobreAEmpresa.innerText;
  imprimirElemento(conteudoSobreAEmpresa);

  sobreAEmpresa.innerText = `Novo conteúdo sobre a empresa ${titulo.innerText}`;

  const menus = Array.from(document.getElementsByClassName("menu"));
  imprimirElemento(menus);

  menus.forEach(menu => {
    imprimirElemento(menu.innerText);
  });

  const menuNomes = menus.map(menu => menu.innerText);
  imprimirElemento(`Os menus do site são: ${menuNomes.join(", ")}`);

  const produtosContainer = pegarElemento("produtos");
  imprimirElemento(produtosContainer);
  const produtos = Array.from(produtosContainer.children);
  imprimirElemento(produtos);

  const produtosNomes = produtos.map(prod => prod.innerText);
  imprimirElemento(`Produtos ofertados: ${produtosNomes.join(", ")}`);

  const vendas = pegarElemento("vendas");
  imprimirElemento(vendas);
  const conteudovendas = vendas.children[1];
  imprimirElemento(conteudovendas);
  const listaDeVendas = Array.from(conteudovendas.children);
  imprimirElemento(listaDeVendas);

  const produtosVendidos = {};
  const valorrestotais = {};

  listaDeVendas.forEach(venda => {
    const produtovendido = venda.children[1].innerText;
    const quantidadevendida = venda.children[2].innerText;
    const Valortotal = venda.children[3].innerText.replace("R$ ", "");
    imprimirElemento(`${produtovendido} - ${quantidadevendida} - ${Valortotal}`);
    if (!produtosVendidos[produtovendido]) {
      produtosVendidos[produtovendido] = 0;
    }
    if (!valorrestotais[produtovendido]) {
      valorrestotais[produtovendido] = 0;
    }
    valorrestotais[produtovendido] += parseFloat(Valortotal);
    produtosVendidos[produtovendido] += parseInt(quantidadevendida);
  });

  imprimirElemento(`Produtos vendidos: `, produtosVendidos);

  const cabecalhoResumo = pegarElemento("resumo-vendas-cab");
  imprimirElemento(cabecalhoResumo);
  const tabelaResumo = cabecalhoResumo.parentNode;
  imprimirElemento(tabelaResumo);

  tabelaResumo.style.marginTop = '50px';

  const nomesDosProdutos = Object.keys(produtosVendidos);
  imprimirElemento(nomesDosProdutos);

  const resumoVendas = pegarElemento("resumo-vendas");
  imprimirElemento(resumoVendas);

  nomesDosProdutos.forEach(produto => {
    const tr = criarElemento("tr");
    const tdProduto = criarElemento("td");
    const tdQuantidade = criarElemento("td");
    const tdvendas = criarElemento("td");
    tdProduto.innerText = produto;
    tdQuantidade.innerText = produtosVendidos[produto];
    tdvendas.innerText = `R$ ${valorrestotais[produto].toFixed(2).replace(".", ",")}`;
    tr.appendChild(tdProduto);
    tr.appendChild(tdQuantidade);
    tr.appendChild(tdvendas);
    resumoVendas.appendChild(tr);
  });
}

// Executa a função principal
atualizarSite();