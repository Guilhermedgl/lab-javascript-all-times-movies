
function turnHoursToMinutes(moviesArray) {
  return moviesArray.map(function (elem) {
    var hours = 0;
    var minutes = 0;

    if (typeof elem.duration !== 'number') {
      if (elem.duration.indexOf('h') !== -1) {
        hours = parseInt(elem.duration[0], 10) * 60;
      }
      if (elem.duration.indexOf('min') !== -1) {
        minutes = parseInt(
          elem.duration.substring(
            elem.duration.length - 5,
            elem.duration.length - 3
          ),
          10
        );
      }
      return Object.assign({}, elem, { duration: hours + minutes });
    }
    return elem;
  });
}
turnHoursToMinutes(movies);

// Get the average of all rates with 2 decimals
function ratesAverage(moviesArray) {
  var average = 0;

  moviesArray.forEach(function (e) {
    if (e.rate !== '') {
      average += parseFloat(e.rate);
    } else {
      average += 0;
    }
  });

  average = (average / moviesArray.length).toFixed(2);
  return parseFloat(average);
}

// Get the average of Drama Movies
function dramaMoviesRate(moviesArray) {
  var dramaMovies = moviesArray.filter(enterObject);

  function enterObject(e) {
    var g = e.genre;

    for (var i = 0; i < g.length; i++) {
      if (g[i] === 'Drama') {
        return true;
      }
    }
    return false;
  }

  if (dramaMovies.length === 0) {
    return undefined;
  }
  return ratesAverage(dramaMovies);
}

// Order by time duration, in growing order
function orderByDuration(moviesArray) {
  durationArray = turnHoursToMinutes(moviesArray);
  durationArray.sort(compareDuration);

  function compareDuration(obj1, obj2) {
    if (obj1.duration === obj2.duration) {
      if (obj1.title < obj2.title) {
        return -1;
      } if (obj1.title > obj2.title) {
        return 1;
      }
      return 0;
    }
    return obj1.duration - obj2.duration;
  }

  return durationArray;
}

// How many movies did STEVEN SPIELBERG
function howManyMovies(moviesArray) {
  if (moviesArray.length === 0) {
    return undefined;
  }
  var dramaMovies = moviesArray.filter(enterObject);

  function enterObject(e) {
    var g = e.genre;
    var dir = e.director;

    if (dir === 'Steven Spielberg') {
      for (var i = 0; i < g.length; i++) {
        if (g[i] === 'Drama') {
          return true;
        }
      }
      return false;
    }
  }

  var stevenPhrase = 'Steven Spielberg directed ';

  if (dramaMovies.length !== 0) {
    return stevenPhrase + String(dramaMovies.length) + ' drama movies!';
  }
  return stevenPhrase + 0 + ' drama movies!';
}

// Order by title and print the first 20 titles
function orderAlphabetically(moviesArray) {
  moviesArray.sort(compareDuration);

  function compareDuration(obj1, obj2) {
    if (obj1.title < obj2.title) {
      return -1;
    } if (obj1.title > obj2.title) {
      return 1;
    }
    return 0;
  }
  var namesArray = [];
  moviesArray.forEach(function (e) {
    namesArray.push(e.title);
  });

  if (namesArray.length >= 20) {
    return smallArray = namesArray.slice(0, 20);
  }

  return namesArray;
}

// Best yearly rate average
