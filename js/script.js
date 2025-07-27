let btnNovaTarefa = document.getElementById("btnNovaTarefa");
let btnExcluirTarefa = document.getElementById("excluir-tarefa");
let novaTarefa = document.getElementById("novaTarefa");
let frm = document.querySelector("form");
let containerTarefas = document.getElementById("tarefa-container");

btnNovaTarefa.addEventListener("click", () => {
  if ((novaTarefa.style.display = "none")) {
    novaTarefa.style.display = "block";
  }
  document.getElementById("inNovaTarefa").focus();
});

class Tarefa {
  constructor() {
    const arrTarefas = localStorage.getItem("outTarefa");
    this.tarefas = arrTarefas ? JSON.parse(arrTarefas) : [];
  }

  adicionarTarefa(tarefa) {
    if (tarefa != "") {
      this.tarefas.push(tarefa);
      localStorage.setItem("outTarefa", JSON.stringify(this.tarefas));
      mostrarTarefas();
      frm.reset();
      novaTarefa.style.display = "none";
    }
  }
  recuperarTarefas() {
    return this.tarefas;
  }
  editarTarefa(i) {
    if ((novaTarefa.style.display = "block")) {
      frm.reset();
      novaTarefa.style.display = "none";
    }

    let editar = document.createElement("form");
    editar.id = "editFrm";
    editar.innerHTML = `<input type="text" id="editTarefa" value="${this.tarefas[i]}" class="w-100">
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
      this.tarefas[i] = novaTarefa;

      localStorage.setItem("outTarefa", JSON.stringify(this.tarefas));
      mostrarTarefas();
    });

    cancelarEdicao.addEventListener("click", () => {
      editar.remove();
      btnEditar.disabled = false;
    });
  }

  concluirTarefa(i) {
    let mensagem = "Esta tarefa foi concluída?";
    if (confirm(mensagem) == true) {
      let concluida = this.tarefas.splice(i, 1);
      localStorage.setItem("outTarefa", JSON.stringify(this.tarefas));
      localStorage.setItem("ultimaConcluida", concluida);
      mostrarTarefas();
      tarefa.mostrarTarefaConcluida(concluida);
    }
  }

  mostrarTarefaConcluida(tarefaConcluida) {
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
      });
    }
  }
  excluirTarefa(i) {
    let mensagem = "Deseja excluir esta tarefa?";
    if (confirm(mensagem) == true) {
      this.tarefas.splice(i, 1);
      localStorage.setItem("outTarefa", JSON.stringify(this.tarefas));
      mostrarTarefas();
    }
  }
}

const mostrarTarefas = () => {
  let tarefas = tarefa.recuperarTarefas();
  if ((tarefas == null && tarefas.length === 0) || !tarefas.length == 1) {
    containerTarefas.innerHTML = `<article class="border border-info m-2">
                                        <h5>Não há tarefas cadastradas aqui!!!</h5>
                                        </article>`;
  } else {
    containerTarefas.innerHTML = "";
    for (let i = 0; i < tarefas.length; i++) {
      let article = document.createElement("article");
      article.className = "border border-info m-2";
      article.innerHTML = `<h5>${tarefas[i]}</h5>
                                    <div class="controls m-1">
                                        <button onclick="tarefa.concluirTarefa(${[
                                          i,
                                        ]})" class="btn btn-success btn-sm"> <i class="fa-regular fa-circle-check"></i></button>
                                        <button onclick="tarefa.editarTarefa(${[
                                          i,
                                        ]})" class="btn btn-warning btn-sm"><i class="fa-solid fa-pencil"></i></button>
                                        <button onclick="tarefa.excluirTarefa(${[
                                          i,
                                        ]})" class="btn btn-danger btn-sm"><i class="fa-solid fa-trash"></i></button>
                                    </div>`;
      containerTarefas.append(article);
    }
  }
};


frm.addEventListener("submit", (e) => {
  e.preventDefault();
  let tarefa = new Tarefa();
  tarefa.adicionarTarefa(frm.inNovaTarefa.value);
});

window.addEventListener("load", mostrarTarefas());
window.addEventListener(
  "load",
  tarefa.mostrarTarefaConcluida(localStorage.getItem("ultimaConcluida"))
);
