// Modified from source/js/fireworks.js in Molunerfinn/hexo-theme-melody,
// which is licensed under 996ICU license.
//
// License text:
//                    The 996ICU License (996ICU)
//                      Version 0.1, March 2019
//
// PACKAGE is distributed under LICENSE with the following restriction:
//
// The above license is only granted to entities that act in concordance
// with local labor laws. In addition, the following requirements must be
// observed:
//
// * The licencee must not, explicitly or implicitly, request or schedule
//   their employees to work more than 45 hours in any single week.
// * The licencee must not, explicitly or implicitly, request or schedule
//   their employees to be at work consecutively for 10 hours.
//
// Modifications copyright (C) 2021 myl7
// Modifications in the file are still licensed under 996ICU license.

const anime = require('animejs').default

const debounce = (f, wait) => {
  let timer
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      clearTimeout(timer)
      f(args)
    }, wait)
  }
}

const colors = ['#FF1461', '#18FF92', '#5A87FF', '#FBF38C']
const numberOfParticules = 30

const handleTap = (filter, canvasEl) => e => {
  const ctx = canvasEl.getContext('2d')
  if (filter(e)) {
    const render = anime({
      duration: Infinity,
      update: () => ctx.clearRect(0, 0, canvasEl.width, canvasEl.height),
    })
    render.play()

    const pointerX = (e.clientX || e.touches[0].clientX) - canvasEl.getBoundingClientRect().left
    const pointerY = e.clientY || e.touches[0].clientY - canvasEl.getBoundingClientRect().top
    animateParticules(ctx, pointerX, pointerY)
  }
}

const handleResize = canvasEl =>
  debounce(() => {
    canvasEl.width = window.innerWidth
    canvasEl.height = window.innerHeight
    canvasEl.style.width = window.innerWidth + 'px'
    canvasEl.style.height = window.innerHeight + 'px'
    canvasEl.getContext('2d').scale(1, 1)
  }, 500)

const tap = () => ('ontouchstart' in window || navigator.msMaxTouchPoints ? 'touchstart' : 'mousedown')

module.exports = { tap, handleTap, handleResize }

const setParticuleDirection = p => {
  const angle = (anime.random(0, 360) * Math.PI) / 180
  const value = anime.random(50, 180)
  const radius = [-1, 1][anime.random(0, 1)] * value
  return {
    x: p.x + radius * Math.cos(angle),
    y: p.y + radius * Math.sin(angle),
  }
}

const createParticule = (ctx, x, y) => {
  const p = {}
  p.x = x
  p.y = y
  p.color = colors[anime.random(0, colors.length - 1)]
  p.radius = anime.random(16, 32)
  p.endPos = setParticuleDirection(p)
  p.draw = () => {
    ctx.beginPath()
    ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI, true)
    ctx.fillStyle = p.color
    ctx.fill()
  }
  return p
}

const createCircle = (ctx, x, y) => {
  const p = {}
  p.x = x
  p.y = y
  p.color = '#F00'
  p.radius = 0.1
  p.alpha = 0.5
  p.lineWidth = 6
  p.draw = () => {
    ctx.globalAlpha = p.alpha
    ctx.beginPath()
    ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI, true)
    ctx.lineWidth = p.lineWidth
    ctx.strokeStyle = p.color
    ctx.stroke()
    ctx.globalAlpha = 1
  }
  return p
}

const renderParticule = anim => {
  for (let i = 0; i < anim.animatables.length; i++) {
    anim.animatables[i].target.draw()
  }
}

const animateParticules = (ctx, x, y) => {
  const circle = createCircle(ctx, x, y)
  const particules = []
  for (let i = 0; i < numberOfParticules; i++) {
    particules.push(createParticule(ctx, x, y))
  }
  anime
    .timeline()
    .add({
      targets: particules,
      x: p => p.endPos.x,
      y: p => p.endPos.y,
      radius: 0.1,
      duration: anime.random(1200, 1800),
      easing: 'easeOutExpo',
      update: renderParticule,
    })
    .add(
      {
        targets: circle,
        radius: anime.random(80, 160),
        lineWidth: 0,
        alpha: {
          value: 0,
          easing: 'linear',
          duration: anime.random(600, 800),
        },
        duration: anime.random(1200, 1800),
        easing: 'easeOutExpo',
        update: renderParticule,
      },
      0
    )
}
