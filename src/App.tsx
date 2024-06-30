import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import { Login } from "pages/Login";
import { useNavigate } from "react-router-dom";
import { Header } from "components/Header";
import { Signup } from "pages/Signup";
import { Main } from "pages/Main";
import { Board } from "pages/Board";
import { BoardDetail } from "pages/Board/boardDetail";
import { Write } from "pages/Board/write";
import { BoardUpdate } from "pages/Board/update";
import { MatchingDetail } from "pages/Matching/matchingDetail";
import { MatchingWrite } from "pages/Matching/matchingWrite";
import { MessageList } from "pages/Message/messageList";
import { MessageDetail } from "pages/Message/messageDetail";
import { Mypage } from "pages/Mypage";
import { MessageWrite } from "pages/Message/messageWrite";
import { FAQList } from "pages/FAQ";
import { faQuestion } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/sign-up" element={<Signup />}></Route>
        <Route path="/mypage" element={<Mypage />}></Route>
        <Route path="/board" element={<Board />}></Route>
        <Route path="/board/:boardId" element={<BoardDetail />}></Route>
        <Route path="/board/modify/:boardId" element={<BoardUpdate />}></Route>
        <Route path="/board/write" element={<Write />}></Route>
        <Route path="/matching" element={<MatchingDetail />}></Route>
        <Route
          path="/matching/:activityId"
          element={<MatchingDetail />}
        ></Route>
        <Route path="/matching/write" element={<MatchingWrite />}></Route>
        <Route path="/message" element={<MessageList />}></Route>
        <Route path="/message/:messageId" element={<MessageDetail />}></Route>
        <Route path="/message/write" element={<MessageWrite />}></Route>
        <Route path="/FAQ" element={<FAQList />}></Route>
      </Routes>
      <Link to={"/FAQ"}>
        <div className="bg-orange-300 py-5 px-7 shadow-lg rounded-full absolute right-5 bottom-5">
          <FontAwesomeIcon icon={faQuestion} className="text-white" />
        </div>
      </Link>
    </div>
  );
}

export default App;
