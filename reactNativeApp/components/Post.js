import React, { memo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';

const Post = ({ item, setShowComments, setCurrentComments, updatePost, setCurrentPost }) => {
  
    const handleCommentsClick=(item)=>{
        setShowComments(true);
        setCurrentComments(item.comments)
        setCurrentPost(item);
    }

    const updateNumHugs = async (hugs, title) => {
        try {
            const updatedPost = await updateHugCount(title, hugs + 1);

            if (updatedPost) {
                //  item.num_hugs = updatedPost.num_hugs;
                updatePost(updatedPost, updatedPost.num_hugs)
                 
            }
        } catch (error) {
            console.error('Error updating hug count:', error);
        }
    };

    

    return (
        <View style={styles.post}>
            <Text style={styles.postTitle}>{item.title}</Text>

            <MaskedView
                style={{ height: 122 }}
                maskElement={
                    <Text style={styles.postDescription} numberOfLines={5} ellipsizeMode="clip">
                        <Text style={styles.boldText}>Patient Description: </Text>
                        {item.patient_description}
                    </Text>
                }
            >
                <LinearGradient
                    colors={['#8c8c8c', '#8c8c8c', '#8c8c8c', '#8c8c8c', '#8c8c8c', '#fafafa']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    style={{ flex: 1 }}
                />
            </MaskedView>

            <View style={styles.actionsPanel}>
                <TouchableOpacity style={styles.panel} onPress={() => updateNumHugs(item.num_hugs, item.title)}>
                    <FontAwesome name="heart" size={18} color="#da6a8a" />
                    <Text style={styles.hugs}>{item.num_hugs} Hugs</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.panel} onPress={() => handleCommentsClick(item)}>
                    <FontAwesome name="comment" size={18} color="#b0b0b0" />
                    <Text style={styles.comments}>{Object.keys(item.comments).length} Comments</Text>
                </TouchableOpacity>
                
                <View style={styles.panel}>
                    <FontAwesome name="bookmark" size={18} color="#b0b0b0" />
                    <Text style={styles.comments}> Save</Text>
                </View>
            </View>

            
        </View>
    );
};

export default memo(Post);

const styles = StyleSheet.create({
    post: {
        padding: 30,
        marginHorizontal: 20,
        borderRadius: 10,
        marginTop: 0,
        marginBottom: 20,
        backgroundColor: '#fff',

    },
    postTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#5a5a5a',
        letterSpacing: 0.5
    },
    boldText: {
        fontWeight: 'bold',
    },
    postDescription: {
        marginTop: 5,
        fontSize: 16,
        lineHeight: 22,
        fontWeight: '600'

    },actionsPanel: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    panel:{
        flexDirection: 'row',
        alignItems: 'center',
      
    },
    hugs: {
        color: '#da6a8a',
        fontWeight: 'bold',
        paddingVertical: 20,
        marginHorizontal: 5
    },
    comments: {
        color: '#b0b0b0',
        fontWeight: 'bold',
        paddingVertical: 20,
        marginHorizontal: 5
    }
})
