const navItems = ["Mukund", "sahil", "Parveen", "Kutta"];

let no = 0
// Map -> loop on Array or Onject
const fn = navItems.map(item => `${item} ${no++}`);

const newItem = [...navItems,"PapaJI"]

console.log(fn);