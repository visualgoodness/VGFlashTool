
var dom = fl.getDocumentDOM();
var secretword = "hi!";

if ( fl.getDocumentDOM().selection.length == 1 )  {
	
} else {
	
}
var symbolDialog = fl.getDocumentDOM().xmlPanel(fl.configURI + '/VG_ToolKit/Commands/testDialog.xml');
fl.xmlui.set("display_tb", "working");
if(symbolDialog.dismiss == 'accept')
fl.trace(symbolDialog.target_symbol);

