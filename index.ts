function useWaterFall() {
  function getChildElement(parent: HTMLElement, content: string) {
    const contentArr: HTMLElement[] = [];
    const allContent = Array.from(parent.getElementsByTagName('*')) as HTMLElement[];
    allContent.forEach(item => {
      const classList = Array.from(item.classList);
      if (classList.includes(content)) {
        contentArr.push(item);
      }
    });
    return contentArr;
  }

  function getMinHeight(BoxHeightArr: number[], minHeight: number) {
    while (BoxHeightArr.length) {
      const index = BoxHeightArr.indexOf(minHeight);
      if (index !== -1) {
        return index;
      }
    }
  }

  function calculateLocation(parent: string, content: string) {
    const cparent = document.getElementById(parent);
    const ccontent = getChildElement(cparent, content);
    const imgWidth = ccontent[0].offsetWidth;
    const num = Math.floor(cparent.clientWidth / imgWidth);
    cparent.style.cssText = `width: ${imgWidth * num} px`;
    const BoxHeightArr: number[] = [];
    ccontent.forEach((item, index) => {
      if (index < num) {
        BoxHeightArr[index] = item.offsetHeight;
        const X = index * imgWidth;
        item.setAttribute('style', `transform: translateX(${X}px) translateY(${0}px)`);
      } else {
        const minHeight = Math.min.apply(null, BoxHeightArr);
        const minIndex = getMinHeight(BoxHeightArr, minHeight);
        const X = +minIndex * imgWidth;
        const Y = minHeight;
        item.setAttribute('style', `transform: translateX(${X}px) translateY(${Y}px)`);
        BoxHeightArr[minIndex] += item.offsetHeight;
      }
    });
  }

  return {
    calculateLocation,
  };
}

export default useWaterFall;
