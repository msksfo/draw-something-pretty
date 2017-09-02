

const canvas = document.querySelector('#draw'); // select the html canvas element by id
const ctx = canvas.getContext('2d'); // specify context of 2d or 3d for your canvas. all drawing is done on ctx!

canvas.width = window.innerWidth; // resize the canvas if you want a size other than default 800x800
canvas.height = window.innerHeight;

ctx.strokeStyle = '#BADA55'; // set the initial color
ctx.lineJoin = 'round'; // when a line meets another line- squared off or rounded? (here is rounded)
ctx.lineCap = 'round'; // should the end of the line be squared off or rounded? (here is rounded)
ctx.lineWidth = 1; // adjust size of line

let isDrawing = false; // set initial value of flag to know when to draw (click mouse down= draw. click mouse up = don't draw)

// in order to draw a line, you need a starting x and y point
let lastX = 0;
let lastY = 0;
let hue = 0; // this is not necessary. just fun add on for this example
let direction = true; // also not necessary. fun add on

// this function will be called whenever the mouse is moved on the canvas
function draw(e) {
	if (!isDrawing){ // without '!', a line will be drawn to mouse position on page load
		return; // stop the function from running when they are not moused down
	}
	// console.log(e); // see everything happening while drawing
	ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`; // fun add on related to hue in lie 25
	ctx.beginPath();
	ctx.moveTo(lastX, lastY); // start drawing here
	ctx.lineTo(e.offsetX, e.offsetY); // finish drawing the line here
	ctx.stroke(); // nothing will happen until you call stroke()

	// (pretty cool effect if you omit these next two lines)
	lastY = e.offsetY; // update these two values, so you are not always beginning from x=0 and y=0;
	lastX = e.offsetX; // update these two values, so you are not always beginning from x=0 and y=0;
	// the above two lines rewritten in ES6 syntax:
	/*  [lastX, lastY] = [e.offsetX, e.offsetY]; */

	hue++; // fun add on related to lines 25 and 34

	// fun add on to play with line widths
	if (ctx.lineWidth >=80 || ctx.lineWidth <= 1){
		direction = !direction;
	}
	if(direction){
		ctx.lineWidth++
	}else {
		ctx.lineWidth--;
	}
	
}

// when mouse is down, start drawing
canvas.addEventListener('mousedown', (e) => { // the event must be a parameter to the function. why????
	isDrawing = true;
	lastX = e.offsetX; // update these values to the mouse down position before the mouse starts moving
	lastY = e.offsetY; // update these values to the mouse down position before the mouse starts moving
}); 

canvas.addEventListener('mousemove', draw); // listen for mousemove. when it does, fun the 'draw' function
canvas.addEventListener('mouseup', () => isDrawing = false); // stop drawing on mouseup
canvas.addEventListener('mouseout', () => isDrawing = false); // stop drawing if mouse goes out of the window bounds


