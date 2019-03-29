import React from 'react';
import { StyleSheet, Text, TextInput, Button, View } from 'react-native';

import Amplify from 'aws-amplify';
import config from './aws-exports';
Amplify.configure(config);

import { API, graphqlOperation } from 'aws-amplify';

const ListBooks = `
query {
  listBooks {
    items {
      id title author
    }
  }
}
`;

const AddBook = `
mutation ($title: String! $author: String) {
  createBook(input: {
    title: $title
    author: $author
  }) {
    id title author
  }
}
`;

export default class App extends React.Component {
	state = {
		title: '',
		author: '',
		books: []
	};

	async componentDidMount() {
		try {
			const books = await API.graphql(graphqlOperation(ListBooks));
			console.log('books: ', books);
			this.setState({ books: books.data.listBooks.items });
		} catch (err) {
			console.log('error: ', err);
		}
	}

	onChangeText = (key, val) => {
		this.setState({ [key]: val });
	};

	addBook = async () => {
		if (this.state.title === '' || this.state.author === '') return;

		const book = { title: this.state.title, author: this.state.author };

		try {
			const books = [...this.state.books, book];
			this.setState({ books, title: '', author: '' });
			console.log('books: ', books);

			await API.graphql(graphqlOperation(AddBook, book));
			console.log('success');
		} catch (err) {
			console.log('error: ', err);
		}
	};

	render() {
		return (
			<View style={styles.container}>
				<TextInput
					style={styles.input}
					value={this.state.title}
					onChangeText={val => this.onChangeText('title', val)}
					placeholder="What do you want to read?"
				/>
				<TextInput
					style={styles.input}
					value={this.state.author}
					onChangeText={val => this.onChangeText('author', val)}
					placeholder="Who wrote it?"
				/>
				<Button onPress={this.addBook} title="Add to TBR" color="#eeaa55" />
				{this.state.books.map((book, index) => (
					<View key={index} style={styles.book}>
						<Text style={styles.title}>{book.title}</Text>
						<Text style={styles.author}>{book.author}</Text>
					</View>
				))}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		paddingHorizontal: 10,
		paddingTop: 50
	},
	input: {
		height: 50,
		borderBottomWidth: 2,
		borderBottomColor: 'blue',
		marginVertical: 10
	},
	book: {
		borderBottomWidth: 1,
		borderBottomColor: '#ddd',
		paddingVertical: 10
	},
	title: { fontSize: 16 },
	author: { color: 'rgba(0, 0, 0, .5)' }
});
