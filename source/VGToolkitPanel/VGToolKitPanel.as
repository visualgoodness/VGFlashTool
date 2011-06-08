package 
{  
    import adobe.utils.MMExecute;        
    import flash.display.MovieClip;  
	import flash.events.Event;
    import flash.events.MouseEvent;
	
	import PanelSections.TimelineTools;
	import PanelSections.FileTools;
	import PanelSections.SymbolTools;
  
    public class VGToolKitPanel extends MovieClip  
    {  
		
		private var tabs:Array = new Array();
		private var activeId:uint;
		private var lastActiveId:uint;
		
		private var useLocalPaths:Boolean = false;
		
        public function VGToolKitPanel()  {  
			if (stage) init();
			else addEventListener(Event.ADDED_TO_STAGE, init);
		}
 
		private function init(e:Event = null):void {
			removeEventListener(Event.ADDED_TO_STAGE, init);
			
			//add new tab mc's to array
			tabs = [tab1,tab2,tab3];

			tab1.id = 0;
			tab1.setTitle("Symbol Tools");
			tab1.hit.addEventListener(MouseEvent.CLICK, toggleTab);
			tab1.contents = new SymbolTools(useLocalPaths);
			
			tab2.id = 1;
			tab2.setTitle("Timeline Tools");
			tab2.hit.addEventListener(MouseEvent.CLICK, toggleTab);
			tab2.contents = new TimelineTools(useLocalPaths);
			
			tab3.id = 2;
			tab3.setTitle("File Tools");
			tab3.hit.addEventListener(MouseEvent.CLICK, toggleTab);
			tab3.contents = new FileTools(useLocalPaths);
			

			
		
			
		}
		
		private function toggleTab(e:MouseEvent):void {
			activeId = e.currentTarget.parent.id
			
			var tab:Tab = tabs[activeId];
			if (tab.open) {
				//close tab
				tab.open = false;
				tab.contents.visible = false;
				tab.gotoAndStop(1);
				for each( var i in tabs) {
					if (i.id > activeId) {
						i.y -= tabs[activeId].height;
					}
				}
				
			} else {
				//open tab
				tab.open = true;
				tab.gotoAndStop(2);
				tab.contents.visible = true;
				for each( var j in tabs) {
					if (j.id > activeId) {
						j.y += tabs[activeId].height;
					}
				}
			}
				
		}
		
    }  
} 