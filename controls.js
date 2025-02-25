export default {
    pular: new KeyboardEvent('keydown', { key: 'Space', keyCode: 32 }),
    agachar: new KeyboardEvent('keydown', { key: 'ArrowDown', keyCode: 40 }),
    dispatch(evento) {
      document.dispatchEvent(this[evento]);
    }
}
