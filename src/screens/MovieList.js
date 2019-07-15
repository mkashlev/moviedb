import React, { Component } from 'react'
import { StyleSheet, Text, View, TextInput, FlatList, Image } from 'react-native'
import { getMovies } from '../Api'
import { TMDB_IMAGE_BASE_URL } from '../constants'

export default class MovieList extends Component {

  constructor(props) {
		super(props)

		this.state = {
      query: '',
      movies: [],
      isLoading: false,
      page: 0
		}
	}

  componentDidMount() {
    this._fetchMovies(this.state.query)
  }

  async _fetchMovies(query) {
    if (!this.state.isLoading) {
      this.setState({isLoading: true})
      const page = this.state.page+1
      movies = await getMovies(query,page)
      if (movies.length > 0) {
        movies = this.state.movies.concat(movies)
        this.setState({movies, page, isLoading: false})
      } else {
        this.setState({isLoading: false})
      }
    }
  }

  _onEndReached = () => {
    this._fetchMovies(this.state.query)
  }

  _onQueryUpdate = (query) => {
    this.setState({movies: [], page: 0, query},() => {
      this._fetchMovies(query)
    })
  }

  _keyExtractor = (item, index) => item.id.toString()

  _renderMovieItem = ({item}) => {
    const imgUrl = TMDB_IMAGE_BASE_URL+'w154'+item['poster_path']
    return (
      <View style={styles.movieItem}>
        <View style={styles.itemImageBox}>
          <Image
            source={{uri: imgUrl}}
            style={styles.itemImg}
            resizeMode="contain"
          />
        </View>
        <View style={styles.itemTitleBox}>
          <Text style={styles.movieTitle}>{item['title']}</Text>
        </View>
      </View>
    )
  }

  render() {
    const body = this.state.movies.length > 0 ?
    (
      <FlatList
        data={this.state.movies}
        renderItem={this._renderMovieItem}
        keyExtractor={this._keyExtractor}
        style={styles.movieList}
        onEndReached={this._onEndReached}
      />
    ) :
    (
      <View style={styles.noMoviesFoundBox}>
        <Text>No Movies Found...</Text>
      </View>
    )
    return (
      <View style={styles.container}>
        <View style={styles.searchBox}>
          <TextInput
            onChangeText={this._onQueryUpdate}
            value={this.state.query}
            placeholder="Enter a Movie"
          />
        </View>
        <View style={styles.movieListContainer}>
          {body}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'space-evenly',
  },
  searchBox: {
    padding: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    margin: 3,
  },
  movieListContainer: {
    flex: 1,
    backgroundColor: '#777'
  },
  movieList: {
    flex: 1,
    backgroundColor: '#fff'
  },
  movieItem: {
    flex: 1,
    backgroundColor: '#eee',
    margin: 5,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },
  itemImageBox: {
    backgroundColor: '#fff',
    height: 100,
    width: 100
  },
  itemTitleBox: {
    backgroundColor: '#fff',
    flex: 1,
    alignItems: 'stretch',
  },
  movieTitle: {
    fontSize: 24,
  },
  itemImg: {
    height: 100,
  },
  noMoviesFoundBox: {
    backgroundColor: '#fff',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
