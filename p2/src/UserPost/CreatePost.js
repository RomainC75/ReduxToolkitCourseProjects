import React, { useState } from "react";
import { Input, Button, Card, Space } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createPost } from "../redux/features/postSlice";
import LoadingCard from "./LoadingCard";

const CreatePost = () => {
  const [values, setValues] = useState({ title: "", body: "" });
  const [showPost, setShowPost] = useState(false);
  const { title, body } = values;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { post, loading } = useSelector((state) => ({ ...state.app }));

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createPost(values));
    setValues({ title: "", body: "" });
    setShowPost(true);
  };

  const showPostBlog = () => {
    console.log("==> object : " , post[0])
    return (
      <>
        {loading ? (
          <LoadingCard count={1} />
        ) : (
          <div className="site-card-border-less-wrapper">
            <Card type="inner" title={post[0].title}>
              <p>user id : {post[0].id}</p>
              <span>{post[0].body}</span>
            </Card>
          </div>
        )}
      </>
    );
  };

  return (
    <div>
      <h2>Create Post</h2>
      <form onSubmit={handleSubmit}>
        <Input
          placeholder="Enter title"
          type="text"
          onChange={(e) => setValues({ ...values, title: e.target.value })}
          value={values.title}
          style={{ width: "400px" }}
        />
        <br />
        <br />
        <Input.TextArea
          placeholder="Enter body"
          type="text"
          onChange={(e) => setValues({ ...values, body: e.target.value })}
          value={values.body}
          style={{ width: "400px" }}
          size="large"
        />
        <br />
        <br />
        <Space style={{ margin: 10 }}>
          <Button onClick={() => navigate("/")}>Go back</Button>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Space>
      </form>
      {showPost && <div>{showPostBlog()}</div>}
    </div>
  );
};

export default CreatePost;
