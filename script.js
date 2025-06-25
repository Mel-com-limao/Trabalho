const itemInput = document.getElementById('itemInput');
const addBtn = document.getElementById('addBtn');
const itemList = document.getElementById('itemList');

// Carregar lista do localStorage
let lista = JSON.parse(localStorage.getItem('listaCompras')) || [];
renderList();

// Adicionar item
addBtn.addEventListener('click', () => {
    const itemTexto = itemInput.value.trim();
    if (itemTexto !== '') {
      lista.push({ texto: itemTexto, comprado: false });
      salvarLista();
      renderList();
      alert(`"${itemTexto}" foi adicionado à lista!`); // ← Alerta aqui
      itemInput.value = '';
    }
  });
  

// Renderizar lista na tela
function renderList() {
  itemList.innerHTML = '';
  lista.forEach((item, index) => {
    const li = document.createElement('li');
    li.className = item.comprado ? 'comprado' : '';
    li.innerHTML = `
      <span class="texto-item">${item.texto}</span>
      <div>
        <button class="toggleBtn">✔</button>
        <button class="remove">X</button>
      </div>
    `;

    // Marcar como comprado
    li.querySelector('.toggleBtn').addEventListener('click', () => {
      lista[index].comprado = !lista[index].comprado;
      salvarLista();
      renderList();
    });

    // Remover item
    li.querySelector('.remove').addEventListener('click', () => {
        const itemRemovido = lista[index].texto;
        lista.splice(index, 1);
        salvarLista();
        renderList();
        alert(`"${itemRemovido}" foi removido da lista.`);
    });
      

    itemList.appendChild(li);
  });
}

// Salvar lista no localStorage
function salvarLista() {
  localStorage.setItem('listaCompras', JSON.stringify(lista));
}

// --- Novo sistema de múltiplas listas --- //
const savedListsMenu = document.getElementById("savedLists"); // precisa ter esse <ul> no HTML

function createNewList() {
  if (lista.length > 0 && confirm("Deseja salvar a lista atual antes de criar uma nova?")) {
    saveCurrentList();
  }
  lista = [];
  salvarLista();
  renderList();
}

function saveCurrentList() {
  if (lista.length === 0) return alert("A lista está vazia.");
  const name = prompt("Digite um nome para essa lista:");
  if (name) {
    localStorage.setItem(name, JSON.stringify(lista));
    carregarMenuListas();
    alert(`Lista "${name}" salva com sucesso!`);
  }
}

function carregarMenuListas() {
  if (!savedListsMenu) return; // Se o menu não existe no HTML, pula
  savedListsMenu.innerHTML = "";
  for (let i = 0; i < localStorage.length; i++) {
    const chave = localStorage.key(i);
    if (chave !== "listaCompras") { // ignora a lista padrão
      const li = document.createElement("li");
      li.textContent = chave;
      li.style.cursor = "pointer";
      li.onclick = () => {
        const listaSalva = JSON.parse(localStorage.getItem(chave));
        lista = listaSalva;
        salvarLista();
        renderList();
      };
      savedListsMenu.appendChild(li);
    }
  }
}

// Chama quando o site abrir
window.onload = carregarMenuListas;

