var tmpXmlFile = fl.configURI + "/tmp.xml";
var prefillFile = fl.configURI + "/batchExportPrefill.txt"; 
var tmpCompilerErrorFile = fl.configURI + "/compilerErrorTxt.txt";

if(FLfile.exists(prefillFile))
{
  prefill = FLfile.read(prefillFile).split(",");
  folder = prefill[0];
  checkStr = prefill[1];
  sub = prefill[2];
}
else
{
  folder = "";
  checkStr = "";
  sub = "false";
}

openDialog(folder, checkStr, sub);

function openDialog(folder, checkStr, subDir)
{
  var dom = fl.getDocumentDOM();

  if(dom == null)
  {
    var dummyDoc = fl.createDocument();
    dom = fl.getDocumentDOM();
  }
  
  var xmlGui = buildXulGui(folder, checkStr, subDir);
  FLfile.write(tmpXmlFile, xmlGui);

  settings = dom.xmlPanel(tmpXmlFile);
  
  if(settings.dismiss == 'accept')
  {
    batchExport(settings.folder, settings.checkStr, settings.sub);
  }
  else
  {
    
  }
  
  if(dummyDoc != undefined)
  {
    fl.closeDocument(dummyDoc, false);
  }
  
  if(FLfile.exists(tmpXmlFile))
  {
    FLfile.remove(tmpXmlFile);
  }  
}

function getFolderIncrement(folder)
{
  var folders = new Array();
  folders.push(folder);
  
  var subFolders = FLfile.listFolder(folder, "directories");
  
  for (f in subFolders) 
  {
    folders = folders.concat(getFolderIncrement( folder+"/"+subFolders[f] ));
  }
  
  return folders;
}

function batchExport(folder, checkStr, subfolder)
{
  if(folder == "")
  {
    alert("Please select a folder");
    openDialog(folder, checkStr, subfolder);
    return;
  }
  
  if(!FLfile.exists(folder))
  {
    alert("The folder does not exist");
    openDialog(folder, checkStr, subfolder);
    return;  
  }

  var fileMask = "*.fla";
  
  if(subfolder == "true")
  {
    var folders = getFolderIncrement(folder);
  }
  else
  {
    var folders = [folder];
  }
  
  var list = new Array();
  
  for (f in folders) 
  {
    var tmpFiles = FLfile.listFolder(folders[f] + "/" + fileMask, "files");
    
    for(var k = 0; k < tmpFiles.length; k++)
    {
      if(tmpFiles[k].split(checkStr).length > 1)
      {
        list.push(folders[f]+"/"+tmpFiles[k]);
      }
    }
  }
  
  if(list.length == 0)
  {
    alert("Error:\n\nNo fla files found\nor\nno fla files found that match with the string");
    openDialog(folder, checkStr, subfolder);
    return;
  }

  files = list;
  var filesCompleteTicker = 0;
  var filesErrorArray = new Array();
  
  var openDocuments = fl.documents;
  
  FLfile.write(prefillFile, folder+","+checkStr+","+subfolder);
  
  for(var j = 0; j < files.length; j++)
  {
    doc = fl.openDocument(files[j]);
    doc.publish();
    doc.saveAndCompact();
    
    if(fl.compilerErrors != undefined)
    {
      fl.compilerErrors.save(tmpCompilerErrorFile);
      var compilerError = FLfile.read(tmpCompilerErrorFile).length != 0;
    }
    
    if(compilerError)
    {
      filesErrorArray.push(files[j]);
    }
    else
    {
      filesCompleteTicker++;
    }
    
    var documentWasOpen = false;
    
    for (checkDoc in openDocuments) 
    {
      if(fl.documents[checkDoc].name == doc.name)
      {
        documentWasOpen = true;
      }
    }
    
    if(!documentWasOpen)
    {
      doc.close();
    }
  }
  
  if(FLfile.exists(tmpCompilerErrorFile))
  {
    FLfile.remove(tmpCompilerErrorFile);
  }
  
  var successString = filesCompleteTicker+" documents succesfully exported";
  
  if(filesErrorArray.length > 0)
  {
    var errorString = "\n\nExport errors found:\n"+filesErrorArray.join("\n");
  }
  else
  {
    var errorString = "";
  }
  
  alert("Export finished\n\n"+successString+errorString);
}

function buildXulGui(folderVal, checkVal, subVal)
{
  return '<dialog id="dialog" title="Batch Fla Export" buttons="accept, cancel"> \
      \
      <script> \
      function browseFolder() \
      { \
        var folderURL = fl.browseForFolderURL(); \
        if(folderURL != null) \
        { \
          fl.xmlui.set("folder", folderURL); \
        } \
      } \
      \
      function okClick() \
      { \
        fl.xmlui.accept(); \
      } \
      \
      function cancelClick() \
      { \
        fl.xmlui.cancel(); \
      } \
      </script> \
      \
     <vbox> \
      <label width="300" value="This tool allows you to batch export a bunch of fla files at one go. Select the directory of the fla files, if subdirectories should be included and a string which the files names are checked against."/> \
      <separator/> \
      <checkbox id="sub" label="Include subdirectories" checked="'+subVal+'"/> \
      <separator/> \
      <label value="Folder:" /> \
      <textbox value="'+folderVal+'" width="300" id="folder"/> \
      <button id="openFolder" label="Select folder..." oncommand="browseFolder()" disabled="true"/>	\
      <separator/> \
      <label width="300" value="Check agains string. \'client\' will find client01.fla and client02.fla and leave home.fla and contact.fla" /> \
      <textbox width="300" value="'+checkVal+'" id="checkStr"/> \
    </vbox> \
    \
  </dialog>'
}