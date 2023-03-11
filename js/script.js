let btnNovaTarefa = document.getElementById("btnNovaTarefa");
let btnExcluirTarefa = document.getElementById("excluir-tarefa");
let novaTarefa = document.getElementById("novaTarefa");
let frm = document.querySelector("form");
let containerTarefas = document.getElementById("tarefa-container");

btnNovaTarefa.addEventListener("click", () => {
    if (novaTarefa.style.display = "none") {
        novaTarefa.style.display = "block"
    }
})

let tarefas = [];

frm.addEventListener("submit", (e) => {
    e.preventDefault()

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
    if (!JSON.parse(localStorage.getItem("outTarefa")).length == 1 && tarefas.length == 0) {
        containerTarefas.innerHTML = `<article class="border border-info m-2">
                                        <h5>Não há tarefas cadastradas aqui!!!</h5>
                                        </article>`


    } else {
        const tarefas = JSON.parse(localStorage.getItem("outTarefa"));
        containerTarefas.innerHTML = ""
        for (let i = 0; i < tarefas.length; i++) {
            let article = document.createElement("article");
            article.className = 'border border-info m-2'
            article.innerHTML = `<h5>${tarefas[i]}</h5>
                                    <div class="controls m-1">
                                        <i onclick="tarefaConcluida(${[i]})" class="fa-regular fa-circle-check btn btn-success"></i>
                                        <i onclick="editarTarefa(${[i]})" class="fa-solid fa-pencil btn btn-warning"></i>
                                        <i onclick="excluirTarefa(${[i]})" class="fa-solid fa-trash btn btn-danger"></i>
                                    </div>`;
            containerTarefas.append(article)
        }
    }

}

function tarefaConcluida(i) {
    let mensagem = "Esta tarefa foi concluída?"
    if (confirm(mensagem) == true) {
        tarefas = JSON.parse(localStorage.getItem("outTarefa"));
        let concluida = tarefas.splice(i, 1);
        localStorage.setItem("outTarefa", JSON.stringify(tarefas));
        mostrarTarefas();
        let footer = document.createElement("footer");
        footer.className = "bg-success text-white w-100"
        footer.innerHTML = `<h2 class="ms-3 me-3">Última Tarefa Concluída: <span>${concluida}</span></h2>`;
        document.body.appendChild(footer);
        console.log("Última tarefa concluída: " + concluida)
    }
};

function editarTarefa(i) {
    console.log("Editar Tarefa" + [i]);
};

function excluirTarefa(i) {
    let mensagem = "Deseja excluir esta tarefa?"
    if (confirm(mensagem) == true) {
        tarefas = JSON.parse(localStorage.getItem("outTarefa"));
        tarefas.splice(i, 1);
        localStorage.setItem("outTarefa", JSON.stringify(tarefas));
        mostrarTarefas();
    }
};

window.addEventListener("load", mostrarTarefas)
