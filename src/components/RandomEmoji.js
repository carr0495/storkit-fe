import React from "react";
function RandomEmoji(props) {
  let allEmojis = [
    "😀",
    "😁",
    "😂",
    "😃",
    "😄",
    "😅",
    "😆",
    "😇",
    "😈",
    "👿",
    "😉",
    "😊",
    "☺️",
    "😋",
    "😌",
    "😍",
    "😎",
    "😏",
    "😐",
    "😑",
    "😒",
    "😓",
    "😔",
    "😕",
    "😖",
    "😗",
    "😘",
    "😙",
    "😚",
    "😛",
    "😜",
    "😝",
    "😞",
    "😟",
    "😠",
    "😡",
    "😢",
    "😣",
    "😤",
    "😥",
    "😦",
    "😧",
    "😨",
    "😩",
    "😪",
    "😫",
    "😬",
    "😭",
    "😮",
    "😯",
    "😰",
    "😱",
    "😲",
    "😳",
    "😴",
    "😵",
    "😶",
    "😷",
    "😸",
    "😹",
    "😺",
    "😻",
    "😼",
    "😽",
    "😾",
    "😿",
    "🙀",
    "👣",
    "👤",
    "👥",
    "👶",
    "👶🏻",
    "👶🏼",
    "👶🏽",
    "👶🏾",
    "👶🏿",
    "👦",
    "👦🏻",
    "👦🏼",
    "👦🏽",
    "👦🏾",
    "👦🏿",
    "👧",
    "👧🏻",
    "👧🏼",
    "👧🏽",
    "👧🏾",
    "👧🏿",
    "👨",
    "👨🏻",
    "👨🏼",
    "👨🏽",
    "👨🏾",
    "👨🏿",
    "👩",
    "👩🏻",
    "👩🏼",
    "👩🏽",
    "👩🏾",
    "👩🏿",
    "👪",
    "👨‍👩‍👧",
    "👨‍👩‍👧‍👦",
    "👨‍👩‍👦‍👦",
    "👨‍👩‍👧‍👧",
    "👩‍👩‍👦",
    "👩‍👩‍👧",
    "👩‍👩‍👧‍👦",
    "👩‍👩‍👦‍👦",
    "👩‍👩‍👧‍👧",
    "👨‍👨‍👦",
    "👨‍👨‍👧",
    "👨‍👨‍👧‍👦",
    "👨‍👨‍👦‍👦",
    "👨‍👨‍👧‍👧",
    "👫",
    "👬",
    "👭",
    "👯",
    "👰",
    "👰🏻",
    "👰🏼",
    "👰🏽",
    "👰🏾",
    "👰🏿",
    "👱",
    "👱🏻",
    "👱🏼",
    "👱🏽",
    "👱🏾",
    "👱🏿",
    "👲",
    "👲🏻",
    "👲🏼",
    "👲🏽",
    "👲🏾",
    "👲🏿",
    "👳",
    "👳🏻",
    "👳🏼",
    "👳🏽",
    "👳🏾",
    "👳🏿",
    "👴",
    "👴🏻",
    "👴🏼",
    "👴🏽",
    "👴🏾",
    "👴🏿",
    "👵",
    "👵🏻",
    "👵🏼",
    "👵🏽",
    "👵🏾",
    "👵🏿",
    "👮",
    "👮🏻",
    "👮🏼",
    "👮🏽",
    "👮🏾",
    "👮🏿",
    "👷",
    "👷🏻",
    "👷🏼",
    "👷🏽",
    "👷🏾",
    "👷🏿",
    "👸",
    "👸🏻",
    "👸🏼",
    "👸🏽",
    "👸🏾",
    "👸🏿",
    "💂",
    "💂🏻",
    "💂🏼",
    "💂🏽",
    "💂🏾",
    "💂🏿",
    "👼",
    "👼🏻",
    "👼🏼",
    "👼🏽",
    "👼🏾",
    "👼🏿",
    "🎅",
    "🎅🏻",
    "🎅🏼",
    "🎅🏽",
    "🎅🏾",
    "🎅🏿",
    "👻",
    "👹",
    "👺",
    "💩",
    "💀",
    "👽",
    "👾",
    "🙇",
    "🙇🏻",
    "🙇🏼",
    "🙇🏽",
    "🙇🏾",
    "🙇🏿",
    "💁",
    "💁🏻",
    "💁🏼",
    "💁🏽",
    "💁🏾",
    "💁🏿",
    "🙅",
    "🙅🏻",
    "🙅🏼",
    "🙅🏽",
    "🙅🏾",
    "🙅🏿",
    "🙆",
    "🙆🏻",
    "🙆🏼",
    "🙆🏽",
    "🙆🏾",
    "🙆🏿",
    "🙋",
    "🙋🏻",
    "🙋🏼",
    "🙋🏽",
    "🙋🏾",
    "🙋🏿",
    "🙎",
    "🙎🏻",
    "🙎🏼",
    "🙎🏽",
    "🙎🏾",
    "🙎🏿",
    "🙍",
    "🙍🏻",
    "🙍🏼",
    "🙍🏽",
    "🙍🏾",
    "🙍🏿",
    "💆",
    "💆🏻",
    "💆🏼",
    "💆🏽",
    "💆🏾",
    "💆🏿",
    "💇",
    "💇🏻",
    "💇🏼",
    "💇🏽",
    "💇🏾",
    "💇🏿",
    "💑",
    "💏",
    "🙌",
    "🙌🏻",
    "🙌🏼",
    "🙌🏽",
    "🙌🏾",
    "🙌🏿",
    "👏",
    "👏🏻",
    "👏🏼",
    "👏🏽",
    "👏🏾",
    "👏🏿",
    "👂",
    "👂🏻",
    "👂🏼",
    "👂🏽",
    "👂🏾",
    "👂🏿",
    "👀",
    "👃",
    "👃🏻",
    "👃🏼",
    "👃🏽",
    "👃🏾",
    "👃🏿",
    "👄",
    "💋",
    "👅",
    "💅",
    "💅🏻",
    "💅🏼",
    "💅🏽",
    "💅🏾",
    "💅🏿",
    "👋",
    "👋🏻",
    "👋🏼",
    "👋🏽",
    "👋🏾",
    "👋🏿",
    "👍",
    "👍🏻",
    "👍🏼",
    "👍🏽",
    "👍🏾",
    "👍🏿",
    "👎",
    "👎🏻",
    "👎🏼",
    "👎🏽",
    "👎🏾",
    "👎🏿",
    "☝",
    "☝🏻",
    "☝🏼",
    "☝🏽",
    "☝🏾",
    "☝🏿",
    "👆",
    "👆🏻",
    "👆🏼",
    "👆🏽",
    "👆🏾",
    "👆🏿",
    "👇",
    "👇🏻",
    "👇🏼",
    "👇🏽",
    "👇🏾",
    "👇🏿",
    "👈",
    "👈🏻",
    "👈🏼",
    "👈🏽",
    "👈🏾",
    "👈🏿",
    "👉",
    "👉🏻",
    "👉🏼",
    "👉🏽",
    "👉🏾",
    "👉🏿",
    "👌",
    "👌🏻",
    "👌🏼",
    "👌🏽",
    "👌🏾",
    "👌🏿",
    "✌",
    "✌🏻",
    "✌🏼",
    "✌🏽",
    "✌🏾",
    "✌🏿",
    "👊",
    "👊🏻",
    "👊🏼",
    "👊🏽",
    "👊🏾",
    "👊🏿",
    "✊",
    "✊🏻",
    "✊🏼",
    "✊🏽",
    "✊🏾",
    "✊🏿",
    "✋",
    "✋🏻",
    "✋🏼",
    "✋🏽",
    "✋🏾",
    "✋🏿",
    "💪",
    "💪🏻",
    "💪🏼",
    "💪🏽",
    "💪🏾",
    "💪🏿",
    "👐",
    "👐🏻",
    "👐🏼",
    "👐🏽",
    "👐🏾",
    "👐🏿",
    "🙏",
    "🙏🏻",
    "🙏🏼",
    "🙏🏽",
    "🙏🏾",
    "🙏🏿",
    "🌱",
    "🌲",
    "🌳",
    "🌴",
    "🌵",
    "🌷",
    "🌸",
    "🌹",
    "🌺",
    "🌻",
    "🌼",
    "💐",
    "🌾",
    "🌿",
    "🍀",
    "🍁",
    "🍂",
    "🍃",
    "🍄",
    "🌰",
    "🐀",
    "🐁",
    "🐭",
    "🐹",
    "🐂",
    "🐃",
    "🐄",
    "🐮",
    "🐅",
    "🐆",
    "🐯",
    "🐇",
    "🐰",
    "🐈",
    "🐱",
    "🐎",
    "🐴",
    "🐏",
    "🐑",
    "🐐",
    "🐓",
    "🐔",
    "🐤",
    "🐣",
    "🐥",
    "🐦",
    "🐧",
    "🐘",
    "🐪",
    "🐫",
    "🐗",
    "🐖",
    "🐷",
    "🐽",
    "🐕",
    "🐩",
    "🐶",
    "🐺",
    "🐻",
    "🐨",
    "🐼",
    "🐵",
    "🙈",
    "🙉",
    "🙊",
    "🐒",
    "🐉",
    "🐲",
    "🐊",
    "🐍",
    "🐢",
    "🐸",
    "🐋",
    "🐳",
    "🐬",
    "🐙",
    "🐟",
    "🐠",
    "🐡",
    "🐚",
    "🐌",
    "🐛",
    "🐜",
    "🐝",
    "🐞",
  ];

  function getEmoji() {
    let randomNum = Math.floor(Math.random() * allEmojis.length);
    return allEmojis[randomNum];
  }
  return (
    <div>
      <p>{getEmoji()}</p>
    </div>
  );
}
export default RandomEmoji;