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
