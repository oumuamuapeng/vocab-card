# 安装和运行指南

## 环境要求

在开始之前，请确保你的系统已安装：

1. **Node.js** (版本 18 或更高)
   - 下载地址: https://nodejs.org/
   - 安装完成后，打开命令行运行 `node --version` 验证

2. **npm** (通常随 Node.js 一起安装)
   - 运行 `npm --version` 验证

## 安装步骤

### 1. 安装依赖

在项目根目录下运行：

```bash
npm install
```

这将安装所有必要的依赖包，包括：
- React 18
- TypeScript
- Vite
- Tailwind CSS
- ESLint

### 2. 启动开发服务器

```bash
npm run dev
```

应用将在 http://localhost:3000 启动

### 3. 构建生产版本

```bash
npm run build
```

构建文件将生成在 `dist` 目录中

## 项目结构

```
vocab-card/
├── src/
│   ├── components/     # 可复用组件
│   ├── pages/         # 页面组件
│   ├── data/          # 静态数据
│   ├── hooks/         # 自定义Hooks
│   ├── types/         # TypeScript类型
│   ├── utils/         # 工具函数
│   ├── App.tsx        # 主应用组件
│   ├── main.tsx       # 应用入口
│   └── index.css      # 全局样式
├── public/            # 静态资源
├── package.json       # 项目配置
├── vite.config.ts     # Vite配置
├── tailwind.config.js # Tailwind配置
└── tsconfig.json      # TypeScript配置
```

## 开发说明

### 添加新单词

1. 在 `src/data/words.ts` 中添加新的单词数据
2. 确保图片URL有效
3. 更新对应分类的单词数量

### 添加新分类

1. 在 `src/data/categories.ts` 中添加新分类
2. 在 `src/data/words.ts` 中添加对应单词
3. 更新分类的单词数量

### 自定义样式

- 全局样式在 `src/index.css`
- Tailwind配置在 `tailwind.config.js`
- 组件样式使用Tailwind类名

## 故障排除

### 常见问题

1. **依赖安装失败**
   ```bash
   npm cache clean --force
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **端口被占用**
   - 修改 `vite.config.ts` 中的端口号
   - 或使用 `npm run dev -- --port 3001`

3. **TypeScript错误**
   - 确保所有导入路径正确
   - 检查类型定义是否完整

### 开发工具

推荐使用 VS Code 并安装以下扩展：
- TypeScript and JavaScript Language Features
- Tailwind CSS IntelliSense
- ESLint
- Prettier

## 下一步计划

1. **集成AI图片生成**
   - 研究可用的AI图片API
   - 实现图片生成功能

2. **添加音频功能**
   - 集成TTS服务
   - 添加音频文件管理

3. **优化用户体验**
   - 添加动画效果
   - 优化移动端体验
   - 添加家长控制功能

## 技术支持

如果遇到问题，请检查：
1. Node.js 版本是否符合要求
2. 依赖是否正确安装
3. 端口是否被占用
4. 浏览器控制台是否有错误信息 