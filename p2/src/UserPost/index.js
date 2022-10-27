import React, { useState, useEffect } from "react";
import { Button, Card, Input, Space } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPost, deletePost } from "../redux/features/postSlice";
import LoadingCard from "./LoadingCard";



const Home = () => {
  const [id, setId] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { post, loading } = useSelector((state) => ({ ...state.app }));

  const fetchUserPost = () => {
    if (!id || id.length === 0) {
      window.alert("please provide an Id");
    } else {
      dispatch(getPost({ id }));
      setId("");
    }
  };

  return (
    <div className="container">
      <h1 style={{ textAlign: "center" }}>Fetch Post</h1>
      <Input
        placeholder="Enter User Id"
        type="number"
        onChange={(e) => setId(e.target.value)}
        value={id}
        style={{ width: "300px" }}
      />
      <br />
      <br />
      <Space size="small" style={{ margin: 10 }}>
        <Button type="primary" onClick={fetchUserPost}>
          Fetch User Post
        </Button>
        <Button type="primary" onClick={() => navigate("/createPost")}>
          Create User Post
        </Button>
      </Space>
      <br />
      <br />
      {loading ? (
        <LoadingCard count={1} />
      ) : (
        <>
          {post.length > 0 && (
            <div className="site-card-border-less-wrapper">
              <Card type="inner" title={post[0].title}>
                <p>user ids : {post[0].id}</p>
                <span>{post[0].body}</span>
              </Card>
              <Space size="middle" style={{marginTop:35, marginLeft:5, float:"right"}}>
                <Button style={{cursor:"pointer"}} type="primary" danger onClick={dispatch(()=>deletePost({id}))}>Delete</Button>
                <Button style={{cursor:"pointer"}} type="primary">Edit</Button>
              </Space>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Home;
