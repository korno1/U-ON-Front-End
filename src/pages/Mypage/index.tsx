import React, { useState, useRef, useContext } from "react";
import axios from "axios";
import { UserContext } from "contexts/Login";
import { useNavigate } from "react-router-dom";
import { Header } from "components/Header";

export const Mypage = () => {
  const navigate = useNavigate();

  const user = {
    userId: useRef<HTMLInputElement>(null),
    password: useRef<HTMLInputElement>(null),
    name: useRef<HTMLInputElement>(null),
    birth: useRef<HTMLInputElement>(null),
    phone: useRef<HTMLInputElement>(null),
    sidoName: useRef<HTMLSelectElement>(null),
    gugunName: useRef<HTMLSelectElement>(null),
    center: useRef<HTMLInputElement>(null),
  };
  const [idCheck, setIdCheck] = useState(0);

  const sidoList = [
    "강원도",
    "경기도",
    "경상남도",
    "경상북도",
    "광주광역시",
    "대구광역시",
    "대전광역시",
    "부산광역시",
    "서울특별시",
    "세종특별자치시",
    "울산광역시",
    "인천광역시",
    "전라남도",
    "전라북도",
    "제주특별자치도",
    "충청남도",
    "충청북도",
  ];

  const [gugunList, setGugunList] = useState<{ gugunName: string }[]>([]);

  const signUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (idCheck === 1) {
      alert("ID가 중복되었습니다.");
    } else if (idCheck === 0) {
      alert("ID 중복체크를 해주세요.");
    } else {
      try {
        const url = "http://localhost:80/uon/users/sign-up";
        await axios.post(url, {
          userId: user.userId.current?.value,
          password: user.password.current?.value,
          name: user.name.current?.value,
          birth: user.birth.current?.value,
          phone: user.phone.current?.value,
          sidoName: user.sidoName.current?.value,
          gugunName: user.gugunName.current?.value,
          center: user.center.current?.value,
        });
        alert("회원가입에 성공했습니다.");
        navigate("/login");
      } catch (error) {
        alert("회원가입에 실패했습니다.");
      }
    }
  };

  const checkDuplication = async () => {
    const userId = user.userId.current?.value;
    if (userId == "") {
      alert("아이디를 입력해주세요");
      return;
    }
    const url = "http://localhost:80/uon/users/exist/" + userId;

    try {
      await axios.get(url);
      alert("생성 가능");
      setIdCheck(2);
    } catch (error) {
      alert("중복된 ID가 존재합니다.");
      setIdCheck(1);
    }
    console.log(idCheck);
  };

  const resetCheck = () => {
    setIdCheck(0);
    console.log(idCheck);
  };

  const getGugun = async () => {
    const url = "http://localhost:80/uon/locations/guguns";

    const { data } = await axios.get(url, {
      params: {
        sidoName: user.sidoName.current?.value,
      },
    });

    console.log(data);
    setGugunList([]);
    setGugunList(data);
  };

  return (
    <div className="px-10 py-20">
      <h1 className="text-left font-semibold text-lg">내 정보 수정</h1>
      <form onSubmit={signUp}>
        <div className="space-y-6 mt-10 text-left">
          <div>
            <label htmlFor="password" className="text-sm text-gray-500">
              비밀번호 *
            </label>
            <input
              required
              type="password"
              name="password"
              ref={user.password}
              className="bg-gray-100 rounded-md px-3 py-2 w-full"
            />
          </div>
          <div>
            <label htmlFor="name" className="text-sm text-gray-500">
              이름 *
            </label>
            <input
              required
              type="text"
              name="name"
              ref={user.name}
              className="bg-gray-100 rounded-md px-3 py-2 w-full"
            />
          </div>
          <div>
            <label htmlFor="birth" className="text-sm text-gray-500">
              생년월일 *
            </label>
            <input
              required
              type="date"
              name="birth"
              ref={user.birth}
              className="bg-gray-100 rounded-md px-3 py-2 w-full"
            />
          </div>
          <div>
            <label htmlFor="phone" className="text-sm text-gray-500">
              전화번호 *
            </label>
            <input
              required
              type="text"
              name="phone"
              ref={user.phone}
              className="bg-gray-100 rounded-md px-3 py-2 w-full"
            />
          </div>
          <div>
            <p className="text-sm text-gray-500">활동 지역 *</p>
            <div className="space-x-3">
              <select
                required
                name="sidoName"
                ref={user.sidoName}
                onChange={getGugun}
                className="bg-gray-100 rounded-md px-3 py-2"
              >
                <option hidden selected disabled value="">
                  시도 선택
                </option>
                {sidoList.map((sido) => (
                  <option key={sido} value={sido}>
                    {sido}
                  </option>
                ))}
              </select>
              <select
                required
                name="gugunName"
                ref={user.gugunName}
                className="bg-gray-100 rounded-md px-3 py-2"
              >
                <option hidden selected disabled value="">
                  구군 선택
                </option>
                {gugunList.map((gugun) => (
                  <option key={gugun.gugunName} value={gugun.gugunName}>
                    {gugun.gugunName}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label htmlFor="center" className="text-sm text-gray-500">
              소속센터
            </label>
            <input
              type="text"
              name="center"
              ref={user.center}
              className="bg-gray-100 rounded-md px-3 py-2 w-full"
            />
          </div>
        </div>
        <button
          type="submit"
          className="bg-main-color text-white font-semibold px-6 py-3 mt-10 rounded-md shadow-lg"
        >
          수정하기
        </button>
      </form>
    </div>
  );
};