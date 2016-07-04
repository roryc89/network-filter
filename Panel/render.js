(function(){
  'use strict';

  nfGlobal.updateUI = function(entries) {

    var rowContainer = document.querySelector('.network-entries');
    rowContainer.innerHTML = 'Getting Data';

    setTimeout(()=>{

      var tempFragment = document.createDocumentFragment();
      entries.forEach(function (entry, index) {
        tempFragment.appendChild(createRow(entry, index));
      });
      rowContainer.innerHTML = '';
      rowContainer.appendChild(tempFragment);

    },0)

  };

  function createRow(entry, index) {
    var li = document.createElement('li');

    var urlDiv = document.createElement('div');
    urlDiv.innerHTML = '<strong>url</strong>: ' + entry.request.url;

    var mimeTypeDiv = document.createElement('div');
    mimeTypeDiv.innerHTML = '<strong>mimeType</strong>: ' + entry.response.content.mimeType;

    var dateTimeDiv = document.createElement('div');
    dateTimeDiv.innerHTML = '<strong>dateTime</strong>: ' + entry.startedDateTime;

    var statusDiv = document.createElement('div');
    statusDiv.innerHTML = '<strong>status</strong>: ' + entry.response.status;

    var postDataDiv = document.createElement('div');

    if(entry.request.postData && entry.request.postData.text)
    {
      postDataDiv.innerHTML = '<strong>postData</strong>: ' + entry.request.postData.text;
    }

    var responseBodyDiv = document.createElement('div');

    var responseBody;
    if(entry.response.content.mimeType === 'application/json'){
      responseBody = document.createElement('pre');
      responseBody.innerHTML = entry.responseBody;
    }else{
      responseBody = document.createTextNode(entry.responseBody);
    }

    responseBodyDiv.innerHTML = '<strong>Response Body</strong>: ';
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

