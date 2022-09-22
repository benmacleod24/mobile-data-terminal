import { compareSync, genSaltSync, hash, hashSync } from 'bcrypt';

interface Constructor {
	hashed?: string;
	plaintext?: string;
}

/**
 * Password Service.
 * Using the @bcrypt npm package for password encrypting.
 */
class Password {
	private readonly saltRounds: number;
	public readonly hashed: string;
	public readonly plaintext: string;
	public readonly isPasswordValid: boolean;

	constructor({ hashed, plaintext }: Constructor) {
		this.saltRounds = 10;
		this.hashed = hashed ?? '';
		this.plaintext = plaintext ?? '';
		this.isPasswordValid = this.verifyPassword(
			this.plaintext,
			this.hashed
		);
	}

	/**
	 * Generate salt rounds for password hashing.
	 * @param saltRounds Overide for default salt rounds.
	 * @returns Salt rounds for password hashing.
	 */
	private generateSalt = (saltRounds?: number) => {
		const salt = genSaltSync(saltRounds || this.saltRounds);
		return salt ?? undefined;
	};

	/**
	 * Hash the plain text password to be stored in the database.
	 * @param plaintextPassword Plain text password to be hashed.
	 * @returns Hashed password or undefined.
	 */
	public hashPassword = (plaintextPassword: string) => {
		const salt = this.generateSalt();
		const hashedPassword = hashSync(plaintextPassword, salt);
		return hashedPassword ?? undefined;
	};

	/**
	 * Compare the hashed password with the plaintext one and verify they are the same.
	 * @param plaintextPassword Plaintext password to compare.
	 * @param hashedPassword Hashed password to compare against.
	 * @returns True or false
	 */
	public verifyPassword = (
		plaintextPassword: string,
		hashedPassword: string
	) => {
		const isPasswordVerified = compareSync(
			plaintextPassword,
			hashedPassword
		);
		return isPasswordVerified ?? false;
	};
}

export default Password;
