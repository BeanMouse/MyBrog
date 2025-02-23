import { useRef, useEffect } from "react";
import * as THREE from "three";

export default function FlyChick() {
  const mountRef = useRef<HTMLDivElement>(null); //마운트 참조
  const chickRef = useRef<THREE.Group>(null); //병아리 참조
  const mousePos = useRef(new THREE.Vector3()); //마우스 위치 참조

  useEffect(() => {
    function createGradientTexture() {
      //캔버스를 사용하여 그라디언트 생성
      const canvas = document.createElement("canvas"); //캔버스 생성
      const ctx = canvas.getContext("2d"); //2D 렌더링 컨텍스트 생성
      canvas.width = 256; //캔버스 너비
      canvas.height = 256; //캔버스 높이
      if (ctx) {
        //그라디언트 생성 (위에서 아래로)
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height); //선형 그라디언트 생성
        gradient.addColorStop(0, "#fbbc03"); // 위쪽 색 (노란빛)
        gradient.addColorStop(1, "#ff6f61"); // 아래쪽 색 (주황빛)

        //그라디언트를 Canvas에 적용
        ctx.fillStyle = gradient; //채우기 스타일
        ctx.fillRect(0, 0, canvas.width, canvas.height); //캔버스에 사각형 그리기

        // Three.js에서 사용할 텍스처로 변환**
        const texture = new THREE.CanvasTexture(canvas); //캔버스 텍스처 생성
        return texture; //텍스처 반환
      }
    }

    // 1. 씬, 카메라, 렌더러 생성
    const scene = new THREE.Scene(); //씬 생성
    const gradientTexture = createGradientTexture(); //그라디언트 텍스처 생성
    if (gradientTexture) {
      scene.background = gradientTexture; // 그라디언트 배경
    }

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    ); //카메라 시야각, 종횡비, 가까운 면, 먼 면
    camera.position.set(0, 2, 5); //카메라 위치

    const renderer = new THREE.WebGLRenderer({ antialias: true }); //웹GL 렌더러 생성(테두리 부드럽게)
    renderer.setSize(window.innerWidth, window.innerHeight);
    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement); //랜더링 된 요소를 마운트에 추가
    }

    // 2. 조명 추가
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.8);
    scene.add(ambientLight); //주변광 추가 (색, 강도), 씬 전체 부드러운 조면
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
    directionalLight.position.set(5, 10, 7.5); //특정 방향에서 오는 방향광
    scene.add(directionalLight);
    //3.태양 생성
    const sunGeometry = new THREE.SphereGeometry(1, 32, 32);
    //구체 지오메트리 생성(반지름, 가로 세로 세그먼트 수)
    const sunMaterial = new THREE.MeshStandardMaterial({ color: 0xf8e80b });
    //재질 생성(색상)
    const sun = new THREE.Mesh(sunGeometry, sunMaterial);
    //메쉬 생성(형태, 재질)
    sun.position.set(1, 8, -8);
    //위치 설정
    scene.add(sun);
    const sunLight = new THREE.PointLight(0xffcc00, 800, 300);
    //점광 생성(색상, 강도, 거리) -> 태양광 효과
    sunLight.decay = 2; //빛이 서서히 감쇠
    sunLight.position.copy(sun.position); //태양 위치에서 빛
    scene.add(sunLight); //씬에 추가
    //4.구름 생성
    const cloudGeometry = new THREE.SphereGeometry(1.5, 50, 32); //구체 생성 (반지름, 가로 세로 세그먼트 수
    const cloudMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff }); //램버트 재질 생성(색상)
    const cloud = new THREE.Mesh(cloudGeometry, cloudMaterial); //구체 메쉬 생성(형태, 재질)
    const cloud2 = cloud.clone(); //구름 복제
    const cloud3 = cloud.clone(); //구름 복제
    const cloud4 = cloud.clone(); //구름 복제
    cloud3.scale.set(1, 0.3, 1); //크기 조정
    cloud3.position.set(7.0, 7, -5); //위치 설정
    cloud4.scale.set(1, 0.4, 1); //크기 조정
    cloud4.position.set(-8, 6, -5); //위치 설정
    scene.add(cloud3); //씬에 추가
    scene.add(cloud4); //씬에 추가
    cloud2.scale.set(1, 0.3, 1); //크기 조정
    cloud2.position.set(-3.0, 7, -5); //위치 설정
    cloud.scale.set(1, 0.2, 1); //크기 조정
    cloud.position.set(2.5, 7, -5); //위치 설정
    scene.add(cloud); //씬에 추가
    scene.add(cloud2); //씬에 추가
    //5.잔디 밭 생성
    const groundGeometry = new THREE.PlaneGeometry(100, 100); //평면 지오메트리 생성(가로, 세로)
    const groundMaterial = new THREE.MeshPhongMaterial({ color: 0x3b9b17 }); //퐁 재질 생성(색상)
    const ground = new THREE.Mesh(groundGeometry, groundMaterial); //메쉬 생성(형태, 재질)
    ground.position.y = -0.5; //위치 설정
    ground.rotation.x = -Math.PI / 2; //회전 설정
    scene.add(ground); //

    // 6. 병아리 모델 생성 (여러 Mesh를 조합하여 Group으로 구성)
    const chick = new THREE.Group(); //그룹 생성
    chickRef.current = chick; //병아리 참조
    //머리 깃털: 노란색 박스
    const headFeatherGeometry = new THREE.BoxGeometry(0.15, 0.15, 0.15); //박스 지오메트리 생성(가로, 세로, 높이)
    const headFeatherMaterial = new THREE.MeshStandardMaterial({
      color: 0xfcec8f,
    }); //표준 재질 생성(색상)
    const headFeather = new THREE.Mesh(
      headFeatherGeometry,
      headFeatherMaterial
    ); //메쉬 생성(형태, 재질)
    headFeather.position.set(0, 1.55, -0.05);
    chick.add(headFeather);
    // 몸통: 박스 형태
    const bodyGeometry = new THREE.BoxGeometry(1, 0.7, 1.2); //박스 지오메트리 생성(가로, 세로, 높이)
    const bodyMaterial = new THREE.MeshStandardMaterial({ color: 0xfcec8f }); //표준 재질 생성(색상)
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.set(0, 0.3, -0.15); //위치 설정
    chick.add(body);

    // 머리: 몸통보다 작은 박스 형태
    const headGeometry = new THREE.BoxGeometry(1, 1, 1); //박스 지오메트리 생성(가로, 세로, 높이)
    const headMaterial = new THREE.MeshStandardMaterial({ color: 0xfcec8f }); //표준 재질 생성(색상)
    const head = new THREE.Mesh(headGeometry, headMaterial); //메쉬 생성(형태, 재질)
    head.position.set(0, 1, -0.05); // 몸통 위쪽에 배치
    chick.add(head);

    // 부리: 박스 형태
    const beakGeometry = new THREE.BoxGeometry(0.2, 0.1, 0.2); //박스 지오메트리 생성(가로, 세로, 높이)
    const beakMaterial = new THREE.MeshStandardMaterial({ color: 0xffa500 }); //표준 재질 생성(색상)
    const beak = new THREE.Mesh(beakGeometry, beakMaterial); //메쉬 생성(형태, 재질)
    beak.position.set(0, 1, 0.5); // 머리 앞쪽에 배치
    chick.add(beak);
    //아래 부리: 박스 형태
    const underGeometry = new THREE.BoxGeometry(0.2, 0.1, 0.1); //박스 지오메트리 생성(가로, 세로, 높이)
    const underMaterial = new THREE.MeshStandardMaterial({ color: 0xffa500 }); //표준 재질 생성(색상)
    const under = new THREE.Mesh(underGeometry, underMaterial);
    under.position.set(0, 0.9, 0.5); // 머리 앞쪽에 배치
    chick.add(under);

    // 눈: 두 개의 작은 검은 구체
    const eyeGeometry = new THREE.SphereGeometry(0.04, 10, 10); //구체 지오메트리 생성(반지름, 가로 세로 세그먼트 수)
    const eyeMaterial = new THREE.MeshStandardMaterial({ color: 0x000000 }); //재질 생성(색상)
    const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    leftEye.position.set(-0.15, 1.1, 0.45); //위치 설정
    const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    rightEye.position.set(0.15, 1.1, 0.45); //위치 설정
    chick.add(leftEye);
    chick.add(rightEye);
    // 날개: 두 개의 작은 박스
    const wingGeometry = new THREE.BoxGeometry(0.2, 0.7, 0.5); //박스 지오메트리 생성(가로, 세로, 높이)
    const wingMaterial = new THREE.MeshStandardMaterial({ color: 0xfcec8f }); //표준 재질 생성(색상)
    const leftWing = new THREE.Mesh(wingGeometry, wingMaterial);
    leftWing.position.set(-0.5, 0.5, 0); //위치 설정
    leftWing.rotation.z = Math.PI / 2; //회전 설정
    const rightWing = new THREE.Mesh(wingGeometry, wingMaterial);
    rightWing.position.set(0.5, 0.5, 0); //위치 설정
    rightWing.rotation.z = -Math.PI / 2; //회전 설정
    chick.add(leftWing);
    chick.add(rightWing);

    // 다리: 두 개의 작은 실린더 (오렌지 색)
    const legGroup = new THREE.Group(); //다리에 관한 그룹 생성
    const legGeometry = new THREE.CylinderGeometry(0.06, 0.06, 0.5, 16); //원통 지오메트리 생성(상단 반지름, 하단 반지름, 높이, 세그먼트 수)
    const legMaterial = new THREE.MeshStandardMaterial({ color: 0xffa500 }); //표준 재질 생성(색상)
    const leftLeg = new THREE.Mesh(legGeometry, legMaterial);
    leftLeg.position.set(-0.2, -0.2, 0); //위치 설정
    const rightLeg = new THREE.Mesh(legGeometry, legMaterial);
    rightLeg.position.set(0.2, -0.2, 0); //위치 설정
    //발: 작은 상자
    const featGeometry = new THREE.BoxGeometry(0.2, 0.1, 0.3); //박스 지오메트리 생성(가로, 세로, 높이)
    const featMaterial = new THREE.MeshStandardMaterial({ color: 0xffa500 }); //표준 재질 생성(색상)
    const leftFeat = new THREE.Mesh(featGeometry, featMaterial); //메쉬 생성(형태, 재질)
    leftFeat.position.set(0, -0.2, 0.05); //위치 설정
    const rightFeat = new THREE.Mesh(featGeometry, featMaterial); //메쉬 생성(형태, 재질)
    rightFeat.position.set(0, -0.2, 0.05); //위치 설정
    leftLeg.add(leftFeat); //왼쪽 다리에 발 추가
    rightLeg.add(rightFeat); //오른쪽 다리에 발 추가
    legGroup.add(leftLeg); //다리 그룹에 왼쪽 다리 추가
    legGroup.add(rightLeg); //다리 그룹에 오른쪽 다리 추가
    legGroup.position.y = -0.1; //위치 설정
    chick.add(legGroup); //병아리에 다리 그룹 추가

    scene.add(chick); //씬에 병아리 추가
    chick.position.set(0, 0, 0); //중앙으로 위치 설정
    chick.rotation.y = Math.PI / 9; // 병아리가 바라보는 방향을 바꿈
    const onMouseMove = (event: MouseEvent) => {
      //마우스 이동 이벤트
      const x = (event.clientX / window.innerWidth) * 2 - 1; //-1~1로 정규화
      const y = -(event.clientY / window.innerHeight) * 2 + 1; //-1~1로 정규화(threee.js에서는 위쪽이 -1 그래서 음수로 저장)
      mousePos.current.set(x, y, 0.5); //마우스 위치 저장 (x, y, 마우스 거리를 카메라랑 0.5 떨어져있게 설정)
    };
    window.addEventListener("mousemove", onMouseMove); //마우스 이동 이벤트 추가
    // 7. 애니메이션 루프: 병아리가 서서히 회전하도록 설정
    let time = 0; //시간 초기화
    const animate = () => {
      //애니메이션 함수
      requestAnimationFrame(animate);
      //병아리 걸어다니기 회전과 이동을 위한 코드
      leftLeg.rotation.x = Math.sin(time) / 5;
      rightLeg.rotation.x = -Math.sin(time) / 5;
      chick.position.x = time;
      chick.position.y = Math.abs(Math.sin(time / 4));
      //병아리 날개 퍼덕이기
      time += 0.05;
      leftWing.rotation.z = Math.PI / 2 + Math.sin(time) / 2;
      rightWing.rotation.z = -Math.PI / 2 - Math.sin(time) / 2;

      renderer.render(scene, camera); //랜더링 실행
    };
    animate(); //애니메이션 실행

    // 창 크기 변경 처리
    const onResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight); //랜더러 사이즈 조정
      camera.aspect = window.innerWidth / window.innerHeight; //카메라 종횡비 조정
      camera.updateProjectionMatrix(); //카메라 투영 매트릭스 업데이트
    };
    window.addEventListener("resize", onResize); //창 크기 변경 이벤트 추가

    //정리 코드
    return () => {
      window.removeEventListener("resize", onResize); //창 크기 변경 이벤트 제거
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement); //랜더링 된 요소 제거
      }
    };
  }, []);

  return <div ref={mountRef} />;
}
