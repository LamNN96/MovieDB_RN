import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styles from '../themes/default/styles';

export default class ItemSearch extends PureComponent {
    render() {
        const { poster_path, release_date, vote_average, title } = this.props.item;
        return (
            <TouchableOpacity style={styles.itemSearchContainer}>
                <View>
                    <Image
                        style={styles.imagePoster}
                        source={{
                            uri: `https://image.tmdb.org/t/p/w500/${poster_path}`
                        }}
                    />
                </View>
                <View>
                    <Text>{title}</Text>
                    <Text>Rate: {vote_average}</Text>
                    <Text>Release date: {release_date}</Text>
                    <Text>FANTASY</Text>
                </View>
            </TouchableOpacity>
        );
    }
}
