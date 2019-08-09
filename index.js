/**
 * return a string: vertical | horizontal | both
 * @param {Element} el - A HTML element
 */
const hasScrollbar = el => {
  const { parseInt: p, getComputedStyle: c } = window;
  const vertical =
    el[`offsetWidth`] -
      el[`clientWidth`] -
      p(c(el).borderLeftWidth) -
      p(c(el).borderRightWidth) >=
    17;
  const horizontal =
    el[`offsetHeight`] -
      el[`clientHeight`] -
      p(c(el).borderTopWidth) -
      p(c(el).borderBottomWidth) >=
    17;
  if (vertical && horizontal) return "both";
  if (vertical) return "vertical";
  if (horizontal) return "horizontal";
};

/**
 * 1. Create a div element(wrapper) to wrap up el
 * 2. Set the overflow value of wrapper to hidden to hide scrollbar(s) of el
 * 3. Set negative margin on el to push out scrollbar(s) to invisible area
 */
export default (el, width, height) => {
  if (!width || !height) throw new Error("width and height are required.");

  const oldParent = el.parentElement;
  const elIndex = Array.from(oldParent.children).indexOf(el);
  const wrapper = document.createElement("div");
  wrapper.appendChild(el);
  oldParent.insertBefore(wrapper, oldParent.children[elIndex]);

  const wStyle = wrapper.style;
  wStyle.width = width;
  wStyle.height = height;
  wStyle.position = "relative";
  wStyle.overflow = "hidden";

  const eStyle = el.style;
  eStyle.width = "100%";
  eStyle.height = "100%";
  eStyle.position = "absolute";
  eStyle.overflow = "auto";
  eStyle.top = 0;
  eStyle.left = 0;

  const direction = hasScrollbar(el);
  if (direction === "vertical") {
    eStyle.width = "auto";
    eStyle.right = "-17px";
  } else if (direction === "horizontal") {
    eStyle.height = "auto";
    eStyle.bottom = "-17px";
  } else if (direction === "both") {
    eStyle.width = "auto";
    eStyle.height = "auto";
    eStyle.right = "-17px";
    eStyle.bottom = "-17px";
  }
};

export { hasScrollbar };
