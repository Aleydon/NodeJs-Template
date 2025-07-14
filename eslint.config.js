import globals from 'globals';
import tseslint from 'typescript-eslint';
import pluginPrettier from 'eslint-plugin-prettier';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import eslintConfigPrettier from 'eslint-config-prettier';

export default [
	{
		ignores: ['dist/', 'node_modules/', 'swagger-output.json']
	},
	// TypeScript files
	{
		files: ['src/**/*.ts'],
		languageOptions: {
			globals: {
				...globals.node,
				...globals.jest
			},
			parser: tseslint.parser,
			parserOptions: {
				ecmaVersion: 'latest',
				sourceType: 'module',
				project: './tsconfig.json'
			}
		},
		plugins: {
			'@typescript-eslint': tseslint.plugin,
			prettier: pluginPrettier,
			'simple-import-sort': simpleImportSort
		},
		rules: {
			...tseslint.configs.recommended.rules,
			'prettier/prettier': 'error',
			'simple-import-sort/imports': 'error',
			'simple-import-sort/exports': 'error'
		}
	},
	// JavaScript configuration files
	{
		files: ['*.js', '*.mjs'],
		languageOptions: {
			globals: {
				...globals.node
			},
			parserOptions: {
				ecmaVersion: 'latest',
				sourceType: 'module'
			}
		},
		plugins: {
			prettier: pluginPrettier
		},
		rules: {
			'prettier/prettier': 'error'
		}
	},
	eslintConfigPrettier
];
