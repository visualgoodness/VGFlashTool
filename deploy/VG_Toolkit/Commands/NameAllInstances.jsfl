
/**
 * ...
 * @author Ben Roth

	names all instances on a layer with a user selected name
	the script will ignore all shapes, and textfields, but if any frame in on the layer contains multiple symbols, the script will abort.



*/
fl.outputPanel.clear()

var doc = fl.getDocumentDOM();
var tl = doc.getTimeline();
var layerId = tl.currentLayer;
var layerName = tl.getLayerProperty("name");
var existingName = "";

if(doc.selection.length == 1){
	existingName = fl.getDocumentDOM().selection[0].name;
}


if(checkForSingularInstance(layerId)){
	var n = prompt("Please choose a name for these instances",existingName);
	if(n == null || n== "" || n==undefined) n = ""
	var lastStartFrame 
	for(var i=0;i<tl.layers[layerId].frames.length;i++){
		if(tl.layers[layerId].name != n && lastStartFrame != tl.layers[layerId].frames[i].startFrame){
			fl.trace("found an instance on Layer "+tl.layers[layerId].name+" Frame "+i+" that will be renamed From: "+ tl.layers[layerId].frames[i].elements[0].name +"To:"+n);
			lastStartFrame = tl.layers[layerId].frames[i].startFrame;
		}
		 tl.layers[layerId].frames[i].elements[0].name = n;
	}
	alert("instance naming script complete - instances renamed to: "+n);
}


function checkForSingularInstance(ly){	
	for(var i=0;i<tl.layers[ly].frames.length;i++){
		if (tl.layers[ly].frames[i].elements.length == 0) {
			alert("No symbols found on this layer");
			return false;
		}
		if (tl.layers[ly].frames[i].elements.length > 1) {
			symbolCount = 0
			for(var j=0;j<tl.layers[ly].frames[i].elements.length;j++){
				et = tl.layers[ly].frames[i].elements[j].elementType;
				if(et == "instance") symbolCount ++
			}
			if(symbolCount >1){
				alert("instance naming script complete - instances renamed to: "+n);
				return false;
			} else {
				return true;
			}
		} else {
			return true;
		}
	}
}

