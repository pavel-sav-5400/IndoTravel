const docEl = document.documentElement;

const fly = document.createElement('div');

fly.style.cssText = `
position: fixed;
width: 50px;
height: 50px;
right: 0;
bottom: 0;
pointer-events: none;
background: url('img/airplane.svg') center/contain no-repeat;
`;
document.body.append(fly);

if (screen.width < 758) {
  fly.style.cssText = `
  display: none
  `;
}

const calcPositionFly = () => {
  const maxTop = docEl.clientHeight - fly.clientHeight;
  const maxScroll = docEl.scrollHeight - docEl.clientHeight;
  const percentScroll = (window.pageYOffset * 100) / maxScroll;

  const top = maxTop * (percentScroll / 100);

  fly.style.transform = `translateY(${-top}px)`;
};

calcPositionFly();

let lastScrollTop = 0;
window.addEventListener('scroll', () => {
  const st = window.pageYOffset || docEl.scrollTop;
  if (st > lastScrollTop) {
    fly.style.cssText = `
position: fixed;
width: 50px;
height: 50px;
right: 0;
bottom: 0;
pointer-events: none;
background: url('img/airplane.svg') center/contain no-repeat;
`;
    requestAnimationFrame(calcPositionFly);
  } else {
    fly.style.cssText = `
position: fixed;
width: 50px;
height: 50px;
right: 0;
bottom: 0;
pointer-events: none;
background: url('img/airplaneDown.svg') center/contain no-repeat;
`;
    fly.style.transform = `rotate(180deg)`;
    requestAnimationFrame(calcPositionFly);
  }
  lastScrollTop = st <= 0 ? 0 : st;
});
// fly.style.transform = `rotate(90deg)`;
