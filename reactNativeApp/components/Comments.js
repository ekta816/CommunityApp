import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, TextInput, Button, ActivityIndicator, TouchableOpacity, Dimensions } from 'react-native';
import Comment from './Comment';

export default function Comments({comments,setShowComments, updateComments }) {
  const [commentText, setCommentText] = useState('');

  const commentsArray = Object.values(comments);

  const organizeComments = (comments) => {
    const tempCommentsArray = Object.values(comments);
    const rootComments = [];

    tempCommentsArray.forEach(comment => {
        if (comment.parent_id !== null) {
            const parentComment = tempCommentsArray[comment.parent_id - 1];
            if (!parentComment.replies) {
                parentComment.replies = [];
            }
            parentComment.replies.push(comment);
        } else {
            rootComments.push(comment);
        }
    });

    return rootComments; 
};

  const organizedComments = organizeComments(comments);

  const handleAddComment = () => {
    if (commentText.trim() === '') {
      alert('Comment cannot be empty');
      return;
    }

    // const newComment = {
    //   id: commentsArray.length + 1,
    //   parent_id: null,
    //   display_name: 'New User',
    //   num_hugs: 0,
    //   text: commentText,
    //   created_at: new Date().toISOString(),
    // };

    updateComments(commentText)
    setCommentText('');
  };
 
  return (
    <View style={styles.container}>
     
        <View style={styles.commentHeading}>
        <Text style={styles.commentHeadingText}>{Object.keys(comments).length} Comments</Text>
        <TouchableOpacity onPress={()=>setShowComments(false)}><Text>X</Text></TouchableOpacity>

        </View>
       
        <FlatList
                data={organizedComments}
                renderItem={({ item }) => <Comment comment={item} />}
                keyExtractor={item => item.text.toString()}
            />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add a comment..."
          value={commentText}
          onChangeText={setCommentText}
        />
        <Button title="Comment" style={styles.button}  onPress={handleAddComment} />
      </View>
    </View>
  );
}

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    borderRadius: 5,
    marginBottom:20,
  },
  commentHeading:{
    padding: 25,
    flexDirection: 'row',
    justifyContent: 'space-between', 
    backgroundColor: '#fff', 
    borderTopColor: "#f0f0f0",
    borderTopWidth: 1,
  },
  commentHeadingText: {
    fontSize: 18,
    color: '#949494',
    fontWeight: 'bold',
  },
  comment: {
      padding: 25,
      backgroundColor: "#fff"
  },
  commenter: {
      fontWeight: 'bold',
  },
  replyList: {
      paddingLeft: 16,
  },
  inputContainer: {
    width: screenWidth,
    padding: 10,
    borderTopColor: '#f0f0f0',
    borderTopWidth: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  input: {
    height: 40,
    width: screenWidth-20,
    borderColor: '#ddd',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});
