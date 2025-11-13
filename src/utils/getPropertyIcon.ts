  export const getPropertyIcon = (tipo: string) => {
    const icons: Record<string, string> = {
      'oficina': '🏢',
      'apartamento': '🏬',
      'casa': '🏡',
      'finca': '🛖'
    };
    return icons[tipo] || '🏠';
  };