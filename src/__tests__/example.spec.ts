import { UserModel } from '@models/user.model';

const sum = (numberA: number, numberB: number) => {
	return numberA + numberB;
};

describe('User Model', () => {
	it('should check if the name passed in the User model is Aleydon', () => {
		const user = new UserModel('Aleydon', 29);
		expect(user.name).toBe('Aleydon');
	});
});

describe('Math', () => {
	it('should sum two numbers correctly', () => {
		const result = sum(1, 2);
		expect(result).toBe(3);
	});
});
