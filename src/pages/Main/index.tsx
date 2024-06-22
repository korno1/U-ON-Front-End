import { Header } from "components/Header"
import { useEffect } from "react";

declare global {
    interface Window {
      kakao: any;
    }
}
export const Main = () => {
    
    useEffect(() => {
        let container = document.getElementById(`map`); // 지도를 담을 영역의 DOM 레퍼런스
        let options = {
          center: new window.kakao.maps.LatLng(33.450701, 126.570667), // 지도 중심 좌표
          level: 3, // 지도의 레벨(확대, 축소 정도)
        };
    
        let map = new window.kakao.maps.Map(container, options); // 지도 생성 및 객체 리턴
      }, []);
    return (
        <div>
            <Header />
            <div id="map" style={{ width: "750px", height: "750px" }} />;
        </div>
    )
}