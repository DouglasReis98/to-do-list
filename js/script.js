let btnNovaTarefa = document.getElementById("btnNovaTarefa");
let novaTarefa = document.getElementById("novaTarefa");
let frm = document.querySelector("form");
let containerTarefas = document.getElementById("tarefa-container");

btnNovaTarefa.addEventListener("click", () => {
    if (novaTarefa.style.display = "none") {
        novaTarefa.style.display = "block"

    }
})

frm.addEventListener("submit", (e) => {
    e.preventDefault()

    let tarefas = []

    if (localStorage.getItem("outTarefa")) {

    tarefas = JSON.parse(localStorage.getItem("outTarefa"));

    }
    const tarefa = frm.inNovaTarefa.value;
    tarefas.push(tarefa);
    localStorage.setItem("outTarefa", JSON.stringify(tarefas));
    mostrarTarefas();
    frm.reset()
})

function mostrarTarefas() {
    if (!JSON.parse(localStorage.getItem("outTarefa"))) {
        containerTarefas.innerHTML = `<article class="border border-info m-2">
                                        <h5>Não há tarefas cadastradas aqui!!!</h5>
                                        </article>`
    } else {

        const outTarefa = JSON.parse(localStorage.getItem("outTarefa"));
        //console.log(outTarefa)
        containerTarefas.innerHTML = ""
        for (tarefa of outTarefa) {

            let article = document.createElement("article");
            article.className = 'border border-info m-2'
            article.innerHTML = `<h5>${tarefa}</h5>
            <div class="controls m-1">
                <i class="fa-regular fa-circle-check btn btn-success"></i>
                <i class="fa-solid fa-pencil btn btn-warning"></i>
                <i class="fa-solid fa-trash btn btn-danger"></i>
            </div>`;
            containerTarefas.append(article)
            /*
            containerTarefas.innerHTML = `<article class="border border-info m-2">
                                <h5>${tarefa}</h5>
                                    <div class="controls m-1">
                                        <i class="fa-regular fa-circle-check btn btn-success"></i>
                                        <i class="fa-solid fa-pencil btn btn-warning"></i>
                                        <i class="fa-solid fa-trash btn btn-danger"></i>
                                    </div>
                            </article>`
*/
        }
    }

}

window.addEventListener("load", mostrarTarefas)
