<template>
  <!-- 社交链接 -->
  <div class="top_right">
    <LiquidWeb :options="{ scale: 22, blur: 2, saturation: 170, aberration: 50, mode: 'standard' }">
      <div class="social">
        <span class="tip">{{ socialTip }}</span>
        <div class="link">
          <div class="p-4" v-for="(item, index) in socialLinks.socialLinks" :key="item.name" :href="item.url" :data-index="index" @click="onClickLinks" @mouseenter="socialTip = item.tip" @mouseleave="socialTip = '通过这里联系我吧'">
            <img class="icon " :src="item.icon" height="24" />
          </div>
        </div>
      </div>
    </LiquidWeb>
  </div>
</template>

<script setup>
import socialLinks from "@/assets/socialLinks.json";
import { LiquidWeb } from "liquid-web/vue";
import { mainStore } from "@/store";
function onClickLinks(e) {
  const url = e.currentTarget.getAttribute("href");
  const data = e.currentTarget.dataset.index;
  console.log(url, data);
  if (url && data != 0) {
    window.open(url, "_blank");
  }else{
    //显示qrcode
    const store = mainStore();
    store.isShowQrcode = true;
    console.log("显示二维码");
  }
}
// 社交链接提示
const socialTip = ref("通过这里联系我吧");
</script>

<style lang="scss" scoped>
.top_right {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
}

.social {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 360px;
  padding: 10px;
  width: 100%;
  height: 42px;
  background-color: transparent;
  border-radius: 6px;
  backdrop-filter: blur(0);
  animation: fade 0.5s;
  transition:
    background-color 0.3s,
    backdrop-filter 0.3s;

  @media (max-width: 840px) {
    max-width: 100%;
    justify-content: center;

    .link {
      justify-content: space-evenly !important;
      width: 90%;
    }

    .tip {
      display: none !important;
    }
  }

  .link {
    display: flex;
    align-items: center;
    justify-content: center;

    div {
      display: inherit;

      .icon {
        // margin: 0 12px;
        width: 25px;
        transition: transform 0.3s;
        filter: brightness(0) invert(1);

        &:hover {
          transform: scale(1.1);
        }

        &:active {
          transform: scale(1);
        }
      }
    }
  }

  .tip {
    // display: none;
    margin-right: 12px;
    animation: fade 0.5s;
  }

  @media (min-width: 768px) {
    &:hover {
      background-color: #00000040;
      backdrop-filter: blur(5px);

      .tip {
        display: block;
      }
    }
  }
}
</style>
