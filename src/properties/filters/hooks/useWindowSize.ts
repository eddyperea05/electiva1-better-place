import { useState, useEffect } from 'react';

//Custom Hook para saber el tamaño de la ventana
export const useWindowSize = () => {

  //Definimos el estado inicial
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  //Resubscribimos el evento acada que se recargue la página
  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return size;
}