/**
 *
 *
 * @param {*} value
 */
export const toVw = function toVw(value) {
  return `${value * (document.documentElement.clientWidth / 750) / (document.documentElement.clientWidth / 100)}vw`;
};

export const toPx = function toPx(value) {
  const currentWidth = document.documentElement.clientWidth;
  return `${value / 100 * currentWidth}`;
};


// const htmlClassName = 'isEdit-html';
// const html = document.getElementsByTagName('html')[0];
// function IsPC() {
//   const userAgentInfo = navigator.userAgent;
//   const Agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod'];
//   let flag = true;
//   for (let v = 0; v < Agents.length; v++) {
//     if (userAgentInfo.indexOf(Agents[v]) > 0) {
//       flag = false;
//       break;
//     }
//   }
//   return flag;
// }

// export function getRem() {
//   return IsPC() ? 37.5 : html.clientWidth < 750 ? html.clientWidth / 10 : 750 / 10;
// }
// function responseRem() {
//   html.classList.add(htmlClassName);
//   html.setAttribute('style', `font-size: ${getRem()}px`);
// }
// const supportChange = typeof window.orientationchange !== 'undefined';

// // 挂载rem
// export function loadResponseSize() {
//   responseRem();
//   // document.addEventListener('DOMContentLoaded', responseRem);
//   window.addEventListener(supportChange ? 'orientationchange' : 'resize', responseRem);
// }

// // 卸载rem
// export function unLoadResponseSize() {
//   // document.removeEventListener('DOMContentLoaded', responseRem);
//   window.removeEventListener(supportChange ? 'orientationchange' : 'resize', responseRem);
//   html.classList.remove(htmlClassName);
//   html.removeAttribute('style');
// }

// export function toRem(px) {
//   const p = parseFloat(px);
//   const htmlFontSize = parseFloat(html.style.fontSize);
//   return `${parseFloat((p / htmlFontSize).toFixed(8))}rem`;
// }
