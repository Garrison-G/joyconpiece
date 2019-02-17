/*

simple 2d dial

arguments: fgred fggreen fgblue bgred bggreen bgblue dialred dialgreen dialblue

*/

sketch.default2d();
var val = 0;
var vbrgb = [1.,1.,1.,1.];
var vfrgb = [0.5,0.5,0.5,1.];
var vrgb2 = [0.7,0.7,0.7,1.];
var last_x = 0;
var last_y = 0;
	mgraphics.init();
	mgraphics.relative_coords = 1;
	mgraphics.autofill = 0;
	inventorySelect = -1;

function paint(){


	
	with(mgraphics){
	
	//move_to(-0.5,0.5);
	rad = 0.9;
	offColor = [0,0,0,0.1];
	onColor = [1,1,0,0.5];

	
	for (var i=0; i < 8; i++){
		arc(0.0,0.0, rad, i*3.14/4+3.14/8*3, 3.14/4+i*3.14/4+3.14/8*3);
		line_to(0,0);
		set_source_rgba(0, 0, 0, 1.);
		close_path();
		stroke();
		set_source_rgba(0.2, 0.2, 0, 1.);
		arc(0.0,0.0, rad, i*3.14/4+3.14/8*3, 3.14/4+i*3.14/4+3.14/8*3);
		line_to(0,0);
		close_path();
		if (i != inventorySelect){
		set_source_rgba(offColor[0],offColor[1],offColor[2], offColor[3]);
		}
		else{
			set_source_rgba(onColor[0],onColor[1],onColor[2], onColor[3]);
			}

		fill();
	}
	
	
	}
	
	
	
	}

function select(select){
	inventorySelect = select;
	refresh();
	}

function bang()
{

	refresh();
	outlet(0,val);
}

function msg_float(v)
{
	val = Math.min(Math.max(0,v),1);
	notifyclients();
	bang();
}

function set(v)
{
	val = Math.min(Math.max(0,v),1);
	notifyclients();
	refresh();
}

function fsaa(v)
{
	sketch.fsaa = v;
	bang();
}

function frgb(r,g,b)
{
	vfrgb[0] = r/255.;
	vfrgb[1] = g/255.;
	vfrgb[2] = b/255.;
	refresh();
}

function rgb2(r,g,b)
{
	vrgb2[0] = r/255.;
	vrgb2[1] = g/255.;
	vrgb2[2] = b/255.;
	refresh();
}

function brgb(r,g,b)
{
	vbrgb[0] = r/255.;
	vbrgb[1] = g/255.;
	vbrgb[2] = b/255.;
	refresh();
}

function setvalueof(v)
{
	msg_float(v);
}

function getvalueof()
{
	return val;
}

// all mouse events are of the form: 
// onevent <x>, <y>, <button down>, <cmd(PC ctrl)>, <shift>, <capslock>, <option>, <ctrl(PC rbutton)>
// if you don't care about the additonal modifiers args, you can simply leave them out.
// one potentially confusing thing is that mouse events are in absolute screen coordinates, 
// with (0,0) as left top, and (width,height) as right, bottom, while ing 
// coordinates are in relative world coordinates, with (0,0) as the center, +1 top, -1 bottom,
// and x coordinates using a uniform scale based on the y coordinates. to convert between screen 
// and world coordinates, use sketch.screentoworld(x,y) and sketch.worldtoscreen(x,y,z).

function onclick(x,y,but,cmd,shift,capslock,option,ctrl)
{
	// cache mouse position for tracking delta movements
	last_x = x;
	last_y = y;
}
onclick.local = 1; //private. could be left public to permit "synthetic" events

function ondrag(x,y,but,cmd,shift,capslock,option,ctrl)
{
	var f,dy;
	
	// calculate delta movements
	dy = y - last_y;
	if (shift) { 
		// fine tune if shift key is down
		f = val - dy*0.001; 
	} else {
		f = val - dy*0.01;
	}
	msg_float(f); //set new value with clipping + refresh
	// cache mouse position for tracking delta movements
	last_x = x;
	last_y = y;
}
ondrag.local = 1; //private. could be left public to permit "synthetic" events

function ondblclick(x,y,but,cmd,shift,capslock,option,ctrl)
{
	last_x = x;
	last_y = y;
	msg_float(0); // reset dial?
}
ondblclick.local = 1; //private. could be left public to permit "synthetic" events

function forcesize(w,h)
{
	if (w!=h) {
		h = w;
		box.size(w,h);
	}
}
forcesize.local = 1; //private

function onresize(w,h)
{
	forcesize(w,h);
	refresh();
}
onresize.local = 1; //private
