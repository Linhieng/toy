# 练习，webpack+react+TypeScript+tailwind 创建一个插件

## 使用 TypeScript

初始化 TypeScript

```sh
pnpm init
pnpm i -D typescript
touch tsconfig.json && mkdir -p src/scripts && mkdir src/popup && touch src/manifest.json src/scripts/{background.ts,contentScript.ts} src/popup/{popup.html,popup.ts}
```

此时目录结构如下：

```
├── package.json
├── pnpm-lock.yaml
├── src
│   ├── manifest.json
│   ├── popup
│   │   ├── popup.html
│   │   └── popup.ts
│   └── scripts
│       ├── background.ts
│       └── contentScript.ts
└── tsconfig.json
```

需要用到的文件内容如下

### `tsconfig.json`
```json
{
	"compilerOptions": {
		"target": "es5",
		"lib": [
			"dom",
			"es2015"
		],
		"module": "esnext",
		"strict": true,
		"esModuleInterop": true,
		"skipLibCheck": true
	},
	"include": [
		"src/**/*"
	]
}
```

### `src/manifest.json`
```json
{
	"manifest_version": 3,
	"name": "插件",
	"version": "1.0",
	"description": "使用 webpack+react+TypeScript+tailwind 创建插件",
	"action": { "default_popup": "popup/popup.html" },
	"background": { "service_worker": "scripts/background.js" },
	"content_scripts": [ {
		"matches": [ "<all_urls>" ],
		"js": [ "scripts/contentScript.js" ]
	} ],
	"permissions": [ "storage" ]
}
```

### `src/popup/index.html`
```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
	<meta charset="UTF-8">
	<title>插件弹出层</title>
</head>
<body>
	<button id="btn">点我</button>
	<script src="./popup.js"></script>
</body>
</html>
```

### `src/popup/popup.ts`
```ts
document.addEventListener('DOMContentLoaded', () => {
	const alertButton = document.getElementById('btn') as HTMLButtonElement
	if (alertButton) {
		alertButton.addEventListener('click', () => {
			alert('按钮被点击')
		})
	}
})
```

先来编译一下 TypeScript

```sh
pnpm tsc
```

然后在浏览器导入该插件，注意是导入 src 目录（暂时）

## 使用 webpack

### 先安装 webpack 相关包

```sh
pnpm install -D webpack webpack-cli ts-loader html-webpack-plugin mini-css-extract-plugin css-loader postcss postcss-loader copy-webpack-plugin
# html-webpack-plugin: 帮助生成带有注入脚本标签的 HTML 文件。
# CSS and PostCSS Loaders: 用于处理 CSS（我们稍后将与 Tailwind 一起使用）。
# CopyWebpackPlugin: 确保将 manifest.json 和任何其他资源（如图标）从 src 文件夹复制到 dist 文件夹。
```

### 配置 webpack.config.js

```sh
touch webpack.config.js
```

`webpack.config.js`
```js
const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = (env, argv) => {
	const isProduction = argv.mode === 'production'

	return {
		entry: {
			popup: './src/popup/popup.ts',
			background: './src/scripts/background.ts',
			contentScript: './src/scripts/contentScript.ts',
		},
		output: {
			path: path.resolve(__dirname, 'dist'),
			filename: '[name].js',
		},
		resolve: {
			extensions: ['.ts', '.js'],
		},
		module: {
			rules: [
				{
					test: /\.ts$/,
					use: 'ts-loader',
					exclude: /node_modules/,
				}
			],
		},
		plugins: [
			new MiniCssExtractPlugin({
				filename: '[name].css',
			}),
			new HtmlWebpackPlugin({
				filename: 'popup.html',
				template: 'src/popup/popup.html',
				chunks: ['popup'],
			}),
			new CopyWebpackPlugin({
				patterns: [
					{ from: 'src/manifest.json', to: 'manifest.json' },
					// { from: 'src/icons', to: 'icons' },  // 复制任何其他资源
				],
			}),
		],
		mode: isProduction ? 'production' : 'development',
		devtool: isProduction ? false : 'inline-source-map',  // 在生产模式中禁用源映射
	}
}
```

### 打包测试

先修改清单文件 `src/manifest.json` 中的路径指向

```json
{
	"manifest_version": 3,
	"name": "插件",
	"version": "1.0",
	"description": "使用 webpack+react+TypeScript+tailwind 创建插件",
	"action": { "default_popup": "popup.html" },
	"background": { "service_worker": "background.js" },
	"content_scripts": [ {
		"matches": [ "<all_urls>" ],
		"js": [ "contentScript.js" ]
	} ],
	"permissions": [ "storage" ]
}
```

再修改 `src/popup/index.html`

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
	<meta charset="UTF-8">
	<title>插件弹出层</title>
</head>
<body>
	<button id="btn">点我</button>
	<!-- 删掉了 script 标签，因为 webpack 会自动引入 -->
</body>
</html>
```

然后打包编译

```sh
pnpm webpack --mode development
```

浏览器导入插件，此时是导入 dist 文件夹。

## 使用 tailwind

### 安装依赖并初始化

```sh
pnpm install -D tailwindcss postcss postcss-loader autoprefixer
pnpm tailwindcss init
```

### 修改 `tailwind.config.js` 文件内容
```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx,html}'],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

### 创建 `postcss.config.js` 文件并写入内容

```sh
touch postcss.config.js
```

