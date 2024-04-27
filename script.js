window.document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById('form');
    const cargoSelecionado = document.getElementById('cargo');
    const salario = document.getElementById('salario');
    const setorSelecionado = document.getElementById('setor');
    const sigla = document.getElementById('sigla');
    const convenioSelecionado = document.getElementById('convenio');
    const valorTitular = document.getElementById('valorTitular');
    const valorDependente = document.getElementById('valorDependente');

    let setores = [
        { id: 1, nome: "Tecnologia da Informação", sigla: "TI" },
        { id: 2, nome: "Recursos Humanos", sigla: "RH" },
        { id: 3, nome: "Financeiro", sigla: "FI" },
        { id: 4, nome: "Marketing e Vendas", sigla: "MK" },
        { id: 5, nome: "Produção e Operações", sigla: "PO" },
    ];
    let cargos = [
        { id: 1, nome: "Analista de Sistemas", salario: "8500" },
        { id: 2, nome: "Assistente Administrativo", salario: "2500" },
        { id: 3, nome: "Secretário", salario: "4300" },
        { id: 4, nome: "Gerente de Vendas", salario: "6500" },
        { id: 5, nome: "Analista de Marketing", salario: "4500" },
    ];
    let convenios = [
        {
            id: 1,
            nome: "UNIMED",
            valor: {
                titular: 1500,
                dependente: 750,
            },
        },
        {
            id: 2,
            nome: "Intermédica",
            valor: {
                titular: 1400,
                dependente: 850,
            },
        },
    ];

    function carregarDados() {
        setores.forEach(setor => {
            const option = document.createElement('option');
            option.value = setor.id;
            option.textContent = `${setor.nome} (${setor.sigla})`;
            setorSelecionado.appendChild(option);
        });

        cargos.forEach(cargo => {
            const option = document.createElement('option');
            option.value = cargo.id;
            option.textContent = `${cargo.nome}`;
            cargoSelecionado.appendChild(option);
        });

        convenios.forEach(convenio => {
            const option = document.createElement('option');
            option.value = convenio.id;
            option.textContent = `${convenio.nome}`;
            convenioSelecionado.appendChild(option);
        });
    }

    //listener pra atualizar 
    setorSelecionado.addEventListener("change", function () {
        const setorId = parseInt(setorSelecionado.value);
        const setorBuscado = setores.find(x => x.id == setorId);

        if (setorBuscado) {
            sigla.value = setorBuscado.sigla;
        }
        else {
            sigla.value = "";
        }
    });

    cargoSelecionado.addEventListener("change", function () {
        const cargoId = parseInt(cargoSelecionado.value);
        const cargoBuscado = cargos.find(x => x.id == cargoId);

        if (cargoBuscado) {
            salario.value = cargoBuscado.salario;
        }
        else {
            salario.value = "";
        }
    });

    convenioSelecionado.addEventListener("change", function () {
        const convenioId = parseInt(convenioSelecionado.value);
        const convenioBuscado = convenios.find(x => x.id == convenioId);

        if (convenioBuscado) {
            valorTitular.value = convenioBuscado.valor.titular;
            valorDependente.value = convenioBuscado.valor.dependente;
        }
        else {
            valorTitular.value = "";
            valorDependente.value = "";
        }
    });

    carregarDados(); //usa a função para carregar todos os dados

    form.addEventListener('submit', function salvarFuncionario(func) {
        event.preventDefault();

        //pega todos os dados do funcionário
        let funcionario = {
            nome: document.getElementById('nome').value,
            telefone: document.getElementById('telefone').value,
            email: document.getElementById('email').value,
            cpf: document.getElementById('cpf').value,
            rg: document.getElementById('rg').value,
            idCargo: cargoSelecionado.value,
            idSetor: setorSelecionado.value,
            idConvenio: convenioSelecionado.value
        };

        let url = "https://66266bc2052332d55322d1f0.mockapi.io/funcionario";

        fetch(url, {
            method: "Post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(func),
        }).then((resposta) => {
            if (resposta.status == 201) {
                window.alert("Salvo com sucesso.");
            }
            else {
                window.alert("Ocorreu um problema ao tentar salvar o funcionário: " + resposta.status);
            }
        });
    })
});