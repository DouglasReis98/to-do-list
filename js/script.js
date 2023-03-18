let btnNovaTarefa = document.getElementById("btnNovaTarefa");
let btnExcluirTarefa = document.getElementById("excluir-tarefa");
let novaTarefa = document.getElementById("novaTarefa");
let frm = document.querySelector("form");
let containerTarefas = document.getElementById("tarefa-container");

btnNovaTarefa.addEventListener("click", () => {
    if (novaTarefa.style.display = "none") {
        novaTarefa.style.display = "block"
    }
    document.getElementById("inNovaTarefa").focus();
})

let tarefas = [];

frm.addEventListener("submit", (e) => {
    e.preventDefault();

    if (localStorage.getItem("outTarefa")) {

        tarefas = JSON.parse(localStorage.getItem("outTarefa"));

    }
    const tarefa = frm.inNovaTarefa.value;

    if (tarefa != "") {
        tarefas.push(tarefa);
        localStorage.setItem("outTarefa", JSON.stringify(tarefas));
        mostrarTarefas();
        frm.reset();
        novaTarefa.style.display = "none";
    }
})

function mostrarTarefas() {
    if ((JSON.parse(localStorage.getItem("outTarefa")) == null && tarefas.length == 0) || !JSON.parse(localStorage.getItem("outTarefa")).length == 1) {
        containerTarefas.innerHTML = `<article class="border border-info m-2">
                                        <h5>Não há tarefas cadastradas aqui!!!</h5>
                                        </article>`;


    } else {
        const tarefas = JSON.parse(localStorage.getItem("outTarefa"));
        containerTarefas.innerHTML = "";
        for (let i = 0; i < tarefas.length; i++) {
            let article = document.createElement("article");
            article.className = 'border border-info m-2'
            article.innerHTML = `<h5>${tarefas[i]}</h5>
                                    <div class="controls m-1">
                                        <button onclick="tarefaConcluida(${[i]})" class="btn btn-success btn-sm"> <i class="fa-regular fa-circle-check"></i></button>
                                        <button onclick="editarTarefa(${[i]})" class="btn btn-warning btn-sm"><i class="fa-solid fa-pencil"></i></button>
                                        <button onclick="excluirTarefa(${[i]})" class="btn btn-danger btn-sm"><i class="fa-solid fa-trash"></i></button>
                                    </div>`;
            containerTarefas.append(article);
        };
    };

};

function tarefaConcluida(i) {
    let mensagem = "Esta tarefa foi concluída?"
    if (confirm(mensagem) == true) {
        tarefas = JSON.parse(localStorage.getItem("outTarefa"));
        let concluida = tarefas.splice(i, 1);
        localStorage.setItem("outTarefa", JSON.stringify(tarefas));
        localStorage.setItem("ultimaConcluida", concluida);
        mostrarTarefas();
        mostrarUltimaTarefa(concluida);
    };
};

function mostrarUltimaTarefa(tarefaConcluida) {
    let footer = document.querySelector("footer");
    if (localStorage.getItem("ultimaConcluida")) {
        footer.innerHTML = `<h2 class="ms-3 me-3">Última Tarefa Concluída: <span>${tarefaConcluida}</span></h2>
                            <button id="fechar" class="border btn-success me-3">X</button>`;
        footer.style.display = "flex";
    }

    let fechar = document.getElementById("fechar");
    if (fechar != null) {
        fechar.addEventListener("click", () => {
            footer.style.display = "none";
            localStorage.removeItem("ultimaConcluida");
        })
    }

}

function editarTarefa(i) {
    if (novaTarefa.style.display = "block") {
        frm.reset();
        novaTarefa.style.display = "none";
    }

    tarefas = JSON.parse(localStorage.getItem("outTarefa"));

    let editar = document.createElement("form");
    editar.id = "editFrm";
    editar.innerHTML = `<input type="text" id="editTarefa" value="${tarefas[i]}" class="w-100">
                            <div class="controls m-1">
                            <button type="submit" class="btn btn-success" id="confirmar-edicao"> <i class="fa-regular fa-chevron-right"></i> </button>
                            <button type="reset" class="btn btn-danger" id="cancelar-edicao"> <i class="fa-solid fa-xmark"></i> </button>
                            </div>`;
    let text = document.getElementsByClassName("controls")[i];
    text.insertAdjacentElement("afterend", editar)[i];

    document.getElementById("editTarefa").focus();


    let btnEditar = document.getElementsByClassName("btn-warning")[i];
    btnEditar.disabled = true;
    let editFrm = document.getElementById("editFrm");
    let cancelarEdicao = document.getElementById("cancelar-edicao");

    editFrm.addEventListener("submit", (e) => {
        e.preventDefault();
        const novaTarefa = editFrm.editTarefa.value;

        tarefas = JSON.parse(localStorage.getItem("outTarefa"));

        tarefas[i] = novaTarefa;

        localStorage.setItem("outTarefa", JSON.stringify(tarefas));
        mostrarTarefas();
    })

    cancelarEdicao.addEventListener("click", () => { editar.remove(); btnEditar.disabled = false });


};

function excluirTarefa(i) {
    let mensagem = "Deseja excluir esta tarefa?";
    if (confirm(mensagem) == true) {
        tarefas = JSON.parse(localStorage.getItem("outTarefa"));
        tarefas.splice(i, 1);
        localStorage.setItem("outTarefa", JSON.stringify(tarefas));
        mostrarTarefas();
    };
};

window.addEventListener("load", mostrarTarefas);
window.addEventListener("load", mostrarUltimaTarefa(localStorage.getItem("ultimaConcluida")));