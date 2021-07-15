export const toRealCurrency = (num) => {
  const int = parseInt(num);
  const decimals = parseInt((num - int) * 100);

  return 'R$ ' + String(int) + ',' + String(decimals).padEnd(2, '0');
};
