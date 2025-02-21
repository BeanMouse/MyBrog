import { useRef, useEffect } from "react";
import * as THREE from "three";
import gsap from "gsap";
import MUGOU from "../src/assets/project1.svg";
import Keun from "../src/assets/project3.svg";
import My from "../src/assets/project2.svg";
import Honvini from "../src/assets/project4.svg";
import Juhee from "../src/assets/project5.svg";

import styled from "@emotion/styled";

export default function AnimatedCards() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 마우스 드래그 관련 변수들

    // 🚀 Three.js 기본 설정
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 2, 5);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }

    // 🌟 카드 그룹 생성
    const cardContents = [
      {
        title: "MUGOU",
        description: MUGOU,
      },
      {
        title: "주희넷",
        description: My,
      },
      {
        title: "큰소리",
        description: Keun,
      },
      {
        title: "혼비니",
        description: Honvini,
      },
      {
        title: "주작공",
        description: Juhee,
      },
    ];
    const cardGroup = new THREE.Group();
    scene.add(cardGroup);
    const createTextTexture = (title: string, description: string) => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      const scale = window.devicePixelRatio; // 🚀 고해상도 스케일 적용
      const width = 600;
      const height = 540;

      canvas.width = width * scale; // 해상도 조정
      canvas.height = height * scale;

      if (ctx) {
        ctx.scale(scale, scale); // 모든 그래픽을 고해상도로 렌더링
        ctx.fillStyle = "#e6e6e6";
        ctx.fillRect(0, 0, width, height);

        ctx.fillStyle = "#505050";
        ctx.font = `bold 55px Arial`;
        ctx.textAlign = "center";
        ctx.fillText(title, width / 2, 450); //텍스트 추가(텍스트, x, y)

        const image = new Image();
        image.src = description;
        image.onload = () => {
          ctx.drawImage(image, 150, 100, 250, 250); //이미지 추가(이미지, x, y, width, height)
          texture.needsUpdate = true;
        };
      }
      const texture = new THREE.CanvasTexture(canvas);
      texture.anisotropy = 16;
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.needsUpdate = true;
      return texture;
    };
    const numCards = 5;
    const radius = 4;
    const cards: THREE.Mesh[] = [];

    for (let i = 0; i < numCards; i++) {
      const { title, description } = cardContents[i];
      const geometry = new THREE.PlaneGeometry(1.8, 2);
      const material = new THREE.MeshBasicMaterial({
        map: createTextTexture(title, description),
        side: THREE.DoubleSide,
      });

      const card = new THREE.Mesh(geometry, material);

      const angle = (6 - i / (numCards - 1)) * ((Math.PI * 2) / 3);
      card.position.x = Math.cos(angle) * radius;
      card.position.y = Math.sin(angle) * radius;
      card.rotation.z = angle - Math.PI / 2;

      cardGroup.add(card);
      cards.push(card);
    }
    cardGroup.rotation.z = Math.PI - 0.5;
    // 💡 빛 추가
    const light = new THREE.AmbientLight(0xffffff, 1);
    scene.add(light);

    // 🚀 GSAP 애니메이션: 마우스를 올리면 카드가 튀어나오도록 설정
    cards.forEach((card, index) => {
      card.userData.index = index;
      card.userData.originalPos = card.position.clone();
    });

    window.addEventListener("mousemove", (event) => {
      const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      const hoveredCard = Math.floor(((mouseX + 1) / 2) * numCards);

      cards.forEach((card, index) => {
        if (index === hoveredCard) {
          gsap.to(card.position, { z: 1, duration: 0.5, ease: "power3.out" });
        } else {
          gsap.to(card.position, { z: 0, duration: 0.5, ease: "power3.out" });
        }
      });
    });

    // 🎬 애니메이션 루프
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();
    const onResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight); //창 크기에 맞게 렌더러 크기 조정
      camera.aspect = window.innerWidth / window.innerHeight; //카메라 비율 조정
      camera.updateProjectionMatrix(); //카메라 업데이트
    };
    window.addEventListener("resize", onResize); //창 크기 변경 이벤트 추가

    // 🔧 Cleanup (메모리 해제)
    return () => {
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, [window.innerWidth, window.innerHeight]);

  return <Container ref={mountRef} />;
}
const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  pointer-events: none;
`;
