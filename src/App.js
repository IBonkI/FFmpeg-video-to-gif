import React, { useEffect, useState } from "react";
import "./App.css";
import { createFFmpeg, fetchFile } from "";
// const ffmpeg = createFFmpeg({ log: true });

export default function App() {
  const [ready, setReady] = useState(false);
  const [video, setVideo] = useState();

  // const load = async () => {
  //   await ffmpeg.load();
  //   setReady(true);
  // };

  // useEffect(() => {
  //   load();
  // }, []);

  return (
    <div className="App">
      {video && <video controls width="250" src={URL.createObjectURL(video)} />}
      <input type="file" onChange={(e) => setVideo(e.target.files.item(0))} />
    </div>
  );
}
