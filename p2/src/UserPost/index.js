import React, { useState, useEffect } from "react";
import { Button, Card, Input, Space } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPost, deletePost, setEdit, updatePost } from "../redux/features/postSlice";
import LoadingCard from "./LoadingCard";

const Home = () => {
  const [id, setId] = useState(null);
  const [bodyText, setBodyText] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { post, loading, body, edit } = useSelector((state) => ({
    ...state.app,
  }));

  useEffect(() => {
    if (body) {
      setBodyText(body);
    }
  }, [body]);

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
                {edit ? (
                  <>
                    <Input.TextArea
                      rows={4}
                      value={body}
                      onChange={(e) => setBodyText(e.target.value)}
                    />
                    <Space
                      size="middle"
                      style={{ marginTop: 5, marginLeft: 5 }}
                    >
                      <Button type="primary" onClick={()=> {
                        dispatch(updatePost({
                          id:post[0].id,
                          title:post[0].title,
                          body: bodyText
                        }))
                        dispatch(setEdit({edit:false, body:""}))
                      }}>Save</Button>
                      <Button onClick={()=> dispatch(setEdit({edit:false, body:""}))}>Cancel</Button>
                    </Space>
                  </>
                ) : (
                  <span>{post[0].body}</span>
                )}
              </Card>
              <Space
                size="middle"
                style={{ marginTop: 35, marginLeft: 5, float: "right" }}
              >
                <Button
                  style={{ cursor: "pointer" }}
                  type="primary"
                  danger
                  onClick={dispatch(() => deletePost({ id: post[0].id }))}
                >Delete</Button>
                <Button
                  style={{ cursor: "pointer" }}
                  type="primary"
                  onClick={() =>
                    dispatch(setEdit({ edit: true, body: post[0].body }))}
                >Edit</Button>
              </Space>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Home;
