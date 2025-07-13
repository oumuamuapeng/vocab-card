# 幼儿单词卡片 APP

## 项目概述
一个专为2-4岁幼儿设计的单词学习应用，通过AI生成的卡通图片帮助宝宝快速记忆单词。

## 技术栈
- **前端框架**: React 18 + TypeScript
- **构建工具**: Vite
- **样式框架**: Tailwind CSS
- **状态管理**: React Context API
- **图片生成**: AI API (待集成)

## 核心功能
### MVP版本 (最小可行产品)
1. **单词卡片展示**
   - 显示单词和对应的卡通图片
   - 简单的翻页功能
   - 语音播放功能

2. **分类学习**
   - 按主题分类：动物、颜色、数字、水果等
   - 每个分类包含5-10个基础单词

3. **交互功能**
   - 点击卡片播放发音
   - 滑动切换卡片
   - 简单的学习进度记录

### 未来扩展功能
- AI图片生成集成
- 学习进度统计
- 游戏化学习模式
- 家长控制面板

## 项目结构
```
src/
├── components/          # 可复用组件
│   ├── Card.tsx        # 单词卡片组件
│   ├── CategoryList.tsx # 分类列表组件
│   └── ProgressBar.tsx # 进度条组件
├── pages/              # 页面组件
│   ├── Home.tsx        # 首页
│   ├── Category.tsx    # 分类页面
│   └── Study.tsx       # 学习页面
├── hooks/              # 自定义Hooks
│   ├── useAudio.ts     # 音频播放Hook
│   └── useProgress.ts  # 进度管理Hook
├── data/               # 静态数据
│   ├── categories.ts   # 分类数据
│   └── words.ts        # 单词数据
├── types/              # TypeScript类型定义
│   └── index.ts
└── utils/              # 工具函数
    └── audio.ts        # 音频相关工具
```

## 开发指南

### 环境要求
- Node.js 18+
- npm 或 yarn

### 安装依赖
```bash
npm install
```

### 开发模式
```bash
npm run dev
```

### 构建生产版本
```bash
npm run build
```

### 代码规范
- 使用TypeScript严格模式
- 组件采用函数式组件 + Hooks
- 样式使用Tailwind CSS类名
- 遵循React最佳实践

## 数据模型

### 单词卡片
```typescript
interface WordCard {
  id: string;
  word: string;
  translation: string;
  imageUrl: string;
  audioUrl: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
}
```

### 学习分类
```typescript
interface Category {
  id: string;
  name: string;
  icon: string;
  wordCount: number;
  progress: number;
}
```

## 开发计划

### 第一阶段 (MVP)
- [x] 项目初始化和基础配置
- [ ] 创建基础组件结构
- [ ] 实现单词卡片展示
- [ ] 添加基础交互功能
- [ ] 集成音频播放

### 第二阶段
- [ ] 完善分类系统
- [ ] 添加学习进度跟踪
- [ ] 优化UI/UX设计
- [ ] 性能优化

### 第三阶段
- [ ] AI图片生成集成
- [ ] 高级功能开发
- [ ] 测试和部署

## 注意事项
- 界面设计要适合2-4岁幼儿使用
- 颜色要鲜艳、友好
- 交互要简单直观
- 音频要清晰、语速适中
- 图片要卡通化、可爱 