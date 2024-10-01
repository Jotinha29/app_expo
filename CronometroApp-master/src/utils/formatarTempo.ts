export const formatarTempo = (milissegundos: number): string => {
  const minutos = Math.floor(milissegundos / 60000);
  const segundos = Math.floor((milissegundos % 60000) / 1000);
  const mili = milissegundos % 1000;

  const minutosFormatados = minutos.toString().padStart(2, '0');
  const segundosFormatados = segundos.toString().padStart(2, '0');
  const miliFormatados = mili.toString().padStart(3, '0');

  return `${minutosFormatados}:${segundosFormatados}.${miliFormatados}`;
};
