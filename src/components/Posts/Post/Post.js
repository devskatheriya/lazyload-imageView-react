import React, { Component } from "react";
import "./Post.css";
import LazyLoad from "react-lazy-load";
// import { Card, Button } from "react-bootstrap";

class Post extends Component {
  invisiblethumbnail = id => {
    if (document.getElementById(id) !== null) {
      document.getElementById(id).remove();
    }
  };
  render() {
    return (
      <div className="block">
        {/* <div className=""> */}
        <img
          id={this.props.id}
          className="post-image"
          src={this.props.thumbnailUrl}
          alt="thumnail"
        />
        <LazyLoad
          className="post-image float-left"
          onContentVisible={() => this.invisiblethumbnail(this.props.id)}
          placeholder={
            <img
              width="20px"
              height="40px"
              className="post-image "
              src={this.props.thumbnailUrl}
              alt="albumImage"
            />
          }
        >
          <img
            // className={console.log("a")}
            src={this.props.url}
            // className="post-image"
            alt="albumImage"
          />
        </LazyLoad>
        {/* </div> */}
        <div className="post-image-info float-right">
          <h5 className="post-title">{this.props.title}</h5>
        </div>
      </div>
    );
  }
}

export default Post;
