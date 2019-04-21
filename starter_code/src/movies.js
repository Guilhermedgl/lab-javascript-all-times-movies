var movies = [
  {
    title: 'The Shawshank Redemption',
    year: '1994',
    director: 'Frank Darabont',
    duration: '2h 22min',
    genre: ['Crime', 'Drama'],
    rate: '9.3'
  },
  {
    title: 'The Godfather',
    year: '1972',
    director: 'Francis Ford Coppola',
    duration: '2h 55min',
    genre: ['Crime', 'Drama'],
    rate: '9.2'
  },
  {
    title: 'The Godfather: Part II',
    year: '1974',
    director: 'Francis Ford Coppola',
    duration: '3h 22min',
    genre: ['Crime', 'Drama'],
    rate: '9.0'
  },
  {
    title: 'The Dark Knight',
    year: '2008',
    director: 'Christopher Nolan',
    duration: '2h 32min',
    genre: ['Action', 'Crime', 'Drama', 'Thriller'],
    rate: '9.0'
  },
  {
    title: '12 Angry Men',
    year: '1957',
    director: 'Sidney Lumet',
    duration: '1h 36min',
    genre: ['Crime', 'Drama'],
    rate: '8.9'
  },
  {
    title: 'Schindler\'s List',
    year: '1993',
    director: 'Steven Spielberg',
    duration: '3h 15min',
    genre: ['Biography', 'Drama', 'History'],
    rate: '8.9'
  },
  {
    title: 'Pulp Fiction',
    year: '1994',
    director: 'Quentin Tarantino',
    duration: '2h 34min',
    genre: ['Crime', 'Drama'],
    rate: '8.9'
  },
  {
    title: 'The Lord of the Rings: The Return of the King',
    year: '2003',
    director: 'Peter Jackson',
    duration: '3h 21min',
    genre: ['Adventure', 'Drama', 'Fantasy'],
    rate: '8.9'
  },
  {
    title: 'Il buono, il brutto, il cattivo',
    year: '1966',
    director: 'Sergio Leone',
    duration: '3h 2min',
    genre: ['Western'],
    rate: '8.9'
  },
  {
    title: 'Fight Club',
    year: '1999',
    director: 'David Fincher',
    duration: '2h 19min',
    genre: ['Drama'],
    rate: '8.8'
  },
  {
    title: 'The Lord of the Rings: The Fellowship of the Ring',
    year: '2001',
    director: 'Peter Jackson',
    duration: '2h 58min',
    genre: ['Adventure', 'Drama', 'Fantasy'],
    rate: '8.8'
  }];

function turnHoursToMinutes(moviesArray) {
  return moviesArray.map(elem => {
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
console.log(turnHoursToMinutes(movies));

Get the average of all rates with 2 decimals
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
