<template>
  <div v-if="siteLinks[0]" class="links overflow-auto">
    <div class="line">
      <Icon size="20">
        <Link />
      </Icon>
      <span class="title">网站列表</span>
    </div>
    <!--  网站列表 -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 md:grid-cols-3 gap-5 link-all overflow-auto mb-30">
      <LiquidWeb
        v-for="(item, index) in siteLinks"
        :key="index"
        class="rounded-3xl h-10"
        :selector="div"
        :options="{ scale: 22, blur: 2, saturation: 170, aberration: 550, mode: 'standard' }"
      >
        <div class="item" @click="jumpLink(item)">
          <Icon size="26">
            <component :is="siteIcon[item.icon]" />
          </Icon>
          <span class="name text-hidden">{{ item.name }}</span>
        </div>
      </LiquidWeb>
    </div>
  </div>
</template>

<script setup>
import { Icon } from "@vicons/utils";
// 可前往 https://www.xicons.org 自行挑选并在此处引入
import { Link, Blog, CompactDisc, Video, Compass, Book, Fire, LaptopCode } from "@vicons/fa"; // 注意使用正确的类别
import { mainStore } from "@/store";
import siteLinks from "@/assets/siteLinks.json";
import { LiquidWeb } from "liquid-web/vue";

const store = mainStore();


// 网站链接图标
const siteIcon = {
  Blog,
  Video,
  CompactDisc,
  Compass,
  Book,
  Fire,
  LaptopCode,
};

// 链接跳转
const jumpLink = (data) => {
  if (data.name === "音乐" && store.musicClick) {
    if (typeof $openList === "function") $openList();
  } else {
    window.open(data.link, "_blank");
  }
};

onMounted(() => {
  console.log(siteLinks);
});
</script>

<style lang="scss" scoped>
.links {
  .line {
    margin: 2rem 0.25rem 1rem;
    font-size: 1.1rem;
    display: flex;
    align-items: center;
    animation: fade 0.5s;

    .title {
      margin-left: 8px;
      font-size: 1.15rem;
      text-shadow: 0 0 5px #00000050;
    }
  }

  .swiper {
    left: -10px;
    width: calc(100% + 20px);
    padding: 5px 10px 0;
    z-index: 0;

    .swiper-slide {
      height: 100%;
    }

    .swiper-pagination {
      margin-top: 12px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;

      :deep(.swiper-pagination-bullet) {
        background-color: #fff;
        width: 20px;
        height: 4px;
        margin: 0 4px;
        border-radius: 4px;
        opacity: 0.2;
        transition: opacity 0.3s;

        &.swiper-pagination-bullet-active {
          opacity: 1;
        }

        &:hover {
          opacity: 1;
        }
      }
    }
  }

  .link-all {
    height: 520px;

    .item {
      height: 50px;
      width: 100%;
      display: flex;
      align-items: center;
      flex-direction: row;
      justify-content: center;
      padding: 0 10px;
      animation: fade 0.5s;

      &:hover {
        transform: scale(1.02);
        background: rgb(0 0 0 / 40%);
        transition: 0.3s;
      }

      &:active {
        transform: scale(1);
      }

      .name {
        font-size: 1.1rem;
        margin-left: 8px;
      }

      @media (min-width: 720px) and (max-width: 820px) {
        .name {
          display: none;
        }
      }

      @media (max-width: 720px) {
        height: 80px;
      }

      @media (max-width: 460px) {
        flex-direction: column;

        .name {
          font-size: 1rem;
          margin-left: 0;
          margin-top: 8px;
        }
      }
    }

    @media (max-width: 720px) {
      height: 520;
    }
  }
}
</style>
