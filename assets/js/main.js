const repoApiUrl = "https://api.github.com/repos/Jasonzhu1207/ZenConverter";

const copy = {
  zh: {
    title: "ZenConverter | 本地格式转换",
    description: "ZenConverter 是一款本地格式转换软件，支持视频、音频、图片、PDF 和文档转换。",
    skip: "跳到主要内容",
    navFormats: "格式",
    navPrivacy: "隐私",
    navDownload: "下载",
    heroEyebrow: "本地格式转换",
    heroLede: "视频、音频、图片、PDF 和 Office 文件，在你的设备上完成转换。文件不必离开本机。",
    downloadCta: "下载最新版本",
    repoCta: "查看仓库",
    starsLabel: "GitHub Stars",
    licenseLabel: "网站代码",
    privacyLabel: "文件处理",
    privacyValue: "本地设备",
    railVideo: "视频",
    railAudio: "音频",
    railImage: "图片",
    railOffice: "文档",
    noteLocal: "文件留在本机",
    noteLocalSub: "转换流程不需要上传",
    noteBatch: "批量处理就绪",
    noteBatchSub: "图片和文档队列",
    introKicker: "为日常文件流转设计",
    introText: "ZenConverter 把常见转换任务收在一个安静、可靠的界面里。选择目标格式，选中文件，剩下的交给本机处理。",
    formatsKicker: "转换类型",
    formatsTitle: "把杂乱格式收进同一个工作台。",
    featureVideoTitle: "视频",
    featureVideoBody: "转换或压缩视频，快速输出常用播放和兼容格式。",
    featureAudioTitle: "音频",
    featureAudioBody: "提取、转换音频，为播客、素材和移动端播放准备文件。",
    featureImageTitle: "图片",
    featureImageBody: "批量处理图片格式，在分享、归档和网页使用之间切换。",
    featurePdfTitle: "PDF 与文档",
    featurePdfBody: "渲染 PDF 页面，转换 Office 文件，把输出整理成可交付格式。",
    privacyKicker: "隐私默认开启",
    privacyTitle: "转换应该发生在文件所在的地方。",
    privacyBody: "ZenConverter 的产品承诺很直接：文件留在这台设备。它适合处理私密素材、临时交付、客户文件，以及不想上传到陌生服务的日常任务。",
    stepOne: "选择目标格式",
    stepTwo: "选择本地文件",
    stepThree: "导出结果",
    footerTagline: "一个简单、安静、可信赖的本地格式转换器。",
    footerRepo: "GitHub 仓库",
    footerReleases: "下载发布版",
    legal: "网站代码以 AGPL-3.0-or-later 授权。文案、截图和品牌素材 Copyright 保留，未经许可不可复用。"
  },
  en: {
    title: "ZenConverter | Local file conversion",
    description: "ZenConverter is a local file conversion app for video, audio, images, PDFs, and documents.",
    skip: "Skip to main content",
    navFormats: "Formats",
    navPrivacy: "Privacy",
    navDownload: "Download",
    heroEyebrow: "Local conversion",
    heroLede: "Convert video, audio, images, PDFs, and Office files on your device. Files do not need to leave the machine.",
    downloadCta: "Download latest",
    repoCta: "View repository",
    starsLabel: "GitHub Stars",
    licenseLabel: "Website code",
    privacyLabel: "File handling",
    privacyValue: "On device",
    railVideo: "Video",
    railAudio: "Audio",
    railImage: "Image",
    railOffice: "Docs",
    noteLocal: "Files stay here",
    noteLocalSub: "no upload path in the flow",
    noteBatch: "Batch ready",
    noteBatchSub: "image and document queues",
    introKicker: "Built for everyday file flow",
    introText: "ZenConverter keeps common conversion jobs inside one calm, reliable workspace. Pick a target, select local files, and let the device do the work.",
    formatsKicker: "Conversion types",
    formatsTitle: "Bring scattered formats into one workbench.",
    featureVideoTitle: "Video",
    featureVideoBody: "Convert or compress video into common playback and compatibility formats.",
    featureAudioTitle: "Audio",
    featureAudioBody: "Extract and convert audio for podcasts, source material, and mobile playback.",
    featureImageTitle: "Image",
    featureImageBody: "Batch image formats for sharing, archiving, and web-ready output.",
    featurePdfTitle: "PDF and documents",
    featurePdfBody: "Render PDF pages, convert Office files, and prepare delivery-ready output.",
    privacyKicker: "Privacy by default",
    privacyTitle: "Conversion should happen where the file already lives.",
    privacyBody: "ZenConverter makes a direct product promise: files stay on this device. It fits private media, one-off delivery work, client files, and daily tasks you do not want to upload to an unfamiliar service.",
    stepOne: "Choose target format",
    stepTwo: "Select local files",
    stepThree: "Export result",
    footerTagline: "A simple, quiet, trustworthy local file converter.",
    footerRepo: "GitHub repository",
    footerReleases: "Download releases",
    legal: "Website source code is licensed AGPL-3.0-or-later. Copy, screenshots, and brand assets are Copyright reserved and may not be reused without permission."
  }
};

function preferredLanguage() {
  const saved = localStorage.getItem("zenconverter-language");
  if (saved === "zh" || saved === "en") return saved;
  return navigator.language.toLowerCase().startsWith("zh") ? "zh" : "en";
}

function setLanguage(lang) {
  const dictionary = copy[lang] || copy.zh;
  document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
  document.title = dictionary.title;

  const description = document.querySelector('meta[name="description"]');
  if (description) description.setAttribute("content", dictionary.description);

  document.querySelectorAll("[data-i18n]").forEach((node) => {
    const key = node.getAttribute("data-i18n");
    if (key && dictionary[key]) node.textContent = dictionary[key];
  });

  document.querySelectorAll("[data-lang-button]").forEach((button) => {
    button.setAttribute("aria-pressed", String(button.getAttribute("data-lang-button") === lang));
  });

  document.querySelectorAll("[data-src-zh][data-src-en]").forEach((image) => {
    image.setAttribute("src", image.getAttribute(`data-src-${lang}`));
    image.setAttribute("alt", image.getAttribute(`data-alt-${lang}`));
  });

  localStorage.setItem("zenconverter-language", lang);
}

function formatStars(count) {
  if (!Number.isFinite(count)) return "...";
  if (count >= 1000) {
    const value = count / 1000;
    return `${value.toFixed(value >= 10 ? 0 : 1)}k`;
  }
  return new Intl.NumberFormat().format(count);
}

async function loadStars() {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 3500);

  try {
    const response = await fetch(repoApiUrl, {
      headers: { Accept: "application/vnd.github+json" },
      signal: controller.signal
    });
    if (!response.ok) throw new Error("GitHub API request failed");
    const repo = await response.json();
    const stars = formatStars(repo.stargazers_count);
    document.querySelectorAll("[data-stars]").forEach((node) => {
      node.textContent = stars;
    });
  } catch (error) {
    document.querySelectorAll("[data-stars]").forEach((node) => {
      node.textContent = "GitHub";
    });
  } finally {
    clearTimeout(timeout);
  }
}

document.querySelectorAll("[data-lang-button]").forEach((button) => {
  button.addEventListener("click", () => setLanguage(button.getAttribute("data-lang-button")));
});

setLanguage(preferredLanguage());
loadStars();
