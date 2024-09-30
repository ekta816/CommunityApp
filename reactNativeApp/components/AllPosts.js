import React, { useState, useEffect } from 'react';
import { StyleSheet,Text, View, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { getPosts } from '../services/PostService';
import Post from './Post';
import Comments from './Comments';
import { addComment } from '../services/PostService';


export default function AllPosts() {
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [showComments, setShowComments] = useState(false);
    const [currentComments, setCurrentComments] = useState({});
    const [currentPost, setCurrentPost] = useState({});
    

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const data = await getPosts(page);
                setPosts((prevPosts) => [...prevPosts, ...data]);
            
            } catch (error) {
                console.error("Error fetching posts:", error);
            } finally {
                setLoading(false);
            }
        };
        setLoading(true);


        fetchPosts();

    }, [page]);
    
    const loadMorePosts = () => {
        if (!isLoadingMore) {
            setIsLoadingMore(true);
            setPage((prevPage) => prevPage + 1);
            setIsLoadingMore(false);
        }
    };

    const renderFooter = () => {
        if (!isLoadingMore) return null;
        return (
            <View style={styles.footer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    };

    const updatePost = (item, num_hugs) => {
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post.title === item.title ? { ...post, num_hugs } : post
          )
        );
      };

      const updateComments = async (text) => {
        try {
            const result = await addComment(currentPost.title, text, null);
        
            if (!result) {
              throw new Error('Failed to update comments');
            }
        
            const newCommentId = Object.keys(currentComments).length + 1;
            const newComment = {
              id: newCommentId,
              parent_id: null, 
              display_name: 'New User',
              num_hugs: 0,
              text: text,
              created_at: new Date().toISOString(),
            };
        
            setCurrentComments((prevComments) => ({
              ...prevComments,
              [newCommentId]: newComment,
            }));
        
            return result;
          } catch (error) {
            console.error('Error updating comments:', error.message);
            return null;
          }
    };
    
    return (
        <View style={styles.container}>
           
            {
                showComments?
               <Comments 
               setShowComments={setShowComments} 
               comments={currentComments}
               updateComments={updateComments}
               />
                :
                <View style={styles.postContainer}>
                 <FlatList
                data={posts}
               
                renderItem={({ item }) => 
                <Post 
                item={item} 
                setShowComments={setShowComments} 
                setCurrentComments={setCurrentComments}
                setCurrentPost={setCurrentPost}
                updatePost={updatePost}
                />}
                keyExtractor={(item,index) => index}
                onEndReached={loadMorePosts}
                onEndReachedThreshold={0.5}
                initialNumToRender={5}
                windowSize={10}
                removeClippedSubviews={true}
                ListFooterComponent={renderFooter}
                />
                     {loading && <ActivityIndicator size="large" color="#6cb0ee" />}
                </View>
            }
            
           

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e9f0f9',
        alignItems: 'center',
        justifyContent: 'center',
        // paddingVertical: 10,
        borderRadius: 5,
    },
    postContainer: {
        marginTop: 20
    },
    post: {
        padding: 30,
        
        borderRadius: 10,
        marginHorizontal: 20,
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
    },
    footer: {
        padding: 20,
        alignItems: 'center',
    }
});
