/*

simple 2d dial

arguments: fgred fggreen fgblue bgred bggreen bgblue dialred dialgreen dialblue

*/
declareattribute("slices","getattr_slices", "setattr_slices", 1);

function getattr_slices(){
     return slices;
}

function setattr_slices(){
     slices = arguments[0];
     refresh();
}

declareattribute("accentColor","getattr_accentColor", "setattr_accentColor", 1);


function getattr_accentColor(){
     return accentColor;
}

function setattr_accentColor(){
     accentColor = [arguments[0],arguments[1],arguments[2],arguments[3]];
     refresh();
}


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
var slices = 8;
var accentColor = [0.9, 0.9, 0,1];
var label = "";
function paint(){


	
	with(mgraphics){
	
	//move_to(-0.5,0.5);
	rad = 0.99;
	offColor = [0,0,0,0.1];
	onColor = accentColor;

	sliceSize = 3.14*2/slices;
	sliceOffset = 3.14/slices*(slices/2-1);
	
	for (var i=0; i < slices; i++){
		arc(0.0,0.0, rad, (i)*sliceSize+sliceOffset,(i+1)*sliceSize+sliceOffset);
		line_to(0,0);
		set_source_rgba(0, 0, 0, 1.);
		close_path();
		stroke();
		set_source_rgba(0.2, 0.2, 0, 1.);
		arc(0.0,0.0, rad, (i)*sliceSize+sliceOffset,(i+1)*sliceSize+sliceOffset);
		line_to(0,0);
		close_path();
		if (i != inventorySelect){
		set_source_rgba(offColor[0],offColor[1],offColor[2], offColor[3]);
		}
		else{
			set_source_rgba(onColor[0],onColor[1],onColor[2], 0.5);
			}

		fill();
		
	}
		arc(0.0,0.0, rad*0.4, 0,6.28);
		set_source_rgba(0, 0, 0, 1.);
		stroke();
		set_source_rgba(accentColor[0],accentColor[1],accentColor[2],accentColor[3]);
		arc(0.0,0.0, rad*0.4, 0,6.28);
		fill();
	
	}
	
	
	
	}

function select(select){
	inventorySelect = select;
	refresh();
	}

function fsaa(v)
{
	sketch.fsaa = v;
	bang();
}


function setvalueof(v)
{
	msg_float(v);
}

function getvalueof()
{
	return val;
}


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
