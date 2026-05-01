<template>
  <div class="links overflow-auto">
    <!-- 资料领取 -->
    <div v-if="downloadItems[0]" class="download-section">
      <div class="line">
        <Icon size="20">
          <Download />
        </Icon>
        <span class="title">资料领取</span>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 md:grid-cols-2 gap-5 link-all p-4">
        <div v-for="(item, index) in downloadItems" :key="'dl-' + index" class="rounded-3xl h-15 cursor-pointer flex items-center justify-center border border-amber-100 hover:border-amber-100/40 transition-all duration-300">
          <LiquidWeb class="size-full" :options="GlassOptions">
            <div class="item size-full rounded-3xl h-15" @click="openDownloadDialog(item)">
              <Icon size="26">
                <component :is="siteIcon[item.icon]" />
              </Icon>
              <span class="name text-hidden">{{ item.name }}</span>
            </div>
          </LiquidWeb>
        </div>
      </div>
    </div>
    <!-- 网站列表 -->
    <div v-if="siteLinks[0]">
      <div class="line">
        <Icon size="20">
          <Link />
        </Icon>
        <span class="title">网站列表</span>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 md:grid-cols-2 gap-5 link-all overflow-y-auto mb-30 p-4">
        <div v-for="(item, index) in siteLinks" :key="index" class="rounded-3xl h-15  cursor-pointer flex items-center justify-center border border-amber-100 hover:border-amber-100/40 transition-all duration-300">
          <LiquidWeb  class="size-full" :options="GlassOptions">
            <div class="item size-full rounded-3xl h-15" @click="jumpLink(item)">
              <Icon size="26">
                <component :is="siteIcon[item.icon]" />
              </Icon>
              <span class="name text-hidden">{{ item.name }}</span>
            </div>
          </LiquidWeb>
        </div>
      </div>
    </div>
    <!-- 暗号弹窗 -->
    <el-dialog v-model="dialogVisible" title="输入暗号领取资料" width="400px" :close-on-click-modal="false" append-to-body class="dark-dialog">
      <p class="mb-2 text-sm text-gray-400">领取：{{ currentDownloadItem?.name }}</p>
      <el-input v-model="secretCode" placeholder="请输入暗号" @keyup.enter="handleDownload" clearable />
      <template #footer>
        <el-button @click="dialogVisible = false" style="color: #ccc; background-color: #333; border-color: #555;">取消</el-button>
        <el-button type="primary" @click="handleDownload" :loading="downloading">确认</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { Icon } from "@vicons/utils";
// 可前往 https://www.xicons.org 自行挑选并在此处引入
import { Link, Blog, CompactDisc, Video, Compass, Book, Fire, LaptopCode, Download } from "@vicons/fa"; // 注意使用正确的类别
import { mainStore } from "@/store";
import siteLinks from "@/assets/siteLinks.json";
import downloadItems from "@/assets/downloadItems.json";
import { LiquidWeb } from "liquid-web/vue";
import {GlassOptions} from "@/utils/constant.js";
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

// 资料下载
const dialogVisible = ref(false);
const secretCode = ref("");
const currentDownloadItem = ref(null);
const downloading = ref(false);

const openDownloadDialog = (item) => {
  currentDownloadItem.value = item;
  secretCode.value = "";
  dialogVisible.value = true;
};

const handleDownload = async () => {
  const code = secretCode.value.trim();
  if (!code) {
    ElMessage.warning("请输入暗号");
    return;
  }
  downloading.value = true;
  const extensions = [".7z", ".rar"];
  try {
    for (const ext of extensions) {
      const url = `/data/${code}${ext}`;
      const res = await fetch(url, { method: "HEAD" });
      if (res.ok) {
        const link = document.createElement("a");
        link.href = url;
        link.download = `${code}${ext}`;
        link.click();
        ElMessage.success("资料下载已开始");
        dialogVisible.value = false;
        downloading.value = false;
        return;
      }
    }
    ElMessage.error("暗号错误，请重新输入");
  } catch {
    ElMessage.error("网络异常，请稍后重试");
  }
  downloading.value = false;
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

    .item {
      width: 100%;
      display: flex;
      align-items: center;
      flex-direction: row;
      justify-content: center;
      padding: 0 10px;
      animation: fade 0.5s;

      &:hover {
        transform: scale(1.02);
        // background: rgb(0 0 0 / 40%);
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
          // display: none;
          overflow: hidden;
        }
      }

      @media (max-width: 720px) {
        // height: 80px;
      }

      @media (max-width: 460px) {
        flex-direction: column;
        gap: 4px ;
        .name {
          font-size: 1rem;
          margin-left: 0;
          // margin-top: 8px;
        }
      }
    }

    @media (max-width: 720px) {
      // height: 520;
    }
  }
}
</style>

<style lang="scss">
.dark-dialog {
  .el-dialog {
    background-color: #2a2a2a;
    border: 1px solid #444;
  }
}
</style>
