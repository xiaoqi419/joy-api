// vite.config.ts
import { defineConfig } from "file:///E:/project/react/api/joyapi-front-reception/node_modules/.pnpm/vite@4.3.9_@types+node@18.16.17_sass@1.63.3/node_modules/vite/dist/node/index.js";
import vue from "file:///E:/project/react/api/joyapi-front-reception/node_modules/.pnpm/@vitejs+plugin-vue@4.2.3_vite@4.3.9_vue@3.3.4/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import path from "path";
import eslint from "file:///E:/project/react/api/joyapi-front-reception/node_modules/.pnpm/vite-plugin-eslint@1.8.1_eslint@8.42.0_vite@4.3.9/node_modules/vite-plugin-eslint/dist/index.mjs";
import vueJsx from "file:///E:/project/react/api/joyapi-front-reception/node_modules/.pnpm/@vitejs+plugin-vue-jsx@3.0.1_vite@4.3.9_vue@3.3.4/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";
import vueSetupExtend from "file:///E:/project/react/api/joyapi-front-reception/node_modules/.pnpm/vite-plugin-vue-setup-extend@0.4.0_vite@4.3.9/node_modules/vite-plugin-vue-setup-extend/dist/index.mjs";
import { createSvgIconsPlugin } from "file:///E:/project/react/api/joyapi-front-reception/node_modules/.pnpm/vite-plugin-svg-icons@2.0.1_vite@4.3.9/node_modules/vite-plugin-svg-icons/dist/index.mjs";
import UnoCSS from "file:///E:/project/react/api/joyapi-front-reception/node_modules/.pnpm/unocss@0.53.1_postcss@8.4.24_vite@4.3.9/node_modules/unocss/dist/vite.mjs";
var __vite_injected_original_dirname = "E:\\project\\react\\api\\joyapi-front-reception";
var vite_config_default = defineConfig({
  plugins: [
    vue(),
    vueSetupExtend(),
    vueJsx(),
    eslint(),
    createSvgIconsPlugin({
      // 要缓存的图标文件夹
      iconDirs: [path.resolve(__vite_injected_original_dirname, "src/svg")],
      // 执行 icon name 的格式
      symbolId: "icon-[name]"
    }),
    UnoCSS()
  ],
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src")
    }
  },
  server: {
    port: 3e3,
    cors: true,
    proxy: {
      "/api": {
        target: "http://localhost:8101/api/",
        changeOrigin: true,
        rewrite: (path2) => path2.replace(/^\/api/, "")
      }
    }
  },
  envDir: path.resolve(__vite_injected_original_dirname, "./env")
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFxwcm9qZWN0XFxcXHJlYWN0XFxcXGFwaVxcXFxqb3lhcGktZnJvbnQtcmVjZXB0aW9uXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJFOlxcXFxwcm9qZWN0XFxcXHJlYWN0XFxcXGFwaVxcXFxqb3lhcGktZnJvbnQtcmVjZXB0aW9uXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9FOi9wcm9qZWN0L3JlYWN0L2FwaS9qb3lhcGktZnJvbnQtcmVjZXB0aW9uL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJ1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCdcbmltcG9ydCBlc2xpbnQgZnJvbSAndml0ZS1wbHVnaW4tZXNsaW50J1xuaW1wb3J0IHZ1ZUpzeCBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUtanN4J1xuaW1wb3J0IHZ1ZVNldHVwRXh0ZW5kIGZyb20gJ3ZpdGUtcGx1Z2luLXZ1ZS1zZXR1cC1leHRlbmQnXG5pbXBvcnQgeyBjcmVhdGVTdmdJY29uc1BsdWdpbiB9IGZyb20gJ3ZpdGUtcGx1Z2luLXN2Zy1pY29ucydcbmltcG9ydCBVbm9DU1MgZnJvbSAndW5vY3NzL3ZpdGUnXG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbXG4gICAgdnVlKCksXG4gICAgdnVlU2V0dXBFeHRlbmQoKSxcbiAgICB2dWVKc3goKSxcbiAgICBlc2xpbnQoKSxcbiAgICBjcmVhdGVTdmdJY29uc1BsdWdpbih7XG4gICAgICAvLyBcdTg5ODFcdTdGMTNcdTVCNThcdTc2ODRcdTU2RkVcdTY4MDdcdTY1ODdcdTRFRjZcdTU5MzlcbiAgICAgIGljb25EaXJzOiBbcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ3NyYy9zdmcnKV0sXG4gICAgICAvLyBcdTYyNjdcdTg4NEMgaWNvbiBuYW1lIFx1NzY4NFx1NjgzQ1x1NUYwRlxuICAgICAgc3ltYm9sSWQ6ICdpY29uLVtuYW1lXSdcbiAgICB9KSxcbiAgICBVbm9DU1MoKVxuICBdLFxuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IHtcbiAgICAgICdAJzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4vc3JjJylcbiAgICB9XG4gIH0sXG4gIHNlcnZlcjoge1xuICAgIHBvcnQ6IDMwMDAsXG4gICAgY29yczogdHJ1ZSxcbiAgICBwcm94eToge1xuICAgICAgJy9hcGknOiB7XG4gICAgICAgIHRhcmdldDogJ2h0dHA6Ly9sb2NhbGhvc3Q6ODEwMS9hcGkvJyxcbiAgICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlLFxuICAgICAgICByZXdyaXRlOiBwYXRoID0+IHBhdGgucmVwbGFjZSgvXlxcL2FwaS8sICcnKVxuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgZW52RGlyOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi9lbnYnKVxufSlcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBNlQsU0FBUyxvQkFBb0I7QUFDMVYsT0FBTyxTQUFTO0FBQ2hCLE9BQU8sVUFBVTtBQUNqQixPQUFPLFlBQVk7QUFDbkIsT0FBTyxZQUFZO0FBQ25CLE9BQU8sb0JBQW9CO0FBQzNCLFNBQVMsNEJBQTRCO0FBQ3JDLE9BQU8sWUFBWTtBQVBuQixJQUFNLG1DQUFtQztBQVV6QyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxJQUFJO0FBQUEsSUFDSixlQUFlO0FBQUEsSUFDZixPQUFPO0FBQUEsSUFDUCxPQUFPO0FBQUEsSUFDUCxxQkFBcUI7QUFBQTtBQUFBLE1BRW5CLFVBQVUsQ0FBQyxLQUFLLFFBQVEsa0NBQVcsU0FBUyxDQUFDO0FBQUE7QUFBQSxNQUU3QyxVQUFVO0FBQUEsSUFDWixDQUFDO0FBQUEsSUFDRCxPQUFPO0FBQUEsRUFDVDtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsS0FBSyxLQUFLLFFBQVEsa0NBQVcsT0FBTztBQUFBLElBQ3RDO0FBQUEsRUFDRjtBQUFBLEVBQ0EsUUFBUTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sT0FBTztBQUFBLE1BQ0wsUUFBUTtBQUFBLFFBQ04sUUFBUTtBQUFBLFFBQ1IsY0FBYztBQUFBLFFBQ2QsU0FBUyxDQUFBQSxVQUFRQSxNQUFLLFFBQVEsVUFBVSxFQUFFO0FBQUEsTUFDNUM7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUFBLEVBQ0EsUUFBUSxLQUFLLFFBQVEsa0NBQVcsT0FBTztBQUN6QyxDQUFDOyIsCiAgIm5hbWVzIjogWyJwYXRoIl0KfQo=
