/*

radial selection menu well suited for jotstick based selection

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



//Variables
var val = 0;
var vbrgb = [1.,1.,1.,1.];
var vfrgb = [0.5,0.5,0.5,1.];
var vrgb2 = [0.7,0.7,0.7,1.];
var last_x = 0;
var last_y = 0;
var rad = 0.99; 
var offColor = [0,0,0,0.1];
var onColor = accentColor;


var slices = 8;
var accentColor = [0.9, 0.9, 0,1];
var label = "";

//mgraphic init
	mgraphics.init();
	mgraphics.relative_coords = 1;
	mgraphics.autofill = 0;
	inventorySelect = -1;

function paint(){
	
	with(mgraphics){	//enables mgraphics functinos without accessing the mgraphics object
		

	sliceSize = 3.14*2/slices;
	sliceOffset = 3.14/slices*(slices/2-1);
	
	for (var i=0; i < slices; i++){
		arc(0.0,0.0, rad, (i)*sliceSize+sliceOffset,(i+1)*sliceSize+sliceOffset);  //draw arch
		line_to(0,0); //draw line to center;
		close_path(); //complete the path;
		
		set_source_rgba(0, 0, 0, 1.); //outine color
		stroke();// outline the shape
		
		//outlining the shape clears to path, so we must draw it again
		
		arc(0.0,0.0, rad, (i)*sliceSize+sliceOffset,(i+1)*sliceSize+sliceOffset);
		line_to(0,0);
		close_path();
		//If selected, choose  the on color
		if (i != inventorySelect){
		set_source_rgba(offColor[0],offColor[1],offColor[2], offColor[3]);
		}
		else{
			set_source_rgba(onColor[0],onColor[1],onColor[2], 0.5);
			}

		fill();
		
	}
		//Draw center circle
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
forcesize.local = 1; 

function onresize(w,h)
{
	forcesize(w,h);
	refresh();
}
onresize.local = 1; 
