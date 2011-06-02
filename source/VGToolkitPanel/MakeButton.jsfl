
function makeButton(hasOver){
	if ( fl.getDocumentDOM().selection.length == 1 )  {  
		lib = fl.getDocumentDOM().library;
	
		//gather position information about object to be turned into button
		var objectLeft = fl.getDocumentDOM().selection[0].x;  
		var objectTop = fl.getDocumentDOM().selection[0].y;  
		var objectRight = fl.getDocumentDOM().selection[0].x + fl.getDocumentDOM().selection[0].width;  
		var objectBottom = fl.getDocumentDOM().selection[0].y + fl.getDocumentDOM().selection[0].height;  
		var objectWidth = fl.getDocumentDOM().selection[0].width;
		var objectHeight =  fl.getDocumentDOM().selection[0].height;
		var objectType = fl.getDocumentDOM().selection[0].elementType;
		var asVersion = fl.getDocumentDOM().asVersion
		
		
		
		//prompt for button library name
		var btnName = prompt("Enter A Name For The New Button", "");
		if(btnName==null||btnName=="null"||btnName==undefined) return;
		if(checkLibraryForItem(btnName)){
			alert(btnName+" already exists, please try again");
			return
		}
	
		
		//create symbol and set properties
		fl.getDocumentDOM().convertToSymbol('movie clip', btnName, 'top left');
		
		if (lib.getItemProperty('linkageImportForRS') == true) {
			lib.setItemProperty('linkageImportForRS', false);
		} else {
			lib.setItemProperty('linkageExportForAS', false);
			lib.setItemProperty('linkageExportForRS', false);
		}
		lib.setItemProperty('scalingGrid',  false);
		var lib = fl.getDocumentDOM().library;
		lib.setItemProperty('symbolType', 'movie clip');
		if (lib.getItemProperty('linkageImportForRS') == true) {
			lib.setItemProperty('linkageImportForRS', false);
		}
		lib.setItemProperty('linkageExportForAS', true);
		lib.setItemProperty('linkageExportForRS', false);
		lib.setItemProperty('linkageExportInFirstFrame', true);
		lib.setItemProperty('linkageBaseClass', 'flash.display.MovieClip');
		
		//begin editing the button
		fl.getDocumentDOM().enterEditMode('inPlace');
		
		//add hit mc
		fl.getDocumentDOM().getTimeline().setSelectedLayers(0);
		fl.getDocumentDOM().getTimeline().layers[0].locked = true;
		fl.getDocumentDOM().getTimeline().addNewLayer("hitBtn","normal",true);
		
		//check if a "vg_hitMc" exists in the library use it, or else generate a new one
		if(checkLibraryForItem("vg_hitMc")){
			
			var itemIndex = fl.getDocumentDOM().library.findItemIndex("vg_hitMc");
			var hitMc = fl.getDocumentDOM().library.items[itemIndex];
			
			var vg_hitMc = fl.getDocumentDOM().addItem({x:0,y:0}, hitMc);
			fl.getDocumentDOM().setElementProperty("width", objectWidth);
			fl.getDocumentDOM().setElementProperty("height", objectHeight);
			fl.getDocumentDOM().setElementProperty("x",0);
			fl.getDocumentDOM().setElementProperty("y",0);
			
		} else {
			fl.getDocumentDOM().addNewRectangle({left:objectLeft, top:objectTop, right:objectRight, bottom:objectBottom}, 0,false, true);
			fl.getDocumentDOM().setSelectionRect({left:objectLeft, top:objectTop, right:objectRight, bottom:objectBottom});
			fl.getDocumentDOM().convertToSymbol('movie clip', 'vg_hitMc', 'top left');
			fl.getDocumentDOM().setElementProperty("x",0);
			fl.getDocumentDOM().setElementProperty("y",0);
		};
		
		fl.getDocumentDOM().selection[0].name = 'vgHitMc';
		fl.getDocumentDOM().selection[0].colormode = "alpha";
		fl.getDocumentDOM().selection[0].colorAlphaPercent = 0;
		fl.getDocumentDOM().getTimeline().setSelectedLayers(0);
		fl.getDocumentDOM().getTimeline().setLayerProperty('outline', true);
		fl.getDocumentDOM().getTimeline().layers[0].locked = true;

		//generate Over and Out states
		if(hasOver){
			fl.getDocumentDOM().getTimeline().addNewLayer("as","normal",true);
			for(var i=0; i<fl.getDocumentDOM().getTimeline().layers.length; i++){
				fl.getDocumentDOM().getTimeline().currentLayer = i;
				fl.getDocumentDOM().getTimeline().insertKeyframe(16);
			}
			//setup tweens
			fl.getDocumentDOM().getTimeline().insertKeyframe(8);
			fl.getDocumentDOM().getTimeline().setSelectedFrames(1,1,true); 
			var tweenType;
			if(objectType == "shape") {
				tweenType = 'shape'
			} else {
				tweenType = 'motion'
			}
			fl.getDocumentDOM().getTimeline().setFrameProperty('tweenType', tweenType);
			fl.getDocumentDOM().getTimeline().setSelectedFrames(9,9,true); 
			fl.getDocumentDOM().getTimeline().setFrameProperty('tweenType', tweenType);
			
			//setup keyframes for actions and labels
			fl.getDocumentDOM().getTimeline().currentLayer = 0;
			fl.getDocumentDOM().getTimeline().insertKeyframe(1);
			fl.getDocumentDOM().getTimeline().insertKeyframe(8);
			fl.getDocumentDOM().getTimeline().insertKeyframe(9);
			
			//add labels
			fl.getDocumentDOM().getTimeline().layers[0].frames[1].name = 'over';
			fl.getDocumentDOM().getTimeline().layers[0].frames[9].name = 'out';
			
			//add actions
			fl.getDocumentDOM().getTimeline().layers[0].frames[8].actionScript = 'stop();';
			fl.getDocumentDOM().getTimeline().layers[0].frames[16].actionScript = 'stop();'+'\n'+'gotoAndStop(1);';
			if(asVersion == 2){
				fl.getDocumentDOM().getTimeline().layers[0].frames[0].actionScript =
				
					'vgHitMc.onRelease = function(){'+'\n'+
						'\t'+'//do something on click'+'\n'+
					'};'+'\n'+
					'vgHitMc.onRollOver = function(){'+'\n'+
						'\t'+'gotoAndPlay("over");'+'\n'+
					'};'+'\n'+
					'vgHitMc.onRollOut = function(){'+'\n'+
						'\t'+'gotoAndPlay("out");'+'\n'+
					'};';
				
				
			} else if (asVersion ==3){
				fl.getDocumentDOM().getTimeline().layers[0].frames[0].actionScript = 
					'vgHitMc.addEventListener(MouseEvent.CLICK, onClick);'+'\n'+
					'vgHitMc.addEventListener(MouseEvent.MOUSE_OVER, onOver);'+'\n'+
					'vgHitMc.addEventListener(MouseEvent.MOUSE_OUT, onOut);'+'\n'+
					'vgHitMc.buttonMode= true;'+'\n'+
					'\n'+
					'function onClick(e:MouseEvent){'+'\n'+
						'\t'+'//do something on click'+'\n'+
					'};'+'\n'+
					'function onOver(e:MouseEvent){'+'\n'+
						'\t'+'gotoAndPlay("over");'+'\n'+
					'};'+'\n'+
					'function onOut(e:MouseEvent){'+'\n'+
						'\t'+'gotoAndPlay("out");'+'\n'+
					'};'+'\n'+
					'stop();';
			}
		}
		
		
		
		fl.getDocumentDOM().exitEditMode();
	}
}
function checkLibraryForItem(checkName){
	var itemIndex = fl.getDocumentDOM().library.findItemIndex(checkName);
	if(itemIndex==null||itemIndex=="null"||itemIndex==undefined||itemIndex==""){
		return false;
	} else {
		return true;
	}
}

