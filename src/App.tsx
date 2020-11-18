import React, { useState, useEffect } from 'react';
import './App.css';
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';
const ffmpeg = createFFmpeg({ log: true });

function App() {
  const [isReady, setIsReady] = useState(false);
  const [video, setVideo] = useState<File | null>();
  const [gif, setGif] = useState('');

  const load = async () => {
    await ffmpeg.load();
    setIsReady(true);
  };

  const writeFileToMemory = async () => {
    if (video) {
      await ffmpeg.FS('writeFile', video?.name, await fetchFile(video));
    }
  };

  /**
   * helpful Post: https://superuser.com/questions/556029/how-do-i-convert-a-video-to-gif-using-ffmpeg-with-reasonable-quality
   */
  const convertVideoToGif = async () => {
    if (video) {
      await ffmpeg.run(
        '-i',
        video?.name,
        '-t',
        '2.5',
        '-ss',
        '1.0',
        '-f',
        'gif',
        'out.gif',
      );
    }
  };

  const getGifFromFileSystem = async () => {
    const data = await ffmpeg.FS('readFile', 'out.gif');
    return URL.createObjectURL(new Blob([data.buffer], { type: 'image/gif' }));
  };

  const onConvertToGif = async () => {
    await writeFileToMemory();
    await convertVideoToGif();
    const url = await getGifFromFileSystem();
    setGif(url);
  };

  useEffect(() => {
    load();
  }, []);

  return isReady ? (
    <div className="App">
      <h2>Video to Convert:</h2>
      <input type="file" onChange={(e) => setVideo(e.target.files?.item(0))} />

      {video && (
        <video controls width="500px" src={URL.createObjectURL(video)} />
      )}

      <h3>Result:</h3>
      <button onClick={onConvertToGif}>...Convert to GIF...</button>

      {gif && <img src={gif} alt="" width="500px" />}
    </div>
  ) : (
    <p>isLoading...</p>
  );
}

export default App;
