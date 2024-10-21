import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const App = () => { 
  const count = useSelector(state => state); // Certifique-se de que o state é o que você espera
  const dispatch = useDispatch();

  const handleDecrement = () => {
    dispatch({ type: 'DECREMENT' });
    console.log("Botão foi clicado e diminuiu o valor")
  };

  const handleIncrement = () => {
    dispatch({ type: 'INCREMENT' });
    console.log('Botão foi clicado e aumentou o valor')
  };

  return ( // Adicione o return aqui
    <div>
      <h1>Counter: {count}</h1>
      <button onClick={handleDecrement} type="button">
        Decrement
      </button>
      <button onClick={handleIncrement} type="button">
        Increment
      </button>
    </div>
  );

};

export default App; // Removido o withRouter
