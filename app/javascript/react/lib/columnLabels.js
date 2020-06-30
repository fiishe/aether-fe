// CURRENTLY ONLY WORKS FOR A-Z (0-25)

const A = 'A'.charCodeAt(0)

const columnLabels = {
  to: (number) => {
    return String.fromCharCode(number + A)
  },
  from: (label) => {
    return label.charCodeAt(0) - A
  }
}


export default columnLabels
