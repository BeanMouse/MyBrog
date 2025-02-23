import { useRef, useEffect, use } from "react";
import * as THREE from "three";

export default function ChickModel() {
  const mountRef = useRef<HTMLDivElement>(null);
  const chickRef = useRef<THREE.Group>(null);
  const isFlappingRef = useRef<boolean>(false);
  const isRunningRef = useRef<boolean>(false);
  const mousePos = useRef(new THREE.Vector3());
  const directionRef = useRef<boolean>(true);

  useEffect(() => {
    // 1. 씬, 카메라, 렌더러 생성
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff); // 하늘색 배경

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 2, 5);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }

    // 2. 조명 추가
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.8);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
    directionalLight.position.set(5, 10, 7.5);
    scene.add(directionalLight);

    // 3. 병아리 모델 생성 (여러 Mesh를 조합하여 Group으로 구성)
    const chick = new THREE.Group();
    chickRef.current = chick;
    //머리 깃털: 노란색 박스
    const headFeatherGeometry = new THREE.BoxGeometry(0.15, 0.15, 0.15);
    const headFeatherMaterial = new THREE.MeshStandardMaterial({
      color: 0xfcec8f,
    });
    const headFeather = new THREE.Mesh(
      headFeatherGeometry,
      headFeatherMaterial
    );
    headFeather.position.set(0, 1.55, -0.05);
    chick.add(headFeather);
    // 몸통: 약간 타원형의 노란 구체
    const bodyGeometry = new THREE.BoxGeometry(1, 0.7, 1.2);
    const bodyMaterial = new THREE.MeshStandardMaterial({ color: 0xfcec8f });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.set(0, 0.3, -0.15); // y축으로 늘려서 타원형 효과
    chick.add(body);

    // 머리: 몸통보다 작은 구체
    const headGeometry = new THREE.BoxGeometry(1, 1, 1);
    const headMaterial = new THREE.MeshStandardMaterial({ color: 0xfcec8f });
    const head = new THREE.Mesh(headGeometry, headMaterial);
    head.position.set(0, 1, -0.05); // 몸통 위쪽에 배치
    chick.add(head);

    // 부리: 원뿔 모양 (오렌지 색)
    const beakGeometry = new THREE.BoxGeometry(0.2, 0.1, 0.2);
    const beakMaterial = new THREE.MeshStandardMaterial({ color: 0xffa500 });
    const beak = new THREE.Mesh(beakGeometry, beakMaterial);
    beak.position.set(0, 1, 0.5); // 머리 앞쪽에 배치
    chick.add(beak);
    const underGeometry = new THREE.BoxGeometry(0.2, 0.1, 0.1);
    const underMaterial = new THREE.MeshStandardMaterial({ color: 0xffa500 });
    const under = new THREE.Mesh(underGeometry, underMaterial);
    under.position.set(0, 0.9, 0.5); // 머리 앞쪽에 배치
    chick.add(under);

    // 눈: 두 개의 작은 검은 구체
    const eyeGeometry = new THREE.SphereGeometry(0.04, 10, 10);
    const eyeMaterial = new THREE.MeshStandardMaterial({ color: 0x000000 });
    const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    leftEye.position.set(-0.15, 1.1, 0.45);
    const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    rightEye.position.set(0.15, 1.1, 0.45);
    chick.add(leftEye);
    chick.add(rightEye);
    // 날개: 두 개의 작은 박스 (노란색)
    const wingGeometry = new THREE.BoxGeometry(0.2, 0.7, 0.5);
    const wingMaterial = new THREE.MeshStandardMaterial({ color: 0xfcec8f });
    const leftWing = new THREE.Mesh(wingGeometry, wingMaterial);
    leftWing.position.set(-0.5, 0.5, 0);
    leftWing.rotation.z = Math.PI / 2;
    const rightWing = new THREE.Mesh(wingGeometry, wingMaterial);
    rightWing.position.set(0.5, 0.5, 0);
    rightWing.rotation.z = -Math.PI / 2;
    chick.add(leftWing);
    chick.add(rightWing);

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
    legGroup.position.y = 0; //위치 설정
    chick.add(legGroup); //병아리에 다리 그룹 추가

    // 병아리 모델을 씬 중앙에 추가
    scene.add(chick);
    chick.rotation.y = Math.PI / 6; // 병아리가 바라보는 방향을 바꿈
    const onMouseMove = (event: MouseEvent) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;
      mousePos.current.set(x, y, 0.5);
    };
    window.addEventListener("mousemove", onMouseMove);
    // 4. 애니메이션 루프: 병아리가 서서히 회전하도록 설정
    let time = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      if (chickRef.current) {
        const target = new THREE.Vector3(
          mousePos.current.x * 2,
          mousePos.current.y * 2,
          2
        );
        chickRef.current.lookAt(target);
      }
      if (isFlappingRef.current) {
        time += 0.1;
        leftWing.rotation.z = Math.PI / 2 + Math.sin(time) / 2;
        rightWing.rotation.z = -Math.PI / 2 - Math.sin(time) / 2;
      }

      if (isRunningRef.current) {
        leftLeg.rotation.x = Math.sin(time) / 2;
        rightLeg.rotation.x = -Math.sin(time) / 2;
        if (directionRef.current) {
          chick.position.x += 0.05;

          if (chick.position.x > 2.95) {
            directionRef.current = false;
          }
        } else {
          chick.position.x -= 0.05;
          if (chick.position.x < 0) {
            directionRef.current = true;
          }
        }
      }

      renderer.render(scene, camera);
    };
    animate();

    // 창 크기 변경 처리
    const onResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", onResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", onResize);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);
  const handleFlap = () => {
    isFlappingRef.current = true;
    setTimeout(() => {
      isFlappingRef.current = false;
    }, 1000);
  };
  const handleRun = () => {
    isRunningRef.current = true;
    setTimeout(() => {
      isRunningRef.current = false;
    }, 1000);
  };

  const handleClick = () => {
    handleFlap();
    handleRun();
  };
  useEffect(() => {
    const onActivateChick = () => {
      handleClick();
    };
    window.addEventListener("activateChick", onActivateChick);
  }, []);

  return <div ref={mountRef} onClick={handleFlap} />;
}
