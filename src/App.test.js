import React from "react"; // Importa o React para criar componentes.
import { createStore } from "redux"; // Importa a função createStore para criar a store Redux.
import { MemoryRouter } from "react-router"; // Importa o MemoryRouter para simular o roteamento durante os testes.
import { Provider } from "react-redux"; // Importa o Provider para fornecer a store Redux ao componente.
import { render, screen, fireEvent, act } from "@testing-library/react"; // Importa funções de teste, como renderização, interação e verificação.

import App from "./App"; // Importa o componente App que será testado.
import { counter } from "./store"; // Importa o reducer do contador para a store.

describe('App Component Test Suite', () => { 
    // Função auxiliar para renderizar o componente com Redux e React Router
    function renderWithRedux(component, { initialState, store = createStore(counter, initialState) } = {}) {
        return {
            ...render(
                // Envolve o componente com o Provider do Redux e o MemoryRouter para simular roteamento.
                <Provider store={store}>
                    <MemoryRouter>
                        {component}
                    </MemoryRouter>
                </Provider>
            ),
            store, // Retorna a store para permitir o acesso nos testes.
        };
    }

    // Teste para verificar o valor inicial do contador na primeira renderização
    it('Should display initial counter value on first render', () => {
        renderWithRedux(<App />); // Renderiza o App com a store padrão.
        expect(screen.getByText('Counter: 0')).toBeInTheDocument(); // Verifica se o texto "Counter: 0" está presente no documento.
    });

    // Teste para verificar se o contador decrementa ao clicar no botão "Decrement"
    it('Should decrease counter when Decrement button is clicked', () => {
        renderWithRedux(<App />); // Renderiza o App.
        fireEvent.click(screen.getByText('Decrement')); // Simula um clique no botão "Decrement".
        expect(screen.getByText('Counter: -1')).toBeInTheDocument(); // Verifica se o contador foi decrementado para -1.
        fireEvent.click(screen.getByText('Decrement')); // Clica novamente no botão.
        expect(screen.getByText('Counter: -2')).toBeInTheDocument(); // Verifica se o contador foi decrementado para -2.
    });

    // Teste para verificar se o contador incrementa ao clicar no botão "Increment"
    it('Should increase counter when Increment button is clicked', () => {
        renderWithRedux(<App />); // Renderiza o App.
        fireEvent.click(screen.getByText('Increment')); // Simula um clique no botão "Increment".
        expect(screen.getByText('Counter: 1')).toBeInTheDocument(); // Verifica se o contador foi incrementado para 1.
        fireEvent.click(screen.getByText('Increment')); // Clica novamente no botão.
        expect(screen.getByText('Counter: 2')).toBeInTheDocument(); // Verifica se o contador foi incrementado para 2.
    });

    // Teste para verificar o valor inicial após um dispatch de incremento
    it('Should reflect incremented value after manual dispatch', () => {
        const { store } = renderWithRedux(<App />); // Renderiza o App e obtém a store.
        act(() => store.dispatch({ type: 'INCREMENT' })); // Despacha manualmente a ação de incrementar.
        expect(screen.getByText('Counter: 1')).toBeInTheDocument(); // Verifica se o contador foi incrementado para 1.
    });

    // Teste para verificar o valor inicial após um dispatch de decremento
    it('Should reflect decremented value after manual dispatch', () => {
        const { store } = renderWithRedux(<App />); // Renderiza o App e obtém a store.
        act(() => store.dispatch({ type: 'DECREMENT' })); // Despacha manualmente a ação de decrementar.
        expect(screen.getByText('Counter: -1')).toBeInTheDocument(); // Verifica se o contador foi decrementado para -1.
    });
});
