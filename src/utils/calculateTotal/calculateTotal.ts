export const calculateTotal = (amount: string): number => {
	const amountArray = amount
		.split(/[\s,\n]+/)
		.map((amt) => amt.trim())
		.filter((amt) => amt !== '')
		.map((amt) => parseFloat(amt));
	return amountArray.filter((amt) => !isNaN(amt)).reduce((sum, num) => sum + num, 0);
};
