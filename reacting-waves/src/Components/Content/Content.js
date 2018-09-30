import React, { Component } from 'react';
import firebase from '../../Firebase/firebase.js';
import SearchByTitle from '../Forms/Search.js';
import Comments from '../Comments/Comments.js';

class Content extends Component {
    
    state = {
        entries: {},
        comments: {},
        user: '',
        commentVal: '',
        delComment: '',
        tInput: '',
        showList: [],
        searchEntryList: [],
    }
    
    
    componentDidMount() {
        this.childAdded();
        this.childChanged();
        this.childRemoved();
        
    }
    
    childAdded = () => {
        firebase.database().ref('comments').on('child_added', (snapshot) => {
            let comments = [...this.state.comments];

            let comment = {
                key: snapshot.key,
                value: snapshot.val()
            };
            
            comments.push(comment);

            this.setState({
                comments: comments
            });
        });

        firebase.database().ref('entries').on('child_added', (snapshot) => {
            
            let allEntry = [...this.state.entries];
            
            let addEntry = {
                key: snapshot.key,
                value: snapshot.val()
            };

            allEntry.push(addEntry);
            
            this.setState({
                entries: allEntry
            });
            
        });
        
    }
    
    childRemoved = () => {
        firebase.database().ref('entries').on('child_removed', (snapshot) => {
            let allEntry = [...this.state.entries];  
            
            let filteredEntries = allEntry.filter((item) => {
                return item.key !== snapshot.key;
            });
            
            this.setState({
                entries: filteredEntries,
                searchEntryList: filteredEntries
            });
            
        });
        
        firebase.database().ref('comments').on('child_removed', (snapshot) => {
            let comments = [...this.state.comments];

            let filteredComments = comments.filter((item) => {
                return item.key !== snapshot.key;
            });

            this.setState({
                comments: filteredComments
            });
        });

    }
    
    childChanged = () => {
        firebase.database().ref('comments').on('child_changed', (snapshot) => {
            let comments = [...this.state.comments];
            let updatedComments = comments.map(item => {
                if (item.key === snapshot.key) {
                    return Object.assign({}, item, {
                        value: snapshot.val()
                    });
                } else {
                    return item;
                }
            });
            this.setState({
                comments: updatedComments
            });
        });
    }


    addEntry = () => {
        let currentDate = new Date();
        let userState = firebase.auth().currentUser;
        console.log(userState);
        let pushEntry = {
            Title: this.title.value,
            Content: this.content.value,
            Date: currentDate.toLocaleDateString() + ' @ ' + currentDate.toLocaleTimeString(),
            comments: [],
            createdBy: userState.email
        };
        
        firebase.database().ref('entries').push(pushEntry)
        .then(() => {
            console.log(pushEntry);
            console.log('Pushed to Firebase/entries');
        })
        .catch(error => {
            console.log('messed up', error);
        });
    }
    
    removeEntry = (item) => {
        firebase.database().ref(`entries/${item}`).remove();
        console.log(item , 'Removing');
    }
    
    
    addComment = (id) => {
        let currentDate = new Date();
        let objectToPush = {
            comment: this.state.commentVal,
            commentDate: currentDate.toLocaleDateString() + ' @ ' + currentDate.toLocaleTimeString(),
            createdBy: this.props.user.email
        };
        
        firebase.database().ref(`entries/${id}/comments`).push(objectToPush)
        .then(() => {console.log('Pushed to Firebase/comments');})
        .catch(error => {console.log('messed up', error);});

        this.setState({commentVal : this.comment});
        
    }

    removeComment = (id) => {
        firebase.database().ref(`entries/${id}/comments/${id}`).remove();
        console.log(id , 'Removing');
    }
    

    onChange = (e) => {
        this.setState({commentVal : e.target.value});
    }

    findEntryByInput = (e) => {
        this.setState({ [e.target.name] : e.target.value });
        
    }

    
    showEntryByTitle = (e) => {
        if (e.key === 'Enter') {
  
            let find = this.state.entries.filter(entry => {
                if(entry.value.Title.toLowerCase().includes(this.state.tInput.toLowerCase()) != 0){
                    return  entry.value;      
                }
            }); 
            console.log(this.state.searchEntryList);
            
            this.setState({ searchEntryList : find });
        }
    } 
    
    render() {
        let entryList = [];

        if(this.state.tInput !== ''){
            entryList = [];
            for (let item in this.state.searchEntryList) {
                entryList.push(
                    <div key={item}>
                        <div className="container">
                            <p><span>Title: </span>{this.state.searchEntryList[item].value.Title}</p>
                            <p><span>Content: </span>{this.state.searchEntryList[item].value.Content}</p>
                            <p><span>Date: </span>{this.state.searchEntryList[item].value.Date}</p>
                            <p><span>CreatedBy: </span>{this.state.searchEntryList[item].value.createdBy}</p>
                            <button onClick={() => this.removeEntry(this.state.searchEntryList[item].key)}>Remove Entry!</button>
                         
                            <Comments 
                                id={this.state.searchEntryList[item].key}
                                onSubmit={this.addComment.bind(this)}
                                onChange={this.onChange.bind(this)}
                                commentVal={this.props.commentVal}
                                comments={this.state.searchEntryList[item].value.comments}
                                // removeComment={this.removeComment()}
                            />                            
                        </div>
                    </div>
                    );
            }
        }

        else{
        this.state.searchEntryList = [];
            
        for (let item in this.state.entries) {
            entryList.push(
                <div key={item}>
                    <div className="container">
                        <p><span>Title: </span>{this.state.entries[item].value.Title}</p>
                        <p><span>Content: </span>{this.state.entries[item].value.Content}</p>
                        <p><span>Date: </span>{this.state.entries[item].value.Date}</p>
                        <p><span>CreatedBy: </span>{this.state.entries[item].value.createdBy}</p>
                        <button onClick={() => this.removeEntry(this.state.entries[item].key)}>Remove Entry!</button>

                        <Comments 
                            entryID={this.state.entries[item].key}
                            onSubmit={this.addComment.bind(this)}
                            onChange={this.onChange.bind(this)}
                            commentVal={this.props.commentVal}
                            comments={this.state.entries[item].value.comments}
                            // removeComment={this.removeComment(this.state.comments)}
                        />  
                    </div>
                </div>
                );
            }
        }

            return (
                <div className="entry-form">
                    <SearchByTitle
                    find={this.findEntryByInput.bind(this)} 
                    enter={this.showEntryByTitle}/>

                    <form onSubmit={e => {e.preventDefault();}}>
                    <label>Title: </label>
                    <input type='text' ref={(input) => this.title = input} placeholder="Enter your Title" required/>
                    <label>Content: </label>
                    <input type='text' ref={(input) => this.content = input} placeholder="Enter you Content" required/>
                    <button type="submit" onClick={this.addEntry}>Add Entry</button>
                    </form>
                {entryList}
                
                </div>
                );
            }
            
        }
        
export default Content;