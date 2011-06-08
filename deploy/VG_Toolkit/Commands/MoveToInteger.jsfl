fl.outputPanel.clear()
// clean the library

cleanTimeline(fl.getDocumentDOM().getTimeline(),"");
// look through every layer
function cleanTimeline(tl){
	for (var i=0;i<tl.layers.length;i++){
		cleanLayer(tl.layers[i]);
		
	}
	alert("Complete. All elements are now on whole pixels");
}
// look through every frame
function cleanLayer(ly){
	for(var i=0;i<ly.frames.length;i++){
		cleanFrame(ly.frames[i],i);
		
	}
}
// look through every element
function cleanFrame(fr,fn){
	for(var i=0;i<fr.elements.length;i++){
		cleanElement(fr.elements[i]);
		//fl.trace("clean stage element "+fr.elements[i]);
	}
	
}
// adjust element x,y positions on the stage.
function cleanElement(el){
	var px=el.x;
	var py=el.y;
	el.x=Math.round(px);
	el.y=Math.round(py);
	if(px!=el.x||py!=el.y){
		fl.trace("->Moving element named: "+el.name+" From: x=" +px+", y="+py+" -> To: x=" +el.x+", y="+el.y);
	}
}

