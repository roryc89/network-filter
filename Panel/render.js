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
    var responseBody = document.createTextNode(entry.responseBody);

    responseBodyDiv.innerHTML = 'Response Body: ';
    var responseBodyValueSpan = document.createElement('span');
    var bodyId = 'resBodyRow' + index;
    responseBodyValueSpan.setAttribute('id', bodyId);

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

