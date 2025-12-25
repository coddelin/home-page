<template>
  <div class="mini-app-overlay" @click="handleClose">
    <LiquidWeb :options="GlassOptions">
      <div class="mini-app rounded-3xl  border border-amber-100 hover:border-amber-100/40 transition-all duration-300 size-full" @click.stop>
        <button class="close-btn" @click="handleClose">×</button>
        <img src="/images/icon/mini_app.jpg" alt="星海飞驰壁纸微信小程序">
        <p class="tip">扫码体验小程序</p>
      </div>
    </LiquidWeb>
  </div>
</template>

<script setup>
import { mainStore } from "@/store";
import { useRouter } from "vue-router";
import { LiquidWeb } from "liquid-web/vue";
import { GlassOptions } from "../utils/constant";

const store = mainStore();
const router = useRouter();

// 关闭二维码弹窗
const handleClose = () => {
  store.isShowQrcode = false;
  // 如果当前路由是 /qrcode，返回首页
  if (router.currentRoute.value.path === '/qrcode') {
    router.push('/');
  }
};
</script>

<style lang="scss" scoped>
.mini-app-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  // background-color: rgba(0, 0, 0, 0.3);
  // backdrop-filter: blur(10px);
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: fade 0.3s;
}

.mini-app {
  position: relative;
  // backdrop-filter: blur(10px);
  padding: 40px;
  // border-radius: 12px;
  // box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
  animation: scale-in 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  max-width: 50vw;
  max-height: 50vh;
  display: flex;
  flex-direction: column;
  align-items: center;

  .close-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 32px;
    height: 32px;
    border: none;
    background: rgba(0, 0, 0, 0.1);
    color: white;
    font-size: 24px;
    line-height: 1;
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.3s;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      background: rgba(0, 0, 0, 0.2);
      color: white;
      transform: rotate(90deg);
    }
  }

  img {
    max-width: 100%;
    height: auto;
    overflow: hidden;
    border-radius: 8px;
  }

  .tip {
    margin-top: 16px;
    color: white;
    font-size: 14px;
  }
}

@keyframes fade {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes scale-in {
  from {
    opacity: 0;
    transform: scale(0.9);
  }

  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>