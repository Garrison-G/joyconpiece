/*

radial selection menu well suited for jotstick based selection

*/
declareattribute("Slices","getattr_slices", "setattr_slices", 1);

function getattr_slices(){
     return slices;
}

function setattr_slices(){
     slices = arguments[0];
     refresh();
}

declareattribute("AccentColor","getattr_accentColor", "setattr_accentColor", 1);


function getattr_accentColor(){
     return accentColor;
}

function setattr_accentColor(){
     accentColor = [arguments[0],arguments[1],arguments[2],arguments[3]];
     refresh();
}


declareattribute("Spacer","getattr_spacer", "setattr_spacer", 1);


function getattr_spacer(){
     return spacer;
}

function setattr_spacer(){
     spacer= arguments[0];
     refresh();
}

declareattribute("OutlineColor","getattr_outlineColor", "setattr_outlineColor", 1);


function getattr_outlineColor(){
     return outlineColor;
}

function setattr_outlineColor(){
     outlineColor= [arguments[0],arguments[1],arguments[2],arguments[3]];
     refresh();
}

declareattribute("LineWeight","getattr_lineWeight", "setattr_lineWeight", 1);


function getattr_lineWeight(){
     return lineWeight;
}

function setattr_lineWeight(){
     lineWeight = arguments[0];
     refresh();
}

declareattribute("InteriorColor","getattr_interiorColor", "setattr_interiorColor", 1);


function getattr_interiorColor(){
     return interiorColor;
}

function setattr_interiorColor(){
     interiorColor = [arguments[0],arguments[1],arguments[2],arguments[3]];
     refresh();
}

declareattribute("OffColor","getattr_offColor", "setattr_offColor", 1);


function getattr_offColor(){
     return offColor;
}

function setattr_offColor(){
     offColor = [arguments[0],arguments[1],arguments[2],arguments[3]];
     refresh();
}

declareattribute("InnerRadius","getattr_innerRad", "setattr_innerRad", 1);


function getattr_innerRad(){
     return innerRad;
}

function setattr_innerRad(){
     innerRad = arguments[0];
     refresh();
}

outlets = 1;
//Variables
var val = 0;
var vbrgb = [1.,1.,1.,1.];
var vfrgb = [0.5,0.5,0.5,1.];
var vrgb2 = [0.7,0.7,0.7,1.];
var last_x = 0;
var last_y = 0;
var rad = 0.99; 
var offColor = [0,0,0,0.1];

var innerRad = 0.4;
var interiorColor = [0.9, 0.9, 0,0];
var lineWeight = 1;
var outlineColor = [0,0,0,0.5];
var spacer = 0;
var slices = 8;
var accentColor = [0.9, 0.9, 0,0.5];
var label = "";

//mgraphic init
	mgraphics.init();
	mgraphics.relative_coords = 1;
	mgraphics.autofill = 0;
	inventorySelect = -1;

function paint(){
	
	with(mgraphics){	//enables mgraphics functinos without accessing the mgraphics object
	
	var onColor = accentColor;	
	sliceSpacer = spacer/360*3.14
	sliceSize = 3.14*2/slices;
	sliceOffset = 3.14/slices*(slices/2-1);
	set_line_width(lineWeight*0.01);
	for (var i=0; i < slices; i++){
		modStart = (i)*sliceSize+sliceOffset+sliceSpacer;
		modEnd = (i+1)*sliceSize+sliceOffset;
		
	

		arc(0.0,0.0, rad*innerRad, modStart , modEnd);
		point = poltocar(rad, modEnd);
		

  		arc_negative(0.0,0.0, rad, modEnd , modStart);//draw arch		

		
		close_path();
		
		 //complete the path;
		
		set_source_rgba(outlineColor[0], outlineColor[1], outlineColor[2], outlineColor[3]); //outine color
		stroke();// outline the shape
		
		//outlining the shape clears to path, so we must draw it again
		

		arc(0.0,0.0, rad*innerRad, modStart , modEnd);

		
  		arc_negative(0.0,0.0, rad, modEnd , modStart);//draw arch	
	
		close_path();
		//If selected, choose  the on color
		if (i != inventorySelect){
		set_source_rgba(offColor[0],offColor[1],offColor[2], offColor[3]);
		}
		else{
			set_source_rgba(onColor[0],onColor[1],onColor[2], onColor[3]);
			}

		fill();
		
	}
		//Draw center circle

		set_source_rgba(interiorColor[0],interiorColor[1],interiorColor[2],interiorColor[3]);
		arc(0.0,0.0, rad*innerRad, 0,6.28);
		fill();
		var innerAlpha
		if (interiorColor[3] == 0) innerAlpha = 0;
		else innerAlpha = 1;
		set_source_rgba(outlineColor[0],outlineColor[1],outlineColor[2],outlineColor[3]*innerAlpha);
		arc(0.0,0.0, rad*innerRad, 0,6.28);
		stroke();
	
	}
	outlet(0,["slices", slices]);
	outlet(0,["select", inventorySelect]);
	
	
	}


function cartopol(x,y){
	with (Math){
		m = atan(y/x);
		r = sqrt(pow(x,2)+pow(y,2));
	}
	return [r , m];
	}
	
function poltocar(r,m){
	with (Math){
		x = r*cos(m)
		y= r*sin(m)
		}
		return [x,y];
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
