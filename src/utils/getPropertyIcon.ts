  export const getPropertyIcon = (tipo: string) => {
    const icons: Record<string, string> = {
      'oficina': '🏢',
      'apartamento': '🏬',
      'casa': '🏡',
      'loft': '🏙️',
      'penthouse': '🏰'
    };
    return icons[tipo] || '🏠';
  };