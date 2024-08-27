"use client";
import React, { useEffect, useState } from "react";

async function fetchDataSSR() {
  let response = await fetch("https://jsonplaceholder.typicode.com/posts");
  let data = await response.json();
  return data;
}

export default function Page() {
  const [typeButton, setTypeButton] = useState("ssr");
  const [posts, setPosts] = useState<any>();

  useEffect(() => {
    const getData = async () => {
      let data = await fetchDataSSR();
      setPosts(data);
    };
    getData();
  }, []);

  const fetchDataCSR = async () => {
    setTypeButton("csr");
    try {
      let response = await fetch("https://jsonplaceholder.typicode.com/users");
      let data = await response.json();
      setPosts(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <button onClick={fetchDataCSR} className="bg-gray-600 text-white p-1">
        Refresh
      </button>
      {typeButton === "ssr" ? (
        <ul>
          {posts?.map((item) => (
            <li key={item.id}>
              <b>{item.title}</b>
              <p>{item.body}</p>
            </li>
          ))}
        </ul>
      ) : (
        <div>
          <h1>Danh sách Bài viết với Refresh</h1>
          <ul>
            {posts?.map((item) => (
              <li key={item.id}>
                <b>{item.title}</b>
                <p>{item.body}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
