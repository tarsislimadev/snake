export const random = (max, min = 0, abs = false) => Math[abs ? 'abs' : 'floor'](Math.random() * max) + min
