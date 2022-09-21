/*
 * @Author       : zhaixiaowei@xdf.cn
 * @Date         : 2022-09-19 10:56:40
 * @LastEditors  : zhaixiaowei@xdf.cn
 * @LastEditTime : 2022-09-19 11:05:49
 * @Description  : 描述信息
 */
// 'use strict';

const e = React.createElement;

// import { useState } from "react";
const InitialData = [{ name: "歌名1", id: 1, isComplete: false }];

const HookUseStateCpn = () => {
  const [songState, setSongState] = useState(InitialData);
  const [songName, setSongName] = useState("");
  const setName = (e) => {
    setSongName(e.target.value);
  };
  /**
   * 添加歌曲处理
   */
  const handleAddSong = () => {
    const newData = songState.concat({
      name: songName,
      id: songState.length + 1,
      isComplete: false,
    });
    setSongState(newData);
    setSongName("");
  };
  /**
   * 删除歌曲处理
   * @param {*} id 歌曲 id
   */
  const handleDeleteSong = (id) => {
    const newData = songState.filter((item) => item.id !== id);
    setSongState(newData);
  };
  /**
   * 编辑歌曲处理
   * @param {*} id 歌曲id
   */
  const handleEditSong = (id) => {
    const newData = songState.map((item, index) => {
      if (item.id === id) item.isComplete = !item.isComplete;
      return item;
    });
    setSongState(newData);
  };
  return (
    <div>
      <List
        songState={songState}
        handleDeleteSong={handleDeleteSong}
        handleEditSong={handleEditSong}
      />
      <AddItem
        setName={setName}
        handleAddSong={handleAddSong}
        songName={songName}
      />
    </div>
  );
};

// 子组件 AddItem
const AddItem = ({ setName, handleAddSong, songName }) => {
  return (
    <div>
      <input onChange={(e) => setName(e)} value={songName}></input>
      <button onClick={(e) => handleAddSong(e)}>添加</button>
    </div>
  );
};

// 子组件 List
const List = ({ songState, handleDeleteSong, handleEditSong }) => {
  return (
    <div>
      <h1>最喜欢的歌</h1>
      {songState.map((song) => {
        return (
          <div key={song.id}>
            <h4
              style={{
                textDecoration: song.isComplete ? "line-through" : "none",
              }}
            >
              {song.name} -- {song.id}{" "}
              <button onClick={() => handleEditSong(song.id)}>
                {song.isComplete ? "撤销完成" : "完成"}
              </button>
              <button onClick={() => handleDeleteSong(song.id)}>删除</button>
            </h4>
          </div>
        );
      })}
    </div>
  );
};

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<HookUseStateCpn />);