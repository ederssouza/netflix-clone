# TMDB

## API Key (v3 auth)

[TMDB API](https://www.themoviedb.org/settings/api)

## Language

[Languages](https://developers.themoviedb.org/3/getting-started/languages)

```js
https://api.themoviedb.org/3/movie/76341?api_key=1b3bad76a1667764e0d3de754015c635&language=pt-BR
```

## Images

[Images](https://developers.themoviedb.org/3/getting-started/images)

## Movies grid

### Originais Netflix
https://api.themoviedb.org/3/discover/tv?api_key=1b3bad76a1667764e0d3de754015c635&language=pt-BR&with_network=213

### Recomendados para você
https://api.themoviedb.org/3/trending/all/week?api_key=1b3bad76a1667764e0d3de754015c635&language=pt-BR

### Top rated
https://api.themoviedb.org/3/movie/top_rated?api_key=1b3bad76a1667764e0d3de754015c635&language=pt-BR
https://api.themoviedb.org/3/tv/top_rated?api_key=1b3bad76a1667764e0d3de754015c635&language=pt-BR

### Genres list
https://api.themoviedb.org/3/genre/movie/list?api_key=1b3bad76a1667764e0d3de754015c635&language=pt-BR
https://api.themoviedb.org/3/genre/tv/list?api_key=1b3bad76a1667764e0d3de754015c635&language=pt-BR

### List by genre
https://api.themoviedb.org/3/discover/movie?api_key=1b3bad76a1667764e0d3de754015c635&language=pt-BR&with_genres=99

```js
/**
 * https://image.tmdb.org/t/p/${size}/${id}.jpg
 *
 * "backdrop_sizes": [ "w300", "w780", "w1280", "original"],
 * "logo_sizes": [ "w45", "w92", "w154", "w185", "w300", "w500", "original"],
 * "poster_sizes": [ "w92", "w154", "w185", "w342", "w500", "w780", "original"],
 * "profile_sizes": [ "w45", "w185", "h632", "original"],
 * "still_sizes": [ "w92", "w185", "w300", "original"]
*/

https://api.themoviedb.org/3/movie/76341?api_key=1b3bad76a1667764e0d3de754015c635&language=pt-BR
```

## Genres

```js
// Movies (https://developers.themoviedb.org/3/genres/get-movie-list)
https://api.themoviedb.org/3/genre/movie/list?api_key=1b3bad76a1667764e0d3de754015c635&language=pt-BR
https://api.themoviedb.org/3/movie/${movie_id}?api_key=1b3bad76a1667764e0d3de754015c635&language=en-US

// TV Show (https://developers.themoviedb.org/3/genres/get-tv-list)
https://api.themoviedb.org/3/genre/tv/list?api_key=1b3bad76a1667764e0d3de754015c635&language=pt-BR
```

## TV Show

```js
// Popular (https://developers.themoviedb.org/3/tv/get-popular-tv-shows)
https://api.themoviedb.org/3/tv/popular?api_key=1b3bad76a1667764e0d3de754015c635&language=en-US&page=1

// Top Rated (https://developers.themoviedb.org/3/tv/get-top-rated-tv)
https://api.themoviedb.org/3/tv/top_rated?api_key=1b3bad76a1667764e0d3de754015c635&language=en-US&page=1

https://api.themoviedb.org/3/tv/popular?api_key=1b3bad76a1667764e0d3de754015c635&language=pt-BR&page=1
https://api.themoviedb.org/3/tv/91363?api_key=1b3bad76a1667764e0d3de754015c635&language=pt-BR
```

## Busca

```js
// Search (https://developers.themoviedb.org/3/search/multi-search)
https://api.themoviedb.org/3/search/multi?api_key=1b3bad76a1667764e0d3de754015c635&language=en-US&query=dead&page=1&include_adult=false
```

## Trailer

https://api.themoviedb.org/3/movie/297762/videos?api_key=1b3bad76a1667764e0d3de754015c635