/*
 *-------------------------------------------------------------------------
 *                          initialise the project
 *-------------------------------------------------------------------------
 * 01) npm init -y 
 * 
 * 
 *-------------------------------------------------------------------------
 *                          install all dependency
 *-------------------------------------------------------------------------
 * 02) npm install cors dotenv express mongoose zod
 * 
 * 
 *-------------------------------------------------------------------------
 *                          typescript configuration
 *-------------------------------------------------------------------------
 * 03) npm install typescript --save-dev
 * 04) tsc -init
 *      "rootDir": "./src",
 *      "outDir": "./dist",   
 *      create folder name -> src
 *      in "script" file from TS to JS -> "build": "tsc",
 *          for auto build -> tsc -w  (each change dynamically no need to build)
 *      for .env file import configuration
 *          src > app > config > index.ts
 *          inside the file set current directory+.env
 * 
 * 
 *-------------------------------------------------------------------------
 *                          install dev dependency
 *-------------------------------------------------------------------------
 * 05) npm i --save-dev @types/express
 *     npm i --save-dev @types/cors
 * 09) npm i ts-node-dev --save-dev    
 *    
 * 
 *-------------------------------------------------------------------------
 *                         eslint and prettier setup
 *-------------------------------------------------------------------------
 * 06) add this two line in tsconfig.json
 *         "include": ["src"], // which files to compile
 *         "exclude": ["node_modules"], // which files to skip
 *     npm install eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin --save-dev
 *         npx eslint --init
 *             after this in "eslint.config.mjs" this file
 *                 add some rules, languageOptions, prettierRecommended and other needed
 * 07) npm install --save-dev prettier
 * 08) npm install --save-dev eslint-config-prettier
 * 
 * 
 *-------------------------------------------------------------------------
 *                          my documentation
 *-------------------------------------------------------------------------
 * last ) npm i -g vercel
 * 
 * 
 * 
 */
