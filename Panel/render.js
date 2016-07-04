(function(){
  'use strict';

  nfGlobal.updateUI = function(entries) {

    var rowContainer = document.querySelector('.network-entries');
    rowContainer.innerHTML = '';
    entries.forEach(function (entry, index) {
      rowContainer.appendChild(createRow(entry, index));
    });

  };

  function createRow(entry, index) {
    var li = document.createElement('li');


    var urlDiv = document.createElement('div');
    urlDiv.innerHTML = 'url: ' + entry.request.url;

    var mimeTypeDiv = document.createElement('div');
    mimeTypeDiv.innerHTML = 'mimeType: ' + entry.response.content.mimeType;

    var dateTimeDiv = document.createElement('div');
    dateTimeDiv.innerHTML = 'dateTime: ' + entry.startedDateTime;

    var statusDiv = document.createElement('div');
    statusDiv.innerHTML = 'status: ' + entry.response.status;

    var postDataDiv = document.createElement('div');

    if(entry.request.postData && entry.request.postData.text)
    {
      postDataDiv.innerHTML = 'postData: ' + entry.request.postData.text;
    }

    var responseBodyDiv = document.createElement('div');
    var responseBody;
    if (document.getElementById('pretty').checked) {
      responseBody = document.createTextNode(syntaxHighlight(entry.responseBody));
    }
    else {
      responseBody = document.createTextNode(entry.responseBody);
    }

    responseBodyDiv.innerHTML = 'Response Body: ';
    var responseBodyValueSpan = document.createElement('span');
    var bodyId = 'resBodyRow' + index;
    responseBodyValueSpan.setAttribute('id', bodyId);

    var highlightTarget = document.getElementById('filterByContent').value;
    var otherHighlightTarget = document.getElementById('filterByOtherInfo').value;

    if (highlightTarget && highlightTarget.length > 2 && document.getElementById('highlight').checked) {
      responseBody = highlight(responseBody, highlightTarget);
    }

    if (otherHighlightTarget && otherHighlightTarget.length > 2 && document.getElementById('highlight').checked) {
      if(entry.request.postData && entry.request.postData.text)
      {
        var postDataHighlight = highlight(entry.request.postData.text, otherHighlightTarget);
        postDataDiv.innerHTML = 'postData high: ' + postDataHighlight;
      }
    }


    responseBodyValueSpan.appendChild(responseBody);
    responseBodyDiv.appendChild(responseBodyValueSpan);

    responseBodyValueSpan.onclick = function () {
      if (document.getElementById('selectAll').checked) {
        selectText(bodyId);
      }
    };

    li.appendChild(urlDiv);
    li.appendChild(mimeTypeDiv);
    li.appendChild(dateTimeDiv);
    li.appendChild(statusDiv);
    li.appendChild(postDataDiv);
    li.appendChild(responseBodyDiv);

    return li;
  }

  function syntaxHighlight(json) {
    var indents = 0;
    if (typeof json != 'string') {
      json = JSON.stringify(json, undefined, 2);
    }
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|\{|\[|]|}|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
      var cls = 'number';
      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          cls = 'key';
          for (var i = 0; i < indents; i++) {
            match = '  ' + match;
          }
          match = '\n' + match;

        } else {
          cls = 'string';
        }
      } else if (/true|false/.test(match)) {
        cls = 'boolean';
      } else if (/null/.test(match)) {
        cls = 'null';
      }

      if (match.match(/\{/g))
      {
        indents += match.match(/\{/g).length;
        cls = 'bracket';
      }
      if (match.match(/\[/g))
      {
        indents += match.match(/\[/g).length;
        cls = 'bracket';
      }
      if (match.match(/}/g))
      {
        indents -= match.match(/}/g).length;
        cls = 'bracket';
      }
      if (match.match(/]/g))
      {
        indents -= match.match(/]/g).length;
        cls = 'bracket';
      }

      return '<span class="' + cls + '">' + match + '</span>';
    });
  }

  function highlight(string, target) {
    target = "(" +
      target.replace(/([{}()[\]\\.?*+^$|=!:~-])/g, "\\$1")
      + ")";

    var r = new RegExp(target, "igm");
    return string.replace(/(>[^<]+<)/igm, function (a) {
      return a.replace(r, "<span class='hl'>$1</span>");
    });
  }

  function selectText(containerId) {
    var range;
    if (document.selection) {
      range = document.body.createTextRange();
      range.moveToElementText(document.getElementById(containerId));
      range.select();
    } else if (window.getSelection) {
      range = document.createRange();
      range.selectNode(document.getElementById(containerId));
      window.getSelection().addRange(range);
    }
  }
})();

