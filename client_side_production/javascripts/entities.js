var requestEntityData;

requestEntityData = function(tweetBody) {
  var body, j, makeHtmlProgress, renderResults;
  makeHtmlProgress = function(label, img, num) {
    var html;
    html = "";
    html += "<div class='chip sml-margin tooltipped' data-tooltip='" + num + " occurrences'>";
    if (img != null) {
      if (img !== '') {
        html += "<img src='" + img + "' />";
      }
    }
    html += "" + label;
    html += "</div>";
    return html;
  };
  renderResults = function(results) {
    var category, i, img, item, j, k, l, len, len1, ref;
    i = 0;
    for (k = 0, len = results.length; k < len; k++) {
      category = results[k];
      i += 1;
      $('#entityResults' + i).append("<h5 class='flow-text'>" + category.name + "</h5>");
      ref = category.items;
      for (l = 0, len1 = ref.length; l < len1; l++) {
        item = ref[l];
        img = item.additional_information.image;
        $('#entityResults' + i).append(makeHtmlProgress(item.normalized_text, img, item.matches.length));
      }
    }
    $('#entityLoader').fadeOut('fast');
    j = 1;
    while (j <= 8) {
      $('#entityResults' + j).slideDown('slow');
      j++;
    }
    $('img').error(function() {
      return $(this).hide();
    });
    return $('.tooltipped').tooltip({
      delay: 50
    });
  };
  j = 1;
  while (j <= 8) {
    $('#entityResults' + j).hide();
    j++;
  }
  body = tweetBody.replace(/[^a-zA-Z ]/g, " ");
  console.log(body);
  return $.post('/api/entity', {
    text: tweetBody
  }, function(results) {
    return renderResults(results);
  });
};

/* (C) Alicia Sykes <aliciasykes.com> MIT License. */