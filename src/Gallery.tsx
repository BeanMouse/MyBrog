// import React, { useRef, useEffect } from "react";
// import * as THREE from "three";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"; //마우스 드래그로 씬을 조작

// export default function ThreeDGallery() {
//   const mountRef = useRef<HTMLDivElement>(null); //컨테이너에 대한 참조

//   useEffect(() => {
//     // Scene, Camera, Renderer 생성
//     const scene = new THREE.Scene(); //3D object 담는 컨테이너
//     const camera = new THREE.PerspectiveCamera(
//       75,
//       window.innerWidth / window.innerHeight,
//       0.1,
//       1000
//     ); //시야각, 창 너비와 높이 비율 설정, 랜더링 범위(0.1~1000)
//     camera.position.set(5, 5, 5); //카메라 위치 설정 (x, y, z)

//     const renderer = new THREE.WebGLRenderer({ antialias: true }); //GPU를 이용하여 렌더링
//     renderer.setSize(window.innerWidth, window.innerHeight); //캔버스 크기 설정
//     renderer.setClearColor(0x000000, 0.1); //배경색 설정
//     if (mountRef.current) {
//       mountRef.current.appendChild(renderer.domElement);
//     } //캔버스를 컨테이너에 추가

//     // OrbitControls 추가 (마우스로 씬 회전)
//     const controls = new OrbitControls(camera, renderer.domElement); //카메라와 렌더러를 OrbitControls에 전달
//     controls.enableDamping = true; //컨트롤 이동을 부드럽게 만듬

//     // 예시 프로젝트 데이터 (타이틀과 색상)
//     const projects = [
//       { title: "Project 1", color: 0xff0000 },
//       { title: "Project 2", color: 0x00ff00 },
//       { title: "Project 3", color: 0x0000ff },
//       { title: "Project 4", color: 0xffff00 },
//       { title: "Project 5", color: 0xff00ff },
//       { title: "Project 6", color: 0x00ffff },
//     ];
//     // 각 프로젝트 카드를 원형으로 배치
//     const radius = 5; // 원의 반지름
//     const planeWidth = 4; //평면 너비
//     const planeHeight = 5; //평면 높이
//     const geometry = new THREE.BoxGeometry(planeWidth, planeHeight, 0.5); //평면의 형태 생성

//     // projects.forEach((project, index) => {
//       const material = new THREE.MeshBasicMaterial({
//         //재질 설정(색상 양면)
//         color: 0xffffff, //흰색
//         side: THREE.DoubleSide, //양면
//       });
//       const plane = new THREE.Mesh(geometry, material); //평면 매쉬 생성

//       // 원형 배치: 각도에 따라 x, z 좌표 결정
//       const angle = (index / projects.length) * Math.PI * 2; //카드 배치 각도 -> 360도를 6등분(2파이 * index/length)
//       //삼각함수 활용 cos(각도) = x좌표, sin(각도) = z좌표
//       plane.position.x = radius * Math.cos(angle);
//       plane.position.z = radius * Math.sin(angle);
//       plane.position.y = 1; // 약간 높게 배치

//       // 중앙(0,1,0)을 바라보게 회전
//       plane.lookAt(new THREE.Vector3(0, 1, 0)); //평면이 (0,1,0)을 바라보게 회전
//       scene.add(plane); //씬에 추가
//     });

//     // 간단한 조명 추가
//     const ambientLight = new THREE.AmbientLight(0xffffff, 0.8); //주변광 설정(색상, 강도)
//     scene.add(ambientLight); //씬에 추가

//     // 애니메이션 루프
//     const animate = () => {
//       controls.update(); //컨트롤 업데이트
//       renderer.render(scene, camera); //scene을 camera시점으로 렌더링
//       requestAnimationFrame(animate); //화면 갱신
//     };
//     animate(); //애니메이션 시작

//     // 창 크기 변경 처리
//     const onResize = () => {
//       renderer.setSize(window.innerWidth, window.innerHeight); //창 크기에 맞게 렌더러 크기 조정
//       camera.aspect = window.innerWidth / window.innerHeight; //카메라 비율 조정
//       camera.updateProjectionMatrix(); //카메라 업데이트
//     };
//     window.addEventListener("resize", onResize); //창 크기 변경 이벤트 추가

//     return () => {
//       window.removeEventListener("resize", onResize); //이벤트 제거;
//       controls.dispose(); //컨트롤 제거
//       renderer.dispose(); //렌더러 제거
//       if (mountRef.current) {
//         mountRef.current.innerHTML = "";
//       }
//       if (
//         mountRef.current &&
//         renderer.domElement.parentNode === mountRef.current
//       ) {
//         mountRef.current.removeChild(renderer.domElement);
//       } //컴포넌트 제거시 렌더러 제거
// };
//   }, [window.innerWidth, window.innerHeight]); //창 크기 변경시 재랜더링

//   return <div ref={mountRef} />; //컨테이너 반환
// }
