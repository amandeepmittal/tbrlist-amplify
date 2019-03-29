import React from 'react';
import { StyleSheet, Text, TextInput, Button, View } from 'react-native';

export default class App extends React.Component {
	state = {
		title: '',
		author: '',
		books: []
	};

	onChangeText = (key, val) => {
		this.setState({ [key]: val });
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
				<Button
					onPress={() => alert('Success!')}
					title="Add to TBR"
					color="#eeaa55"
				/>
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
	}
});
