"use strict";

import initHeader from "./header.js";
import initTabs from "./tabs.js";
import VideoPlayerCollection from "./VideoPlayer.js";
import ExpandableContentCollection from "./ExpandableContent.js";
import defineScrollBarWidthCSSVar from "./utils/defineScrollBarWidthCSSVar.js";

document.addEventListener("DOMContentLoaded", () => {
  initHeader();
  initTabs();
});

new VideoPlayerCollection();
new ExpandableContentCollection();

defineScrollBarWidthCSSVar();
