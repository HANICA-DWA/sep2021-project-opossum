const extension = require('./lib/single-file/extension');


(async () => {

  const { content, title, filename } = await extension.getPageData({
    removeHiddenElements: true,
    removeUnusedStyles: true,
    removeUnusedFonts: true,
    removeImports: true,
    removeScripts: true,
    compressHTML: true,
    removeAudioSrc: true,
    removeVideoSrc: true,
    removeAlternativeFonts: true,
    removeAlternativeMedias: true,
    removeAlternativeImages: true,
    groupDuplicateImages: true
  });

  console.log(content)



})()
