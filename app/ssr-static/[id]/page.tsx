import Head from "next/head";
import React from "react";

async function getPost(id: string) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  if (!res.ok) {
    throw new Error("Failed to fetch post");
  }
  return res.json();
}

export default async function page({ params }: { params: { id: string } }) {
  const post = await getPost(params.id);
  return (
    <div>
      <Head>
        <title>Chi tiết Bài viết với Static Params</title>
      </Head>
      <b>{post.title}</b>
      <p>{post.body}</p>
    </div>
  );
}
