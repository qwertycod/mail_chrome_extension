console.log('Mail extension loaded...')

function highlightSearchTerms(searchText, treatAsPhrase, warnOnFailure, highlightStartTag, highlightEndTag)
{
  if (!document.body || typeof(document.body.innerHTML) == "undefined") {
    if (warnOnFailure) {
      alert("Sorry, for some reason the text of this page is unavailable. Searching will not work.");
    }
    return false;
  }
  
  var bodyText = document.body.innerHTML;
  var search_in = document.body.innerHTML;
    string_context = search_in.toString();

  array_mails = string_context.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);

if(!array_mails){return}

  for (var i = 0; i < array_mails.length; i++) {
    bodyText = doHighlight(bodyText, array_mails[i], highlightStartTag, highlightEndTag);
  }
  
  document.body.innerHTML = bodyText;
  return true;
}

function doHighlight(bodyText, searchTerm, highlightStartTag, highlightEndTag) 
{
  // the highlightStartTag and highlightEndTag parameters are optional
  if ((!highlightStartTag) || (!highlightEndTag)) {
    highlightStartTag = "<font class='mailer' style='color:blue; background-color:yellow;'>";
    highlightEndTag = "</font>";
  }
  
  // find all occurences of the search term in the given text,
  // and add some "highlight" tags to them (we're not using a
  // regular expression search, because we want to filter out
  // matches that occur within HTML tags and script blocks, so
  // we have to do a little extra validation)
  var newText = "";
  var i = -1;
  var lcSearchTerm = searchTerm.toLowerCase();
  var lcBodyText = bodyText.toLowerCase();
    
  while (bodyText.length > 0) {
    i = lcBodyText.indexOf(lcSearchTerm, i+1);
    if (i < 0) {
      newText += bodyText;
      bodyText = "";
    } else {
      // skip anything inside an HTML tag
      if (bodyText.lastIndexOf(">", i) >= bodyText.lastIndexOf("<", i)) {
        // skip anything inside a  script  block
        if (lcBodyText.lastIndexOf("/script>", i) >= lcBodyText.lastIndexOf("<script", i)) {
          newText += bodyText.substring(0, i) + highlightStartTag + bodyText.substr(i, searchTerm.length) + highlightEndTag;
          bodyText = bodyText.substr(i + searchTerm.length);
          lcBodyText = bodyText.toLowerCase();
          i = -1;
        }
      }
    }
  }
  
  return newText;
}

highlightSearchTerms(null, null, null, null, null)


for (let i = 0; i < document.querySelectorAll(".mailer").length; i++) {
    document.querySelectorAll(".mailer")[i].addEventListener('click', function(e){ 
      e.preventDefault()
      if(document.getElementById('ctxmenu')){
        document.getElementById('ctxmenu').style.display = "block"; 
        return
      }
      
      let menu = document.createElement("div")
      menu.id = "ctxmenu"
      menu.style = `top:${e.pageY-40}px;left:${e.pageX-40}px;display:block`
      menu.classList.add('ctxmenu')
      menu.onmouseleave = () => {
        clearPopup()
      }

      menu.innerHTML =  "<div class='popup' id='popup1'><span class='popuptext show' id='myPopup'>Send Mail...  ?</span></div>" 
      
      document.body.appendChild(menu)

      setUpLargePopup();
      menu.onmouseleave = () => {
        document.getElementById('ctxmenu').outerHTML = ''
      }      
      return
    })
 }   

 function setUpLargePopup() {
  document.getElementById("popup1").addEventListener('click', function (e) {

    document.getElementById('popup1').innerHTML = "<div id='mainpopupdiv'><span id='closebutton' class='closebutton'>X</span>" +
      '<iframe id="maileriframe" onload="doIt()" src="https://www.gmail.com/" allow="camera; microphone" width="667" height="375">no iframe support</iframe>' +
      "<div/>";

    document.getElementById("closebutton").addEventListener('click', function (e) {
      clearPopup();
    });

    setTimeout(() => {
      var iframe = document.getElementById("maileriframe");
      iframe.contentWindow.document.getElementById('Receipent').value = 'sssss';
    }, 2000);
  });
}

    function clearPopup(){
      document.getElementById('popup1').outerHTML = ''
      document.getElementById('ctxmenu').outerHTML = ''
    }


function hasClass(elem, className) {
    return elem.className.split(' ').indexOf(className) > -1;
}