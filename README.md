# 资中木偶戏 页面导出包 / Zizhong Puppetry Page Export

## 文件结构 / Files
- `src/pages/ZizhongPuppetry.tsx` — 页面组件
- `src/assets/zizhong-puppet-hero.jpg` — 首屏图
- `src/assets/zizhong-puppet-craft.jpg` — 匠艺图
- `src/assets/zizhong-puppet-stage.jpg` — 戏台图

## 运行依赖 / Required Dependencies
```
react, react-dom, react-router-dom, framer-motion, tailwindcss, vite, typescript
```

## 使用方法 / Usage
1. 将 `src/pages/ZizhongPuppetry.tsx` 与 `src/assets/*.jpg` 拷贝到你的 Vite + React + Tailwind 项目对应位置。
2. 确保 `vite.config.ts` 中配置了 `@` 别名指向 `./src`。
3. 在路由中注册：
```tsx
import ZizhongPuppetry from "./pages/ZizhongPuppetry";
<Route path="/zizhong-puppetry" element={<ZizhongPuppetry />} />
```
4. Tailwind 需包含以下语义化变量（在 `index.css` / `tailwind.config.ts` 中）：
   - `--background`, `--foreground`, `--card`, `--border`, `--muted-foreground`
   - `--accent-blue`, `--accent-emerald`, `--accent-purple`
   - 字体类：`font-bagel` (Bagel Fat One)
5. 访问 `/zizhong-puppetry` 即可查看。
