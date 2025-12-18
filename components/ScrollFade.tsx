// components/ScrollFade.tsx
"use client"; //  这一行非常关键，代表这是客户端组件

import { motion } from "framer-motion";
import { ReactNode } from "react";

export default function ScrollFade({ children }: { children: ReactNode }) {
  return (
    <motion.div
      // 初始状态：透明度0，向下偏移50px
      initial={{ opacity: 0, y: 50 }}
      
      // 当进入视口(In View)时的状态：透明度1，位置归位
      whileInView={{ opacity: 1, y: 0 }}
      
      // 动画配置：持续0.8秒，缓动效果
      transition={{ duration: 0.8, ease: "easeOut" }}
      
      // 视口检测配置：
      // once: false -> 每次滚动进出都会触发动画（如果你只想触发一次，改成 true）
      // margin: "-100px" -> 稍微往屏幕中间滚一点点再触发，体验更好
      viewport={{ once: false, margin: "-100px" }}
    >
      {children}
    </motion.div>
  );
}