function getDays(inDate) {
  var now = new Date();
  var days = Math.floor((now - inDate) / 1000 / 60 / 60 / 24);
  if (days == 0) days = "Today";
  else if (days == 1) days = "1 day ago";
  else days = days + " days ago"
  return days;
};

function getHeat(inVotes) {
  if (inVotes < 2) {
    return "hot0";
  } else if (inVotes < 5) {
    return "hot1";
  } else if (inVotes < 10) {
    return "hot2";
  } else if (inVotes < 15) {
    return "hot3";
  } else if (inVotes < 20) {
    return "hot4";
  } else if (inVotes < 25) {
    return "hot5";
  } else {
    return "hot6";
  }
}

function getNews() {
  var promise = $.getJSON("http://www.freecodecamp.com/news/hot");
  promise.done(function(json) {
    var objArr = []
    $(json).each(function(idx, obj) {
      var dat = {
        hl: obj.headline,
        link: obj.link,
        imageLink: obj.image,
        meta: obj.metaDescription,
        poster: obj.upVotes[0].upVotedByUsername,
        posted: obj.timePosted,
        upvotes: obj.rank,
      }
      dat["days"] = getDays(dat.posted);
      dat["heat"] = getHeat(parseInt(dat.upvotes));
      objArr.push(dat);

    });
    var n = objArr.length;
    for (var i = 0; i < n; i++) {
      //'<img src="' + objArr[i].imageLink + '"/>' +
      $(".listing").append('<article class="' + objArr[i].heat + '">' +
        '<img class="lazy" data-original="' + objArr[i].imageLink + '"/>' +
        '<div>' + objArr[i].days + '</div>' +
        '<div>' + objArr[i].upvotes + ' Upvotes</div>' +
        '<div>Posted by: ' + objArr[i].poster + '</div>' +
        '<h2>' + objArr[i].hl + '</h2>' +
        '<p>' + objArr[i].meta + '</p>' +
        '<a href="' + objArr[i].link + '">Read More</a>' +
        '</article>')
    }
    
    $(".lazy").lazyload({
         effect : "fadeIn"
     });
  });
  
  
  
  promise.fail(function() {
    $('body').append('<p>Oh no, something went wrong!</p>');
  });
};

function main() {
  getNews();
};

$('document').ready(main);