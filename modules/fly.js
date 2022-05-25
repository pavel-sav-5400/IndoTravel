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
transition: 0.3s transform;
`;
document.body.append(fly);

if (screen.width < 758) {
  fly.style.cssText = `
  display: none
  `;
}

let lastScrollTop = 0;

const calcPositionFly = () => {
  const maxTop = docEl.clientHeight - fly.clientHeight;
  const maxScroll = docEl.scrollHeight - docEl.clientHeight;
  const percentScroll = (window.pageYOffset * 100) / maxScroll;

  const top = maxTop * (percentScroll / 100);

  const st = window.pageYOffset || docEl.scrollTop;

  if (st > lastScrollTop) {
    fly.style.transform = `rotate(0)`;
  } else {
    fly.style.transform = `rotate(180deg)`;
  }
  fly.style.bottom = `${top}px`;
  lastScrollTop = st <= 0 ? 0 : st;
};

calcPositionFly();


window.addEventListener('scroll', () => {
  calcPositionFly();
});
