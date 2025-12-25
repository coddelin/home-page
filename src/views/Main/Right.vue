<template>
  <div :class="!store.mobileOpenState ? 'right' : 'right hidden'">
    <div class="flex flex-col">
      <!-- 移动端 Logo -->
      <div class="logo">
        <span :class="index == 0 ? 'bg' : 'sm'" v-for="(value, index) in siteUrl" :key="value">
          {{ index != 0 ? '.' : '' }}{{ value }}
        </span>
      </div>
      <!-- 简介 -->
      <LiquidWeb v-if="!store.mobileOpenState" :options="GlassOptions">
        <div class="text-center w-full flex justify-center mt-0 mb-4 p-10 description rounded-3xl border border-amber-100 hover:border-amber-100/40 transition-all duration-300" @click="changeBox">
          <div class="content">
            <Icon size="16">
              <QuoteLeft />
            </Icon>
            <Transition name="fade" mode="out-in">
              <div :key="descriptionText.hello + descriptionText.text" class="text">
                <p>{{ descriptionText.text }}</p>
              </div>
            </Transition>
            <Icon size="16">
              <QuoteRight />
            </Icon>
          </div>
        </div>
      </LiquidWeb>
    </div>
    <!-- 功能区 -->
    <Func />
    <!-- 网站链接 -->
    <Link />
  </div>
</template>

<script setup>
import { mainStore } from "@/store";
import Func from "@/views/Func/index.vue";
import Link from "@/components/Links.vue";
import { LiquidWeb } from "liquid-web/vue";
import { GlassOptions } from "@/utils/constant.js";
const store = mainStore();

// 站点链接
const siteUrl = computed(() => {
  const url = import.meta.env.VITE_SITE_URL;
  if (!url) return "imsyy.top".split(".");
  // 判断协议前缀
  if (url.startsWith("http://") || url.startsWith("https://")) {
    const urlFormat = url.replace(/^(https?:\/\/)/, "");
    return urlFormat.split(".");
  }
  return url.split(".");
});

// 简介区域文字
const descriptionText = reactive({
  hello: import.meta.env.VITE_DESC_HELLO,
  text: import.meta.env.VITE_DESC_TEXT,
});

// 切换右侧功能区
const changeBox = () => {
  if (store.getInnerWidth >= 721) {
    store.boxOpenState = !store.boxOpenState;
  } else {
    ElMessage({
      message: "当前页面宽度不足以开启盒子",
      grouping: true,
      icon: h(Error, {
        theme: "filled",
        fill: "#efefef",
      }),
    });
  }
};
</script>

<style lang="scss" scoped>
.right {
  // flex: 1 0 0%;
  width: 100%;
  margin-left: 0.75rem;

  .logo {
    width: 100%;
    font-family: "Pacifico-Regular";
    font-size: 2.25rem;
    position: fixed;
    top: 6%;
    left: 0;
    text-align: center;
    transition: transform 0.3s;
    animation: fade 0.5s;

    &:active {
      transform: scale(0.95);
    }

    // @media (min-width: 721px) {
    //   display: none;
    // }
    @media (max-height: 720px) {
      width: calc(100% + 6px);
      top: 43.26px; // 721px * 0.06
    }

    @media (max-width: 390px) {
      width: 391px;
    }
  }

  // @media (max-width: 720px) {
  //   margin-left: 0;
  //   width: 100%;
  //   &.hidden {
  //     display: none;
  //   }
  // }
}
</style>
