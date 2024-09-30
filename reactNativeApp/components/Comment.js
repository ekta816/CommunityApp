import React, { memo, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Button } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const CommentItem = memo(({ comment }) => {

  
    const getReplies = (comment) => {
        return (
            
            <View key={comment.text} style={styles.comment}>
                <Text style={styles.commenter}>{comment.display_name}:</Text>
                <Text>{comment.text}</Text>
                <View style={styles.actionsPanel}>
                    <View style={styles.panel}>
                        <FontAwesome name="heart" size={18} color="#da6a8a" />
                        <Text style={styles.hugs}>{comment.num_hugs} Hugs</Text>
                    </View>
                    
                    
                    <TouchableOpacity style={styles.panel}>
                        <FontAwesome name="comment" size={18} color="#b0b0b0" />
                        <Text style={styles.comments}>Reply</Text>
                    </TouchableOpacity>
                </View>
              
                {
                    comment.replies !== undefined && comment.replies.length > 0
                    ? comment.replies.map(reply => getReplies(reply))
                    : null
                }
            </View>
        );
    };
  
  return (
    <>
      {getReplies(comment)}
      
    </>
  );
});

export default CommentItem;

const styles = StyleSheet.create({
  comment: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10,
    margin: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  commenter: {
    fontWeight: 'bold',
  },
  actionsPanel: {
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    panel:{
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 5,
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
});
