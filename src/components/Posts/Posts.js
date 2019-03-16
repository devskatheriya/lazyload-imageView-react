import React, { Component } from "react";
import axios from "axios";
import Post from "../Posts/Post/Post";
import "./Posts.css";
import { Navbar, Form, Button, FormControl } from "react-bootstrap";

class Posts extends Component {
  state = {
    postsData: [],
    postId: null,
    filterTitle: "",
    filterPosts: null,
    selectedPost: []
  };

  componentDidMount() {
    axios
      .get("https://jsonplaceholder.typicode.com/photos?_limit=50")
      .then(response => {
        // console.log(typeof response.data);
        // const {apidata}={...response.data,};

        this.setState({
          postsData: response.data
        });
      });
  }
  deleteHandler = () => {
    const postsArray = Object.values(this.state.postsData);
    this.state.selectedPost.map(post => {
      const postIndex = postsArray.indexOf(post);
      postsArray.splice(postIndex, 1);
      return true;
    });

    this.setState({ postsData: postsArray, selectedPost: [] });
  };
  inputChangeHandler = target => {
    if (target.value.length >= 3) {
      this.setState({ filterTitle: target.value });
    } else {
      this.setState({ filterTitle: "" });
    }
    // console.log(this.state.filterTitle.length);
  };
  myclickhandler = post => {
    // console.log(post);
    const selectedPost = this.state.selectedPost;
    selectedPost.push(post);
    this.setState({ selectedPost: selectedPost });
    console.log(this.state.selectedPost);
  };

  render() {
    let filterPosts;
    if (this.state.postsData !== null) {
      if (this.state.filterTitle.length >= 3) {
        filterPosts = Object.values(this.state.postsData).filter(post =>
          post.title.includes(this.state.filterTitle)
        );
      } else {
        filterPosts = this.state.postsData;
      }
      //   this.setState({ filterPosts: filterPosts });
      filterPosts = Object.values(filterPosts).map(post => {
        return (
          <Post
            key={post.id}
            id={post.id}
            title={post.title}
            thumbnailUrl={post.thumbnailUrl}
            url={post.url}
            albumId={post.albumId}
            clicked={() => this.myclickhandler(post)}
          />
        );
      });
    }

    return (
      <div className="post-conatiner">
        <Navbar bg="dark">
          <Form inline>
            <FormControl
              type="text"
              placeholder="Search"
              className="float-left"
              onChange={event => this.inputChangeHandler(event.target)}
            />
            <Button
              onClick={this.deleteHandler}
              variant="outline-danger"
              className="float-right"
              style={{
                visibility:
                  this.state.selectedPost.length > 0 ? "visible" : "collapse"
              }}
            >
              Delete
            </Button>
          </Form>
        </Navbar>
        {filterPosts}
      </div>
    );
  }
}

export default Posts;
