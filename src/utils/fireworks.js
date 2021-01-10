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

import {debounce} from '@material-ui/core'
import anime from 'animejs/lib/anime.es'

const filter = e => {
  return (
    e.target.id !== 'sidebar' &&
    e.target.id !== 'toggle-sidebar' &&
    e.target.nodeName !== 'A' &&
    e.target.nodeName !== 'IMG'
  )
}

const canvasEl = document.querySelector('.fireworks')
const ctx = canvasEl.getContext('2d')

const colors = ['#FF1461', '#18FF92', '#5A87FF', '#FBF38C']
const numberOfParticules = 30
const tap = ('ontouchstart' in window || navigator.msMaxTouchPoints) ? 'touchstart' : 'mousedown'

let pointerX = 0
let pointerY = 0

// Fixed the mobile scroll
const setCanvasSize = debounce(function () {
  canvasEl.width = window.innerWidth
  canvasEl.height = window.innerHeight
  canvasEl.style.width = window.innerWidth + 'px'
  canvasEl.style.height = window.innerHeight + 'px'
  canvasEl.getContext('2d').scale(1, 1)
}, 500)

const render = anime({
  duration: Infinity,
  update: function () {
    ctx.clearRect(0, 0, canvasEl.width, canvasEl.height)
  }
})

document.addEventListener(tap, function (e) {
  if (filter(e)) {
    render.play()
    updateCoords(e)
    animateParticules(pointerX, pointerY)
  }
}, false)

setCanvasSize()
window.addEventListener('resize', setCanvasSize, false)

function updateCoords(e) {
  pointerX = (e.clientX || e.touches[0].clientX) - canvasEl.getBoundingClientRect().left
  pointerY = e.clientY || e.touches[0].clientY - canvasEl.getBoundingClientRect().top
}

function setParticuleDirection(p) {
  const angle = anime.random(0, 360) * Math.PI / 180
  const value = anime.random(50, 180)
  const radius = [-1, 1][anime.random(0, 1)] * value
  return {
    x: p.x + radius * Math.cos(angle),
    y: p.y + radius * Math.sin(angle)
  }
}

function createParticule(x, y) {
  const p = {}
  p.x = x
  p.y = y
  p.color = colors[anime.random(0, colors.length - 1)]
  p.radius = anime.random(16, 32)
  p.endPos = setParticuleDirection(p)
  p.draw = function () {
    ctx.beginPath()
    ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI, true)
    ctx.fillStyle = p.color
    ctx.fill()
  }
  return p
}

function createCircle(x, y) {
  const p = {}
  p.x = x
  p.y = y
  p.color = '#F00'
  p.radius = 0.1
  p.alpha = 0.5
  p.lineWidth = 6
  p.draw = function () {
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

function renderParticule(anim) {
  for (let i = 0; i < anim.animatables.length; i++) {
    anim.animatables[i].target.draw()
  }
}

function animateParticules(x, y) {
  const circle = createCircle(x, y)
  const particules = []
  for (let i = 0; i < numberOfParticules; i++) {
    particules.push(createParticule(x, y))
  }
  anime.timeline().add({
    targets: particules,
    x: function (p) {
      return p.endPos.x
    },
    y: function (p) {
      return p.endPos.y
    },
    radius: 0.1,
    duration: anime.random(1200, 1800),
    easing: 'easeOutExpo',
    update: renderParticule
  })
    .add({
      targets: circle,
      radius: anime.random(80, 160),
      lineWidth: 0,
      alpha: {
        value: 0,
        easing: 'linear',
        duration: anime.random(600, 800)
      },
      duration: anime.random(1200, 1800),
      easing: 'easeOutExpo',
      update: renderParticule,
      offset: 0
    })
}
