import { obterElemento } from './utils.js'
import {
  carregarClientes,
  cadastrarCliente
} from './main.js'

document.addEventListener('DOMContentLoaded', () => {
  const clienteForm = obterElemento('clienteForm')
  clienteForm.addEventListener('submit', cadastrarCliente)

  carregarClientes()
})
