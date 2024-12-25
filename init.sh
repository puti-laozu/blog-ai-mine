# 创建项目目录
mkdir my-blog
cd my-blog

# 初始化 pnpm 项目
pnpm init

# 安装核心依赖
pnpm add -D typescript @types/node
pnpm add -D wrangler
pnpm add marked isomorphic-dompurify date-fns 