添加下面内容，用于告知它使用 Tailwind 和 Autoprefixer 插件进行处理。
```js
module.exports = {
	plugins: {
		tailwindcss: {},
		autoprefixer: {},
	},
}
```

### 创建 `src/styles/tailwind.css`

```sh
mkdir -p src/styles
echo "@tailwind base;
@tailwind components;
@tailwind utilities;" > src/styles/tailwind.css
```

### 配置 webpack 处理 css

```js
const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = (env, argv) => {
	const isProduction = argv.mode === 'production'

	return {
		entry: {
			popup: './src/popup/popup.ts',
			background: './src/scripts/background.ts',
			contentScript: './src/scripts/contentScript.ts',
		},
		output: {
			path: path.resolve(__dirname, 'dist'),
			filename: '[name].js',
		},
		resolve: {
			extensions: ['.ts', '.js'],
		},
		module: {
			rules: [
				{
					test: /\.ts$/,
					use: 'ts-loader',
					exclude: /node_modules/,
				},
				// 处理 postcss 并压缩
				{
					test: /\.css$/i,
					use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
				},
			],
		},
		plugins: [
			new MiniCssExtractPlugin({
				filename: '[name].css',
			}),
			new HtmlWebpackPlugin({
				filename: 'popup.html',
				template: 'src/popup/popup.html',
				chunks: ['popup'],
			}),
			new CopyWebpackPlugin({
				patterns: [
					{ from: 'src/manifest.json', to: 'manifest.json' },
					// { from: 'src/icons', to: 'icons' },  // 复制任何其他资源
				],
			}),
		],
		mode: isProduction ? 'production' : 'development',
		devtool: isProduction ? false : 'inline-source-map',  // 在生产模式中禁用源映射
	}
}
```

### 用 tailwind 添加样式

在 `src/popup/popup.ts` 中导入 css 文件

```ts
import '../styles/tailwind.css';
```

在 `src/popup/index.html` 文件中使用 tailwind

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
	<meta charset="UTF-8">
	<title>插件弹出层</title>
</head>
<body class="bg-gray-100 p-4 w-80">
	<button id="btn"
		class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
	>点我</button>
</body>
</html>
```

## 使用 react

### 安装依赖

```sh
pnpm -D install react react-dom @types/react @types/react-dom
```

### 修改 `src/popup/index.html`

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
	<meta charset="UTF-8">
	<title>插件弹出层</title>
</head>
<body class="bg-gray-100 p-4 w-80">
	<div id="root"></div>
</body>
</html>
```

### 修改 `src/popup/popup.ts`

文件改为 tsx 文件

```sh
mv src/popup/popup.ts src/popup/popup.tsx
```

内容改为：

```tsx
import React from 'react'
import { createRoot } from 'react-dom/client'
import '../styles/tailwind.css'

const Popup = () => {
  const handleClick = () => {
    alert('我被点击了')
  }

  return (
    <div className="flex flex-col items-center bg-gray-100 p-4">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleClick}
      >
        点我
      </button>
    </div>
  )
}


const container = document.getElementById('root')
const root = createRoot(container as HTMLDivElement)
root.render(<Popup />)
```

### 修改 TypeScript 配置文件 `tsconfig.json`

```json
{
	"compilerOptions": {
		// 添加这两项配置
		"jsx": "react",
		"moduleResolution": "node",

		"target": "es5",
		"lib": [
			"dom",
			"es2015"
		],
		"module": "esnext",
		"strict": true,
		"esModuleInterop": true,
		"skipLibCheck": true
	},
	"include": [
		"src/**/*"
	]
}
```

### 修改 webpack 配置文件 `webpack.config.js`

```js
const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = (env, argv) => {
	const isProduction = argv.mode === 'production'

	return {
		entry: {
			// 入口改为 tsx 文件
			popup: './src/popup/popup.tsx',
			background: './src/scripts/background.ts',
			contentScript: './src/scripts/contentScript.ts',
		},
		output: {
			path: path.resolve(__dirname, 'dist'),
			filename: '[name].js',
		},
		resolve: {
			// 添加 tsx 文件
			extensions: ['.ts', '.tsx', '.js'],
		},
		module: {
			rules: [
				{
					// tsx 也由 ts-loader 处理
					test: /\.tsx?$/,
					use: 'ts-loader',
					exclude: /node_modules/,
				},
				{
					test: /\.css$/i,
					use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
				},
			],
		},
		plugins: [
			new MiniCssExtractPlugin({
				filename: '[name].css',
			}),
			new HtmlWebpackPlugin({
				filename: 'popup.html',
				template: 'src/popup/popup.html',
				chunks: ['popup'],
			}),
			new CopyWebpackPlugin({
				patterns: [
					{ from: 'src/manifest.json', to: 'manifest.json' },
					// { from: 'src/icons', to: 'icons' },  // 复制任何其他资源
				],
			}),
		],
		mode: isProduction ? 'production' : 'development',
		devtool: isProduction ? false : 'inline-source-map',  // 在生产模式中禁用源映射
	}
}
```


# 参考：
- [Simplify Chrome Extension Development: Add React without CRA - DEV Community](https://dev.to/k_ivanow/simplify-chrome-extension-development-add-react-without-cra-5h4c)
- [简化 Chrome 扩展程序开发：无需 CRA 即可添加 React](https://mp.weixin.qq.com/s/keZO0ueAXguRMcRTLZnLNw)
- [Manifest file format  |  Chrome for Developers](https://developer.chrome.com/docs/extensions/reference/manifest)
