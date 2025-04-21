import { obterElemento } from './utils.js'

const API_URL = 'https://crudcrud.com/api/4b54d19604534ec298a7cdd8860493ed/customers'

const nomeInput = obterElemento('nome')
const emailInput = obterElemento('email')
const clientesList = obterElemento('clientesList')

// Carregar clientes
export const carregarClientes = async () => {
  try {
    const response = await fetch(API_URL)
    const clientes = await response.json()

    clientesList.innerHTML = ''

    if (clientes.length === 0) {
      clientesList.innerHTML = '<p>Nenhum cliente cadastrado.</p>'
      return
    }

    clientes.forEach(cliente => {
      const clienteDiv = document.createElement('div')
      clienteDiv.className = 'cliente-item'
      clienteDiv.innerHTML = `
        <div>
          <strong>${cliente.nome}</strong>
          <p>${cliente.email}</p>
        </div>
        <button class="delete-btn" data-id="${cliente._id}">Excluir</button>
      `
      clientesList.appendChild(clienteDiv)
    })

    document.querySelectorAll('.delete-btn').forEach(btn => {
      btn.addEventListener('click', excluirCliente)
    })
  } catch (error) {
    console.error('Erro ao carregar clientes:', error)
    clientesList.innerHTML = '<p>Erro ao carregar clientes. Tente novamente.</p>'
  }
}

// Cadastrar cliente
export const cadastrarCliente = async (event) => {
  event.preventDefault()

  const cliente = {
    nome: nomeInput.value,
    email: emailInput.value
  }

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cliente)
    })

    if (response.ok) {
      nomeInput.value = ''
      emailInput.value = ''
      carregarClientes()
    } else {
      alert('Erro ao cadastrar cliente. Tente novamente.')
    }
  } catch (error) {
    console.error('Erro ao cadastrar cliente:', error)
    alert('Erro ao cadastrar cliente. Verifique o console para mais detalhes.')
  }
}

// Excluir cliente
const excluirCliente = async (event) => {
  const clienteId = event.target.getAttribute('data-id')

  if (!confirm('Tem certeza que deseja excluir este cliente?')) return

  try {
    const response = await fetch(`${API_URL}/${clienteId}`, {
      method: 'DELETE'
    })

    if (response.ok) {
      carregarClientes()
    } else {
      alert('Erro ao excluir cliente. Tente novamente.')
    }
  } catch (error) {
    console.error('Erro ao excluir cliente:', error)
    alert('Erro ao excluir cliente. Verifique o console para mais detalhes.')
  }
}
