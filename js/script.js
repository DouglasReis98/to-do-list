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
    const tarefa = frm.inNovaTarefa.value;
    if (localStorage.getItem("outTarefa")) {

        const tarefas = localStorage.getItem("outTarefa").split("§");

        tarefas.push(tarefa);

        localStorage.setItem("outTarefa", tarefas.join("§"));
    } else {
        localStorage.setItem("outTarefa", tarefa)
    }

    mostrarTarefas();
    frm.reset()
})

function mostrarTarefas() {
    if (!localStorage.getItem("outTarefa")) {
        containerTarefas.innerHTML = `<article class="border border-info m-2">
                                        <h5>Não há tarefas cadastradas aqui!!!</h5>
                                        </article>`
    }else{

    const outTarefa = localStorage.getItem("outTarefa").split("§");
    console.log(typeof outTarefa)
    for (let i = 0; i < outTarefa.length; i++) {
        
        //containerTarefas.innerHTML = outTarefa.join("\n");
        
        containerTarefas.innerHTML = `<article class="border border-info m-2">
                                <h5>${outTarefa}</h5>
                                    <div class="controls m-1">
                                        <i class="fa-regular fa-circle-check btn btn-success"></i>
                                        <i class="fa-solid fa-pencil btn btn-warning"></i>
                                        <i class="fa-solid fa-trash btn btn-danger"></i>
                                    </div>
                            </article>\n`

    }     
    }
    
}

window.addEventListener("load", mostrarTarefas)
