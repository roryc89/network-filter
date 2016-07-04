(function(){
  'use strict';

  nfGlobal.filterHar = function (harWithContent) {
    var contentFiltered = filterByContent(harWithContent);
    contentFiltered = filterByOther(contentFiltered);
    contentFiltered = filterByMinMax(contentFiltered);
    nfGlobal.updateUI(contentFiltered);
  };

  function filterByContent(harWithContent) {

    var filterText = document.getElementById('filterByContent').value.toLowerCase();

    if (filterText.length < 3) {
      return harWithContent;
    }

    return harWithContent.filter(function (entry) {
      return entry.lowerCaseBody && entry.lowerCaseBody.includes(filterText);
    })
  }

  function filterByOther(contentFiltered) {

    var filterText = document.getElementById('filterByOtherInfo').value.toLowerCase();

    if (filterText.length < 3) {
      return contentFiltered;
    }


    return contentFiltered.filter(function (entry) {

      return entry.response.status.toString().indexOf(filterText) !== -1 ||
        entry.request.url.toLowerCase().indexOf(filterText) !== -1 ||
        entry.response.content.mimeType.toLowerCase().indexOf(filterText) !== -1 ||
        entry.startedDateTime.toString().toLowerCase().indexOf(filterText) !== -1 ||
        (entry.request.postData && entry.request.postData.text && entry.request.postData.text.toLowerCase().indexOf(filterText) !== -1);
    })
  }

  function filterByMinMax(contentFiltered) {
    var min = document.getElementById('min').value;
    var max = document.getElementById('max').value;

    return contentFiltered.filter(function (entry) {
      return  !(
      (min && entry.responseBody && min > entry.responseBody.length) ||
      (max && entry.responseBody && max < entry.responseBody.length)
      );
    })
  }
})();