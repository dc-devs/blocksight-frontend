interface Halves {
	firstHalf: any[];
	secondHalf: any[];
}

const splitArrayInTwo = (array: any[]): Halves => {
	const half_length = Math.ceil(array.length / 2);
	const arrayCopy1 = [...array];
	const arrayCopy2 = [...array];

	const firstHalf = arrayCopy1.splice(0, half_length);
	const secondHalf = arrayCopy2.splice(half_length, array.length - 1);

	return {
		firstHalf,
		secondHalf,
	};
};

export default splitArrayInTwo;
